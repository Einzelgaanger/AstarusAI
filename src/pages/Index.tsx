import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { Advantages } from "@/components/Advantages";
import { UseCases } from "@/components/UseCases";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0a0812]">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Advantages />
      <UseCases />
      <Footer />
    </div>
  );
};

export default Index;
