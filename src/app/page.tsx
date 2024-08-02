import Bean from "./components/Bean";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import client from "@/db/appwrite";

export default function Home() {
  if (client === null) {
    console.log("Loading...");
    
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center p-6 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4">Loading...</h1>
          <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  } else {
    console.log("Loaded!");
    
    return (
      <>
        <Navbar />
        <Bean />
        <Footer />
      </>
    );
  }
}
