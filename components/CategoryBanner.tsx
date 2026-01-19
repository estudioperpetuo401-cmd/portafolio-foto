"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";

export interface CategoryItem {
    id: string;
    title: string;
    images: string[];
}

interface CategoryBannerProps {
    categories: CategoryItem[];
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({ categories }) => {
    const locale = useLocale();

    return (
        <div className="w-full pb-20">
            {/* CORRECCIÓN DE ESTILO:
               1. Quitamos 'max-w-7xl mx-auto px-6' para que las fotos toquen los bordes de la pantalla (Full Width).
               2. Usamos 'flex flex-col' para que sea una lista vertical (franjas), no una cuadrícula.
            */}
            <div className="flex flex-col w-full">
                {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} locale={locale} />
                ))}
            </div>
        </div>
    );
};

// =====================================================
// 🎬 TARJETA TIPO "FRANJA" (Banner Ancho)
// =====================================================
const CategoryCard = ({ category, locale }: { category: CategoryItem, locale: string }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Animación de cambio de foto (1 segundo)
    useEffect(() => {
        if (category.images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                (prevIndex + 1) % category.images.length
            );
        }, 1000); 

        return () => clearInterval(interval);
    }, [category.images.length]);

    return (
        // Altura ajustada: h-[250px] en móvil y h-[450px] en PC para que se vea panorámico
        <Link href={`/${locale}/portfolio/${category.id}`} className="relative block w-full h-[250px] md:h-[450px] overflow-hidden group">
            
            {/* Imágenes de fondo */}
            <div className="absolute inset-0 w-full h-full bg-gray-100">
                {category.images.map((src, index) => (
                    <div
                        key={src}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                            index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                    >
                        <Image
                            src={src}
                            alt={category.title}
                            fill
                            className="object-cover" // Esto asegura que la foto llene la franja sin deformarse
                            priority={true}
                        />
                    </div>
                ))}
            </div>

            {/* Capa oscura suave */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors z-20 duration-300" />

            {/* Texto Centrado */}
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                <h2 className="text-white text-3xl md:text-5xl font-light tracking-[0.4em] uppercase drop-shadow-lg text-center px-4">
                    {category.title}
                </h2>
            </div>
        </Link>
    );
};

export default CategoryBanner;