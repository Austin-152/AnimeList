import React from 'react';
import { Index as IndexComponent } from '../components/MainComponent';
import 'tailwindcss/tailwind.css';
import Navbar from "@/components/nav";
import Footer from "@/components/footer";
import {Scene} from "@/components/scene";

const HomePage = () => (
  <div>
      <Navbar />
      <Scene/>
        <IndexComponent />
      <Footer />
  </div>
);

export default HomePage;
