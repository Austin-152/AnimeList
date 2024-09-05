// components/SearchResults.tsx
import Link from "next/link";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Item } from "@/app/api/api";

interface SearchResultsProps {
    data: Item[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ data }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((item) => (
                <Card className="group" key={item.id}>
                    <Link href={`/video-page/${item.id}`} className="block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="relative">
                            <Image
                                alt={item.name}
                                className="object-cover w-full aspect-video"
                                src={`https://www.olevod.tv/${item.pic}`}
                                width={400}
                                height={225}
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                                <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                                <p className="text-gray-200 text-sm mb-2">{item.blurb || '暂无简介'}</p>
                                <p className="text-gray-400 text-xs">更新至 {item.remarks.replace('更新至', '') || '未知集数'}</p>
                            </div>
                        </div>
                    </Link>
                </Card>
            ))}
        </div>
    );
};

export default SearchResults;
