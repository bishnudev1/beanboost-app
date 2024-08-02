import { auth } from '@clerk/nextjs/server';
import { SignInButton, UserButton } from "@clerk/nextjs";
import Head from 'next/head';

export default function Navbar() {
    const { userId } : { userId: string | null } = auth();

    console.log(auth());

  return (
    
    <div className="bg-black text-white py-4">
            <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" 
        // crossOrigin="true" 
        
        />
        <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-roboto">
          {/* Logo or Brand Name */}
          Beanboost
        </div>
        <div>
          {userId !== null ? (
            <UserButton>
              <button className="bg-gray-800 hover:bg-gray-700 text-xs py-2 px-6 rounded">
                Profile
              </button>
            </UserButton>
          ) : (
            <SignInButton>
              <button className="bg-gray-800 hover:bg-gray-700 text-xs py-2 px-6 rounded font-mono">
                Login with Clerk
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </div>
  );
}
