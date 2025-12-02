import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import getData from '../getData';

// Create a motion-enabled Link component for animations
const MotionLink = motion(Link);

const Header = () => {
    // Assuming getData is an object
    const { header, logo, store_name, language } = getData;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const menuVariants = {
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.3,
                ease: "easeInOut",
                when: "afterChildren"
            }
        },
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.3,
                ease: "easeInOut",
                staggerChildren: 0.1,
                when: "beforeChildren"
            }
        }
    };

    const menuItemVariants = {
        closed: { opacity: 0, x: -20, transition: { duration: 0.2 } },
        open: { opacity: 1, x: 0, transition: { duration: 0.3 } }
    };

    const headerStyle = { backgroundColor: header?.headercolor || '#fff' };
    const nameStyle = { color: header?.namecolor || '#000' };
    const iconStyle = { color: header?.barcolor || '#000' };

    // --- Translation Helper ---
    const isAr = language === "ar";

    return (
        <header
            style={headerStyle}
            className="bg-white shadow-sm  top-0 z-50"
        >
            <div className="mx-auto px-4 py-1 flex items-center justify-between">
                <Link to={'/'} className='flex items-center'>
                    {header?.logo && (
                        <img
                            className='h-20 w-20 mr-1 object-contain'
                            src={logo}
                            alt={store_name}
                        />
                    )}
                    {header?.name && (
                        <div style={nameStyle} className="text-2xl font-bold">
                            {store_name}
                        </div>
                    )}
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8">
                    <Link
                        style={nameStyle}
                        to={'/'}
                        className="text-gray-700 hover:opacity-80 transition-colors"
                    >
                        {isAr ? "الصفحة الرئيسية" : "Page d'accueil"}
                    </Link>
                    <Link
                        style={nameStyle}
                        to={'/faqs'}
                        className="text-gray-700 hover:opacity-80 transition-colors"
                    >
                        {isAr ? "الأسئلة الشائعة" : "FAQ"}
                    </Link>
                    <Link
                        style={nameStyle}
                        to={'/Contact'}
                        className="text-gray-700 hover:opacity-80 transition-colors"
                    >
                        {isAr ? "اتصل بنا" : "Contactez-nous"}
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center">
                    <button
                        onClick={toggleMenu}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        {isMenuOpen ? <X style={iconStyle} /> : <Menu style={iconStyle} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="md:hidden bg-white border-t rounded-b-2xl border-gray-100 overflow-hidden"
                    >
                        <motion.nav className="container mx-auto px-4 py-3 flex flex-col space-y-4">
                            <MotionLink
                                to={'/'}
                                className="text-gray-700 border-b border-b-gray-300 text-center py-2"
                                variants={menuItemVariants}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {isAr ? "الصفحة الرئيسية" : "Page d'accueil"}
                            </MotionLink>

                            <MotionLink
                                to={'/faqs'}
                                className="text-gray-700 border-b border-b-gray-300 text-center py-2"
                                variants={menuItemVariants}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {isAr ? "الأسئلة الشائعة" : "FAQ"}
                            </MotionLink>

                            <MotionLink
                                to={'/Contact'}
                                className="text-gray-700 text-center py-2"
                                variants={menuItemVariants}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {isAr ? "اتصل بنا" : "Contactez-nous"}
                            </MotionLink>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;