import React from "react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Photo } from "@/data/portfolio";
import FullWidthMasonryGallery from "@/components/FullWidthMasonryGallery";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import path from "path";
import { shuffleArray } from "@/lib/shuffle";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CategoryPageBaseProps {
    category: string;
    locale: string;
}

// =====================================================================
// 📝 MANIFIESTO DE FOTOS 2026 (Todo .jpg)
// Actualizado según tus carpetas
// =====================================================================
const PHOTO_MANIFEST: Record<string, string[]> = {
    social: [
        "_15S0192.jpg", "_15S0195.jpg", "_15S0275.jpg",
        "_ATH0001.jpg", "_ATH0010.jpg", "_ATH0019.jpg", "_ATH0034.jpg",
        "_ATH0178.jpg", "_ATH0271.jpg", "_ATH0343.jpg", "_ATH0344.jpg", "_ATH0345.jpg", "_ATH0429.jpg",
        "_DAN1000.jpg", "_DAN1004.jpg", "_DAN1268.jpg", "_DAN1365.jpg", "_DAN1427.jpg", "_DAN1487.jpg", "_DAN1668.jpg", "_DAN1710.jpg", "_DAN1773.jpg",
        "_DUL4056.jpg", "_DUL4369.jpg", "_DUL4373.jpg",
        "_ESS0004.jpg", "_ESS0006.jpg", "_ESS0009.jpg", "_ESS0096.jpg", "_ESS0099.jpg", "_ESS0244.jpg", "_ESS0289.jpg", "_ESS0370.jpg", "_ESS00992.jpg",
        "_JDM9593.jpg",
        "_MG_0052.jpg", "_MG_0097.jpg", "_MG_0181.jpg", "_MG_9445.jpg", "_MG_9703.jpg", "_MG_9724.jpg"
    ],
    fashion: [
        "_ATH0073_2.jpg", "_ATH0191.jpg", "_ATH0240.jpg", "_ATH0251.jpg", "_ATH1133.jpg", "_ATH1378.jpg",
        "_DAN9621BW.jpg",
        "_DSC4571.jpg", "_DSC4950.jpg", "_DSC4958.jpg", "_DSC5074.jpg", "_DSC5116.jpg",
        "_ESS0018.jpg",
        "_FAM1711.jpg", "_FAM2437.jpg", "_FAM2447.jpg",
        "_ML20211.jpg", "_ML20809.jpg",
        "_SPI0844.jpg"
    ],
    portrait: [
        "_ATH00.jpg", "_ATH0036.jpg", "_ATH0065.jpg", "_ATH0132.jpg", "_ATH0293.jpg", "_ATH0333.jpg",
        "_BMA0112.jpg",
        "_CAT1162.jpg", "_CAT4390.jpg", "_CAT6625.jpg",
        "_DSC0185.jpg", "_DSC1010.jpg", "_DSC6674.jpg", "_DSC6840.jpg", "_DSC6889.jpg",
        "_ESS0036.jpg", "_ESS0145BW.jpg", "_ESS0178.jpg", "_ESS0400.jpg",
        "_ICO4979.jpg", "_ICO5002BW.jpg", "_ICO5210.jpg", "_ICO5244.jpg",
        "_ML12896.jpg", "_MPA0064.jpg", "_VAL0140.jpg"
    ],
    move: [
        "_BMA0058.jpg",
        "_COP0294.jpg", "_COP0296.jpg", "_COP0694.jpg", "_COP1147.jpg",
        "_DSC0635.jpg", "_DSC0649.jpg", "_DSC3318.jpg", "_DSC3600.jpg", "_DSC3684.jpg", "_DSC3799.jpg", "_DSC4621.jpg", "_DSC5112.jpg", "_DSC5218BW.jpg", "_DSC5277.jpg", "_DSC5413.jpg", "_DSC5442.jpg", "_DSC5493.jpg", "_DSC5494.jpg", "_DSC6985.jpg", 
        "_DUL1027.jpg", "_DUL1059.jpg", "_DUL10871920x1280.jpg",
        "_ESS0426.jpg",
        "_TRI2294.jpg", "_TRI2295.jpg",
        "0546.jpg", "Yuli03267.jpg"
    ],
    product: [
        "_ATH0011.jpg", "_ATH0022.jpg", "_ATH0264.jpg", "_ATH0279.jpg", "_ATH0280.jpg", "_ATH0289.jpg", "_ATH0470.jpg", "_ATH0747 IA.jpg", "_ATH0885 IA.jpg", "_ATH1017 IA.jpg", "_ATH1148 IA2.jpg",
        "_BAM0016.jpg", "_BAM1671.jpg",
        "_DUL2757.jpg",
        "_ESS0008.jpg", "_ESS0016.jpg", "_ESS0227.jpg", "_ESS0240.jpg",
        "_ICO8158.jpg", "_ICO8159.jpg", "_ICO8256.jpg", "_ICO8285.jpg", "_ICO9001.jpg",
        "_ML12690.jpg", "_ML12718.jpg", "_ML12749.jpg", "_ML12804.jpg", "_ML12850.jpg",
        "_VAL0096.jpg", "_VAL0153.jpg", "_VAL0183.jpg", "_VAL0625.jpg",
        "Arabesque 202500642.jpg",
        "Cofre de los deseos.jpg",
        "Generated Image September 26, 2025 - 10_41AM.jpg",
        "Obsidiana Negra 2.jpg", "Obsidiana Negra.jpg",
        "Spirito 180300028.jpg"
    ],
    advertising: [
        "_BAM1698.jpg",
        "_CAT8668.jpg", "_CAT8802.jpg",
        "_DSC1029.jpg", "_DSC1070.jpg", "_DSC2341.jpg", "_DSC4676.jpg", "_DSC4770.jpg",
        "_FAM5338.jpg",
        "_NVX0064.jpg", "_NVX0337.jpg", "_NVX0462.jpg", "_NVX0608.jpg",
        "_SPI0864.jpg", "_SPI1009.jpg"
    ],
    intimate: [
        "_01.jpg",
        "_ATH0007.jpg", "_ATH0057.jpg", "_ATH0060.jpg", "_ATH0093.jpg", "_ATH0182.jpg", "_ATH0334.jpg",
        "_DSC1165.jpg", "_DSC3436BW.jpg", "_DSC4846.jpg",
        "_MPA0031.jpg",
        "_TE10204BW.jpg", "_TE10205.jpg"
    ]
};

