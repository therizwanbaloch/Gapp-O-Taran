import React from 'react';

const CallToAction = () => {
    return (
        <section className="py-20 bg-emerald-600 text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                    Ready to Start <span className="text-emerald-200">Communicating?</span>
                </h2>
                <p className="text-lg max-w-2xl mx-auto mb-8 text-emerald-100">
                    Join thousands of people who are using GapoTaraan for effortless communication. Sign up today and get started for free.
                </p>
                <a href="#" className="px-10 py-4 bg-white text-emerald-600 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                    Sign Up for Free
                </a>
            </div>
        </section>
    );
};

export default CallToAction;