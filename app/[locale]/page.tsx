import CategoryBanner, { CategoryItem } from "@/components/CategoryBanner";
import { getTranslations } from "next-intl/server";

// =====================================================================
// 🎞️ CARRUSEL DE PORTADA
// Aquí definimos 3 fotos para cada categoría. Cambiarán cada segundo.
// =====================================================================
const COVER_GALLERY: Record<string, string[]> = {
    social: [
        "_DAN1710.jpg",      // Nueva
        "_15S0192.JPG",      // Original
        "_ATH0271.jpg"       // Extra
    ],
    fashion: [
        "_ATH0073_2.jpg",
        "_DSC4571.png",
        "_FAM2437.jpg"
    ],
    portrait: [
        "_ATH00.jpg",
        "_ESS0400.jpg",
        "_ICO5210.png"
    ],
    move: [
        "0546.jpg",
        "_DSC3600.jpg",
        "_TRI2295.jpg"
    ],
    product: [
        "Arabesque 202500642.jpg",
        "Obsidiana Negra.jpg",
        "_ATH0011.jpg"
    ],
    advertising: [
        "_BAM1698.jpg",
        "_DSC4676.jpg",
        "_NVX0064.jpg"
    ],
    intimate: [
        "_01.jpg",
        "_ATH0060.jpg",
        "_DSC1165.jpg"
    ]
};

export default async function Home() {
    const t = await getTranslations("Categories");
    const slugs = ["social", "fashion", "portrait", "move", "product", "advertising", "intimate"];

    const categories: CategoryItem[] = slugs.map((slug) => {
        // Obtenemos las 3 fotos, o usamos el logo si falla algo
        const fileNames = COVER_GALLERY[slug] || [];
        
        const images = fileNames.length > 0
            ? fileNames.map(name => `/uploads/${slug}/${name}`)
            : ["/logo.png"];

        return {
            id: slug,
            title: t(slug),
            images: images // Ahora pasamos una lista, no una sola foto
        };
    });

    return (
        <div className="min-h-screen pt-28">
            <CategoryBanner categories={categories} />
        </div>
    );
}