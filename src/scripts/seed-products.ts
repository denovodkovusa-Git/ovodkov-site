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
    console.log('--- Starting Seed Process ---')

    // Use dynamic imports to ensure dotenv.config() runs first
    const { getPayload } = await import('payload')
    const { default: configPromise } = await import('../payload.config')

    const products = [
        {
            title: 'Модульный гриль-блок BORK G900',
            description: 'Профессиональный угольный гриль с интеллектуальной системой контроля температуры. Выполнен из авиационного алюминия и жаропрочной нержавеющей стали. Идеальное решение для создания кулинарных шедевров на открытом воздухе.',
            price: 850000,
            imagePath: 'C:\\Users\\Orion\\.gemini\\antigravity\\brain\\f921b613-1f90-4155-9119-05ba91daf77a\\bork_grill_block_1772440961884.png',
            imageName: 'bork_grill_block.png'
        },
        {
            title: 'Стальной остров BORK K700',
            description: 'Функциональный кухонный остров с интегрированной мойкой и рабочей поверхностью из натурального камня. Система организации хранения инструментов и аксессуаров. Лаконичный дизайн в стиле лофт.',
            price: 1200000,
            imagePath: 'C:\\Users\\Orion\\.gemini\\antigravity\\brain\\f921b613-1f90-4155-9119-05ba91daf77a\\bork_kitchen_island_1772440975892.png',
            imageName: 'bork_kitchen_island.png'
        },
        {
            title: 'Шкаф для вызревания мяса BORK V600',
            description: 'Создает идеальный микроклимат для сухого вызревания говядины. Система фильтрации воздуха с активированным углем и точный контроль влажности. Панорамное остекление с защитой от УФ-лучей.',
            price: 680000,
            imagePath: 'C:\\Users\\Orion\\.gemini\\antigravity\\brain\\f921b613-1f90-4155-9119-05ba91daf77a\\bork_aging_cabinet_outdoor_1772440990204.png',
            imageName: 'bork_aging_cabinet.png'
        },
        {
            title: 'Печь для пиццы BORK P500',
            description: 'Традиционный вкус в современном исполнении. Разогрев до 450°C за 15 минут. Каменный под из вулканической лавы обеспечивает идеальную хрустящую корочку.',
            price: 420000,
            imagePath: 'C:\\Users\\Orion\\.gemini\\antigravity\\brain\\f921b613-1f90-4155-9119-05ba91daf77a\\bork_pizza_oven_outdoor_1772441011522.png',
            imageName: 'bork_pizza_oven.png'
        }
    ]

    const payload = await getPayload({ config: configPromise })

    for (const item of products) {
        console.log(`Processing product: ${item.title}`)

        // 1. Upload Media
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

        // 2. Create Product
        const productDoc = await payload.create({
            collection: 'products',
            draft: true,
            data: {
                title: item.title,
                description: item.description,
                price: item.price,
                photo: mediaDoc.id,
            },
        })

        console.log(`Created product with ID: ${productDoc.id}`)
    }

    console.log('--- Seed Process Completed ---')
    process.exit(0)
}

seed().catch((err) => {
    console.error('Seed failed:', err)
    process.exit(1)
})
