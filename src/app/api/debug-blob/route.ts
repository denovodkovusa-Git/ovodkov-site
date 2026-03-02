import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
            return NextResponse.json({ success: false, error: 'BLOB_READ_WRITE_TOKEN is missing from environment' }, { status: 500 })
        }

        const blob = await put('test.txt', 'Hello World!', {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN
        })

        return NextResponse.json({ success: true, blob })
    } catch (err: any) {
        return NextResponse.json({
            success: false,
            error: err.message,
            stack: err.stack,
            name: err.name
        }, { status: 500 })
    }
}
