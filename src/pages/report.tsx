import Navbar from "@/components/nav";
import Footer from "@/components/footer";
import MissingEpisodesForm, { Submission } from "@/components/missingEpisode";
import { useState } from "react";
import "tailwindcss/tailwind.css";

export default function Report() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);

    // 提交表单
    const handleSubmit = (submission: Submission) => {
        setSubmissions([...submissions, submission]);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-6">Report Missing Episodes</h1>
                <MissingEpisodesForm onSubmit={handleSubmit} />
                <h2 className="text-2xl font-semibold mt-8">Submitted Episodes</h2>
                {submissions.length > 0 ? (
                    <ul className="mt-4 space-y-4">
                        {submissions.map((submission, index) => (
                            <li key={index} className="p-4 bg-white shadow rounded-lg">
                                <p><strong>Episode:</strong> {submission.episode}</p>
                                <p><strong>IP:</strong> {submission.ipInfo?.ip}</p>
                                <p><strong>Location:</strong> {submission.ipInfo?.city}, {submission.ipInfo?.region}, {submission.ipInfo?.country}</p>
                                <p><strong>Browser:</strong> {submission.userAgent}</p>
                                <p><strong>ISP:</strong> {submission.ipInfo?.org}</p>
                                <p><strong>Coordinates:</strong> {submission.ipInfo?.loc}</p>
                                <p><strong>Timezone:</strong> {submission.ipInfo?.timezone}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="mt-4 text-gray-600">No submissions yet.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}
