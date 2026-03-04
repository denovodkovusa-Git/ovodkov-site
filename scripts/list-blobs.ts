import 'dotenv/config'
import { list } from '@vercel/blob'

async function checkBlobFiles() {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        console.log('No BLOB_READ_WRITE_TOKEN found')
        process.exit(1)
    }

    try {
        const { blobs } = await list({ token: process.env.BLOB_READ_WRITE_TOKEN })
        console.log(JSON.stringify(blobs.map(b => ({
            url: b.url,
            pathname: b.pathname,
            size: b.size
        })), null, 2))
    } catch (err) {
        console.error('Error listing blobs:', err)
    }
    process.exit(0)
}

checkBlobFiles().catch(e => { console.error(e); process.exit(1); })
