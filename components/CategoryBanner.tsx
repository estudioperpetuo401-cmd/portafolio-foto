"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";

export interface CategoryItem {
    id: string;
    title: string;
    images: string[]; // Recibimos la lista, pero solo usaremos la primera foto
}

interface CategoryBannerProps {
    categories: CategoryItem[];
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({ categories }) => {
    const locale = useLocale();

    return (
        // Layout: Columna en Móvil, Fila en PC (Diseño Vertical elegante)
        <div className="w-full h-screen md:h-[85vh] flex flex-col md:flex-row bg-white">
            {categories.map((category) => (
                <CategoryCard key={category.id} category={category} locale={locale} />
            ))}
        </div>
    );
};

// =====================================================
// 📷 TARJETA CLÁSICA (Estática B&W -> Color)
// =====================================================
const CategoryCard = ({ category, locale }: { category: CategoryItem, locale: string }) => {
    
    // Tomamos solo la primera imagen de la lista para que sea estática
    const mainImage = category.images[0] || "/logo.png";
    
    // Extraemos la inicial
    const initial = category.title.charAt(0);

    return (
        <Link 
            href={`/${locale}/portfolio/${category.id}`} 
            className="relative flex-1 group overflow-hidden border-b md:border-b-0 md:border-r border-white last:border-0 min-h-[15vh] md:min-h-0"
        >
            {/* IMAGEN DE FONDO */}
            <div className="absolute inset-0 w-full h-full bg-gray-200">
                <Image
                    src={mainImage}
                    alt={category.title}
                    fill
                    // AQUÍ ESTÁ LA MAGIA: grayscale (B&W) -> grayscale-0 (Color)
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 20vw, 15vw"
                    priority={true}
                />
            </div>

            {/* CAPA OSCURA SUAVE (Para que la letra blanca resalte) */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />

            {/* TEXTO (Efecto Inicial -> Nombre Completo) */}
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none p-2">
                
                {/* La Inicial (Visible por defecto, desaparece en hover) */}
                <span className="text-white text-5xl md:text-7xl font-light opacity-100 transform group-hover:opacity-0 group-hover:scale-110 transition-all duration-500 ease-out absolute drop-shadow-lg">
                    {initial}
                </span>

                {/* El Nombre Completo (Invisible por defecto, aparece en hover) */}
                <span className="text-white text-xl md:text-2xl tracking-[0.3em] uppercase opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out text-center drop-shadow-md">
                    {category.title}
                </span>
            </div>
        </Link>
    );
};