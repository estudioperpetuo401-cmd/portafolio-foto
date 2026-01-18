import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutPage() {
    const t = useTranslations("About");

    return (
        <div className="min-h-screen pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-16">
                <div className="w-full lg:w-3/5">
                    <div className="relative aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                        <Image
                            src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=1000"
                            alt="Photographer Portrait"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="w-full lg:w-2/5 space-y-8 lg:pt-20">
                    <div className="space-y-4">
                        <h2 className="text-sm uppercase tracking-[0.3em] text-gray-400">{t("essence")}</h2>
                        <h1
                            className="text-4xl md:text-5xl font-light tracking-tight leading-tight text-black"
                            dangerouslySetInnerHTML={{ __html: t.raw("title") }}
                        />
                    </div>

                    <p className="text-gray-600 leading-relaxed text-lg font-light">
                        {t("bio1")}
                    </p>

                    <p className="text-gray-600 leading-relaxed font-light">
                        {t("bio2")}
                    </p>

                    <div className="pt-8">
                        <button className="border-b border-black pb-2 text-sm uppercase tracking-widest hover:text-gray-500 hover:border-gray-500 transition-all">
                            {t("cta")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
