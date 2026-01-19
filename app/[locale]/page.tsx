import CategoryBanner, { CategoryItem } from "@/components/CategoryBanner";
import { getTranslations } from "next-intl/server";

// =====================================================================
// 🖼️ IMÁGENES DE PORTADA (Selección Manual)
// Aquí definimos qué foto aparecerá como portada en el Home para cada categoría.
// He puesto la primera de cada lista, pero puedes cambiar el nombre si prefieres otra.
// =====================================================================
const COVER_IMAGES: Record<string, string> = {
    social: "_15S0192.JPG",
    fashion: "_ATH0073_2.jpg",
    portrait: "_ATH00.jpg",
    move: "0546.jpg",
    product: "Arabesque 202500642.jpg",
    advertising: "_BAM1698.jpg",
    intimate: "_01.jpg"
};

export default async function Home() {
    const t = await getTranslations("Categories");
    const slugs = ["social", "fashion", "portrait", "move", "product", "advertising", "intimate"];

    const categories: CategoryItem[] = slugs.map((slug) => {
        // Buscamos el nombre de la foto en nuestra lista manual
        const fileName = COVER_IMAGES[slug];
        
        // Si existe foto, creamos la ruta completa. Si no, usamos el logo.
        const coverImage = fileName 
            ? `/uploads/${slug}/${fileName}` 
            : "/logo.png";

        return {
            id: slug,
            title: t(slug),
            image: coverImage
        };
    });

    return (
        <div className="min-h-screen pt-28">
            <CategoryBanner categories={categories} />
        </div>
    );
}