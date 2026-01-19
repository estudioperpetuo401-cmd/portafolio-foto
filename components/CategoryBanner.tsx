"use client";

import React from "react";
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
        <div className="w-full h-screen md:h-[85vh] flex flex-col md:flex-row bg-white">
            {categories.map((category) => (
                <CategoryCard key={category.id} category={category} locale={locale} />
            ))}
        </div>
    );
};

const CategoryCard = ({ category, locale }: { category: CategoryItem, locale: string }) => {
    // Usamos solo la primera foto
    const mainImage = category.images[0] || "/logo.png";
    const initial = category.title.charAt(0);

    return (
        // 'overflow-hidden' es clave aquí para que el zoom no se salga del cuadro
        <Link 
            href={`/${locale}/portfolio/${category.id}`} 
            className="relative flex-1 group overflow-hidden border-b md:border-b-0 md:border-r border-white last:border-0 min-h-[15vh] md:min-h-0"
        >
            <div className="absolute inset-0 w-full h-full bg-gray-200">
                <Image
                    src={mainImage}
                    alt={category.title}
                    fill
                    // AQUÍ ESTÁ EL CAMBIO:
                    // Agregamos 'scale-100' (inicio) y 'group-hover:scale-105' (zoom al pasar el mouse)
                    className="object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 20vw, 15vw"
                    priority={true}
                />
            </div>

            {/* Capa oscura que se intensifica */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />

            {/* Textos */}
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none p-2">
                <span className="text-white text-5xl md:text-7xl font-light opacity-100 transform group-hover:opacity-0 group-hover:scale-110 transition-all duration-500 ease-out absolute drop-shadow-lg">
                    {initial}
                </span>
                <span className="text-white text-xl md:text-2xl tracking-[0.3em] uppercase opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out text-center drop-shadow-md">
                    {category.title}
                </span>
            </div>
        </Link>
    );
};

export default CategoryBanner;