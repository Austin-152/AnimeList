import React from 'react';
import { Index as IndexComponent } from '../components/MainComponent';
import Navbar from "@/components/nav";
import Footer from "@/components/footer";

const HomePage = () => (
  <div>
      <Navbar />
      {/*<Scene/>*/}
        <IndexComponent />
      <Footer />
  </div>
);

export default HomePage;
