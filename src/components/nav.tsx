import Link from "next/link";
import { Button } from "@/components/ui/button";
import useSWR, { mutate } from 'swr';
import { useState, useEffect, useRef } from "react";

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

const fetcher = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { data: userData, error } = useSWR('/api/getUserInfo', fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    shouldRetryOnError: true,
    onSuccess: (data) => {
    },
    onError: (err) => {
      console.error("Error fetching user data:", err);
    }
  });

  useEffect(() => {
    // ComponentDidMount
    return () => {
      // ComponentWillUnmount
    };
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

  const refreshUserData = () => {
    mutate('/api/get-user-info').then();
  };

  return (
    <header className="bg-gray-950 text-gray-50 px-4 md:px-6 py-3 flex items-center justify-between">
      <Link className="flex items-center gap-2 font-bold text-lg" href="/">
        <FanIcon className="w-6 h-6" />
        <span>Anime Hub</span>
      </Link>
      <nav className={`${isMenuOpen ? "flex" : "hidden"} md:flex items-center gap-6`}>
        {userData?.data ? (
          <div className="relative" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="flex items-center gap-2">
              <img
                src={userData.data.picture || 'https://avatars.githubusercontent.com/u/60091116?v=4'} // 使用默认头像或用户头像
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span>{userData.data.username}</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <div className="p-4 border-b">
                  <p className="text-sm text-gray-700">{userData.data.email}</p>
                  <p className="text-sm text-gray-500">ID: {userData.data.sub}</p>
                </div>
                <div className="p-2">
                  <button
                      onClick={() => {
                        // window.location.assign('/settings');
                        alert("功能暂未开放 敬请期待");
                      }}
                      className="w-full text-left text-sm text-blue-600 hover:bg-gray-100 p-2 rounded"
                  >
                    设置
                  </button>
                  <button
                      onClick={() => {
                        // window.location.assign('/profile');
                        alert("功能暂未开放 敬请期待");
                      }}
                      className="w-full text-left text-sm text-blue-600 hover:bg-gray-100 p-2 rounded"
                  >
                    修改资料
                  </button>
                  <button
                      onClick={() => {
                        // window.location.assign('/profile');
                        alert("功能暂未开放 敬请期待");
                      }}
                      className="w-full text-left text-sm text-blue-600 hover:bg-gray-100 p-2 rounded"
                  >
                    我的推送令牌
                  </button>
                  <button
                      onClick={() => {
                        window.location.assign('/api/logto/sign-out');
                        refreshUserData(); // 手动刷新用户数据
                      }}
                      className="w-full text-left text-sm text-red-600 hover:bg-gray-100 p-2 rounded"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>
            <button className="text-white hover:bg-[#333]"
              onClick={() => {
                window.location.assign('/api/logto/sign-in');
                refreshUserData(); // 手动刷新用户数据
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
