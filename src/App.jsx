import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react';

function App() {

  return (
    <div>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">Inner<span className="text-amber-600">Wolf</span></div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-amber-600">Home</a>
            <a href="#" className="text-gray-700 hover:text-amber-600">Shop</a>
            <a href="#" className="text-gray-700 hover:text-amber-600">Collections</a>
            <a href="#" className="text-gray-700 hover:text-amber-600">About</a>
            <a href="#" className="text-gray-700 hover:text-amber-600">Contact</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>
      <Outlet />
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">InnerWolf</h3>
              <p className="text-gray-400">Premium quality apparel for the modern individual who values style, comfort, and sustainability.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Shop</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Men's Collection</a></li>
                <li><a href="#" className="hover:text-white">Women's Collection</a></li>
                <li><a href="#" className="hover:text-white">Accessories</a></li>
                <li><a href="#" className="hover:text-white">New Arrivals</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
                <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe for updates and exclusive offers</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-md w-full text-gray-900"
                />
                <button
                  type="submit"
                  className="bg-amber-600 px-4 py-2 rounded-r-md hover:bg-amber-700"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2023 InnerWolf. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
