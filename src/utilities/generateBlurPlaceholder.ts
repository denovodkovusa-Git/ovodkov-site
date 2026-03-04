import sharp from 'sharp'
import { getMediaUrl } from './getMediaUrl'

/**
 * Returns a base64 string representing a heavily blurred equivalent of the input image.
 * Requires a fully qualified URL. If passing a relative Payload path add process.env.NEXT_PUBLIC_SERVER_URL.
 */
export async function getBlurDataURL(url: string | null | undefined): Promise<string | undefined> {
    if (!url) return undefined

    // For relative URLs, prefix with full server URL for Node fetch
    let fetchUrl = getMediaUrl(url)
    if (fetchUrl.startsWith('/')) {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        fetchUrl = `${serverUrl}${fetchUrl}`
    }

    try {
        const res = await fetch(fetchUrl, { next: { revalidate: 3600 } })
        if (!res.ok) {
            console.error(`Failed to fetch image for blur URL: ${fetchUrl}. Status: ${res.status}`)
            return undefined
        }

        const arrayBuffer = await res.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const blurredBuffer = await sharp(buffer)
            .resize(10, 10, { fit: 'inside' })
            .toFormat('jpeg')
            .jpeg({ quality: 20 })
            .toBuffer()

        return `data:image/jpeg;base64,${blurredBuffer.toString('base64')}`
    } catch (error) {
        console.error('Error generating blur DataURL:', error)
        return undefined
    }
}
