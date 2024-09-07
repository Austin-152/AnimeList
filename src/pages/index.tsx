import React from 'react';
import { Index as IndexComponent } from '../components/MainComponent';
import 'tailwindcss/tailwind.css';
import Navbar from "@/components/nav";
import Footer from "@/components/footer";

const HomePage = () => (
  <div>
      <Navbar />
        <IndexComponent />
      <Footer />
  </div>
);

export default HomePage;
