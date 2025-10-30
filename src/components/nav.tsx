import Link from "next/link";
import { Button } from "@/components/ui/button";
import useSWR, { mutate } from 'swr';
import React, { useState, useEffect, useRef, type JSX } from "react";
import Image from "next/image";
import ProfileCard from "@/components/ui/ProfileCard"; // 导入个人资料组件

/**
 * SVG Fan Icon component.
 * @param {React.SVGProps<SVGSVGElement>} props - SVG properties.
 * @returns {JSX.Element} The SVG element.
 */


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

/**
 * SVG Menu Icon component.
 * @param {React.SVGProps<SVGSVGElement>} props - SVG properties.
 * @returns {JSX.Element} The SVG element.
 */
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

/**
 * Fetcher function for SWR.
 * @param {string} url - API endpoint.
 * @returns {Promise<any>} The fetched data.
 */
const fetcher = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
        new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

/**
 * Custom hook to refresh user data.
 * @returns {Function} Function to refresh user data.
 */
function useRefreshUserData() {
  return () => {
    mutate('/api/get-user-info').then();
  };
}

/**
 * Navbar component.
 * @returns {JSX.Element} The Navbar element.
 */
export default function Navbar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showProfile, setShowProfile] = useState(false);//个人信息卡片

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fetch user data using SWR
  const { data: userData, error } = useSWR('/api/getUserInfo', fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    shouldRetryOnError: true,
  });

  //个人信息卡片
  const handleOpenProfile = () => {
    setShowProfile(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const refreshUserData = useRefreshUserData();



  return (
    <div className="bg-gray-950 text-gray-50 px-4 md:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link className="flex items-center gap-2 font-bold text-lg" href="/">
          <FanIcon className="w-6 h-6" />
          <span>Anime Hub</span>
        </Link>
        {/*<Link href="/" className="text-white hover:bg-gray-700 rounded px-3 py-2">Home</Link>*/}
        <Link href="/trending" className="text-white hover:bg-gray-700 rounded px-3 py-2">Trending</Link>
        <Link href="/movies" className="text-white hover:bg-gray-700 rounded px-3 py-2">Movies</Link>
        <Link href="/series" className="text-white hover:bg-gray-700 rounded px-3 py-2">Series</Link>
        <Link href="/report" className="text-white hover:bg-gray-700 rounded px-3 py-2">Report</Link>
      </div>
      <nav className={`${isMenuOpen ? "flex" : "hidden"} md:flex items-center gap-6`}>
        {userData && !error ? (
          <div className="relative" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="flex items-center gap-2">
              <Image
                src={userData.picture || 'https://avatars.githubusercontent.com/u/60091116?v=4'} // Use default or user avatar
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
                width={32}
                height={32}
              />
              <span>{userData.username}</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg">
                <div className="p-4 border-b">
                  <p className="text-sm text-gray-700">{userData.name}</p>
                  <p className="text-sm text-gray-500">ID: {userData.sub}</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => {
                      alert("功能暂未开放 敬请期待");
                    }}
                    className="w-full text-left text-sm text-blue-600 hover:bg-gray-100 p-2 rounded"
                  >
                    设置
                  </button>
                  <button
                      onClick={handleOpenProfile}
                      className="w-full text-left text-sm text-blue-600 hover:bg-gray-100 p-2 rounded"
                  >
                    编辑资料
                  </button>
                  <button
                      onClick={() => {
                        alert("功能暂未开放 敬请期待");
                      }}
                      className="w-full text-left text-sm text-blue-600 hover:bg-gray-100 p-2 rounded"
                  >
                    我的推送令牌
                  </button>
                  <button
                    onClick={() => {
                      window.location.assign('/api/logto/sign-out');
                      refreshUserData(); // Manually refresh user data
                    }}
                    className="w-full text-left text-sm text-red-600 hover:bg-gray-100 p-2 rounded"
                  >
                    Sign Out
                  </button>
                  {showProfile && <ProfileCard onClose={handleCloseProfile} />}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>
            <button className="text-white hover:bg-[#333]"
              onClick={() => {
                window.location.assign('/api/logto/sign-in');
                refreshUserData(); // Manually refresh user data
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
    </div>
  );
}
