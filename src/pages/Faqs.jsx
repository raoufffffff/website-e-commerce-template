import React, { useEffect } from "react";
import faq from '../faq.json'
import getData from "../getData";
const Faqs = () => {
    const { main_color } = getData

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [])
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Frequently Asked <span
                        style={{
                            color: main_color
                        }}
                    >Questions</span>
                </h1>

                <div className="space-y-4">
                    {faq.length === 0 ?
                        <h1
                            className="text-center text-[#333e]"
                        >Not yet established</h1>

                        : faq.map((item) => (
                            <div
                                key={item.id}
                                className="border border-gray-200 rounded-lg overflow-hidden"
                            >
                                <div className="w-full flex justify-between items-center p-4 text-left text-gray-800 font-medium bg-gray-50">
                                    {item.question}
                                </div>
                                <div className="p-4 text-gray-600 border-t">{item.answer}</div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Faqs;
