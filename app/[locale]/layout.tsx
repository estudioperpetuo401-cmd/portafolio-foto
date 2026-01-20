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
    // Si tienes dominio propio (.com), cámbialo aquí. Si no, usa el de Vercel.
    const baseUrl = 'https://estudioperpetuo401.vercel.app'; 

    return {
        metadataBase: new URL(baseUrl), // Esto ayuda a encontrar la imagen
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
            // AQUÍ ESTÁ LA CONFIGURACIÓN DE LA IMAGEN PARA WHATSAPP:
            images: [
                {
                    url: '/opengraph-image.jpg', // Next.js buscará esto en la carpeta public
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
        'image': 'https://estudioperpetuo401.vercel.app/opengraph-image.jpg',
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