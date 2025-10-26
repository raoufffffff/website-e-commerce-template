import React from "react";
import { Phone } from "lucide-react";
import { FaWhatsapp, FaViber } from "react-icons/fa";
import getData from "../getData";

const Contact = () => {
    const { phone, main_color, facebook, instgarm, tiktok, whatsapp } = getData;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">

                {/* ✅ العنوان */}
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    تواصل <span style={{ color: main_color }}>معنا</span>
                </h1>

                <div className="space-y-6">
                    {/* ✅ رقم الهاتف */}
                    <a
                        href={`tel:${phone}`}
                        className="flex items-center gap-3 justify-center text-gray-700 hover:text-amber-600 transition-colors"
                    >
                        <Phone className="w-6 h-6" />
                        <span className="font-medium">{phone}</span>
                    </a>

                    {/* ✅ واتساب - ديناميكي إن وجد */}
                    {whatsapp && (
                        <a
                            href={`https://wa.me/${whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 justify-center text-gray-700 hover:text-green-600 transition-colors"
                        >
                            <FaWhatsapp className="w-6 h-6" />
                            <span className="font-medium">واتساب</span>
                        </a>
                    )}

                    {/* ✅ فيبر */}


                    {/* ✅ نص تعريفي */}
                    <p className="text-gray-600 w-10/12 mx-auto text-sm text-center my-5 leading-relaxed">
                        يسعدنا تواصلكم معنا للإجابة على أسئلتكم أو لتزويدكم بمزيد من المعلومات.
                    </p>

                    {/* ✅ روابط السوشيال ميديا */}
                    <div className="flex gap-5 justify-center">
                        {tiktok && (
                            <a href={tiktok} target="_blank" rel="noopener noreferrer">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src="https://f003.backblazeb2.com/file/flex-storage/3iCF2TDOxp3bPyLetMWqo-1732896223843.png"
                                    alt="TikTok"
                                />
                            </a>
                        )}
                        {instgarm && (
                            <a href={instgarm} target="_blank" rel="noopener noreferrer">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src="https://f003.backblazeb2.com/file/flex-storage/8e_Q6aE3kZjg0MF80AdBl-1732896223768.png"
                                    alt="Instagram"
                                />
                            </a>
                        )}
                        {facebook && (
                            <a href={facebook} target="_blank" rel="noopener noreferrer">
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
