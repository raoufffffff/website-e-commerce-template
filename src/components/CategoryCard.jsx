import React from 'react'

const CategoryCard = ({ category, main_color, changeCategory, selectedCategory }) => {
    return (
        <button
            onClick={() => changeCategory(category.name)}
            style={{
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: selectedCategory === category.name ? main_color : "#fff0"
            }}
            className={`group min-w-[70%] max-w-[70%] sm:min-w-[30%] sm:max-w-[30%] md:min-w-[30%] md:max-w-[30%] max-h-[300px] lg:min-w-[20%] lg:max-w-[20%] relative overflow-hidden rounded-xl transition-all`}
        >
            <div className="aspect-square w-full overflow-hidden">
                <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 group-hover:bg-opacity-10 transition-opacity"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                <span className="text-white text-sm font-medium block text-center">{category.name}</span>
            </div>
        </button>
    )
}

export default CategoryCard