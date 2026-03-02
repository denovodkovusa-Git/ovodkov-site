import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { seed } from '@/utilities/seed'
import { NextResponse } from 'next/server'

export const GET = async () => {
    try {
        const payload = await getPayload({ config: configPromise })

        console.log('--- Emergency Seeding Started ---')

        // 1. Check if Admin User exists
        const { docs: existingUsers } = await payload.find({
            collection: 'users',
            where: { email: { equals: 'info@ovodkov.ru' } },
        })

        if (existingUsers.length === 0) {
            console.log('Creating admin user...')
            await payload.create({
                collection: 'users',
                data: {
                    email: 'info@ovodkov.ru',
                    password: 'password123',
                },
                overrideAccess: true,
            })
        } else {
            console.log('Admin user already exists.')
        }

        // 2. Create 4 products directly if they don't exist
        const products = [
            { title: 'Печь BORK P500', price: 150000, slug: 'p500-fix' },
            { title: 'Гриль BORK G900', price: 180000, slug: 'g900-fix' },
            { title: 'Винный шкаф BORK W500', price: 680000, slug: 'w500-fix' },
            { title: 'Уличная кухня BORK K700', price: 1250000, slug: 'k700-fix' }
        ]

        for (const prod of products) {
            const { docs: existingProds } = await payload.find({
                collection: 'products',
                where: { slug: { equals: prod.slug } },
            })

            if (existingProds.length === 0) {
                console.log(`Creating product: ${prod.title}`)
                await payload.create({
                    collection: 'products',
                    data: { ...prod, _status: 'published', photo: null as any },
                    overrideAccess: true,
                    draft: false,
                })
            } else {
                console.log(`Product ${prod.slug} already exists.`)
            }
        }

        return NextResponse.json({ message: 'Seeding completed with checks' })
    } catch (error: any) {
        console.error('Error during manual seeding:', error)
        return NextResponse.json(
            { error: 'Seeding failed', details: error.message },
            { status: 500 }
        )
    }
}
