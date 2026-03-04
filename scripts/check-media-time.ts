import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function checkMediaTimestamps() {
    const payload = await getPayload({ config })
    const media = await payload.find({
        collection: 'media',
        limit: 100,
    })
    console.log(JSON.stringify(media.docs.map(d => ({
        id: d.id,
        filename: (d as any).filename,
        createdAt: (d as any).createdAt,
        url: (d as any).url
    })), null, 2))
    process.exit(0)
}

checkMediaTimestamps().catch(e => { console.error(e); process.exit(1); })
