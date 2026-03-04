import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ProductCard } from '../ProductCard'
import Link from 'next/link'
import type { Category, Product } from '@/payload-types'

export const ProductsGrid: React.FC = async () => {
    let products: { docs: Product[] } = { docs: [] }
    let categories: { docs: Category[] } = { docs: [] }

    try {
        const payload = await getPayload({ config: configPromise })

        // Fetch products
        products = await payload.find({
            collection: 'products',
            limit: 100,
            sort: '-createdAt',
            depth: 1,
            draft: false,
            overrideAccess: true,
        })

        // Fetch categories to use as groupings
        categories = await payload.find({
            collection: 'categories',
            limit: 50,
            sort: 'title',
            overrideAccess: true,
        })
    } catch (error) {
        console.error('Error in ProductsGrid (fetch):', error)
    }

    return (
        <section className="bg-black pt-48 pb-24 relative z-10">
            <div className="container mx-auto px-6">
                <header className="flex flex-col mb-16 max-w-4xl">
                    <div className="w-12 h-px bg-accent-vivid/40 mb-6" />
                    <h2 className="text-[10px] font-bold tracking-[0.6em] uppercase text-accent-vivid/60 mb-4 brand-text-glow">
                        Коллекция — 2026
                    </h2>
                    <h1 className="text-4xl md:text-6xl font-light text-white tracking-tighter leading-tight uppercase">
                        Решения для загородной <br /><span className="text-white/20 italic font-thin">жизни</span>
                    </h1>
                </header>

                {products.docs.length > 0 && categories.docs.length > 0 ? (
                    <div className="flex flex-col gap-24">
                        {categories.docs.map((category) => {
                            // Filter products that belong to this category
                            const categoryProducts = products.docs.filter((product) => {
                                if (!product.category) return false;
                                return product.category.some(cat =>
                                    (typeof cat === 'object' ? cat.id : cat) === category.id
                                );
                            });

                            if (categoryProducts.length === 0) return null; // Don't show empty categories

                            // Limit to 4 products maximum
                            const displayProducts = categoryProducts.slice(0, 4);

                            return (
                                <div key={category.id} className="flex flex-col">
                                    <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-8 border-b border-white/10 pb-4">
                                        {category.title}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {displayProducts.map((product) => (
                                            <Link key={product.id} href={`/products/${product.slug}`}>
                                                <ProductCard product={product} />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="text-center py-48 bg-[#050505] border border-white/5 rounded-none">
                        <p className="text-white/20 font-light tracking-[0.4em] uppercase text-[10px]">
                            Обновление ассортимента
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}
