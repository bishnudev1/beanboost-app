import Head from "next/head";

export default function Footer() {
    return (
      <footer className="bg-black text-white py-4">
                    <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" 
        // crossOrigin="true" 
        
        />
        </Head>
        <div className="container mx-auto text-center">
          <p className="text-lg font-roboto">
           Copyrighted by &copy;Beanboost {new Date().getFullYear()}
          </p>
          <p className="text-sm font-roboto">Developed by Bishnudev Khutia</p>
        </div>
      </footer>
    );
  }
  