import 'server-only'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { Media } from '../../collections/Media'
import { Plugin } from 'payload'

export const storageAdapter: Plugin = (config) => {
    if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
        return vercelBlobStorage({
            collections: {
                [Media.slug]: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN || '',
        })(config)
    }
    return config
}
