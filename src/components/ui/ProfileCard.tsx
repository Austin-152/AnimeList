import React from "react";
import Image from "next/image";

interface ProfileCardProps {
    onClose: () => void;
    userData?: {
        sub: string;
        name: string;
        picture: string;
        username: string;
        exp: number;
    };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ onClose, userData }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white shadow-md rounded-lg w-96 p-6 relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    ×
                </button>

                <h2 className="text-xl font-semibold mb-4">个人资料详情</h2>

                {/* 检查 userData 是否为 undefined */}
                {userData && (
                    <div className="flex items-center space-x-4 mb-6">
                        <Image
                            src={userData.picture}
                            alt="avatar"
                            className="w-12 h-12 rounded-full"
                        />
                        <div>
                            <p className="text-lg font-semibold">{userData.username}</p>
                        </div>
                    </div>
                )}

                {/* 检查 userData 是否为 undefined */}
                {userData && (
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-500">连接的帐户</h3>
                        <div className="flex items-center space-x-2">
                            <svg
                                className="w-5 h-5 text-gray-600"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 0C5.373 0 0 5.373 0 12C0 17.602 3.438 22.146 8.205 23.725C8.805 23.835 9.025 23.5 9.025 23.203C9.025 22.928 9.015 21.573 9.015 20.543C5.672 21.182 4.968 19.309 4.968 19.309C4.422 17.988 3.633 17.645 3.633 17.645C2.546 17.002 3.718 17.017 3.718 17.017C4.922 17.1 5.547 18.213 5.547 18.213C6.622 20.017 8.34 19.482 9.025 19.203C9.125 18.454 9.453 17.968 9.82 17.715C7.163 17.426 4.372 16.378 4.372 11.664C4.372 10.337 4.857 9.27 5.603 8.448C5.493 8.161 5.152 6.888 5.703 5.163C5.703 5.163 6.713 4.867 9.015 6.55C9.955 6.254 10.945 6.126 11.925 6.122C12.905 6.126 13.895 6.254 14.835 6.55C17.136 4.867 18.146 5.163 18.146 5.163C18.698 6.888 18.357 8.161 18.247 8.448C18.993 9.27 19.478 10.337 19.478 11.664C19.478 16.39 16.672 17.421 14.005 17.705C14.497 18.068 15.015 18.93 15.015 20.28C15.015 21.843 15.005 22.943 15.005 23.213C15.005 23.507 15.215 23.838 15.825 23.715C20.591 22.141 24 17.602 24 12C24 5.373 18.627 0 12 0Z" />
                            </svg>
                            <p className="text-sm text-gray-800">{userData.username}</p>
                        </div>
                        <button className="text-sm text-blue-500 mt-2">连接帐户</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileCard;
