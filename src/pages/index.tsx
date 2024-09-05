// src/pages/index.tsx
import React from 'react';
import { Index as IndexComponent } from '../components/index';
import 'tailwindcss/tailwind.css';
import Navbar from "@/components/nav";

const HomePage = () => (
  <div>
      <Navbar />
        <IndexComponent />
  </div>
);

export default HomePage;
