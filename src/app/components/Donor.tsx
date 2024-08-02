"use client";
import { databases } from "@/app/db/appwrite";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface Donor {
  name: string;
  amount: string;
  date: string;
}

export default function Donor() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    getDonors();
  }, []);

  // Get the collection
  async function getDonors() {
    try {
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_DONATORS_COLLECTIONS_ID!
      );

      const data = response.documents;
      // Assuming the response documents have the type Donor
      setDonors(data as unknown as Donor[]);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center p-6 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4">Loading...</h1>
          <CircularProgress color="inherit" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white py-16 px-4 flex items-center justify-center">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center font-lobster animate-bounce">
          Recent Donations
        </h1>
        <div className="max-h-96 overflow-y-auto bg-gray-900 rounded-lg shadow-lg p-6">
          {donors.map((donor, index) => (
            <div
              key={index}
              className="flex items-center mb-4 bg-gray-800 p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
            >
              <span role="img" aria-label="fire" className="text-2xl mr-4">
                🔥
              </span>
              <div>
                <p className="text-sm font-roboto">
                  {donor.name} has donated ₹{donor.amount} on {donor.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
