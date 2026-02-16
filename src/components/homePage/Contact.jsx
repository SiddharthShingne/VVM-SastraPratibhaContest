'use client';

import { Mail, MapPin, Phone } from 'lucide-react';

const Contacts = () => {
    return (
        <div className="bg-[#f9f9ff] py-8 px-4 md:px-8 lg:px-16 font-sans text-[#111d35] text-sm md:text-base">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Head Office Contacts */}
                <div>
                    <h2 className="text-lg md:text-2xl font-bold mb-6">Head Office Contacts</h2>
                    <div className="space-y-6">
                        {[
                            {
                                name: 'Sh. Raj Kumar',
                                role: 'Project Coordinator - VVM',
                                location: 'Vijnana Bharati (HQ), Delhi',
                                phone: '+91-11-49032436',
                                email: 'raj@vvm.org.in',
                            },
                            {
                                name: 'Sh. TV Praveen',
                                role: 'Project Associate',
                                location: 'Vijnana Bharati (HQ), Delhi',
                                phone: '+91-11-49032436',
                                email: 'praveen@vvm.org.in',
                            },
                        ].map((person, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl shadow space-y-3">
                                <h3 className="text-lg md:text-xl font-bold">{person.name}</h3>
                                <p className="text-[#7f00ff] font-semibold text-sm">{person.role}</p>
                                <p className="flex items-center text-gray-600 text-sm font-semibold">
                                    <MapPin className="w-4 h-4 mr-2" /> {person.location}
                                </p>
                                <p className="flex items-center text-gray-700 text-sm font-semibold">
                                    <Phone className="w-4 h-4 mr-2" /> {person.phone}
                                </p>
                                <p className="flex items-center text-gray-700 text-sm font-semibold">
                                    <Mail className="w-4 h-4 mr-2" /> {person.email}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-lg md:text-2xl font-bold mb-6">National Registration & Outreach</h2>
                    <div className="bg-white p-6 rounded-xl shadow space-y-3">
                        <h3 className="text-lg md:text-xl font-bold">Sh. Naresh Chafekar</h3>
                        <p className="flex items-center text-gray-600 text-sm font-semibold">
                            <MapPin className="w-4 h-4 mr-2" />
                            National Coordinator (Registration and Outreach)
                        </p>
                        <p className="flex items-center text-gray-700 text-sm font-semibold">
                            <Mail className="w-4 h-4 mr-2" /> nchafekar@vvm.org.in
                        </p>
                        <button className="mt-4 bg-[#ff2008] hover:bg-[#ff7878] text-white text-sm font-bold py-2 px-5 rounded-full transition duration-300">
                            State Coordinator
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacts;
