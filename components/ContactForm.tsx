"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const ContactForm = () => {
    const t = useTranslations("Contact.form");

    return (
        <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 ml-1">{t("name")}</label>
                    <input
                        type="text"
                        placeholder={t("name_placeholder")}
                        className="w-full bg-transparent border-b border-white/20 py-4 px-1 focus:outline-none focus:border-white transition-colors text-sm font-light placeholder:text-gray-700"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 ml-1">{t("email")}</label>
                    <input
                        type="email"
                        placeholder={t("email_placeholder")}
                        className="w-full bg-transparent border-b border-white/20 py-4 px-1 focus:outline-none focus:border-white transition-colors text-sm font-light placeholder:text-gray-700"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 ml-1">{t("session_type")}</label>
                <select className="w-full bg-transparent border-b border-white/20 py-4 px-1 focus:outline-none focus:border-white transition-colors text-sm font-light text-gray-400">
                    <option className="bg-dark">{t("options.editorial")}</option>
                    <option className="bg-dark">{t("options.architectural")}</option>
                    <option className="bg-dark">{t("options.commercial")}</option>
                    <option className="bg-dark">{t("options.personal")}</option>
                </select>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 ml-1">{t("message")}</label>
                <textarea
                    rows={4}
                    placeholder={t("message_placeholder")}
                    className="w-full bg-transparent border-b border-white/20 py-4 px-1 focus:outline-none focus:border-white transition-colors text-sm font-light resize-none placeholder:text-gray-700"
                />
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-black text-xs uppercase tracking-[0.3em] py-5 font-medium hover:bg-gray-200 transition-colors"
                type="submit"
            >
                {t("submit")}
            </motion.button>
        </form>
    );
};

export default ContactForm;
