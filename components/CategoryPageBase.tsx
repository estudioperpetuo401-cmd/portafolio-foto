import React from "react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Photo } from "@/data/portfolio";
import FullWidthMasonryGallery from "@/components/FullWidthMasonryGallery";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import fs from "fs";
import path from "path";
import { shuffleArray } from "@/lib/shuffle";
import { getImageSize } from "@/lib/image-size";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CategoryPageBaseProps {
    category: string;
    locale: string;
}

export default async function CategoryPageBase({ category, locale }: CategoryPageBaseProps) {
    const t = await getTranslations("Categories");

    // Global category order
    const categories = ["social", "fashion", "portrait", "move", "product", "advertising", "intimate"];

    // File system scanning
    const directory = path.join(process.cwd(), "public", "uploads", category);

    let photos: Photo[] = [];
    let errorMsg = "";

    try {
        if (fs.existsSync(directory)) {
            const files = fs.readdirSync(directory);
            const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

            const imageFiles = files.filter((file: string) =>
                imageExtensions.includes(path.extname(file).toLowerCase())
            );

            if (imageFiles.length === 0) {
                errorMsg = "Próximamente";
            } else {
                const shuffledFiles = shuffleArray(imageFiles);
                photos = shuffledFiles.map((file: string, index: number) => {
                    const filePath = path.join(directory, file);
                    const dimensions = getImageSize(filePath);

                    const nameWithoutExt = path.parse(file).name;
                    const cleanName = nameWithoutExt
                        .replace(/[_-]/g, " ")
                        .trim();

                    const formattedTitle = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

                    return {
                        id: index,
                        url: `/uploads/${category}/${file}`,
                        alt: formattedTitle,
                        width: dimensions?.width || 1000,
                        height: dimensions?.height || 1500,
                        title: formattedTitle,
                        year: ""
                    };
                });
            }
        } else {
            errorMsg = "Próximamente";
        }
    } catch (err) {
        console.error(`Error reading directory for ${category}:`, err);
        errorMsg = "Próximamente";
    }

    return (
        <div className="min-h-screen bg-white text-black pt-36">
            {/* Sub-navigation */}
            <div className="border-b border-gray-100 pb-8 overflow-x-auto scrollbar-hide">
                <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-center space-x-8 md:space-x-12">
                    {categories.map((cat) => (
                        <Link key={cat} href={`/${locale}/portfolio/${cat}`}>
                            <span className={cn(
                                "text-[10px] uppercase tracking-[0.3em] transition-all cursor-pointer",
                                category === cat
                                    ? "font-bold border-b border-black pb-1"
                                    : "text-gray-400 hover:text-black"
                            )}>
                                {t(cat).replace(/\n/g, " ")}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="w-full">
                {/* Grid or Error Message */}
                {errorMsg ? (
                    <div className="px-6 md:px-12 py-20 text-center">
                        <p className="text-gray-400 uppercase tracking-widest text-sm font-light italic">
                            — {errorMsg} —
                        </p>
                    </div>
                ) : (
                    <FullWidthMasonryGallery photos={photos} />
                )}
            </div>
        </div>
    );
}
