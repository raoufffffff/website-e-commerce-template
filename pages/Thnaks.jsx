import { ArrowRight, BookmarkCheck, Copy } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa"; import getData from '../getData'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Thnaks = () => {
    const { thanks, phone, main_color } = getData
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [])
    return (
        <div
            className="w-[95%] mx-auto text-center  rounded-xl   pb-1.5"
        >
            <div
                className="border-t px-3 flex flex-col justify-center items-center border-gray-200 py-2"
            >
                {thanks.img && <BookmarkCheck
                    className="text-green-500 size-22 mt-10" />}
                {thanks.title && <h1
                    className="text-2xl md:text-3xl font-bold text-gray-800 mt-4 mb-2"
                >{thanks.titleText}</h1>}
                {thanks.about && <p
                    className=" md:text-lg text-gray-600 mt-1 md:mt-2 "
                >{thanks.aboutText}</p>}
                <div
                    className={`mt-5 mb-2 w-10/12 ${(thanks.phone || thanks.homebutton) && "border-y border-gray-200"} pt-4 pb-6  flex flex-col justify-center items-center`}
                >
                    {thanks.phone && <>
                        <h2
                            className="text-gray-600 mt-3 text-xs md:text-sm mb-2"
                        >You can inquire and call the number</h2>
                        <p
                            className="border border-gray-200  font-semibold flex items-center  shadow-2xl px-4 py-2 rounded-xl text-gray-700 text-xs md:text-sm cursor-pointer mt-3"
                        >
                            <Copy className="mr-2" />
                            {phone}</p>
                    </>}
                    {thanks.homebutton && (
                        <Link
                            to={'/'}
                            className="text-white px-4 py-2 rounded-xl text-xs shadow-md hover:opacity-90 transition mt-5 flex items-center"
                            style={{
                                backgroundColor: main_color, // ✅ dynamic color from JSON
                                boxShadow: `0 4px 14px ${main_color}80` // 80 = opacity in hex
                            }}
                        >
                            Home Page
                            <ArrowRight className="ml-2" />
                        </Link>
                    )}

                </div>
            </div>
            {thanks.media && <div
                className=" py-3 px-5 flex flex-col justify-between items-center text-sm text-gray-600"
            >
                <h3>Follow us on</h3>
                <div
                    className="flex gap-4 mt-4"
                >
                    <FaTiktok className="text-white bg-gray-700 rounded-full w-6 h-6 p-1 cursor-pointer" />
                    <FaInstagram className="text-white bg-gray-700 rounded-full w-6 h-6 p-1 cursor-pointer" />
                    <FaFacebookF className="text-white bg-gray-700 rounded-full w-6 h-6 p-1 cursor-pointer" />

                </div>
            </div>}

        </div>
    )
}

export default Thnaks