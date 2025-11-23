import React from "react";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import getData from "../getData";

const Contact = () => {
    // 🟢 Safe destructuring with default values
    const {
        phone,
        main_color = '#000',
        facebook,
        instgarm,
        tiktok,
        whatsapp,
        language = 'fr'
    } = getData || {};

    const isAr = language === "ar";

    // --- Translations ---
    const t = {
        titlePart1: isAr ? "تواصل" : "Contactez-",
        titlePart2: isAr ? "معنا" : "nous",
        whatsapp: isAr ? "واتساب" : "WhatsApp",
        description: isAr
            ? "يسعدنا تواصلكم معنا للإجابة على أسئلتكم أو لتزويدكم بمزيد من المعلومات."
            : "Nous sommes heureux d'avoir de vos nouvelles pour répondre à vos questions ou vous fournir plus d'informations."
    };

    return (
        <div
            className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
            dir={isAr ? "rtl" : "ltr"} // 🟢 Auto-adjust direction
        >
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">

                {/* ✅ Title */}
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    {t.titlePart1} <span style={{ color: main_color }}>{t.titlePart2}</span>
                </h1>

                <div className="space-y-6">
                    {/* ✅ Phone Number */}
                    {phone && (
                        <a
                            href={`tel:${phone}`}
                            className="flex items-center gap-3 justify-center text-gray-700 hover:opacity-80 transition-opacity"
                        >
                            <div className="p-2 rounded-full bg-gray-100">
                                <Phone className="w-5 h-5 text-gray-600" />
                            </div>
                            <span className="font-medium text-lg" dir="ltr">{phone}</span>
                        </a>
                    )}

                    {/* ✅ WhatsApp - Dynamic */}
                    {whatsapp && (
                        <a
                            href={`https://wa.me/${whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 justify-center text-gray-700 hover:text-green-600 transition-colors"
                        >
                            <FaWhatsapp className="w-6 h-6 text-green-500" />
                            <span className="font-medium">{t.whatsapp}</span>
                        </a>
                    )}

                    {/* ✅ Description Text */}
                    <p className="text-gray-600 w-11/12 mx-auto text-sm text-center my-5 leading-relaxed">
                        {t.description}
                    </p>

                    {/* ✅ Social Media Links */}
                    <div className="flex gap-5 justify-center pt-2">
                        {tiktok && (
                            <a href={tiktok} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src="https://f003.backblazeb2.com/file/flex-storage/3iCF2TDOxp3bPyLetMWqo-1732896223843.png"
                                    alt="TikTok"
                                />
                            </a>
                        )}
                        {instgarm && (
                            <a href={instgarm} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src="https://f003.backblazeb2.com/file/flex-storage/8e_Q6aE3kZjg0MF80AdBl-1732896223768.png"
                                    alt="Instagram"
                                />
                            </a>
                        )}
                        {facebook && (
                            <a href={facebook} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src="https://f003.backblazeb2.com/file/flex-storage/iIpdFi_ynEWVoUkKE7fTj-1732896163852.png"
                                    alt="Facebook"
                                />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;