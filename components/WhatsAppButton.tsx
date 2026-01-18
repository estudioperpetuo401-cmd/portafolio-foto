"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
    return (
        <a
            href="https://wa.me/573117000587"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center animate-pulse hover:animate-none"
            aria-label="Contact via WhatsApp"
        >
            <FaWhatsapp size={24} />
        </a>
    );
};

export default WhatsAppButton;
