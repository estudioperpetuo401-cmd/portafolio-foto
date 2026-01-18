import React from "react";
import ContactForm from "@/components/ContactForm";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function ContactPage() {
    const t = useTranslations("Contact");

    return (
        <div className="min-h-screen bg-dark text-white pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">

                <div className="space-y-12">
                    <div className="space-y-6">
                        <h1
                            className="text-5xl md:text-7xl font-extralight tracking-tighter"
                            dangerouslySetInnerHTML={{ __html: t.raw("title") }}
                        />
                        <p className="text-gray-400 max-w-md font-light leading-relaxed">
                            {t("description")}
                        </p>
                    </div>

                    <div className="space-y-8 pt-8">
                        <div className="flex items-center space-x-6">
                            <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-xl">
                                <FaEnvelope />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-gray-500">{t("email")}</p>
                                <a href="mailto:estudioperpetuo401@gmail.com" className="text-lg font-light tracking-wide hover:text-gray-300 transition-colors">
                                    estudioperpetuo401@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center space-x-6">
                            <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-xl">
                                <FaPhone />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-gray-500">{t("phone")}</p>
                                <a href="tel:+573117000587" className="text-lg font-light tracking-wide hover:text-gray-300 transition-colors">
                                    +57 311 7000587
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center space-x-6">
                            <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-xl">
                                <FaMapMarkerAlt />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-gray-500">{t("studio")}</p>
                                <p className="text-lg font-light tracking-wide">Medellín, Col, Cinturón Verde</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 p-8 md:p-12">
                    <ContactForm />
                </div>

            </div>
        </div>
    );
}
