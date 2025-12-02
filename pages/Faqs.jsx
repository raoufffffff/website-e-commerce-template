import React, { useEffect } from "react";
import getData from "../getData";

const Faqs = () => {
    // Safe destructuring with default values
    const { main_color = '#000', faqs = [], language = 'fr' } = getData || {};

    const isAr = language === "ar";

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    // --- Translations ---
    const t = {
        titlePart1: isAr ? "الأسئلة" : "Questions",
        titlePart2: isAr ? "الشائعة" : "Fréquentes",
        empty: isAr ? "لم يتم إضافة الأسئلة بعد" : "Aucune question disponible pour le moment",
    };

    return (
        <div
            className="min-h-screen bg-gray-50 flex flex-col px-4 py-10"
            dir={isAr ? "rtl" : "ltr"} // 🟢 Auto-adjust direction
        >
            {/* ✅ Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                {t.titlePart1}
                <span
                    className="mx-2"
                    style={{ color: main_color }}
                >
                    {t.titlePart2}
                </span>
            </h1>

            {/* ✅ Questions List */}
            <div className="max-w-4xl mx-auto w-full space-y-6">
                {(!faqs || faqs.length === 0) ? (
                    <div className="flex flex-col items-center justify-center py-10">
                        <h2 className="text-center text-gray-500 italic text-lg">
                            {t.empty}
                        </h2>
                    </div>
                ) : (
                    faqs.map((item, index) => (
                        <div
                            key={item.id || index} // Fallback to index if id is missing
                            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
                        >
                            <h3
                                className="text-lg font-bold mb-3"
                                style={{ color: main_color }}
                            >
                                {item.question}
                            </h3>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {item.answer}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Faqs;