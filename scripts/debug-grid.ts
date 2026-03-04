import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

async function debug() {
    const payload = await getPayload({ config: configPromise })
    const products = await payload.find({
        collection: 'products',
        limit: 10,
        sort: '-createdAt',
        depth: 1,
        overrideAccess: true,
    })
    console.log("Found products:", products.docs.length)
    if (products.docs.length > 0) {
        console.log("First product title:", products.docs[0].title)
        console.log("First product photo:", products.docs[0].photo)
    }
    process.exit(0)
}
debug()
