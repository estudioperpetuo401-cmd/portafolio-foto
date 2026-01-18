import CategoryBanner, { CategoryItem } from "@/components/CategoryBanner";
import fs from "fs";
import path from "path";
import { getTranslations } from "next-intl/server";

export default async function Home() {
    const t = await getTranslations("Categories");
    const slugs = ["social", "fashion", "portrait", "move", "product", "advertising", "intimate"];

    const categories: CategoryItem[] = slugs.map((slug) => {
        const directory = path.join(process.cwd(), "public", "uploads", slug);
        let coverImage = "/logo.png"; // Placeholder default

        try {
            if (fs.existsSync(directory)) {
                const files = fs.readdirSync(directory);
                const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif"];
                const firstImage = files.find(file =>
                    imageExtensions.includes(path.extname(file).toLowerCase())
                );

                if (firstImage) {
                    coverImage = `/uploads/${slug}/${firstImage}`;
                }
            }
        } catch (err) {
            console.error(`Error scanning covers for ${slug}:`, err);
        }

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
