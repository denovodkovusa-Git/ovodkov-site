
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({
    path: path.resolve(dirname, '../../.env'),
})

const rebrand = async () => {
    // Use dynamic imports to ensure dotenv.config() runs first
    const { getPayload } = await import('payload')
    const { default: configPromise } = await import('../payload.config')

    const payload = await getPayload({ config: configPromise })

    const products = await payload.find({
        collection: 'products',
    })

    for (const product of products.docs) {
        let newTitle = product.title
        let newDescription = product.description
        let newSlug = product.slug

        if (product.slug === 'bork-p500' || product.slug === 'ovodkov-p500') {
            newTitle = 'Ovodkov P500'
            newSlug = 'ovodkov-p500'
            newDescription = 'Уличный кухонный модуль. Стальной корпус Ovodkov & Co не боится влаги и холода. Модульность позволяет собрать станцию любого размера.'
        } else if (product.slug === 'bork-g700' || product.slug === 'ovodkov-g700') {
            newTitle = 'Ovodkov G700'
            newSlug = 'ovodkov-g700'
            newDescription = 'Всепогодный гриль-стол из высокопрочного металла. В отличие от ДСП, мебель Ovodkov не разбухает и не деформируется.'
        } else if (product.slug === 'bork-w500' || product.slug === 'ovodkov-w500') {
            newTitle = 'Ovodkov W500'
            newSlug = 'ovodkov-w500'
            newDescription = 'Модульная система хранения. Собирайте модули как LEGO, комбинируйте их под размер вашей террасы.'
        } else if (product.slug === 'bork-k700' || product.slug === 'ovodkov-k700') {
            newTitle = 'Ovodkov K700'
            newSlug = 'ovodkov-k700'
            newDescription = 'Компактный кухонный блок для дачи. 100% металл: абсолютная защита от коррозии и мороза.'
        } else {
            // General replacement for any other products
            newTitle = (product.title || '').replace(/BORK/g, 'Ovodkov').replace(/Industrial/g, '')
            newSlug = (product.slug || '').replace(/bork/g, 'ovodkov')
            newDescription = (product.description || '').replace(/BORK/g, 'Ovodkov').replace(/Industrial/g, 'Premium')
        }

        await payload.update({
            collection: 'products',
            id: product.id,
            data: {
                title: newTitle,
                slug: newSlug,
                description: newDescription,
            }
        })
        console.log(`Updated and synced product: ${newTitle}`)
    }
}

rebrand()
