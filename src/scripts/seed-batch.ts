import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({
    path: path.resolve(dirname, '../../.env'),
})

async function seed() {
    console.log('--- Starting Batch Seed Process ---')

    const { getPayload } = await import('payload')
    const { default: configPromise } = await import('../payload.config')

    const products = [
        {
            title: 'Печь для пиццы BORK P500',
            description: 'Профессиональная печь для пиццы. Разогрев до 450°C за 15 минут. Каменный под из вулканической лавы обеспечивает идеальную хрустящую корочку и неповторимый вкус традиционной пиццы.',
            price: 420000,
            imagePath: 'C:\\Users\\Orion\\.gemini\\antigravity\\brain\\f921b613-1f90-4155-9119-05ba91daf77a\\bork_pizza_oven_outdoor_1772441011522.png',
            imageName: 'bork_p500.png',
            slug: 'bork-p500'
        },
        {
            title: 'Гриль-станция BORK G700',
            description: 'Профессиональная гриль-станция из нержавеющей стали AISI 304. Интеллектуальная система контроля температуры и равномерного распределения жара для идеальных стейков.',
            price: 850000,
            imagePath: 'C:\\Users\\Orion\\.gemini\\antigravity\\brain\\08ca6b98-7453-4c68-8e84-94acf95c2885\\bork_g700_grill_station_1772463370698.png',
            imageName: 'bork_g700.png',
            slug: 'bork-g700'
        },
        {
            title: 'Винный шкаф BORK W500',
            description: 'Климатический шкаф для хранения элитных вин. Две независимые температурные зоны, система гашения вибраций и защита от УФ-излучения. Премиальный дизайн для вашей коллекции.',
            price: 680000,
            imagePath: 'C:\\Users\\Orion\\.gemini\\antigravity\\brain\\08ca6b98-7453-4c68-8e84-94acf95c2885\\bork_w500_wine_cellar_1772463396148.png',
            imageName: 'bork_w500.png',
            slug: 'bork-w500'
        },
        {
            title: 'Уличная кухня BORK K700',
            description: 'Модульная кухонная система для открытых пространств. Интегрированная мойка, зона для подготовки и хранения. Столешница из натурального камня и корпус из авиационного алюминия.',
            price: 1250000,
            imagePath: 'C:\\Users\\Orion\\.gemini\\antigravity\\brain\\08ca6b98-7453-4c68-8e84-94acf95c2885\\bork_k700_outdoor_kitchen_1772463411007.png',
            imageName: 'bork_k700.png',
            slug: 'bork-k700'
        }
    ]

    const payload = await getPayload({ config: configPromise })

    for (const item of products) {
        console.log(`Processing product: ${item.title}`)

        // 1. Check if product already exists
        const { docs: existing } = await payload.find({
            collection: 'products',
            where: { slug: { equals: item.slug } },
            draft: true
        })

        if (existing.length > 0) {
            console.log(`Product ${item.slug} already exists, skipping seed.`)
            continue
        }

        // 2. Upload Media
        const fileBuffer = fs.readFileSync(item.imagePath)
        const mediaDoc = await payload.create({
            collection: 'media',
            data: {
                alt: item.title,
            },
            file: {
                data: fileBuffer,
                name: item.imageName,
                mimetype: 'image/png',
                size: fileBuffer.length,
            },
        })

        console.log(`Created media with ID: ${mediaDoc.id}`)

        // 3. Create Product
        const productDoc = await payload.create({
            collection: 'products',
            data: {
                title: item.title,
                description: item.description,
                price: item.price,
                photo: mediaDoc.id,
                slug: item.slug,
                _status: 'published',
            },
        })

        console.log(`Created product with ID: ${productDoc.id} (Status: Published)`)
    }

    console.log('--- Batch Seed Process Completed ---')
    process.exit(0)
}

seed().catch((err) => {
    console.error('Seed failed:', err)
    process.exit(1)
})
