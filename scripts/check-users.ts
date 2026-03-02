import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function run() {
    const payload = await getPayload({ config })
    const { docs: users } = await payload.find({
        collection: 'users',
    })
    console.log('Users:', users.map(u => ({ email: u.email, id: u.id })))
}

run().catch(console.error)
