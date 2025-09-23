import React from 'react';

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-blue-50 pt-20 pb-16 md:pt-32 md:pb-24">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                <div className="w-full md:w-1/2 text-center md:text-left animate-fade-in-up">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                        Connect, <span className="text-emerald-500">Communicate</span>, Collaborate.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
                        The ultimate platform for seamless messaging and powerful teamwork. GapoTaraan brings your conversations to life.
                    </p>
                    <div className="flex justify-center md:justify-start space-x-4">
                        <a href="#" className="px-8 py-3 bg-emerald-500 text-white font-bold rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105">
                            Get Started
                        </a>
                        <a href="#" className="px-8 py-3 text-emerald-500 border-2 border-emerald-500 font-bold rounded-full hover:bg-emerald-100 transition-all duration-300 transform hover:scale-105">
                            Learn More
                        </a>
                    </div>
                </div>
                <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center animate-fade-in-down">
                    <img src="https://placehold.co/500x400/1E8449/ffffff?text=Chat+App+Mockup" alt="Chat App Mockup" className="rounded-3xl shadow-2xl transition-transform duration-500 hover:scale-105" />
                </div>
            </div>
        </section>
    );
};

export default Hero;