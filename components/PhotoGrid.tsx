import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Photo {
    id: number;
    url: string;
    alt: string;
    width: number;
    height: number;
}

const photos: Photo[] = [
    { id: 1, url: "https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=1000", alt: "Nature", width: 1000, height: 1500 },
    { id: 2, url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000", alt: "Camera", width: 1000, height: 700 },
    { id: 3, url: "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?q=80&w=1000", alt: "Architecture", width: 1000, height: 1300 },
    { id: 4, url: "https://images.unsplash.com/photo-1502602732142-4e92b993284a?q=80&w=1000", alt: "Paris", width: 1000, height: 1400 },
    { id: 5, url: "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1000", alt: "Car", width: 1000, height: 600 },
    { id: 6, url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000", alt: "Portrait", width: 1000, height: 1500 },
    { id: 7, url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1000", alt: "Landscape", width: 1000, height: 750 },
    { id: 8, url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000", alt: "Forest", width: 1000, height: 1500 },
    { id: 9, url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1000", alt: "Lake", width: 1000, height: 650 },
];

const PhotoGrid = () => {
    return (
        <div className="px-6 md:px-12 py-24">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {photos.map((photo) => (
                    <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative group masonry-item"
                    >
                        <div className="overflow-hidden bg-gray-100">
                            <Image
                                src={photo.url}
                                alt={photo.alt}
                                width={photo.width}
                                height={photo.height}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                placeholder="blur"
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/vfvfwAJ8APp96REfgAAAABJRU5ErkJggg=="
                            />
                        </div>

                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white text-xs uppercase tracking-widest font-light">
                                View Project
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PhotoGrid;
