import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    weight: ["400", "700"]
});

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    // Títulos y descripciones optimizados para compartir
    const title = 'Estudio Perpetuo 401 | Fotografía Profesional';
    const description = 'Estudio de fotografía en Medellín. Especialistas en Moda, Social, Producto, Retrato y Publicidad. Capturando momentos perpetuos.';
    
    // URL base de tu sitio (úsala para asegurar que las imágenes carguen bien)
    const baseUrl = 'https://estudioperpetuo401.vercel.app'; 

    return {
        metadataBase: new URL(baseUrl),
        title,
        description,
        keywords: ['Fotógrafo Medellín', 'Fotografía de Moda', 'Book Fotográfico', 'Estudio Perpetuo 401', 'Retratos Corporativos', 'Fotografía Social', 'Bodas Medellín'],
        openGraph: {
            title,
            description,
            type: 'website',
            locale: locale === 'es' ? 'es_CO' : 'en_US',
            url: baseUrl,
            siteName: 'Estudio Perpetuo 401',
            // AQUÍ ESTÁ EL CAMBIO PARA OBLIGAR A FACEBOOK A VER LA NUEVA FOTO:
            images: [
                {
                    url: '/social-cover.jpg', // <--- Nombre nuevo
                    width: 1200,
                    height: 630,
                    alt: 'Estudio Perpetuo 401 Preview',
                },
            ],
        },
    };
}

export default async function LocaleLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = await getMessages();

    // Actualizamos también el Schema para Google
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'PhotographyBusiness',
        'name': 'Estudio Perpetuo 401',
        'image': 'https://estudioperpetuo401.vercel.app/social-cover.jpg', // <--- Nombre nuevo también aquí
        'description': 'Estudio de fotografía profesional en Medellín. Especialistas en moda, retrato y producto.',
        'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Estudio Perpetuo 401',
            'addressLocality': 'Medellín',
            'addressRegion': 'Antioquia',
            'addressCountry': 'CO'
        },
        'telephone': '+573117000587',
        'priceRange': '$$',
        'openingHoursSpecification': [
            {
                '@type': 'OpeningHoursSpecification',
                'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                'opens': '09:00',
                'closes': '18:00'
            }
        ]
    };

    return (
        <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
            <body className="antialiased font-sans">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <NextIntlClientProvider messages={messages}>
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                    <WhatsAppButton />
                    <CustomCursor />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}