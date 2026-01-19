"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";

export interface CategoryItem {
    id: string;
    title: string;
    images: string[]; // Recibimos un array de fotos
}

interface CategoryBannerProps {
    categories: CategoryItem[];
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({ categories }) => {
    const locale = useLocale();

    return (
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pb-20">
            {/* Grid Layout: 1 columna en móvil, 2 o 3 en PC dependiendo del tamaño */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-4">
                {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} locale={locale} />
                ))}
            </div>
        </div>
    );
};

// =====================================================
// 🎬 TARJETA ANIMADA (El componente mágico)
// =====================================================
const CategoryCard = ({ category, locale }: { category: CategoryItem, locale: string }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Este efecto cambia la foto cada 1 segundo (1000ms)
    useEffect(() => {
        if (category.images.length <= 1) return; // Si solo hay 1 foto, no hacemos nada

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                (prevIndex + 1) % category.images.length
            );
        }, 1000); // <--- AQUÍ CAMBIAS LA VELOCIDAD (1000 = 1 seg)

        return () => clearInterval(interval);
    }, [category.images.length]);

    return (
        <Link href={`/${locale}/portfolio/${category.id}`} className="block group relative overflow-hidden h-[300px] md:h-[400px]">
            {/* Renderizamos las imágenes */}
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
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                ))}
            </div>

            {/* Capa oscura al pasar el mouse */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-20 duration-300" />

            {/* Título centrado */}
            <div className="absolute inset-0 flex items-center justify-center z-30">
                <h2 className="text-white text-2xl md:text-3xl font-light tracking-[0.3em] uppercase drop-shadow-md text-center px-4">
                    {category.title}
                </h2>
            </div>
        </Link>
    );
};

export default CategoryBanner;