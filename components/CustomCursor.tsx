'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHoveringLink, setIsHoveringLink] = useState(false);
    const [isHoveringImage, setIsHoveringImage] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring configuration
    const springConfig = { damping: 25, stiffness: 250 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - 6); // Center the 12px (w-3) circle
            mouseY.set(e.clientY - 6);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Detect links and buttons
            const isInteractive =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.getAttribute('role') === 'button';

            setIsHoveringLink(!!isInteractive);

            // Detect images
            const isImage =
                target.tagName === 'IMG' ||
                target.closest('img') ||
                target.closest('.masonry-item'); // Assuming masonry items are image containers

            setIsHoveringImage(!!isImage);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [mouseX, mouseY, isVisible]);

    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        return null;
    }

    return (
        <motion.div
            className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] border-[1px] border-black"
            style={{
                x: cursorX,
                y: cursorY,
                opacity: isVisible ? 1 : 0,
                scale: isHoveringLink || isHoveringImage ? 2 : 1,
            }}
            transition={{
                scale: { type: 'spring', damping: 20, stiffness: 300 },
                opacity: { duration: 0.2 }
            }}
        />
    );
};

export default CustomCursor;
