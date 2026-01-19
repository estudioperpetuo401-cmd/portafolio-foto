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
        <div className="w-full h-screen md:h-[85vh] flex flex-col md:flex-row bg-white">
            {categories.map((category) => (
                <CategoryCard key={category.id} category={category} locale={locale} />
            ))}
        </div>
    );
};

// =====================================================
// 🎬 TARJETA VERTICAL (Columna)
// =====================================================
const CategoryCard = ({ category, locale }: { category: CategoryItem, locale: string }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Animación de cambio de foto (Slideshow de 1 segundo)
    useEffect(() => {
        if (category.images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                (prevIndex + 1) % category.images.length
            );
        }, 1000); 

        return () => clearInterval(interval);
    }, [category.images.length]);

    // Extraemos la inicial (Ej: "F" de "Fashion")
    const initial = category.title.charAt(0);

    return (
        <Link 
            href={`/${locale}/portfolio/${category.id}`} 
            className="relative flex-1 group overflow-hidden border-b md:border-b-0 md:border-r border-gray-100 last:border-0 min-h-[15vh] md:min-h-0"
        >
            {/* 1. SLIDESHOW DE FONDO */}
            <div className="absolute inset-0 w-full h-full bg-gray-200">
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
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 20vw, 15vw"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

            {/* 2. CAPA OSCURA (Se oscurece más al pasar el mouse) */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-500 z-20" />

            {/* 3. TEXTO (Efecto Inicial -> Nombre Completo) */}
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none p-2">
                
                {/* La Inicial (Visible por defecto, desaparece en hover) */}
                <span className="text-white text-5xl md:text-7xl font-light opacity-100 transform group-hover:opacity-0 group-hover:scale-110 transition-all duration-500 ease-out absolute">
                    {initial}
                </span>

                {/* El Nombre Completo (Invisible por defecto, aparece en hover) */}
                <span className="text-white text-xl md:text-2xl tracking-[0.3em] uppercase opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out text-center">
                    {category.title}
                </span>
            </div>
        </Link>
    );
};

export default CategoryBanner;