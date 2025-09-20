import React, { useEffect } from "react";
import getData from "../getData";

const Faqs = () => {
    const { main_color, faqs } = getData;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col px-4 py-10">
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Frequently Asked{" "}
                <span style={{ color: main_color }}>Questions</span>
            </h1>

            {/* FAQs */}
            <div className="max-w-4xl mx-auto w-full space-y-6">
                {faqs.length === 0 ? (
                    <h2 className="text-center text-gray-500 italic">
                        Not yet established
                    </h2>
                ) : (
                    faqs.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl shadow p-6 border border-gray-100"
                        >
                            <h3
                                className="text-lg font-semibold mb-3"
                                style={{ color: main_color }}
                            >
                                {item.question}
                            </h3>
                            <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Faqs;
