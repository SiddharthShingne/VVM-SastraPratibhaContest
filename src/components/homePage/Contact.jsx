
'use client';

import { Mail, MapPin, Phone } from 'lucide-react';

const Contacts = () => {
  return (
    <div className="relative overflow-hidden py-16 px-4 md:px-10 bg-gradient-to-br from-[#eef3f8] via-[#e4ebf3] to-[#f8fafc] text-[#111d35]">

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#17395c_1px,transparent_1px)] bg-[size:26px_26px]" />

      {/* Glow Shapes */}
      <div className="absolute w-[280px] h-[280px] bg-yellow-300/30 blur-[70px] rounded-full top-5 -left-16"></div>
      <div className="absolute w-[340px] h-[340px] bg-blue-900/20 blur-[70px] rounded-full -bottom-20 -right-20"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">

        {/* LEFT SIDE */}
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-8 text-[#17395c]">
            Head Office Contacts
          </h2>

          <div className="space-y-6 ">
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
                className="relative bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-[0_18px_40px_rgba(23,57,92,0.08)] space-y-3 "
              >
                {/* Top Gradient Line */}
                <div className="absolute top-0 left-0 w-full h-[4px] rounded-t-2xl bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300"></div>

                <h3 className="text-lg md:text-xl font-bold text-[#17395c]">
                  {person.name}
                </h3>

                <p className="text-[#c38d08] font-semibold text-sm">
                  {person.role}
                </p>

                <p className="flex items-center text-gray-600 text-sm font-semibold">
                  <MapPin className="w-4 h-4 mr-2 text-[#17395c]" />
                  {person.location}
                </p>

                <p className="flex items-center text-gray-700 text-sm font-semibold">
                  <Phone className="w-4 h-4 mr-2 text-[#17395c]" />
                  {person.phone}
                </p>

                <p className="flex items-center text-gray-700 text-sm font-semibold">
                  <Mail className="w-4 h-4 mr-2 text-[#17395c]" />
                  {person.email}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        {/* <div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-8 text-[#17395c]">
            National Registration & Outreach
          </h2> */}

          {/* <div className="relative bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-[0_20px_42px_rgba(23,57,92,0.12)] space-y-4"> */}

            {/* Top Gradient Line */}
            {/* <div className="absolute top-0 left-0 w-full h-[4px] rounded-t-2xl bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300"></div>

            <h3 className="text-lg md:text-xl font-bold text-[#17395c]">
              Sh. Naresh Chafekar
            </h3>

            <p className="flex items-center text-gray-600 text-sm font-semibold">
              <MapPin className="w-4 h-4 mr-2 text-[#17395c]" />
              National Coordinator (Registration and Outreach)
            </p>

            <p className="flex items-center text-gray-700 text-sm font-semibold">
              <Mail className="w-4 h-4 mr-2 text-[#17395c]" />
              nchafekar@vvm.org.in
            </p> */}

            {/* Button */}
            {/* <button className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#17395c] to-[#244d79] shadow-lg hover:scale-105 transition">
              State Coordinator
            </button> */}
          {/* </div> */}
        {/* </div> */}

      </div>
    </div>
  );
};

export default Contacts;