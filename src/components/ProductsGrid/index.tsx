import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ProductCard } from '../ProductCard'
import Link from 'next/link'

export const ProductsGrid: React.FC = async () => {
    let products: { docs: any[] } = { docs: [] }

    try {
        const payload = await getPayload({ config: configPromise })
        products = await payload.find({
            collection: 'products',
            limit: 100,
            sort: '-createdAt',
        })
    } catch (error) {
        console.error('Error in ProductsGrid (fetch):', error)
    }

    return (
        <section className="bg-black pt-32 pb-24">
            <div className="container mx-auto px-6">
                <header className="flex flex-col mb-12 max-w-4xl">
                    <div className="w-12 h-px bg-accent-vivid/40 mb-6" />
                    <h2 className="text-[10px] font-bold tracking-[0.6em] uppercase text-accent-vivid/60 mb-4 brand-text-glow">
                        Collection — 2026
                    </h2>
                    <h1 className="text-4xl md:text-6xl font-light text-white tracking-tighter leading-tight uppercase">
                        Garden Kitchen <br /><span className="text-white/20 italic font-thin">Solutions</span>
                    </h1>
                </header>

                {products.docs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {products.docs.map((product) => (
                            <Link key={product.id} href={`/products/${product.slug}`}>
                                <ProductCard product={product} />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-48 bg-[#050505] border border-white/5 rounded-none">
                        <p className="text-white/20 font-light tracking-[0.4em] uppercase text-[10px]">
                            Inventory In Transition
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}
