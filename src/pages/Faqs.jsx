import React from "react";

const Faqs = () => {
    const faq = [
        { id: 1, question: "How can I track my order?", answer: "You can track your order using the tracking link sent to your email after purchase." },
        { id: 2, question: "Do you ship internationally?", answer: "Yes, we ship worldwide. Shipping costs depend on your country." },
        { id: 3, question: "What payment methods are accepted?", answer: "We accept credit cards, PayPal, and other local payment options." },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Frequently Asked <span className="text-amber-600">Questions</span>
                </h1>

                <div className="space-y-4">
                    {faq.map((item) => (
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
