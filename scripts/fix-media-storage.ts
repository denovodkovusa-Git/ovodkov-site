import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import fs from 'fs'
import path from 'path'

const mappings = [
    {
        productSlug: 'cairo-loft-kitchen',
        filePrefix: 'Gemini_Generated_Image_nzh162nzh162nzh1',
        alt: 'Модульная кухня Cairo Loft'
    },
    {
        productSlug: 'argentine-master',
        filePrefix: 'Gemini_Generated_Image_pvsvu8pvsvu8pvsv',
        alt: 'Гриль-станция Argentine Master'
    },
    {
        productSlug: 'iron-residence',
        filePrefix: 'Gemini_Generated_Image_20v71720v71720v7',
        alt: 'Беседка-павильон Iron Residence'
    },
    {
        productSlug: 'cairo-pattern-complex',
        filePrefix: 'Gemini_Generated_Image_l6096pl6096pl609',
        alt: 'Комплекс Cairo Pattern'
    }
]

async function fixMedia() {
    console.log('NODE_ENV:', process.env.NODE_ENV)
    console.log('VERCEL:', process.env.VERCEL)
    console.log('Token exists:', !!process.env.BLOB_READ_WRITE_TOKEN)

    // @ts-ignore
    process.env.NODE_ENV = 'production'
    const payload = await getPayload({ config })
    const downloadsDir = 'C:\\Users\\Orion\\Downloads'
    const files = fs.readdirSync(downloadsDir)

    console.log('Cleaning up old media and re-uploading...')

    for (const m of mappings) {
        const localFile = files.find(f => f.startsWith(m.filePrefix) && f.endsWith('.jpeg'))

        if (!localFile) {
            console.warn(`File not found for prefix: ${m.filePrefix}`)
            continue
        }

        const fullPath = path.join(downloadsDir, localFile)
        console.log(`Matched local file: ${localFile}`)

        // 1. Delete old media if exists (search by prefix to catch both local and broken blob entries)
        const oldMedia = await payload.find({
            collection: 'media',
            where: {
                filename: { contains: m.filePrefix }
            }
        })

        for (const doc of oldMedia.docs) {
            console.log(`Deleting broken media: ${doc.id} (${(doc as any).filename})`)
            await payload.delete({
                collection: 'media',
                id: doc.id
            })
        }

        // 2. Upload fresh media
        console.log(`Uploading: ${localFile}`)
        const fileStats = fs.statSync(fullPath)
        const mediaDoc = await payload.create({
            collection: 'media',
            data: {
                alt: m.alt,
            },
            file: {
                data: fs.readFileSync(fullPath),
                name: localFile,
                size: fileStats.size,
                mimetype: 'image/jpeg',
            }
        })

        console.log(`New Media ID: ${mediaDoc.id} | URL: ${(mediaDoc as any).url}`)

        // 3. Update product
        const products = await payload.find({
            collection: 'products',
            where: {
                slug: { equals: m.productSlug }
            }
        })

        if (products.docs.length > 0) {
            const product = products.docs[0]
            console.log(`Updating product: ${product.title} (${product.id})`)
            await payload.update({
                collection: 'products',
                id: product.id,
                data: {
                    photo: mediaDoc.id
                }
            })
        } else {
            console.warn(`Product not found for slug: ${m.productSlug}`)
        }
    }

    console.log('Fix completed.')
    process.exit(0)
}

fixMedia().catch(e => { console.error(e); process.exit(1); })
