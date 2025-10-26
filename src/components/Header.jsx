import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import getData from '../getData';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const { header, logo, store_name } = getData

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
                ease: "easeInOut"
            }
        },
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const menuItemVariants = {
        closed: {
            opacity: 0,
            x: -20,
            transition: {
                duration: 0.2
            }
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <header
            style={{
                backgroundColor: header.headercolor
            }}
            className="bg-white shadow-sm sticky top-0 z-50">
            <div className=" mx-auto px-4 py-1 flex   items-center">
                <Link
                    to={'/'}
                    className='flex  items-center'
                >
                    {header.logo && <img
                        className='h-20 w-20 mr-1'
                        src={logo}
                    />}
                    {header.name && <div
                        style={{
                            color: header.namecolor
                        }}
                        className="text-2xl font-bold">{store_name}</div>}
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex mr-auto  space-x-8">
                    <Link
                        style={{
                            color: header.namecolor
                        }}
                        to={'/'} className="text-gray-700 flex justify-center text-center  transition-colors">الصفحة الرئيسية</Link>
                    <Link
                        style={{
                            color: header.namecolor
                        }}
                        to={'/faqs'}
                        className="text-gray-700 flex justify-center text-center  transition-colors">الأسئلة الشائعة</Link>
                    <Link
                        style={{
                            color: header.namecolor
                        }}
                        to={'/Contact'} className="text-gray-700 flex justify-center text-center  transition-colors">اتصل بنا</Link>
                </nav>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center mr-auto space-x-4">
                    <button
                        onClick={toggleMenu}
                        className="p-2 md:hidden rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <X style={{
                                color: header.barcolor
                            }} />
                        ) : (
                            <Menu
                                style={{
                                    color: header.barcolor
                                }}
                            />
                        )}
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
                            <Link
                                to={'/'}
                                className="text-gray-700 border-b border-b-gray-300 text-center  transition-colors py-2"
                                variants={menuItemVariants}
                            >
                                الصفحة الرئيسية
                            </Link>
                            <Link
                                to={'/faqs'}
                                className="text-gray-700 border-b border-b-gray-300 text-center  transition-colors py-2"
                                variants={menuItemVariants}
                            >
                                الأسئلة الشائعة
                            </Link>
                            <Link
                                to={'/Contact'}
                                className="text-gray-700 text-center  transition-colors py-2"
                                variants={menuItemVariants}
                            >
                                اتصل بنا
                            </Link>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;