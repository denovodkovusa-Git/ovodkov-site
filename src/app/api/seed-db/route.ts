import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { seed } from '@/utilities/seed'
import { NextResponse } from 'next/server'

export const GET = async () => {
    try {
        const payload = await getPayload({ config: configPromise })
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