export default async function CategoryPageBase({ category, locale }: CategoryPageBaseProps) {
    const t = await getTranslations("Categories");

    // Orden global de categorías
    const categories = ["social", "fashion", "portrait", "move", "product", "advertising", "intimate"];

    let photos: Photo[] = [];
    let errorMsg = "";

    try {
        const imageFiles = PHOTO_MANIFEST[category.toLowerCase()] || [];

        if (imageFiles.length === 0) {
            errorMsg = "Próximamente";
        } else {
            const shuffledFiles = shuffleArray(imageFiles);

            photos = shuffledFiles.map((file: string, index: number) => {
                const nameWithoutExt = path.parse(file).name;
                const cleanName = nameWithoutExt
                    .replace(/[_-]/g, " ")
                    .trim();

                const formattedTitle = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

                return {
                    id: index,
                    url: `/uploads/${category}/${file}`, 
                    alt: formattedTitle,
                    width: 1000, 
                    height: 1500,
                    title: formattedTitle,
                    year: ""
                };
            });
        }
    } catch (err) {
        console.error(`Error processing images for ${category}:`, err);
        errorMsg = "Error al cargar";
    }

    return (
        <div className="min-h-screen bg-white text-black pt-28 md:pt-36">
            {/* SUB-NAVEGACIÓN MÓVIL OPTIMIZADA */}
            <div className="sticky top-[60px] md:top-[80px] z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-4 md:pb-8 overflow-x-auto scrollbar-hide w-full">
                <div className="min-w-full w-max md:w-full max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-start md:justify-center space-x-6 md:space-x-12">
                    {categories.map((cat) => (
                        <Link key={cat} href={`/${locale}/portfolio/${cat}`}>
                            <span className={cn(
                                "text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all cursor-pointer whitespace-nowrap",
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

            {/* Contenido Principal */}
            <div className="w-full relative z-0">
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