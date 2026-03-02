import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import path from 'path'
import fs from 'fs'

async function run() {
    const payload = await getPayload({ config })

    // 1. Create a dummy media item if it doesn't exist
    const filePath = path.resolve(process.cwd(), 'public/media/placeholder.png')
    if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true })
    }
    // Create a 1x1 white pixel PNG if not exists
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==', 'base64'))
    }

    const media = await payload.create({
        collection: 'media',
        data: {
            alt: 'Placeholder',
        },
        file: {
            data: fs.readFileSync(filePath),
            name: 'placeholder.png',
            mimetype: 'image/png',
            size: fs.statSync(filePath).size,
        },
    })

    // 2. Create the product
    const product = await payload.create({
        collection: 'products',
        data: {
            title: 'Печь для пиццы BORK P500',
            description: 'Традиционный вкус в современном исполнении. Разогрев до 450°C за 15 минут.',
            price: 150000,
            photo: media.id,
            slug: 'bork-p500',
        },
    })

    console.log('Product created:', product.title, 'with slug:', product.slug)
}

run().catch(console.error)
