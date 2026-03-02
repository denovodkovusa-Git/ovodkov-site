import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', 'price'],
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Название',
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Описание',
        },
        {
            name: 'price',
            type: 'number',
            required: true,
            label: 'Цена',
        },
        {
            name: 'photo',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: 'Фото',
        },
        slugField(),
    ],
}
