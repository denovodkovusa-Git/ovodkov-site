import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { seed } from '@/utilities/seed'
import { NextResponse } from 'next/server'

export const GET = async () => {
    try {
        const payload = await getPayload({ config: configPromise })

        console.log('--- Emergency Seeding Started ---')

        // 1. Create Admin User directly (skipping checks)
        await payload.create({
            collection: 'users',
            data: {
                email: 'info@ovodkov.ru',
                password: 'password123',
            },
        }).catch(err => console.log('User already exists or error:', err.message))

        // 2. Create products directly
        const products = [
            { title: 'Печь BORK P500', price: 150000, slug: 'p500-fix' },
            { title: 'Гриль BORK G900', price: 180000, slug: 'g900-fix' }
        ]

        for (const prod of products) {
            await payload.create({
                collection: 'products',
                data: { ...prod, _status: 'published' }
            }).catch(err => console.log(`Product ${prod.slug} skip:`, err.message))
        }

        return NextResponse.json({ message: 'Emergency Seeding completed' })
    } catch (error: any) {
        console.error('Error during manual seeding:', error)
        return NextResponse.json(
            { error: 'Seeding failed', details: error.message },
            { status: 500 }
        )
    }
}
