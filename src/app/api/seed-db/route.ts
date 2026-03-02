import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { seed } from '@/utilities/seed'
import { NextResponse } from 'next/server'

export const GET = async () => {
    try {
        const payload = await getPayload({ config: configPromise })

        // Ensure database schema is synced (tables created) before seeding
        // In Payload 3.0, db.push is a boolean, not a function.
        // We can check if the adapter has a sync or push method, or use the drizzle-kit push directly if available.
        const adapter = payload.db as any
        if (typeof adapter.sync === 'function') {
            await adapter.sync()
        } else if (typeof adapter.migrateFresh === 'function') {
            // This is more aggressive but ensures tables exist
            await adapter.migrateFresh()
        }

        await seed(payload)
        return NextResponse.json({ message: 'Seeding completed successfully' })
    } catch (error: any) {
        console.error('Error during manual seeding:', error)
        return NextResponse.json(
            { error: 'Seeding failed', details: error.message },
            { status: 500 }
        )
    }
}
