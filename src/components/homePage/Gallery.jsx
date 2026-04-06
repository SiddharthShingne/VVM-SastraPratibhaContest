
"use client";
import Image from "next/image";

export default function PremiumGallery() {
  const imagePaths = [
    "/home/img-1.jpg",
    "/home/img-2.jpg",
    "/home/img-3.jpg",
    "/home/img-4.jpg",
    "/home/img-5.jpg",
    "/home/img-6.jpg",
    "/home/img-7.jpg",
    "/home/img-8.jpg",
  ];

  const videoPaths = [
    "/home/video-01.mp4",
    "/home/video-02.mp4",
    "/home/video-03.mp4",
  ];

  return (
    <section className="relative py-16 bg-gradient-to-br from-[#eef3f8] via-[#e4ebf3] to-[#f8fafc] overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-[-60px] w-[250px] h-[250px] bg-yellow-300/30 rounded-full blur-[80px] animate-pulse"></div>
      <div className="absolute bottom-[-70px] right-[-90px] w-[320px] h-[320px] bg-blue-900/20 rounded-full blur-[90px] animate-pulse"></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#17395c_1px,transparent_1px)] [background-size:26px_26px]"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-[#17395c] to-[#244d79] text-yellow-400 text-xs font-bold tracking-widest mb-4">
            GALLERY
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-[#17395c] mb-4">
            Moments & Highlights
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore images and videos showcasing activities, events and achievements.
          </p>
        </div>

        {/* IMAGE GALLERY */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {imagePaths.map((src, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden shadow-lg bg-white/70 backdrop-blur hover:-translate-y-2 transition duration-300"
            >
              <div className="relative h-[230px] overflow-hidden">
                <Image
                  src={src}
                  alt={`Gallery ${idx}`}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#102c48]/80 to-transparent opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-[#17395c] text-xl shadow-lg mb-2">
                    👁️
                  </div>
                  <span className="text-white text-sm font-semibold">
                    View Image
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* VIDEO GALLERY */}
        {/* <div className="mt-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#17395c] mb-8">
            Video Gallery
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoPaths.map((src, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition"
              >
                <video
                  src={src}
                  controls
                  className="w-full aspect-video object-cover"
                />
              </div>
            ))}
          </div>
        </div> */}

      </div>
    </section>
  );
}