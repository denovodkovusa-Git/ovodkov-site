import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import path from 'path'
import fs from 'fs'

async function run() {
    const payload = await getPayload({ config })

    // 1. Check if product exists
    const { docs: existing } = await payload.find({
        collection: 'products',
        where: {
            slug: {
                equals: 'bork-p500',
            },
        },
        draft: true,
    })

    if (existing.length > 0) {
        console.log('Product bork-p500 already exists.')
        // Ensure it is published
        if (existing[0]._status !== 'published') {
            await payload.update({
                collection: 'products',
                id: existing[0].id,
                data: {
                    _status: 'published',
                },
            })
            console.log('Product status updated to published.')
        }
        return
    }

    console.log('Product bork-p500 not found. Seeding...')

    // 2. Ensure media exists
    const filePath = path.resolve(process.cwd(), 'public/media/placeholder.png')
    if (!fs.existsSync(filePath)) {
        if (!fs.existsSync(path.dirname(filePath))) {
            fs.mkdirSync(path.dirname(filePath), { recursive: true })
        }
        fs.writeFileSync(filePath, Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==', 'base64'))
    }

    const { docs: mediaDocs } = await payload.find({
        collection: 'media',
        where: {
            alt: { equals: 'Placeholder' }
        }
    })

    let mediaId;
    if (mediaDocs.length > 0) {
        mediaId = mediaDocs[0].id;
    } else {
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
        mediaId = media.id;
    }

    // 3. Create the product
    const product = await payload.create({
        collection: 'products',
        data: {
            title: 'Печь для пиццы BORK P500',
            description: 'Традиционный вкус в современном исполнении. Разогрев до 450°C за 15 минут.',
            price: 150000,
            photo: mediaId,
            slug: 'bork-p500',
            _status: 'published',
        },
    })

    console.log('Product created: bork-p500 (Published)')
}

run().catch(console.error)
