import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  let posts: { docs: any[]; page?: number; totalDocs?: number; totalPages?: number } = { docs: [] }

  try {
    const payload = await getPayload({ config: configPromise })
    posts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: 12,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
        categories: true,
        meta: true,
      },
    })
  } catch (error) {
    console.error('Error in Posts Page (fetch):', error)
  }

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page || 1}
          limit={12}
          totalDocs={posts.totalDocs || 0}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages && posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Posts — Ovodkov & Co`,
  }
}
