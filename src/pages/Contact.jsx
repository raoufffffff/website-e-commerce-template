import React from "react";
import { Phone, MessageCircle, Facebook, Instagram } from "lucide-react";
import { FaWhatsapp, FaViber } from "react-icons/fa"; // for WhatsApp & Viber
import getData from "../getData";

const Contact = () => {
    const { phone, main_color } = getData
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Contact <span
                        style={{
                            color: main_color
                        }}
                    >Us</span>
                </h1>

                <div className="space-y-6">
                    {/* Phone */}
                    <a
                        href={`tel:${phone}`}
                        className="flex items-center gap-3 justify-center text-gray-700 hover:text-amber-600 transition-colors"
                    >
                        <Phone className="w-6 h-6" />
                        <span className="font-medium">{phone}</span>
                    </a>

                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/123456789"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 justify-center text-gray-700 hover:text-green-600 transition-colors"
                    >
                        <FaWhatsapp className="w-6 h-6" />
                        <span className="font-medium">WhatsApp</span>
                    </a>

                    {/* Viber */}
                    <a
                        href="viber://chat?number=%2B123456789"
                        className="flex items-center gap-3 justify-center text-gray-700 hover:text-purple-600 transition-colors"
                    >
                        <FaViber className="w-6 h-6" />
                        <span className="font-medium">Viber</span>
                    </a>
                    {/* Social Media Links */}
                    <p
                        className='text-gray-600 w-10/12 mx-auto text-sm text-center my-5'
                    >We will be happy to answer your questions or provide you with more information.</p>
                    <div
                        className='flex gap-5 justify-center'
                    >
                        <a
                            href='#'>

                            <img
                                className='w-10 h-10 rounded-full'
                                src='https://f003.backblazeb2.com/file/flex-storage/3iCF2TDOxp3bPyLetMWqo-1732896223843.png' />
                        </a>
                        <a
                            href='#'>

                            <img
                                className='w-10 h-10 rounded-full'
                                src='https://f003.backblazeb2.com/file/flex-storage/8e_Q6aE3kZjg0MF80AdBl-1732896223768.png' />
                        </a>
                        <a
                            href='#'>

                            <img
                                className='w-10 h-10 rounded-full'
                                src='https://f003.backblazeb2.com/file/flex-storage/iIpdFi_ynEWVoUkKE7fTj-1732896163852.png' />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
