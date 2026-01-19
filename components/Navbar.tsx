"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HiOutlineMenuAlt4, HiX, HiChevronDown } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [portfolioOpen, setPortfolioOpen] = useState(false);
    const pathname = usePathname();
    const t = useTranslations("Nav");
    const locale = useLocale();

    const tCat = useTranslations("Categories");

    const portfolioLinks = [
        { name: tCat("social"), href: `/${locale}/portfolio/social` },
        { name: tCat("fashion"), href: `/${locale}/portfolio/fashion` },
        { name: tCat("portrait"), href: `/${locale}/portfolio/portrait` },
        { name: tCat("move"), href: `/${locale}/portfolio/move` },
        { name: tCat("product"), href: `/${locale}/portfolio/product` },
        { name: tCat("advertising"), href: `/${locale}/portfolio/advertising` },
        { name: tCat("intimate"), href: `/${locale}/portfolio/intimate` },
    ];

    const getActivePath = (path: string) => {
        const localizedPath = `/${locale}${path === "/" ? "" : path}`;
        return pathname === localizedPath;
    };

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [mobileMenuOpen]);

    return (
        // FIX 1: Increased z-index to 100 to ensure it stays above the sticky sub-menu
        <nav className="fixed top-0 left-0 w-full z-[100] bg-white/95 backdrop-blur-sm h-28 border-b border-gray-100 px-6 md:px-12 flex items-center">
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
                {/* Left: Logo */}
                <Link href={`/${locale}`} className="relative z-[102]">
                    <div className="relative w-[180px] md:w-[240px] h-[60px] md:h-[80px]">
                        <Image
                            src="/logo.png"
                            alt="Estudio Perpetuo 401 Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Center/Right: Desktop Links */}
                <div className="hidden md:flex items-center space-x-10">
                    <Link href={`/${locale}`}>
                        <span className={cn(
                            "text-[11px] uppercase tracking-[0.2em] font-medium transition-colors hover:text-gray-400",
                            getActivePath("/") ? "text-black" : "text-gray-500"
                        )}>
                            {t("home")}
                        </span>
                    </Link>

                    <div
                        className="relative"
                        onMouseEnter={() => setPortfolioOpen(true)}
                        onMouseLeave={() => setPortfolioOpen(false)}
                    >
                        <button className="flex items-center space-x-1 text-[11px] uppercase tracking-[0.2em] font-medium text-gray-500 hover:text-black transition-colors focus:outline-none">
                            <span>{t("portfolio")}</span>
                            <HiChevronDown className={cn("transition-transform duration-300", portfolioOpen && "rotate-180")} />
                        </button>

                        <AnimatePresence>
                            {portfolioOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-0 mt-2 w-48 bg-white shadow-xl border border-gray-100 py-4 flex flex-col"
                                >
                                    {portfolioLinks.map((link) => (
                                        <Link key={link.name} href={link.href}>
                                            <span className="px-6 py-2 text-[10px] uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-black transition-colors flex items-center">
                                                {link.name}
                                            </span>
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link href={`/${locale}/about`}>
                        <span className={cn(
                            "text-[11px] uppercase tracking-[0.2em] font-medium transition-colors hover:text-gray-400",
                            getActivePath("/about") ? "text-black" : "text-gray-500"
                        )}>
                            {t("about")}
                        </span>
                    </Link>
                    <Link href={`/${locale}/contact`}>
                        <span className={cn(
                            "text-[11px] uppercase tracking-[0.2em] font-medium transition-colors hover:text-gray-400",
                            getActivePath("/contact") ? "text-black" : "text-gray-500"
                        )}>
                            {t("contact")}
                        </span>
                    </Link>

                    <div className="pl-4 border-l border-gray-100">
                        <LanguageSwitcher />
                    </div>
                </div>

                {/* Mobile Toggle */}
                {/* FIX 2: Ensure the toggle button is above everything with z-[102] */}
                <div className="md:hidden flex items-center space-x-4 relative z-[102]">
                    <LanguageSwitcher />
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-2xl text-black focus:outline-none"
                    >
                        {mobileMenuOpen ? <HiX /> : <HiOutlineMenuAlt4 />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        // FIX 3: Fixed full screen, high Z-index, scrollable if content is tall
                        className="fixed inset-0 bg-white z-[101] flex flex-col pt-32 px-6 overflow-y-auto"
                    >
                        <div className="flex flex-col items-center space-y-8 pb-10">
                            <Link href={`/${locale}`} onClick={() => setMobileMenuOpen(false)}>
                                <span className="text-xl uppercase tracking-[0.3em] font-light">{t("home")}</span>
                            </Link>
                            
                            {/* Portfolio Section in Mobile */}
                            <div className="flex flex-col items-center space-y-4 w-full border-t border-b border-gray-100 py-6">
                                <span className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">{t("portfolio")}</span>
                                {portfolioLinks.map(link => (
                                    <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                                        <span className="text-base uppercase tracking-widest hover:text-gray-500 transition-colors">
                                            {link.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>

                            <Link href={`/${locale}/about`} onClick={() => setMobileMenuOpen(false)}>
                                <span className="text-xl uppercase tracking-[0.3em] font-light">{t("about")}</span>
                            </Link>
                            <Link href={`/${locale}/contact`} onClick={() => setMobileMenuOpen(false)}>
                                <span className="text-xl uppercase tracking-[0.3em] font-light">{t("contact")}</span>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;