import React from "react";
import { Tv, Volume2, Gamepad, CreditCard } from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Carousel */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 h-[600px]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          <img
            src="/www.webp"
            alt="TV Display"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className=" flex relative container mx-auto px-4 h-full  items-center justify-center">
          <div className="max-w-4xl text-white ">
            <h1 className="text-5xl  font-bold mb-6  leading-normal text-center ">
              Perfect Viewing Experience Starts Here
            </h1>
            <p className="text-xl mb-8  text-gray-200 text-center">
              Discover our new collection of advanced TVs with amazing picture
              quality and smart technology
            </p>
            <div className="flex justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300 shadow-lg">
                View Hot Deals
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 ">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ">
            <div className="text-center p-6 hover:shadow-lg rounded-xl transition duration-300">
              <Tv size={40} className="mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">
                Amazing Picture Quality
              </h3>
              <p className="text-gray-600">
                4K resolution with vibrant, stunning colors
              </p>
            </div>
            <div className="text-center p-6 hover:shadow-lg rounded-xl transition duration-300">
              <Volume2 size={40} className="mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Powerful Sound</h3>
              <p className="text-gray-600">
                Surround sound system for cinematic experience
              </p>
            </div>
            <div className="text-center p-6 hover:shadow-lg rounded-xl transition duration-300">
              <Gamepad size={40} className="mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Gaming Experience</h3>
              <p className="text-gray-600">
                HDMI 2.1 support with 120Hz refresh rate
              </p>
            </div>
            <div className="text-center p-6 hover:shadow-lg rounded-xl transition duration-300">
              <CreditCard size={40} className="mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Flexible Payments</h3>
              <p className="text-gray-600">Up to 36 interest-free payments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
              <div className="relative">
                <img
                  src="https://sm.ign.com/ign_il/screenshot/default/d3_58m8.jpg"
                  alt="OLED TV"
                  className="w-full h-72 object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  New!
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">LG OLED C3</h3>
                <p className="text-gray-600 mb-4">
                  65&quot; Smart OLED TV with advanced α9 processor
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">$7,990</span>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
              <div className="relative">
                <img
                  src="https://ecdn.speedsize.com/566103a2-53f1-4a19-905b-45d84f5c6ca2/www.bettershop.co.il/wp-content/uploads/2024/05/%D7%98%D7%9C%D7%95%D7%95%D7%99%D7%96%D7%99%D7%94-%D7%A1%D7%9E%D7%A1%D7%95%D7%A0%D7%92-55-%D7%90%D7%99%D7%A0%D7%A5-%D7%93%D7%92%D7%9D-QE55QN90D-120Hz-%D7%91%D7%98%D7%9B%D7%A0%D7%95%D7%9C%D7%95%D7%92%D7%99%D7%99%D7%AA-Samsung-Neo-QLED-4K-%D7%97%D7%9B%D7%9E%D7%94-%D7%99%D7%91%D7%95%D7%90%D7%9F-%D7%A8%D7%A9%D7%9E%D7%99-%D7%A1%D7%9E%D7%9C%D7%99%D7%99%D7%9F.jpg"
                  alt="QLED TV"
                  className="w-full h-72 object-cover"
                />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  Sale!
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Samsung Neo QLED</h3>
                <p className="text-gray-600 mb-4">
                  75&quot; Smart QLED TV with Mini LED backlight
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">$9,990</span>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
              <div className="relative">
                <img
                  src="https://img.wisebuy.co.il/data/pics/Article/e-tv/A90J_65_2132549494141292876.jpg"
                  alt="4K TV"
                  className="w-full h-72 object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  Popular
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Sony Bravia XR</h3>
                <p className="text-gray-600 mb-4">
                  55&quot; Smart LED TV with cognitive processor
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">$5,990</span>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Leading Brands
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center">
            <div className="grayscale hover:grayscale-0 transition duration-300">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/1024px-Samsung_Logo.svg.png"
                alt="Samsung"
                className="mx-auto"
              />
            </div>
            <div className="grayscale hover:grayscale-0 transition duration-300">
              <img
                src="https://images.squarespace-cdn.com/content/502a8efb84ae42cbccf920c4/1585574686746-VCDIHSO21O76WR72WIAD/LG-Logo.png?format=1500w&content-type=image%2Fpng"
                alt="LG"
                className="mx-auto"
              />
            </div>
            <div className="grayscale hover:grayscale-0 transition duration-300">
              <img src="/sony_bg_removed.png" alt="Sony" className="mx-auto" />
            </div>
            <div className="grayscale hover:grayscale-0 transition duration-300">
              <img
                src="https://crystalpromotion.com/wp-content/uploads/2020/03/tcl-logo-1.gif"
                alt="TCL"
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Looking for the Perfect TV?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Our professional team is here to help with personalized advice and
            precise recommendations
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg hover:bg-blue-50 transition duration-300 shadow-lg">
            Contact Us Now
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
