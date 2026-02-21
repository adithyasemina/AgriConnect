import Image from "next/image";
import HomePage from "./(user)/home/page"; 
import Header from "./components/header";

export default function Home() {
  return (

    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black ">
      {/* Hero Section */}
      <Header />
      {/* HomePage Section */}
      <section className="w-full bg-zinc-50 dark:bg-black">
        <HomePage />
      </section>
    </div>
  );
}
