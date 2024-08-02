import { SignIn } from "@clerk/nextjs";


export default function Login() {
    // made it center
    return <>
        <div className="flex justify-center items-center h-screen">
            <SignIn />
        </div>
    </>
}