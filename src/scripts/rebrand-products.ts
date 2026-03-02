import { getPayload } from 'payload'
import configPromise from '../payload.config'
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

        if (product.slug === 'bork-p500') {
            newTitle = 'Ovodkov P500'
            newSlug = 'ovodkov-p500'
            newDescription = 'Уличный кухонный модуль. Стальной корпус, который не боится влаги и холода. Модульность позволяет собрать станцию любого размера.'
        } else if (product.slug === 'bork-g700') {
            newTitle = 'Ovodkov G700'
            newSlug = 'ovodkov-g700'
            newDescription = 'Всепогодный гриль-стол из высокопрочного металла. Идеальное решение для террасы. В отличие от ДСП, мебель Ovodkov не разбухает со временем.'
        } else if (product.slug === 'bork-w500') {
            newTitle = 'Ovodkov W500'
            newSlug = 'ovodkov-w500'
            newDescription = 'Модульная система хранения для загородного быта. Собирайте модули как LEGO, комбинируйте и меняйте фасады под настроение.'
        } else if (product.slug === 'bork-k700') {
            newTitle = 'Ovodkov K700'
            newSlug = 'ovodkov-k700'
            newDescription = 'Компактный кухонный блок для дачи. Устойчивость к морозу и простота в уходе. 100% металл.'
        } else {
            // General replacement for any other products
            newTitle = (product.title || '').replace(/BORK/g, 'Ovodkov').replace(/Industrial/g, '')
            newSlug = (product.slug || '').replace(/bork/g, 'ovodkov')
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
        console.log(`Updated product: ${newTitle}`)
    }
}

rebrand()
