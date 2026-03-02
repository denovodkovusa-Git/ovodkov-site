'use server'
import 'server-only'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { Media } from '../../collections/Media'
import { Plugin } from 'payload'

export const storageAdapter: Plugin = vercelBlobStorage({
    collections: {
        [Media.slug]: true,
    },
    token: process.env.BLOB_READ_WRITE_TOKEN || '',
})
