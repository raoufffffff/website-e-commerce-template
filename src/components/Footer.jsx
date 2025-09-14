import React from 'react'
import getData from '../getData'

const Footer = () => {
    const { store_name } = getData
    return (
        <footer className="bg-gray-900 text-white">
            <div className="border-t border-gray-800  py-4 text-center text-gray-400">
                <p>© {new Date().getFullYear()} {store_name}. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer