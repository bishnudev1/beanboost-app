import { auth } from '@clerk/nextjs/server';

export default function Bean() {

    return (
      <div className="bg-black text-white min-h-screen py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-center">Boost My Brew 🫘</h1>
          
          <div className="flex justify-center mb-4">
            <img
              src="https://static.vecteezy.com/system/resources/previews/027/927/578/non_2x/coffee-logo-ai-generative-free-png.png"
              alt="Boy drinking coffee"
              width={300}
              height={300}
              className="rounded"
            />
          </div>
  
          <p className="text-lg text-center mb-8">If you like my works then consider buying me some coffee beans 😊</p>
  
          <div className="flex flex-col lg:flex-row items-start lg:items-center">
            {/* Left Section - Donations Info */}
            <div className="w-full lg:w-1/2 flex flex-col items-center">
              <div className="w-full h-96 overflow-y-auto space-y-4">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded shadow-lg w-full text-center">
                    <p className="text-gray-400">
                      John Doe has donated $100 on 20/56/2024 <span role="img" aria-label="fire">🔥</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Right Section - Contact Form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center">
              <form className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-md h-96 flex flex-col justify-between">
                <div>
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-2" htmlFor="name">Name</label>
                    <input
                      className="w-full p-2 rounded bg-gray-700 text-white"
                      type="text"
                      id="name"
                      name="name"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
                    <input
                      className="w-full p-2 rounded bg-gray-700 text-white"
                      type="email"
                      id="email"
                      name="email"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-2" htmlFor="message">Message</label>
                    <textarea
                      className="w-full p-2 rounded bg-gray-700 text-white"
                      id="message"
                      name="message"
                      rows={4}
                      required
                    ></textarea>
                  </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  