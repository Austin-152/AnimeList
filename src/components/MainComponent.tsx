import React, { useState } from 'react';
import { Alert } from 'antd';
import {SearchBox} from "@/components/search/searchox";

export function Index() {
  const [error] = useState<string | null>(null);
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="bg-gray-950 text-gray-50 py-12 md:py-24 px-4 md:px-6 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Welcome to Anime Hub</h1>
          <p className="text-lg md:text-xl mt-4 max-w-2xl text-center">
            Discover the latest and greatest anime series, movies, and more.
          </p>
          <SearchBox placeholder="Search for anime..." />
        </section>
          {error && <Alert message={error} type="error" showIcon className="mt-4" />}
      </main>
    </div>
  );
}
