"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Photo } from "@/data/portfolio";

interface MasonryGalleryProps {
    photos: Photo[];
}

const MasonryGallery = ({ photos }: MasonryGalleryProps) => {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    // Navegación con teclado para el Lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIdx === null) return;
            if (e.key === "ArrowRight") navigate(1);
            if (e.key === "ArrowLeft") navigate(-1);
            if (e.key === "Escape") setSelectedIdx(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIdx]);

    const navigate = (direction: number) => {
        if (selectedIdx === null) return;
        const nextIdx = (selectedIdx + direction + photos.length) % photos.length;
        setSelectedIdx(nextIdx);
    };

    return (
        <div className="px-1 py-4 max-w-[100vw]">
            {/* Estructura de Rejilla - 2 Columnas en móvil, 4 en tablet, 6 en desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">

                {photos.map((photo, idx) => (
                    <motion.div
                        key={photo.id || idx}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="relative aspect-[3/4] overflow-hidden cursor-pointer group bg-gray-50"
                        onClick={() => setSelectedIdx(idx)}
                    >
                        <Image
                            src={photo.url}
                            alt={photo.alt || "Gallery Image"}
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            priority={idx < 12}
                        />
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                ))}
            </div>

            {/* Lightbox Limpio */}
            <AnimatePresence>
                {selectedIdx !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-4 md:p-8"
                        onClick={() => setSelectedIdx(null)}
                    >
                        <button
                            onClick={() => setSelectedIdx(null)}
                            className="absolute top-6 right-6 text-3xl text-black z-[110] hover:scale-110 transition-transform p-2"
                        >
                            <HiX />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-4xl text-black/30 hover:text-black hover:scale-110 transition-all z-[110] p-2"
                        >
                            <HiChevronLeft />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); navigate(1); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl text-black/30 hover:text-black hover:scale-110 transition-all z-[110] p-2"
                        >
                            <HiChevronRight />
                        </button>

                        <div
                            className="relative w-full h-[90vh] flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={photos[selectedIdx].url}
                                alt=""
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MasonryGallery;
