"use client";
import Image from "next/image";
import { useState } from "react";

export default function PremiumGallery() {
  const [activeImage, setActiveImage] = useState(null);
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

  return (
    <section className="relative py-16 bg-linear-to-br from-[#eef3f8] via-[#e4ebf3] to-[#f8fafc] overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 -left-15 w-62.5 h-62.5 bg-yellow-300/30 rounded-full blur-[80px] animate-pulse" />
      <div className="absolute -bottom-17.5 -right-22.5 w-80 h-80 bg-blue-900/20 rounded-full blur-[90px] animate-pulse" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#17395c_1px,transparent_1px)] bg-size-[26px_26px]" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-5 py-2 rounded-full bg-linear-to-r from-[#17395c] to-[#244d79] text-yellow-400 text-xs font-bold tracking-widest mb-4">
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
              <div className="relative h-57.5 overflow-hidden">
                <Image
                  src={src}
                  alt={`Gallery image ${idx + 1}`}
                  fill
                  // FIX: sizes prop added — tells browser how wide the image is at each breakpoint
                  // grid: 2 cols mobile, 3 cols sm, 4 cols lg
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-[#102c48]/80 to-transparent opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <div className="text-center">
                  <button
                    onClick={() => setActiveImage(src)}
                    aria-label={`View image ${idx + 1}`}
                    className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-[#17395c] text-xl shadow-lg mb-2 hover:bg-yellow-300 transition-colors"
                  >
                    &#9658;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {activeImage && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setActiveImage(null)}
          >
            <div
              className="relative w-[90%] md:w-175"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeImage}
                alt="Preview"
                width={800}
                height={500}
                className="w-full h-auto rounded-lg"
                style={{ width: "100%", height: "auto" }}
              />
              <button
                onClick={() => setActiveImage(null)}
                aria-label="Close preview"
                className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}