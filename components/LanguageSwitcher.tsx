"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

const LanguageSwitcher = () => {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLanguage = () => {
        const nextLocale = locale === "en" ? "es" : "en";

        // Replace the locale in the pathname
        // e.g., /en/about -> /es/about
        const segments = pathname.split("/");
        segments[1] = nextLocale;
        const nextPathname = segments.join("/");

        router.push(nextPathname);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="group flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-medium border border-gray-200 px-3 py-1.5 hover:bg-black hover:text-white transition-all duration-300"
        >
            <span className={locale === "en" ? "text-black group-hover:text-white" : "text-gray-400"}>EN</span>
            <span className="text-gray-300">/</span>
            <span className={locale === "es" ? "text-black group-hover:text-white" : "text-gray-400"}>ES</span>
        </button>
    );
};

export default LanguageSwitcher;
