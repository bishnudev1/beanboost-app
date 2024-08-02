import React, { lazy, Suspense } from "react";
import client from "@/app/db/appwrite";
import { Toaster } from "react-hot-toast";
import CircularProgress from '@mui/material/CircularProgress';

// Lazy load components
const Bean = lazy(() => import("./components/Bean"));
const Footer = lazy(() => import("./components/Footer"));
const Navbar = lazy(() => import("./components/Navbar"));

export default function Home() {
  if (client === null) {
    console.log("Loading...");
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center p-6 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4">Loading...</h1>
          <CircularProgress color="inherit" />
        </div>
      </div>
    );

  } else {
    console.log("Loaded!");

    return (
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="text-center p-6 bg-gray-800 rounded-lg shadow-lg">
              <h1 className="text-4xl font-bold mb-4">Loading...</h1>
              <CircularProgress color="inherit" />
            </div>
          </div>
        }
      >
        <Navbar />
        <Bean />
        <Footer />
        <Toaster position="top-center" reverseOrder={false} />
      </Suspense>
    );
  }
}
