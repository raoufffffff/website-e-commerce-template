import { Outlet } from 'react-router-dom'
import Header from './container/Header';

function App() {

  return (
    <div>
      <Header />
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
