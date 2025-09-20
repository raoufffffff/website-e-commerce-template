import React from 'react'
import getData from '../getData'

const Footer = () => {
    const { store_name, main_color, textColor } = getData
    return (
        <footer
            style={{
                backgroundColor: main_color
            }}
        >
            <div
                style={{
                    clear: textColor
                }}
                className="  py-4 text-center ">
                <p>© {new Date().getFullYear()} {store_name}. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer