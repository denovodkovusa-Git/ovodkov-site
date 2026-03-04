import React from 'react'
import { Media } from '@/components/Media'
import type { Product } from '@/payload-types'

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { title, description, price, photo } = product

    return (
        <div className="group flex flex-col h-full bg-[#0a0a0a] border border-white/5 rounded-none overflow-hidden transition-all duration-700 hover:border-accent-vivid/30 hover:bg-[#0f0f0f] shadow-2xl hover:shadow-[0_0_50px_rgba(255,102,0,0.1)]">
            <div className="relative aspect-square overflow-hidden bg-zinc-900">
                {photo && typeof photo !== 'number' && (
                    <Media
                        resource={photo}
                        fill
                        className="object-cover w-full h-full opacity-70 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
                    />
                )}
                {/* Matte Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-700" />
            </div>

            <div className="flex flex-col flex-grow p-10">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-[1px] bg-accent-vivid/50" />
                        <h3 className="text-[9px] font-bold tracking-[0.5em] uppercase text-accent-vivid/80 brand-text-glow">
                            Модульная металлическая система
                        </h3>
                    </div>
                    <h2 className="text-2xl font-light text-white leading-tight tracking-[0.1em] uppercase group-hover:text-white transition-colors">
                        {title}
                    </h2>
                </div>

                {description && (
                    <p className="text-white/30 text-[11px] leading-relaxed mb-10 flex-grow font-light line-clamp-3 tracking-wider">
                        {description}
                    </p>
                )}

                <div className="mt-auto pt-8 border-t border-white/5">
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                            <span className="text-[8px] text-white/20 tracking-[0.4em] uppercase mb-2">Наследие</span>
                            <span className="text-2xl font-bold tracking-tighter text-accent-vivid brand-text-glow">
                                {price.toLocaleString('ru-RU')} ₽
                            </span>
                        </div>

                        <button className="group/btn relative px-6 py-3 border border-accent-vivid/20 text-accent-vivid text-[9px] font-bold tracking-[0.4em] uppercase overflow-hidden transition-all duration-500 hover:border-accent-vivid hover:shadow-[0_0_20px_rgba(255,102,0,0.3)]">
                            <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-black">Собрать свою коллекцию</span>
                            <div className="absolute inset-0 bg-accent-vivid translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
