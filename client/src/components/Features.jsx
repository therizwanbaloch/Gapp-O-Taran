import React from 'react';
import { ChatBubbleIcon, GroupIcon, SecurityIcon } from './Icons';

const Features = () => {
    const features = [
        {
            icon: <ChatBubbleIcon />,
            title: 'Real-time Messaging',
            description: 'Send and receive messages instantly, ensuring you never miss a beat. Stay connected with friends and colleagues.',
        },
        {
            icon: <GroupIcon />,
            title: 'Group Conversations',
            description: 'Create groups for projects, teams, or social circles. Collaborate and share ideas seamlessly in one place.',
        },
        {
            icon: <SecurityIcon />,
            title: 'Secure & Private',
            description: 'Your privacy is our priority. All conversations are end-to-end encrypted to keep your data safe and secure.',
        },
    ];

    return (
        <section id="features" className="py-20 bg-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                    Powerful Features for <span className="text-emerald-500">Every Conversation</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
                    From private chats to team collaboration, GapoTaraan has everything you need to communicate effectively.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-8 bg-gray-100 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:bg-emerald-50 transform hover:-translate-y-2">
                            <div className="flex justify-center mb-4 text-emerald-500">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;