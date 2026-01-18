"use client";

import React from "react";
import Image from "next/image";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

interface Photo {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
}

interface FullWidthMasonryGalleryProps {
    photos: Photo[];
}

const FullWidthMasonryGallery = ({ photos }: FullWidthMasonryGalleryProps) => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-full min-h-screen bg-white" />;

    return (
        <div className="w-full">
            <ResponsiveMasonry
                columnsCountBreakPoints={{ 300: 2, 768: 3, 1024: 4, 1280: 5 }}
            >
                <Masonry gutter="0">
                    {photos.map((photo) => (
                        <div key={photo.url} className="relative w-full">
                            <Image
                                src={photo.url}
                                alt={photo.alt || "Gallery image"}
                                width={photo.width || 1000}
                                height={photo.height || 1500}
                                className="w-full h-auto block"
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                        </div>
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    );
};

export default FullWidthMasonryGallery;
