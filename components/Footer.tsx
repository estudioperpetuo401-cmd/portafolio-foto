"use client";

import React from "react";
import { FaInstagram } from "react-icons/fa";
import { useTranslations } from "next-intl";

const Footer = () => {
    const t = useTranslations("Footer");

    return (
        <footer className="bg-white py-12 px-6 md:px-12 border-t border-gray-100">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                <div className="text-sm text-gray-400">
                    © {new Date().getFullYear()} Estudio Perpetuo 401. {t("rights")}
                </div>

                <div className="flex space-x-6 text-xl text-gray-600">
                    <a href="https://www.instagram.com/juansemarin_ph/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                        <FaInstagram />
                    </a>
                </div>

                <div className="text-xs uppercase tracking-widest text-gray-400">
                    {t("tagline")}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
