"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface CategoryItem {
    id: string;
    title: string;
    image: string;
}

interface CategoryBannerProps {
    categories?: CategoryItem[];
}

const CategoryBanner = ({ categories: dynamicCategories }: CategoryBannerProps) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const t = useTranslations("HomePage");
    const locale = useLocale();

    const manualCategories = [
        {
            id: "social",
            title: t("Categories.social"),
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1469",
        },
        {
            id: "fashion",
            title: t("Categories.fashion"),
            image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1470",
        },
        {
            id: "portrait",
            title: t("Categories.portrait"),
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1374",
        },
        {
            id: "product",
            title: t("Categories.product"),
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470",
        },
        {
            id: "advertising",
            title: t("Categories.advertising"),
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1470",
        },
        {
            id: "intimate",
            title: t("Categories.intimate"),
            image: "/intimate.jpg",
        },
    ];

    const categories = dynamicCategories || manualCategories;

    return (
        <div className="flex flex-col md:flex-row h-[calc(100vh-112px)] md:h-[calc(100vh-112px)] w-full overflow-hidden bg-white">
            {categories.map((category) => (
                <motion.div
                    key={category.id}
                    onMouseEnter={() => setHoveredId(category.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    animate={{
                        flex: hoveredId === category.id ? 2 : 1,
                    }}
                    transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 100,
                    }}
                    className="relative flex-1 h-full cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-white/10 last:border-0 group"
                >
                    <Link href={`/${locale}/portfolio/${category.id}`} className="block w-full h-full">
                        {/* Background Image: B&W to Color transition */}
                        <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-1000">
                            <Image
                                src={category.image}
                                alt={category.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-black/30" />
                        </div>

                        {/* Centered, vertical text with shadow for legibility */}
                        <div className="absolute inset-0 flex items-center justify-center p-4 z-10 text-center pointer-events-none">
                            <motion.h2
                                animate={{
                                    opacity: hoveredId === category.id ? 1 : 0.4,
                                    scale: hoveredId === category.id ? 1.05 : 0.9,
                                }}
                                className={cn(
                                    "text-white font-bold tracking-[0.1em] uppercase leading-none font-serif drop-shadow-md mix-blend-difference -rotate-90 transition-all duration-500",
                                    hoveredId === category.id
                                        ? "text-xl md:text-2xl lg:text-3xl whitespace-pre-line"
                                        : "text-3xl md:text-5xl lg:text-7xl whitespace-nowrap"
                                )}
                            >
                                {hoveredId === category.id
                                    ? category.title
                                    : category.title
                                        .split(/[\s\n]+/)
                                        .map(word => word[0])
                                        .join('')}
                            </motion.h2>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
};

export default CategoryBanner;
