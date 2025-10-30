import React from 'react';
import { Index as IndexComponent } from '../components/MainComponent';
import Navbar from "@/components/nav";
import Footer from "@/components/footer";
import Head from "next/head";

const HomePage = () => (
  <div>
      <Head>
          <title>哈基米影院</title>
          <meta name="description" content="次世代免费动漫影像平台 - 极速 · 超清 · 智能发现" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      {/*<Scene/>*/}
        <IndexComponent />
      <Footer />
  </div>
);

export default HomePage;
