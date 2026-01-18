export interface Photo {
    id: number;
    url: string;
    alt: string;
    width: number;
    height: number;
    title: string;
    year: string;
}

export const portfolioData: Record<string, Photo[]> = {
    social: [
        { id: 101, url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000", alt: "Event", width: 1000, height: 1500, title: "The Grand Gala", year: "2023" },
        { id: 102, url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000", alt: "Party", width: 1000, height: 667, title: "Midnight Echoes", year: "2023" },
        { id: 103, url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000", alt: "Wedding", width: 1000, height: 1333, title: "Eternal Vows", year: "2022" },
        { id: 104, url: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1000", alt: "Meeting", width: 1000, height: 750, title: "Corporate Synergy", year: "2023" },
    ],
    fashion: [
        { id: 201, url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000", alt: "Model", width: 1000, height: 1400, title: "Vogue Noir", year: "2023" },
        { id: 202, url: "https://images.unsplash.com/photo-1539109132374-34f4a213fbb9?q=80&w=1000", alt: "Street Wear", width: 1000, height: 1500, title: "Urban Edge", year: "2023" },
        { id: 203, url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000", alt: "Floral", width: 1000, height: 700, title: "Spring Bloom", year: "2022" },
        { id: 204, url: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1000", alt: "Couture", width: 1000, height: 1500, title: "Silk Road", year: "2023" },
    ],
    portrait: [
        { id: 301, url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000", alt: "Man", width: 1000, height: 1500, title: "The Architect", year: "2023" },
        { id: 302, url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000", alt: "Woman", width: 1000, height: 1300, title: "Silent Muse", year: "2023" },
        { id: 303, url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000", alt: "Close-up", width: 1000, height: 1000, title: "Gaze", year: "2022" },
    ],
    product: [
        { id: 401, url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000", alt: "Headphones", width: 1000, height: 1000, title: "Sonic Clarity", year: "2023" },
        { id: 402, url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000", alt: "Watch", width: 1000, height: 1500, title: "Precision Time", year: "2023" },
        { id: 403, url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000", alt: "Shoe", width: 1000, height: 667, title: "First Step", year: "2022" },
    ],
    advertising: [
        { id: 501, url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000", alt: "Office", width: 1000, height: 667, title: "Modern Workplace", year: "2023" },
        { id: 502, url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000", alt: "Meeting", width: 1000, height: 1500, title: "Human Connection", year: "2023" },
        { id: 503, url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000", alt: "Data", width: 1000, height: 750, title: "Visionary Business", year: "2022" },
    ],
    intimate: [
        { id: 601, url: "/intimate.jpg", alt: "Intimate Portrait", width: 1000, height: 1500, title: "Soft Silence", year: "2024" },
        { id: 602, url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000", alt: "Shadows", width: 1000, height: 1250, title: "Inner Light", year: "2024" },
        { id: 603, url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000", alt: "Emotive", width: 1000, height: 1500, title: "Whisper", year: "2023" },
    ],
};
