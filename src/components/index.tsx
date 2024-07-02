// pages/index.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from '@/components/ui/carousel';
import { useState, useEffect } from 'react';
import { fetchSearchResults } from '@/app/api/api';

interface DataItem {
  id: number;
  typeId1: number;
  name: string;
  picThumb: string;
}

interface ApiResponse {
  code: number;
  data: DataItem[];
  msg: string;
}

export default function Index() {
  const [animeData, setAnimeData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetchSearchResults('美', page, size);
        if (response.code === 200) {
          const updatedData = response.data.map((anime) => ({
            ...anime,
            picThumb: `https://www.olevod.tv/${anime.picThumb}`,
          }));
          setAnimeData(updatedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [page, size]);

  return (
      <div className="flex flex-col min-h-screen">
        <header className="bg-gray-950 text-gray-50 px-4 md:px-6 py-3 flex items-center justify-between">
          <Link className="flex items-center gap-2 font-bold text-lg" href="#">
            <FanIcom className="w-6 h-6"></FanIcom>
            <span>Anime Hub</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link className="hover:underline" href="#">
              Browse
            </Link>
            <Link className="hover:underline" href="#">
              Search
            </Link>
            <Link className="hover:underline" href="#">
              Subscriptions
            </Link>
            <Button className="text-gray-50 hover:bg-gray-900/50" variant="ghost">
              Sign In
            </Button>
            <Button className="bg-[#ff6b6b] text-white hover:bg-[#ff4d4d]" variant="outline">
              Sign Up
            </Button>
          </nav>
          <Button className="md:hidden" size="icon" variant="ghost">
            <MenuIcon className="w-6 h-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </header>
        <main className="flex-1">
          <section className="bg-gray-950 text-gray-50 py-12 md:py-24 px-4 md:px-6 flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Welcome to Anime Hub</h1>
            <p className="text-lg md:text-xl mt-4 max-w-2xl text-center">
              Discover the latest and greatest anime series, movies, and more.
            </p>
            <form className="mt-8 w-full max-w-xl">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                    className="bg-gray-900 border-gray-800 text-gray-50 pl-12 pr-4 py-3 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-gray-700"
                    placeholder="Search for anime..."
                    type="search"
                />
              </div>
            </form>
          </section>
          <section className="py-12 md:py-24 px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Featured Anime</h2>
              <Link className="text-sm md:text-base hover:underline" href="#">
                View all
              </Link>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Carousel className="w-full max-w-6xl">
                  <CarouselContent>
                    {animeData.map((anime) => (
                        <CarouselItem key={anime.id}>
                          <div className="p-2">
                            <Card className="group">
                              <Link href="#">
                                <img
                                    alt={`https://www.olevod.tv/player/vod/${anime.typeId1}-${anime.id}-1.html`}
                                    className="rounded-lg object-cover w-full aspect-[2/3] group-hover:opacity-80 transition-opacity"
                                    height="300"
                                    src={anime.picThumb}
                                    width="200"
                                />
                                <div className="mt-4">
                                  <h3 className="text-lg font-bold">{anime.name}</h3>
                                  <p className="text-gray-400 text-sm">Action, Drama, Fantasy</p>
                                </div>
                              </Link>
                            </Card>
                          </div>
                        </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
            )}
          </section>
          <section className="py-12 md:py-24 px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Trending Anime</h2>
              <Link className="text-sm md:text-base hover:underline" href="#">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Card className="group">
                <Link href="#">
                  <img
                      alt="Chainsaw Man"
                      className="rounded-lg object-cover w-full aspect-[2/3] group-hover:opacity-80 transition-opacity"
                      height="300"
                      src="/placeholder.svg"
                      width="200"
                  />
                  <div className="mt-4">
                    <h3 className="text-lg font-bold">Chainsaw Man</h3>
                    <p className="text-gray-400 text-sm">Action, Supernatural</p>
                  </div>
                </Link>
              </Card>
              <Card className="group">
                <Link href="#">
                  <img
                      alt="Spy x Family"
                      className="rounded-lg object-cover w-full aspect-[2/3] group-hover:opacity-80 transition-opacity"
                      height="300"
                      src="/placeholder.svg"
                      width="200"
                  />
                  <div className="mt-4">
                    <h3 className="text-lg font-bold">Spy x Family</h3>
                    <p className="text-gray-400 text-sm">Action, Comedy</p>
                  </div>
                </Link>
              </Card>
              <Card className="group">
                <Link href="#">
                  <img
                      alt="Jujutsu Kaisen"
                      className="rounded-lg object-cover w-full aspect-[2/3] group-hover:opacity-80 transition-opacity"
                      height="300"
                      src="/placeholder.svg"
                      width="200"
                  />
                  <div className="mt-4">
                    <h3 className="text-lg font-bold">Jujutsu Kaisen</h3>
                    <p className="text-gray-400 text-sm">Action, Supernatural</p>
                  </div>
                </Link>
              </Card>
              <Card className="group">
                <Link href="#">
                  <img
                      alt="Tokyo Revengers"
                      className="rounded-lg object-cover w-full aspect-[2/3] group-hover:opacity-80 transition-opacity"
                      height="300"
                      src="/placeholder.svg"
                      width="200"
                  />
                  <div className="mt-4">
                    <h3 className="text-lg font-bold">Tokyo Revengers</h3>
                    <p className="text-gray-400 text-sm">Action, Drama</p>
                  </div>
                </Link>
              </Card>
            </div>
          </section>
          <section className="py-12 md:py-24 px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Recently Added</h2>
              <Link className="text-sm md:text-base hover:underline" href="#">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Card className="group">
                <Link href="#">
                  <img
                      alt="Blue Lock"
                      className="rounded-lg object-cover w-full aspect-[2/3] group-hover:opacity-80 transition-opacity"
                      height="300"
                      src="/placeholder.svg"
                      width="200"
                  />
                  <div className="mt-4">
                    <h3 className="text-lg font-bold">Blue Lock</h3>
                    <p className="text-gray-400 text-sm">Sports, Thriller</p>
                  </div>
                </Link>
              </Card>
              <Card className="group">
                <Link href="#">
                  <img
                      alt="Demon Slayer"
                      className="rounded-lg object-cover w-full aspect-[2/3] group-hover:opacity-80 transition-opacity"
                      height="300"
                      src="/placeholder.svg"
                      width="200"
                  />
                  <div className="mt-4">
                    <h3 className="text-lg font-bold">Demon Slayer</h3>
                    <p className="text-gray-400 text-sm">Action, Fantasy</p>
                  </div>
                </Link>
              </Card>
              <Card className="group">
                <Link href="#">
                  <img
                      alt="Attack on Titan"
                      className="rounded-lg object-cover w-full aspect-[2/3] group-hover:opacity-80 transition-opacity"
                      height="300"
                      src="/placeholder.svg"
                      width="200"
                  />
                  <div className="mt-4">
                    <h3 className="text-lg font-bold">Attack on Titan</h3>
                    <p className="text-gray-400 text-sm">Action, Drama</p>
                  </div>
                </Link>
              </Card>
              <Card className="group">
                <Link href="#">
                  <img
                      alt="My Hero Academia"
                      className="rounded-lg object-cover w-full aspect-[2/3] group-hover:opacity-80 transition-opacity"
                      height="300"
                      src="/placeholder.svg"
                      width="200"
                  />
                  <div className="mt-4">
                    <h3 className="text-lg font-bold">My Hero Academia</h3>
                    <p className="text-gray-400 text-sm">Action, Superhero</p>
                  </div>
                </Link>
              </Card>
            </div>
          </section>
        </main>
        <footer className="bg-gray-950 text-gray-50 px-4 md:px-6 py-12 md:py-24 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Link className="flex items-center gap-2 font-bold text-lg" href="#">
              <FanIcon className="w-6 h-6" />
              <span>Anime Hub</span>
            </Link>
            <p className="mt-4 max-w-md text-center md:text-left text-gray-400">
              Anime Hub is your go-to source for the latest and greatest in anime. Discover new series, watch trailers, and stay up-to-date with the anime community.
            </p>
          </div>
          <nav className="flex flex-col md:flex-row gap-8">
            <Link className="hover:underline" href="#">
              About Us
            </Link>
            <Link className="hover:underline" href="#">
              Terms of Service
            </Link>
            <Link className="hover:underline" href="#">
              Privacy Policy
            </Link>
            <Link className="hover:underline" href="#">
              Contact
            </Link>
          </nav>
        </footer>
      </div>
  );
}

export 
