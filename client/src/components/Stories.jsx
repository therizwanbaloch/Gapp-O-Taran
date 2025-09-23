import React from 'react';

const Stories = () => {
    const stories = [
        {
            story: "GapoTaraan has revolutionized our remote team's workflow. It's the only tool we need to stay connected and productive.",
            name: "Alex P.",
            role: "Founder, Innovate Co.",
            image: "https://placehold.co/100x100/1E8449/ffffff?text=AP"
        },
        {
            story: "As a student, I use GapoTaraan to collaborate with classmates on projects. It's so much easier than email and keeps everything organized.",
            name: "Maria S.",
            role: "Student, University of Tech",
            image: "https://placehold.co/100x100/1E8449/ffffff?text=MS"
        },
    ];

    return (
        <section id="stories" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                    Customer <span className="text-emerald-500">Stories</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
                    See how GapoTaraan is making a difference for people and teams everywhere.
                </p>
                <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
                    {stories.map((story, index) => (
                        <div key={index} className="flex-1 p-8 bg-white rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-2 flex flex-col justify-between">
                            <p className="italic text-gray-600 mb-4">"{story.story}"</p>
                            <div className="flex items-center space-x-4 mt-auto">
                                <img src={story.image} alt={story.name} className="w-12 h-12 rounded-full shadow-sm" />
                                <div>
                                    <p className="font-bold text-gray-900">{story.name}</p>
                                    <p className="text-sm text-emerald-600">{story.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stories;