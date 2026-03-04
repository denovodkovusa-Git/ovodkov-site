import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function checkProducts() {
    const payload = await getPayload({ config })
    const products = await payload.find({
        collection: 'products',
        limit: 20,
    })
    console.log(JSON.stringify(products.docs.map(d => ({
        id: d.id,
        title: d.title,
        slug: d.slug,
        photo: d.photo ? (typeof d.photo === 'object' ? (d.photo as any).id : d.photo) : null
    })), null, 2))
    process.exit(0)
}

checkProducts().catch(e => { console.error(e); process.exit(1); })
