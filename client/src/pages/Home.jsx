import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import WhyUs from '../components/Whyus';
import CallToAction from '../components/Cta';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <div className="font-sans antialiased text-gray-800">
            <script src="https://cdn.tailwindcss.com"></script>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" />
            <style>
                {`
                body {
                    font-family: 'Inter', sans-serif;
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-in-out;
                }
                .animate-fade-in-down {
                    animation: fadeInDown 0.8s ease-in-out;
                }
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                `}
            </style>
            <Navbar />
            <main>
                <Hero />
                <Features />
                <HowItWorks />
                <WhyUs />
                <CallToAction />
            </main>
            <Footer />
        </div>
    );
}

