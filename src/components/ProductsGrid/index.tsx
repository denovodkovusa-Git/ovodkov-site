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
        <section className="bg-black py-48">
            <div className="container mx-auto px-6">
                <header className="flex flex-col mb-32 max-w-4xl">
                    <div className="w-16 h-px bg-accent-vivid/40 mb-10" />
                    <h2 className="text-[12px] font-bold tracking-[0.6em] uppercase text-accent-vivid/60 mb-8 brand-text-glow">
                        Collection — 2026
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-light text-white tracking-tighter leading-tight mb-10 uppercase">
                        Garden Kitchen <br /><span className="text-white/20 italic font-thin">Solutions</span>
                    </h1>
                    <p className="text-lg text-white/30 font-light leading-relaxed tracking-wider max-w-2xl">
                        Безупречное сочетание премиальной эстетики и металлической надежности. <span className="text-white/60">В отличие от ДСП, наша мебель не боится влаги и служит десятилетиями.</span>
                    </p>
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
