import { useState, useEffect } from 'react';
import axios from 'axios';

// 定义 IP 和 Submission 类型
export interface IpInfo {
    ip: string;
    city: string;
    region: string;
    country: string;
    loc: string;
    org: string;
    postal: string;
    timezone: string;
}

export interface Submission {
    episode: string;
    ipInfo: IpInfo | null;
    userAgent: string;
}

interface MissingEpisodesFormProps {
    onSubmit: (submission: Submission) => void;
}

export default function MissingEpisodesForm({ onSubmit }: MissingEpisodesFormProps) {
    const [episode, setEpisode] = useState<string>('');
    const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
    const [userAgent, setUserAgent] = useState<string>('');

    // 获取用户IP信息
    useEffect(() => {
        const fetchIpInfo = async () => {
            try {
                const response = await axios.get('https://ipinfo.io/json?token=your_token'); // 替换为你的 token
                setIpInfo(response.data);
            } catch (error) {
                console.error('Error fetching IP info:', error);
            }
        };
        fetchIpInfo();
        setUserAgent(navigator.userAgent);
    }, []);

    // 表单提交
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (episode.trim()) {
            onSubmit({ episode, ipInfo, userAgent });
            setEpisode(''); // 清空输入框
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Missing Episode
                </label>
                <input
                    type="text"
                    value={episode}
                    onChange={(e) => setEpisode(e.target.value)}
                    placeholder="Enter missing episode"
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
                Submit
            </button>
        </form>
    );
}
