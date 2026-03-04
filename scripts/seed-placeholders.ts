import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import fs from 'fs'
import path from 'path'

async function run() {
    // @ts-ignore
    process.env.NODE_ENV = 'production'
    const payload = await getPayload({ config })

    const imagePath = 'C:\\Users\\Orion\\.gemini\\antigravity\\brain\\e3b78f10-360b-4d29-878d-989b58183e61\\placeholder_metal_furniture_1_1772642137566.png'

    if (!fs.existsSync(imagePath)) {
        console.error('Placeholder image not found at', imagePath)
        return
    }

    const { size } = fs.statSync(imagePath)

    console.log('Uploading placeholder image to Media collection...')
    const media = await payload.create({
        collection: 'media',
        data: {
            alt: 'Premium Metal Furniture Placeholder',
        },
        file: {
            data: fs.readFileSync(imagePath),
            mimetype: 'image/png',
            name: 'placeholder-metal-furniture.png',
            size: size,
        },
    })
    console.log('Uploaded media ID:', media.id)

    console.log('Finding all products...')
    const productsRes = await payload.find({
        collection: 'products',
        limit: 100,
    })

    console.log(`Found ${productsRes.docs.length} products.`)

    for (const product of productsRes.docs) {
        if (!product.photo) {
            console.log(`Updating product ${product.id} (${product.title}) with placeholder image...`)
            await payload.update({
                collection: 'products',
                id: product.id,
                data: {
                    photo: media.id,
                },
            })
        } else {
            console.log(`Product ${product.id} already has a photo. Skipping.`)
        }
    }

    console.log('Update complete.')
    process.exit(0)
}

run().catch((error) => {
    console.error('Error seeding placeholders:', error)
    process.exit(1)
})
