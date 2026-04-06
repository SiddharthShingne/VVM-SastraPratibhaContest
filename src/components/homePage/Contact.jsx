
'use client';

import { Mail, MapPin, Phone } from 'lucide-react';

const Contacts = () => {
  return (
    <section className="relative overflow-hidden py-16 bg-gradient-to-br from-[#eef3f8] via-[#e4ebf3] to-[#f8fafc]">

      {/* 🔥 Glow Background */}
      <div className="absolute w-[280px] h-[280px] bg-yellow-300/30 blur-[80px] rounded-full top-5 left-[-70px] animate-pulse"></div>
      <div className="absolute w-[340px] h-[340px] bg-blue-900/20 blur-[90px] rounded-full bottom-[-90px] right-[-90px] animate-pulse"></div>

      {/* 🔲 Grid Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#17395c_1px,transparent_1px)] bg-[size:26px_26px]"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">

        {/* 🏷️ Top Badge */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-3 bg-gradient-to-r from-[#17395c] to-[#244d79] text-white px-6 py-3 rounded-full shadow-lg">
            <span className="bg-yellow-400 text-[#17395c] text-xs font-bold px-3 py-1 rounded-full">
              CONTACT
            </span>
            <span className="font-semibold text-sm md:text-base">
              Get in touch with VVM Team
            </span>
          </div>
        </div>

        {/* 🧾 Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#17395c]">
            Contact & Support
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Reach out for registration, support, or program-related queries.
          </p>
        </div>

        {/* 📦 Grid */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* 🏢 Head Office */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#17395c]">
              Head Office Contacts
            </h2>

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
                <div
                  key={idx}
                  className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
                >
                  <h3 className="text-lg font-bold text-[#17395c]">
                    {person.name}
                  </h3>

                  <p className="text-yellow-600 font-semibold text-sm">
                    {person.role}
                  </p>

                  <p className="flex items-center mt-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    {person.location}
                  </p>

                  <p className="flex items-center text-gray-700 text-sm mt-1">
                    <Phone className="w-4 h-4 mr-2" />
                    {person.phone}
                  </p>

                  <p className="flex items-center text-gray-700 text-sm mt-1">
                    <Mail className="w-4 h-4 mr-2" />
                    {person.email}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 🌐 National Coordinator */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#17395c]">
              National Registration & Outreach
            </h2>

            <div className="relative bg-gradient-to-br from-[#17395c] to-[#244d79] text-white p-8 rounded-2xl shadow-xl overflow-hidden">

              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400"></div>

              <h3 className="text-xl font-bold mb-3">
                Sh. Naresh Chafekar
              </h3>

              <p className="flex items-center text-sm opacity-90">
                <MapPin className="w-4 h-4 mr-2" />
                National Coordinator (Registration & Outreach)
              </p>

              <p className="flex items-center text-sm mt-2">
                <Mail className="w-4 h-4 mr-2" />
                nchafekar@vvm.org.in
              </p>

              <button className="mt-6 bg-yellow-400 text-[#17395c] font-bold py-2 px-6 rounded-full hover:scale-105 transition">
                State Coordinator
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contacts;