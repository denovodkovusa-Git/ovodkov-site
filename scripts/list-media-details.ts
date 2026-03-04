import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function listMediaDetails() {
    const payload = await getPayload({ config })
    const media = await payload.find({
        collection: 'media',
        limit: 100,
    })
    console.log(JSON.stringify(media.docs.map(d => ({
        id: d.id,
        filename: (d as any).filename,
        url: (d as any).url,
        alt: (d as any).alt
    })), null, 2))
    process.exit(0)
}

listMediaDetails().catch(e => { console.error(e); process.exit(1); })
