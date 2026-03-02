import { Payload } from 'payload'
import path from 'path'
import fs from 'fs'

export const seed = async (payload: Payload) => {
    payload.logger.info('Checking if seeding is needed...')

    // 1. Check for Admin User
    const { totalDocs: userCount } = await payload.find({
        collection: 'users',
        limit: 1,
    })

    if (userCount === 0) {
        payload.logger.info('No users found. Creating admin user...')
        await payload.create({
            collection: 'users',
            data: {
                email: 'info@ovodkov.ru',
                password: 'password', // User should change this after first login
                name: 'Admin',
            },
        })
        payload.logger.info('Admin user created: info@ovodkov.ru')
    }

    // 2. Check for Products
    const { totalDocs: productCount } = await payload.find({
        collection: 'products',
        limit: 1,
    })

    if (productCount === 0) {
        payload.logger.info('No products found. Seeding initial products...')

        // Ensure placeholder media exists
        const mediaDir = path.resolve(process.cwd(), 'public/media')
        if (!fs.existsSync(mediaDir)) {
            fs.mkdirSync(mediaDir, { recursive: true })
        }
        const filePath = path.join(mediaDir, 'placeholder.png')
        if (!fs.existsSync(filePath)) {
            // 1x1 white pixel PNG
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

        const productsToSeed = [
            {
                title: 'Печь для пиццы BORK P500',
                description: 'Традиционный вкус в современном исполнении. Разогрев до 450°C за 15 минут.',
                price: 150000,
                slug: 'p500',
            },
            {
                title: 'Гриль BORK G900',
                description: 'Профессиональный гриль для идеальных стейков.',
                price: 180000,
                slug: 'g900',
            },
            {
                title: 'Кофемашина BORK K700',
                description: 'Искусство приготовления кофе в ваших руках.',
                price: 120000,
                slug: 'k700',
            },
            {
                title: 'Вакуумный упаковщик BORK V600',
                description: 'Сохранение свежести продуктов надолго.',
                price: 45000,
                slug: 'v600',
            },
        ]

        for (const prod of productsToSeed) {
            await payload.create({
                collection: 'products',
                data: {
                    ...prod,
                    photo: media.id,
                    _status: 'published',
                },
            })
        }
        payload.logger.info('Seeded 4 products.')
    } else {
        payload.logger.info('Database already contains products. Skipping product seeding.')
    }
}
