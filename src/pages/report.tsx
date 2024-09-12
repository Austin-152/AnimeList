import Navbar from "@/components/nav";
import Footer from "@/components/footer";
import "tailwindcss/tailwind.css";

export default function Report() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-4">
                <iframe className={"w-full h-screen"}
                    src="https://docs.google.com/forms/d/e/1FAIpQLSeWM_xJro-4GYWWbnioC6G1X7IDw7RK86-ZZ0Rtz4JgBsyc4A/viewform?embedded=true"
                    width="640" height="884">Loading…
                </iframe>
            </div>
            <Footer />
        </div>
    );
}

export async function getStaticProps() {
    // Fetch any necessary data here
    // const res = await fetch('https://api.example.com/data');
    // const data = await res.json();

    return {
        props: {
            // data,
        },
        revalidate: 10, // Revalidate every 10 seconds (optional)
    };
}
