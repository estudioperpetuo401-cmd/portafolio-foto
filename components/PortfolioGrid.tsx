"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Photo } from "@/data/portfolio";

interface PortfolioGridProps {
    photos: Photo[];
}

const PhotoItem = ({ photo, onClick }: { photo: Photo; onClick: () => void }) => {
    const [error, setError] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative group cursor-pointer overflow-hidden break-inside-avoid mb-4"
            onClick={onClick}
        >
            <div className="relative overflow-hidden bg-white transition-all duration-700 aspect-[2/3]">
                {!error ? (
                    <Image
                        src={photo.url}
                        alt={photo.alt}
                        width={photo.width}
                        height={photo.height}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={() => setError(true)}
                    />
                ) : (
                    <div className="w-full h-full bg-white flex items-center justify-center">
                        <span className="text-[10px] uppercase tracking-widest text-gray-400">Image not found</span>
                    </div>
                )}
                {/* Overlay on hover: Clean darkening only */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
        </motion.div>
    );
};

const PortfolioGrid = ({ photos }: PortfolioGridProps) => {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    // Keyboard navigation
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
        <div className="px-6 md:px-12 py-12">
            <div className="columns-2 md:columns-3 lg:columns-5 gap-6 space-y-6">
                {photos.map((photo, idx) => (
                    <PhotoItem key={photo.id} photo={photo} onClick={() => setSelectedIdx(idx)} />
                ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedIdx !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-6 md:p-12"
                    >
                        <button
                            onClick={() => setSelectedIdx(null)}
                            className="absolute top-8 right-8 text-3xl text-black z-[110] hover:scale-110 transition-transform"
                        >
                            <HiX />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-4xl text-black hover:scale-110 transition-transform"
                        >
                            <HiChevronLeft />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); navigate(1); }}
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-4xl text-black hover:scale-110 transition-transform"
                        >
                            <HiChevronRight />
                        </button>

                        <div className="relative w-full h-full flex flex-col items-center justify-center">
                            <div className="relative w-full h-[80vh]">
                                <Image
                                    src={photos[selectedIdx].url}
                                    alt={photos[selectedIdx].alt}
                                    fill
                                    className="object-contain"
                                />
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PortfolioGrid;
