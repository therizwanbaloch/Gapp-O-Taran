import React from 'react';

const HowItWorks = () => {
    const steps = [
        {
            step: '1',
            title: 'Sign Up & Create Your Profile',
            description: 'Get started in minutes by creating a free account and personalizing your profile.',
            image: "https://placehold.co/300x200/1E8449/ffffff?text=Step+1"
        },
        {
            step: '2',
            title: 'Connect with Friends & Teams',
            description: 'Find your contacts or invite your team members to join GapoTaraan.',
            image: "https://placehold.co/300x200/1E8449/ffffff?text=Step+2"
        },
        {
            step: '3',
            title: 'Start Chatting Instantly',
            description: 'Dive into one-on-one or group conversations with a single click. It\'s that easy!',
            image: "https://placehold.co/300x200/1E8449/ffffff?text=Step+3"
        },
    ];

    return (
        <section id="how-it-works" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                    Get Started in <span className="text-emerald-500">3 Simple Steps</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
                    Our intuitive design makes it easy for anyone to start communicating right away.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center p-6 transition-all duration-300 transform hover:scale-105">
                            <img src={step.image} alt={step.title} className="rounded-xl mb-4 shadow-lg w-full max-w-xs transition-transform duration-300 hover:scale-105" />
                            <div className="text-3xl font-extrabold text-emerald-500 mb-2">{step.step}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;