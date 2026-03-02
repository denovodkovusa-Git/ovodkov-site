import { getPayload } from 'payload'
import config from '../src/payload.config'
import { seed } from '../src/utilities/seed'

async function run() {
    console.log('--- Starting Manual Seed ---')
    const payload = await getPayload({ config })
    await seed(payload)
    console.log('--- Manual Seed Completed ---')
    process.exit(0)
}

run().catch((err) => {
    console.error('Seed failed:', err)
    process.exit(1)
})
