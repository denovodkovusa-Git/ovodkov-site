import React from 'react'

export default function AboutPage() {
    return (
        <main className="bg-black min-h-screen text-white pt-32 selection:bg-accent-vivid selection:text-white">
            <div className="container mx-auto px-6 py-24">
                <header className="max-w-5xl mb-48">
                    <div className="w-20 h-px bg-accent-vivid mb-12" />
                    <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-16">
                        Precision <br />& <span className="text-accent-vivid opacity-80 bork-text-glow font-thin italic">Durability</span>
                    </h1>
                    <p className="text-2xl text-white/40 font-light leading-snug max-w-3xl uppercase tracking-widest">
                        BORK Industrial Division — это манифест функционального превосходства.
                        Мы объединили немецкие инженерные стандарты с бескомпромиссным индустриальным дизайном.
                    </p>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/5 border border-white/5 mb-48">
                    {[
                        { title: 'Сталь AISI 304', desc: 'Пищевая нержавеющая сталь высшего качества. Устойчивость к коррозии и вечность в использовании.' },
                        { title: 'Модульность', desc: 'Система, которая растет вместе с вашими потребностями. Идеальная стыковка каждого элемента.' },
                        { title: 'Немецкий стандарт', desc: 'Разработано в Германии. Контроль качества на каждом этапе производства — от литья до финальной полировки.' }
                    ].map((item, i) => (
                        <div key={i} className="bg-black p-16 hover:bg-white/[0.02] transition-colors group">
                            <h3 className="text-xs font-bold tracking-[0.4em] uppercase text-accent-vivid mb-8 bork-text-glow">
                                {item.title}
                            </h3>
                            <p className="text-white/30 font-light leading-relaxed group-hover:text-white/50 transition-colors">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </section>

                <section className="relative py-48 overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-vivid/5 blur-[120px] rounded-full translate-x-1/2" />
                    <div className="max-w-4xl">
                        <h2 className="text-4xl font-bold uppercase tracking-tighter mb-12 italic text-white/90">
                            "Мы создаем вещи, которые передаются по наследству. Это не просто техника — это часть архитектуры вашего дома."
                        </h2>
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-px bg-white/20" />
                            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-white/40">Philosophy of BORK</span>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}
