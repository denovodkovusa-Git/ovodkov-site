import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Мебель из металла для загородной жизни. Устойчивость к влаге, морозу и времени.',
  images: [
    {
      url: `${getServerSideURL()}/ovodkov-og.webp`,
    },
  ],
  siteName: 'Ovodkov & AI Lab',
  title: 'Ovodkov & AI Lab',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
