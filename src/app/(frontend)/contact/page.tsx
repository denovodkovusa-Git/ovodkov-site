import React from 'react'

export default function ContactPage() {
    return (
        <main className="bg-black min-h-screen text-white pt-32 selection:bg-accent-vivid selection:text-white">
            <div className="container mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
                    <div>
                        <header className="mb-24">
                            <div className="w-20 h-px bg-accent-vivid mb-12" />
                            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-12">
                                Professional <br /><span className="text-accent-vivid italic font-thin opacity-80 bork-text-glow">Support</span>
                            </h1>
                            <p className="text-xl text-white/40 font-light leading-relaxed max-w-md uppercase tracking-widest">
                                Наши эксперты готовы помочь вам с проектированием и подбором оборудования.
                            </p>
                        </header>

                        <div className="space-y-12">
                            <div>
                                <h3 className="text-[10px] font-bold tracking-[0.5em] uppercase text-white/20 mb-4">Direct Line</h3>
                                <p className="text-3xl font-light tracking-tighter text-white hover:text-accent-vivid transition-colors cursor-pointer">8 800 500 8899</p>
                            </div>
                            <div>
                                <h3 className="text-[10px] font-bold tracking-[0.5em] uppercase text-white/20 mb-4">Email</h3>
                                <p className="text-3xl font-light tracking-tighter text-white hover:text-accent-vivid transition-colors cursor-pointer">industrial@bork.ru</p>
                            </div>
                            <div>
                                <h3 className="text-[10px] font-bold tracking-[0.5em] uppercase text-white/20 mb-4">Boutique</h3>
                                <p className="text-xl font-light text-white/60 leading-relaxed uppercase tracking-wider">
                                    Москва, <br /> Большая Садовая, 3к1
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#050505] border border-white/5 p-12 md:p-16 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-vivid/5 blur-3xl rounded-full" />
                        <h2 className="text-2xl font-bold uppercase tracking-widest mb-12">Оставить заявку</h2>
                        <form className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">Имя</label>
                                <input type="text" className="w-full bg-black border-b border-white/10 py-4 text-white focus:outline-none focus:border-accent-vivid transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">Телефон</label>
                                <input type="tel" className="w-full bg-black border-b border-white/10 py-4 text-white focus:outline-none focus:border-accent-vivid transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">Сообщение</label>
                                <textarea rows={4} className="w-full bg-black border border-white/10 p-4 text-white focus:outline-none focus:border-accent-vivid transition-colors resize-none" />
                            </div>
                            <button className="w-full bg-accent-vivid text-white py-6 text-xs font-bold uppercase tracking-[0.5em] bork-glow hover:bg-orange-500 transition-all active:scale-95">
                                Отправить запрос
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
