import { ArrowRight, ArrowLeft, BookmarkCheck, Copy, Check } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import getData from '../getData';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Thanks = () => {
    // 🟢 Safe destructuring
    const {
        thanks = {},
        phone,
        main_color = '#000',
        language = 'fr',
        facebook,
        instgarm, // Keeping your spelling from data
        tiktok
    } = getData || {};

    const isAr = language === "ar";
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);

    // 🟢 Copy to Clipboard Function
    const handleCopy = () => {
        if (phone) {
            navigator.clipboard.writeText(phone);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // 🟢 Translations
    const t = {
        inquire: isAr ? "للاستفسار يرجى الاتصال بالرقم" : "Pour toute demande, appelez le",
        home: isAr ? "الصفحة الرئيسية" : "Page d'accueil",
        follow: isAr ? "تابعنا على" : "Suivez-nous sur",
        copy: isAr ? "نسخ" : "Copier",
        copied: isAr ? "تم النسخ" : "Copié",
    };

    return (
        <div
            className="w-[95%] mx-auto text-center rounded-xl pb-1.5 min-h-[80vh] flex flex-col justify-center"
            dir={isAr ? "rtl" : "ltr"}
        >
            <div className="px-3 flex flex-col justify-center items-center py-2">

                {/* ✅ Success Icon */}
                {thanks.img && (
                    <BookmarkCheck className="text-green-500 w-24 h-24 mt-10 mb-4" />
                )}

                {/* ✅ Title & Text */}
                {thanks.title && (
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4 mb-2">
                        {thanks.titleText}
                    </h1>
                )}
                {thanks.about && (
                    <p className="md:text-lg text-gray-600 mt-1 md:mt-2 max-w-lg">
                        {thanks.aboutText}
                    </p>
                )}

                {/* ✅ Contact & Actions Section */}
                <div className={`mt-8 mb-2 w-full max-w-md ${(thanks.phone || thanks.homebutton) && "border-t border-b border-gray-100"} py-8 flex flex-col justify-center items-center`}>

                    {thanks.phone && (
                        <>
                            <h2 className="text-gray-600 text-sm md:text-base mb-3">
                                {t.inquire}
                            </h2>
                            <button
                                onClick={handleCopy}
                                className="border border-gray-200 bg-white hover:bg-gray-50 transition font-semibold flex items-center shadow-sm px-6 py-3 rounded-xl text-gray-700 text-sm md:text-base cursor-pointer group"
                            >
                                {copied ? (
                                    <Check size={18} className={`text-green-500 ${isAr ? 'ml-2' : 'mr-2'}`} />
                                ) : (
                                    <Copy size={18} className={`text-gray-400 group-hover:text-gray-600 ${isAr ? 'ml-2' : 'mr-2'}`} />
                                )}
                                <span dir="ltr">{phone}</span>
                            </button>
                            {copied && <span className="text-xs text-green-500 mt-2">{t.copied}</span>}
                        </>
                    )}

                    {thanks.homebutton && (
                        <Link
                            to={'/'}
                            className="text-white px-6 py-3 rounded-xl text-sm font-medium shadow-lg hover:opacity-90 transition mt-8 flex items-center"
                            style={{
                                backgroundColor: main_color,
                                boxShadow: `0 4px 14px ${main_color}80`
                            }}
                        >
                            {t.home}
                            {isAr ? <ArrowLeft className="mr-2" size={18} /> : <ArrowRight className="ml-2" size={18} />}
                        </Link>
                    )}
                </div>
            </div>

            {/* ✅ Social Media */}
            {thanks.media && (
                <div className="py-5 px-5 flex flex-col justify-between items-center text-sm text-gray-600">
                    <h3 className="font-medium">{t.follow}</h3>
                    <div className="flex gap-4 mt-4">
                        {tiktok && (
                            <a href={tiktok} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                                <FaTiktok className="text-white bg-black rounded-full w-8 h-8 p-1.5" />
                            </a>
                        )}
                        {instgarm && (
                            <a href={instgarm} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                                <FaInstagram className="text-white bg-pink-600 rounded-full w-8 h-8 p-1.5" />
                            </a>
                        )}
                        {facebook && (
                            <a href={facebook} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                                <FaFacebookF className="text-white bg-blue-600 rounded-full w-8 h-8 p-1.5" />
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Thanks;