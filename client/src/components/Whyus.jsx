import React from 'react';
import { ChatBubbleIcon, GroupIcon, SecurityIcon } from './Icons';

const WhyUs = () => {
    const benefits = [
        {
            icon: <ChatBubbleIcon />,
            title: 'Intuitive Interface',
            description: 'A clean and simple design that makes chatting effortless for everyone.',
        },
        {
            icon: <GroupIcon />,
            title: 'Scalable for Any Team',
            description: 'Whether it’s a small group or a large enterprise, GapoTaraan scales to meet your needs.',
        },
        {
            icon: <SecurityIcon />,
            title: 'Ironclad Security',
            description: 'Your data is protected with end-to-end encryption and advanced security protocols.',
        },
    ];

    return (
        <section id="why-us" className="py-20 bg-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                    Why Choose <span className="text-emerald-500">GapoTaraan?</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
                    We're more than just a chat app. We're a platform built for connection.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="p-8 bg-gray-100 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:bg-emerald-50 transform hover:-translate-y-2">
                            <div className="flex justify-center mb-4 text-emerald-500">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                            <p className="text-gray-600">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;