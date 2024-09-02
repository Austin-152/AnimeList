import Link from "next/link";
import { Button } from "@/components/ui/button";
import { type LogtoContext } from '@logto/next';
import useSWR from 'swr';
import {useState} from "react";

function FanIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"
      />
      <path d="M12 12v.01" />
    </svg>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { data: userData } = useSWR<LogtoContext>('/api/logto/user');

  return (
    <header className="bg-gray-950 text-gray-50 px-4 md:px-6 py-3 flex items-center justify-between">
      <Link className="flex items-center gap-2 font-bold text-lg" href="#">
        <FanIcon className="w-6 h-6" />
        <span>Anime Hub</span>
      </Link>
      <nav className={`${isMenuOpen ? "flex" : "hidden"} md:flex items-center gap-6`}>
        {userData?.isAuthenticated ? (
          <p>
            Hello, {userData.claims?.sub},
            <button
              onClick={() => {
                window.location.assign('/api/logto/sign-out');
              }}
            >
              Sign Out
            </button>
          </p>
        ) : (
          <p>
            <button className="text-white hover:bg-[#333]"
              onClick={() => {
                window.location.assign('/api/logto/sign-in');
              }}
            >
              Sign In
            </button>
          </p>
        )}
      </nav>
      <Button
        className="md:hidden"
        size="icon"
        variant="ghost"
        onClick={toggleMenu}
      >
        <MenuIcon className="w-6 h-6" />
        <span className="sr-only">Toggle menu</span>
      </Button>
    </header>
  );
}
