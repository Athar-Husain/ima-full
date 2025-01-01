import React from "react";
import Header from "../Components/Header.jsx";
import Hero from "../Components/Hero.jsx";
import CountSection from "../Components/CountSection.jsx";
import WhyUs from "../Components/WhyUs.jsx";
import Members from "../Components/Members.jsx";
import Footer from "../Components/Footer.jsx";

const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      {/* <About/> */}
      <CountSection />
      {/* <WhyUs/> */}
      {/* <Features/> */}
      {/* <Courses/> */}
      <Members />
      <Footer />
    </>
  );
};

export default HomePage;
