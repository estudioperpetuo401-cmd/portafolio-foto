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
    // Si no hay imagen, usa un fondo gris oscuro para que no se vea roto
    const mainImage = category.images[0] || "/logo.png";
    const initial = category.title.charAt(0);

    return (
        <Link 
            href={`/${locale}/portfolio/${category.id}`} 
            className="relative flex-1 group overflow-hidden border-b border-white md:border-b-0 md:border-r last:border-0 min-h-[14vh] md:min-h-0"
        >
            {/* FONDO IMAGEN */}
            <div className="absolute inset-0 w-full h-full bg-neutral-900">
                <Image
                    src={mainImage}
                    alt={category.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-in-out opacity-80 md:opacity-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 20vw, 15vw"
                    priority={true}
                />
            </div>

            {/* CAPA OSCURA (Más oscura en móvil para que se lean las letras) */}
            <div className="absolute inset-0 bg-black/40 md:bg-black/20 md:group-hover:bg-black/40 transition-colors duration-500 z-10" />

            {/* CONTENEDOR DE TEXTO */}
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none p-2 text-center">
                
                {/* 1. LA INICIAL GIGANTE (Solo visible en PC "md:block", oculta en móvil "hidden") */}
                <span className="hidden md:block text-white text-7xl font-light opacity-100 transform group-hover:opacity-0 group-hover:scale-110 transition-all duration-500 ease-out absolute drop-shadow-lg">
                    {initial}
                </span>

                {/* 2. EL NOMBRE COMPLETO (Visible SIEMPRE en móvil, con animación solo en PC) */}
                <span className="
                    w-full px-2 text-white font-medium uppercase tracking-[0.15em] drop-shadow-md leading-tight break-words
                    text-2xl md:text-xl      
                    opacity-100 md:opacity-0 
                    translate-y-0 md:translate-y-4
                    md:group-hover:opacity-100 md:group-hover:translate-y-0
                    transition-all duration-500 ease-out
                ">
                    {category.title}
                </span>
            </div>
        </Link>
    );
};

export default CategoryBanner;