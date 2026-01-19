"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HiOutlineMenuAlt4, HiX, HiChevronDown } from "react-icons/hi";
import { useLocale } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const Navbar = () => {
    // Estado para controlar si el menú está abierto o cerrado
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [portfolioOpen, setPortfolioOpen] = useState(false);
    const pathname = usePathname();
    const locale = useLocale();

    // =======================================================
    // 📝 TEXTOS FIJOS (Seguridad total)
    // =======================================================
    const labels = {
        es: {
            home: "INICIO",
            portfolio: "PORTAFOLIO",
            about: "SOBRE MÍ",
            contact: "CONTACTO",
            social: "SOCIAL",
            fashion: "FASHION",
            portrait: "RETRATO",
            move: "MOVE",
            product: "PRODUCTO",
            advertising: "PUBLICITARIA",
            intimate: "INTIMATE"
        },
        en: {
            home: "HOME",
            portfolio: "PORTFOLIO",
            about: "ABOUT",
            contact: "CONTACT",
            social: "SOCIAL",
            fashion: "FASHION",
            portrait: "PORTRAIT",
            move: "MOVE",
            product: "PRODUCT",
            advertising: "ADVERTISING",
            intimate: "INTIMATE"
        }
    };

    // Selección de idioma segura
    const t = (labels as any)[locale] || labels.es;

    const portfolioLinks = [
        { name: t.social, href: `/${locale}/portfolio/social` },
        { name: t.fashion, href: `/${locale}/portfolio/fashion` },
        { name: t.portrait, href: `/${locale}/portfolio/portrait` },
        { name: t.move, href: `/${locale}/portfolio/move` },
        { name: t.product, href: `/${locale}/portfolio/product` },
        { name: t.advertising, href: `/${locale}/portfolio/advertising` },
        { name: t.intimate, href: `/${locale}/portfolio/intimate` },
    ];

    const getActivePath = (path: string) => {
        const localizedPath = `/${locale}${path === "/" ? "" : path}`;
        return pathname === localizedPath;
    };

    // Bloquear el scroll cuando el menú móvil está abierto
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [mobileMenuOpen]);

    return (
        <nav className="fixed top-0 left-0 w-full z-[9999] bg-white h-28 border-b border-gray-100 px-6 md:px-12 flex items-center shadow-sm">
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
                
                {/* LOGO */}
                <Link href={`/${locale}`} className="relative z-[10001]">
                    <div className="relative w-[180px] md:w-[240px] h-[60px] md:h-[80px]">
                        <Image
                            src="/logo.png"
                            alt="Estudio Perpetuo Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* MENÚ PC (Desktop) */}
                <div className="hidden md:flex items-center space-x-10">
                    <Link href={`/${locale}`}>
                        <span className={cn("text-[11px] uppercase tracking-[0.2em] font-medium hover:text-gray-400 transition-colors", getActivePath("/") ? "text-black" : "text-gray-500")}>
                            {t.home}
                        </span>
                    </Link>

                    {/* Dropdown Portafolio PC - CORREGIDO */}
                    <div className="relative h-full flex items-center" onMouseEnter={() => setPortfolioOpen(true)} onMouseLeave={() => setPortfolioOpen(false)}>
                        <button className={cn("flex items-center space-x-1 text-[11px] uppercase tracking-[0.2em] font-medium transition-colors focus:outline-none h-full", portfolioOpen ? "text-black" : "text-gray-500 hover:text-black")}>
                            <span>{t.portfolio}</span>
                            <HiChevronDown className={`transition-transform duration-300 ${portfolioOpen ? "rotate-180" : ""}`} />
                        </button>

                        {/* ELIMINAMOS 'mt-2' PARA QUE NO HAYA HUECO */}
                        <div className={`absolute top-[60%] left-0 pt-6 w-48 transition-opacity duration-200 ${portfolioOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                            <div className="bg-white shadow-xl border border-gray-100 py-4 flex flex-col">
                                {portfolioLinks.map((link) => (
                                    <Link key={link.name} href={link.href} className="px-6 py-2 text-[10px] uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-black">
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link href={`/${locale}/about`}>
                        <span className={cn("text-[11px] uppercase tracking-[0.2em] font-medium hover:text-gray-400 transition-colors", getActivePath("/about") ? "text-black" : "text-gray-500")}>
                            {t.about}
                        </span>
                    </Link>
                    <Link href={`/${locale}/contact`}>
                        <span className={cn("text-[11px] uppercase tracking-[0.2em] font-medium hover:text-gray-400 transition-colors", getActivePath("/contact") ? "text-black" : "text-gray-500")}>
                            {t.contact}
                        </span>
                    </Link>

                    <div className="pl-4 border-l border-gray-100">
                        <LanguageSwitcher />
                    </div>
                </div>

                {/* BOTÓN MÓVIL (Hamburguesa) */}
                <div className="md:hidden flex items-center space-x-4 relative z-[10001]">
                    <LanguageSwitcher />
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-3xl text-black focus:outline-none p-2"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <HiX /> : <HiOutlineMenuAlt4 />}
                    </button>
                </div>
            </div>

            {/* MENÚ MÓVIL (Pantalla Completa) */}
            <div className={`fixed inset-0 bg-white z-[10000] flex flex-col pt-32 px-6 overflow-y-auto transition-all duration-300 ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
                
                <div className="flex flex-col items-center space-y-8 pb-20">
                    <Link href={`/${locale}`} onClick={() => setMobileMenuOpen(false)}>
                        <span className="text-xl uppercase tracking-[0.3em] font-light border-b-2 border-transparent hover:border-black pb-1">{t.home}</span>
                    </Link>
                    
                    {/* Lista de Portafolio Móvil */}
                    <div className="w-full border-t border-b border-gray-100 py-8 flex flex-col items-center space-y-5 bg-gray-50/50">
                        <span className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">— {t.portfolio} —</span>
                        {portfolioLinks.map(link => (
                            <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                                <span className="text-lg uppercase tracking-widest text-gray-600 hover:text-black">
                                    {link.name}
                                </span>
                            </Link>
                        ))}
                    </div>

                    <Link href={`/${locale}/about`} onClick={() => setMobileMenuOpen(false)}>
                        <span className="text-xl uppercase tracking-[0.3em] font-light border-b-2 border-transparent hover:border-black pb-1">{t.about}</span>
                    </Link>
                    <Link href={`/${locale}/contact`} onClick={() => setMobileMenuOpen(false)}>
                        <span className="text-xl uppercase tracking-[0.3em] font-light border-b-2 border-transparent hover:border-black pb-1">{t.contact}</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;