import { auth } from '@clerk/nextjs/server';
import { SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
    const { userId } : { userId: string | null } = auth();

    console.log(auth());

  return (
    <div className="bg-black text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
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
              <button className="bg-gray-800 hover:bg-gray-700 text-xs py-2 px-6 rounded">
                Login with Clerk
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </div>
  );
}
