import React from 'react'
import Image from 'next/image'

export default function CollectionPage() {
    const series = [
        {
            title: 'Professional Series',
            description: 'Инструменты для тех, кто превращает кулинарию в искусство. Бескомпромиссное качество и точность.',
            image: '/media/professional-series.png', // Placeholder or real image
            accent: 'bg-accent-vivid'
        },
        {
            title: 'Outdoor Series',
            description: 'Кулинарные станции для открытых пространств. Устойчивость к стихиям и совершенство форм.',
            image: '/media/outdoor-series.png',
            accent: 'bg-accent-vivid'
        },
        {
            title: 'Climate Series',
            description: 'Идеальные условия для хранения и созревания. Технологии контроля микроклимата.',
            image: '/media/climate-series.png',
            accent: 'bg-accent-vivid'
        }
    ]

    return (
        <main className="bg-black min-h-screen text-white pt-32 selection:bg-accent-vivid selection:text-white">
            <div className="container mx-auto px-6 py-24">
                <header className="max-w-4xl mb-32">
                    <div className="w-20 h-px bg-accent-vivid mb-12" />
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-12">
                        Industrial <br /><span className="text-accent-vivid italic font-thin opacity-80 bork-text-glow">Collection</span>
                    </h1>
                    <p className="text-xl text-white/40 font-light leading-relaxed max-w-2xl uppercase tracking-widest">
                        Кураторская подборка профессиональных решений для вашего дома и загородного пространства.
                        Немецкая инженерия в каждой детали.
                    </p>
                </header>

                <div className="space-y-48">
                    {series.map((item, i) => (
                        <section key={i} className="group relative">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                                    <div className="mb-12">
                                        <div className={`w-12 h-1 ${item.accent} mb-8 bork-glow`} />
                                        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8 group-hover:text-accent-vivid transition-colors duration-700">
                                            {item.title}
                                        </h2>
                                        <p className="text-lg text-white/40 font-light leading-relaxed mb-12 max-w-lg">
                                            {item.description}
                                        </p>
                                        <button className="px-12 py-5 border border-white/10 text-[10px] font-bold tracking-[0.4em] uppercase hover:border-accent-vivid hover:text-accent-vivid transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,102,0,0.2)]">
                                            Смотреть серию
                                        </button>
                                    </div>
                                </div>
                                <div className="relative aspect-video lg:aspect-square bg-white/[0.02] border border-white/5 overflow-hidden">
                                    {/* Visual representation of industrial aesthetic */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-accent-vivid/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-[10vw] font-black text-white/5 uppercase select-none tracking-tighter">
                                            BORK
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </main>
    )
}
