import client, { databases } from "@/app/db/appwrite";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  async function submitContactForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) {
      return;
    }

    const id = Math.random().toString(36).substring(7);

    if (!user) {
      return router.push("/login");
    }

    if (email === "" || description === "") {
      return toast.error("Please fill in all fields");
    }

    try {
      setLoading(true);
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_CONTACTS_COLLECTIONS_ID!,
        id,
        {
          id,
          email,
          description,
        }
      );

      toast.success("Message sent successfully");
    } catch (error: any) {
      toast.error("An error occurred. Please try again later");
    } finally {
      setLoading(false);
      setEmail("");
      setDescription("");
    }
  }

  return (
    <div className="bg-black text-white py-4 px-4 flex items-center justify-center">
      <div className="container mx-auto max-w-lg bg-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-center font-lobster animate-bounce">
          Reach Out to Me
        </h1>
        <form onSubmit={submitContactForm}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-400"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full p-4 text-sm rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-400"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full p-4 text-sm rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tell us how we can help you..."
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium shadow-md transform hover:scale-105 transition-transform duration-300"
            >
              {loading ? (
                <CircularProgress color="inherit" size={15} />
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
