import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import fs from 'fs'

async function run() {
    // @ts-ignore
    process.env.NODE_ENV = 'production'
    const payload = await getPayload({ config })

    const img1x1Path = 'C:\\Users\\Orion\\.gemini\\antigravity\\brain\\e3b78f10-360b-4d29-878d-989b58183e61\\product_thumbnail_1080_1772642626257.png'
    const img16x9Path = 'C:\\Users\\Orion\\.gemini\\antigravity\\brain\\e3b78f10-360b-4d29-878d-989b58183e61\\collection_banner_1920_1772642649079.png'

    if (!fs.existsSync(img1x1Path) || !fs.existsSync(img16x9Path)) {
        console.error('Placeholder images not found.')
        return
    }

    console.log('Uploading 1080x1080 placeholder image to Media collection...')
    const media1x1 = await payload.create({
        collection: 'media',
        data: { alt: 'Product Thumbnail 1:1' },
        file: {
            data: fs.readFileSync(img1x1Path),
            mimetype: 'image/png',
            name: 'product-thumbnail-1x1.png',
            size: fs.statSync(img1x1Path).size,
        },
    })

    console.log('Uploading 1920x1080 placeholder image to Media collection...')
    const media16x9 = await payload.create({
        collection: 'media',
        data: { alt: 'Collection Banner 16:9' },
        file: {
            data: fs.readFileSync(img16x9Path),
            mimetype: 'image/png',
            name: 'collection-banner-16x9.png',
            size: fs.statSync(img16x9Path).size,
        },
    })

    console.log('Finding all products...')
    const productsRes = await payload.find({ collection: 'products', limit: 100 })

    for (const product of productsRes.docs) {
        console.log(`Updating product ${product.id} with 1x1 placeholder image...`)
        await payload.update({
            collection: 'products',
            id: product.id,
            data: { photo: media1x1.id },
        })
    }

    console.log('Update complete. Note: Use media16x9.id for banner sections if needed.')
    process.exit(0)
}

run().catch((error) => {
    console.error('Error seeding placeholders:', error)
    process.exit(1)
})
