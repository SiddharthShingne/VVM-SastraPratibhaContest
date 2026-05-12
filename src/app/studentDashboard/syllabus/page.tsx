"use client";


export default function Syllabus() {



    return (
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 p-12 text-center shadow-xl transition-all duration-500 hover:shadow-2xl">
            {/* Animated border gradient */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            <div className="absolute inset-[1px] rounded-2xl bg-white group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50 transition-all duration-500" />

            {/* Icon */}
            <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#17395c] to-[#244d79] shadow-lg group-hover:scale-110 transition-transform duration-500">
                <svg className="h-10 w-10 text-[#f4df17]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>

            {/* Text */}
            <h2 className="relative mb-2 text-3xl font-black tracking-tight text-[#17395c]">
                Coming Soon
            </h2>

            {/* Decorative line */}
            <div className="relative mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c] group-hover:w-24 transition-all duration-500" />

            <p className="relative mt-4 text-sm text-gray-500">
                Stay tuned for updates
            </p>
        </div>
    );
}