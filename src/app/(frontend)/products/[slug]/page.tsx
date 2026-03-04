import React from 'react'
import { Media } from '@/components/Media'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'

export const revalidate = 60

export async function generateStaticParams() {
    try {
        const payload = await getPayload({ config })
        const products = await payload.find({
            collection: 'products',
            draft: false,
            limit: 1000,
            pagination: false,
            select: {
                slug: true,
            },
        })

        return products.docs.map(({ slug }) => ({ slug }))
    } catch (error) {
        console.error('Error in generateStaticParams (products):', error)
        return []
    }
}

export default async function ProductPage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
    const { slug } = await paramsPromise
    const payload = await getPayload({ config })

    let product = null
    let prevProduct = null
    let nextProduct = null

    try {
        const { docs: products } = await payload.find({
            collection: 'products',
            depth: 2,
            draft: false,
            overrideAccess: true,
            where: {
                slug: {
                    equals: slug,
                },
            },
        })

        // Fetch all product slugs to determine next/prev
        const allProductsData = await payload.find({
            collection: 'products',
            draft: false,
            overrideAccess: true,
            limit: 1000,
            select: {
                slug: true,
                title: true,
            },
            sort: '-createdAt'
        })

        if (!products.length) {
            notFound()
        }

        product = products[0]

        // Find Next / Prev logic
        const currentIndex = allProductsData.docs.findIndex(p => p.slug === slug)

        let prevProductTemp = null;
        let nextProductTemp = null;

        if (currentIndex > 0) prevProductTemp = allProductsData.docs[currentIndex - 1]
        if (currentIndex < allProductsData.docs.length - 1) nextProductTemp = allProductsData.docs[currentIndex + 1]

        prevProduct = prevProductTemp;
        nextProduct = nextProductTemp;

    } catch (error) {
        console.error('Error fetching product:', error)
        notFound()
    }

    return (
        <div data-theme="dark" className="bg-background text-foreground min-h-screen font-sans selection:bg-accent-vivid selection:text-white">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center overflow-hidden border-b border-white/5">
                <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                        <div className="inline-flex items-center px-3 py-1 border border-accent-vivid/30 bg-accent-vivid/10 rounded-full text-[10px] tracking-[0.2em] uppercase text-accent-vivid font-bold">
                            Modular Metal System
                        </div>
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-none">
                            {product.title}
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                            {product.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pt-4">
                            <span className="text-4xl font-bold text-accent-vivid brand-text-glow">
                                {product.price.toLocaleString('ru-RU')} ₽
                            </span>
                            <button className="bg-accent-vivid text-white px-10 py-5 text-sm font-bold uppercase tracking-[0.2em] brand-glow hover:bg-orange-500 transition-all active:scale-95">
                                Собрать свою коллекцию
                            </button>
                        </div>
                    </div>
                    <div className="relative h-[60vh] lg:h-full w-full bg-zinc-900 animate-in fade-in duration-700 ease-in-out delay-300">
                        {typeof product.photo === 'object' && product.photo !== null && (
                            <Media
                                resource={product.photo}
                                fill
                                className="object-cover w-full h-full drop-shadow-[0_0_50px_rgba(255,102,0,0.15)]"
                                priority
                            />
                        )}
                    </div>
                </div>
                {/* Background Decorative Elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent-vivid/5 to-transparent pointer-events-none" />
            </section>

            {/* Features Grid */}
            <section className="py-24 border-b border-white/5">
                <div className="container">
                    <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-muted-foreground mb-16 text-center">
                        Преимущества коллекции
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/5 border border-white/5 overflow-hidden">
                        {[
                            { title: '450°C Max Temperature', desc: 'Профессиональный жар для идеальной прожарки.', icon: '🔥' },
                            { title: '15 Min Pre-heat', desc: 'Минимальное время ожидания перед началом работы.', icon: '⏱️' },
                            { title: 'Natural Lava Stone', desc: 'Равномерное распределение тепла и хрустящая корочка.', icon: '🧱' },
                        ].map((feature, i) => (
                            <div key={i} className="bg-background p-12 hover:bg-white/[0.02] transition-colors group">
                                <span className="text-3xl mb-6 block grayscale group-hover:grayscale-0 transition-all">{feature.icon}</span>
                                <h3 className="text-lg font-bold uppercase tracking-wider mb-4 text-accent-vivid">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Specs */}
            <section className="py-24 bg-white/[0.01]">
                <div className="container max-w-4xl">
                    <div className="p-16 border border-white/10 relative overflow-hidden">
                        {/* Brushed Metal Texture Effect - Localized version or removed to avoid CSP issues */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-zinc-800" />

                        <h2 className="text-3xl font-bold uppercase tracking-tighter mb-12 relative z-10">Технические характеристики</h2>
                        <div className="space-y-6 relative z-10">
                            {[
                                ['Материал корпуса', 'Нержавеющая сталь AISI 304'],
                                ['Мощность', '2200 Вт'],
                                ['Тип управления', 'Сенсорный'],
                                ['Габариты (ШхВхГ)', '500 x 350 x 480 мм'],
                                ['Вес', '18.5 кг'],
                            ].map(([key, value], i) => (
                                <div key={i} className="flex justify-between items-end border-b border-white/5 pb-2">
                                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{key}</span>
                                    <span className="text-sm font-medium">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Navigation */}
            <section className="py-12 border-t border-white/5">
                <div className="container">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                        {prevProduct ? (
                            <Link href={`/products/${prevProduct.slug}`} className="group flex items-center gap-4 text-white/50 hover:text-accent-vivid transition-all duration-300">
                                <span className="text-2xl font-light transform group-hover:-translate-x-2 transition-transform">←</span>
                                <div className="flex flex-col text-left">
                                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-50">Предыдущий</span>
                                    <span className="text-sm uppercase tracking-widest font-bold">{prevProduct.title}</span>
                                </div>
                            </Link>
                        ) : <div />}

                        <Link href="/" className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40 hover:text-white transition-colors">
                            В каталог
                        </Link>

                        {nextProduct ? (
                            <Link href={`/products/${nextProduct.slug}`} className="group flex items-center gap-4 text-white/50 hover:text-accent-vivid transition-all duration-300 text-right">
                                <div className="flex flex-col text-right">
                                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-50">Следующий</span>
                                    <span className="text-sm uppercase tracking-widest font-bold">{nextProduct.title}</span>
                                </div>
                                <span className="text-2xl font-light transform group-hover:translate-x-2 transition-transform">→</span>
                            </Link>
                        ) : <div />}
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-32 bg-accent-vivid border-t border-black/10 text-center">
                <div className="container">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase text-white mb-12">
                        Создайте свою <br /> идеальную кухню
                    </h2>
                    <button className="bg-black text-white px-12 py-6 text-sm font-bold uppercase tracking-[0.3em] hover:bg-zinc-900 transition-all active:scale-95">
                        Заказать проект
                    </button>
                </div>
            </section>
        </div>
    )
}
