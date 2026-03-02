import PageTemplate, { generateMetadata } from './[slug]/page'
import { ProductsGrid } from '@/components/ProductsGrid'
import React from 'react'

export default async function Page(props: any) {
    return (
        <main className="flex flex-col bg-black min-h-screen">
            {/* Hero Section */}
            <div className="pt-48 pb-24 min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
                <h2 className="text-[11px] font-bold tracking-[0.8em] uppercase text-accent-vivid mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 bork-text-glow">
                    Established 2026
                </h2>
                <h1 className="text-8xl md:text-[12rem] font-black text-white tracking-tighter leading-[0.85] mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 uppercase">
                    Industrial <br /><span className="text-accent-vivid italic font-thin opacity-80 bork-text-glow">Division</span>
                </h1>
                <div className="w-px h-40 bg-gradient-to-b from-accent-vivid/40 to-transparent animate-in fade-in zoom-in duration-1000 delay-500" />
            </div>

            <ProductsGrid />

            {/* About Brand Section */}
            <section className="bg-black py-72 border-t border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-accent-vivid/5 blur-[150px] rounded-full translate-x-1/2" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-40 items-center">
                        <div className="flex-1">
                            <h2 className="text-[11px] font-bold tracking-[0.5em] uppercase text-accent-vivid/40 mb-12 bork-text-glow">
                                Промышленная эстетика BORK
                            </h2>
                            <p className="text-5xl md:text-6xl font-light text-white leading-[1.05] tracking-tighter mb-20 uppercase">
                                Немецкое качество, <span className="text-accent-vivid">сталь AISI 304</span> и модульность.
                            </p>
                            <button className="group relative px-16 py-6 border border-accent-vivid/30 text-accent-vivid text-[11px] font-bold tracking-[0.5em] uppercase overflow-hidden transition-all duration-700 hover:border-accent-vivid hover:shadow-[0_0_30px_rgba(255,102,0,0.4)]">
                                <span className="relative z-10 transition-colors duration-500 group-hover:text-black">Узнать больше</span>
                                <div className="absolute inset-0 bg-accent-vivid translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                            </button>
                        </div>
                        <div className="flex-1 w-full aspect-square bg-gradient-to-br from-[#111] to-black border border-white/10 flex items-center justify-center relative overflow-hidden group shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,102,0,0.03)_0%,_transparent_70%)]" />
                            <div className="text-[160px] font-black text-accent-vivid opacity-5 tracking-tighter select-none group-hover:scale-110 group-hover:opacity-10 transition-all duration-[4000ms] ease-out uppercase">
                                BORK
                            </div>
                            <div className="absolute bottom-16 right-16 text-[10px] text-white/10 tracking-[0.6em] uppercase font-bold">
                                EST. 2026
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export { generateMetadata }
