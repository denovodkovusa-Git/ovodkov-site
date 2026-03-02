import { list } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const token = process.env.BLOB_READ_WRITE_TOKEN
        if (!token) {
            return NextResponse.json({ success: false, error: 'Token missing' }, { status: 500 })
        }

        const { blobs } = await list({ token })
        return NextResponse.json({ success: true, blobs })
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 })
    }
}
