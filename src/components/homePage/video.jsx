"use client";
import { useState } from "react";

const videos = [
  {
    id: 1,
    title: "VVM Introduction",
    desc: "Know more about the mission, vision, and spirit of Vidyarthi Vigyan Manthan.",
    img: "/assets/images/video-gallery/video-img-1.jpg",
    url: "https://www.youtube.com/embed/az4LDoONNj0?autoplay=1",
    badge: "Featured",
  },
  {
    id: 2,
    title: "Student Participation",
    desc: "See how students engage with VVM through activities.",
    img: "/assets/images/video-gallery/video-img-2.jpg",
    url: "https://www.youtube.com/embed/W7uYZm4su6o?autoplay=1",
    badge: "Popular",
  },
  {
    id: 3,
    title: "National Event Highlights",
    desc: "Watch memorable event moments and experiences.",
    img: "/assets/images/video-gallery/video-img-3.jpg",
    url: "https://www.youtube.com/embed/Ir8dJMi3pkk?autoplay=1",
    badge: "Event",
  },
  {
    id: 4,
    title: "Science Inspiration",
    desc: "Encouraging young minds through innovation.",
    img: "/assets/images/video-gallery/video-img-4.jpg",
    url: "https://www.youtube.com/embed/INSRUPCn7Tw?autoplay=1",
    badge: "Special",
  },
  {
    id: 5,
    title: "VVM Journey",
    desc: "Discover the journey and impact of VVM.",
    img: "/assets/images/video-gallery/video-img-5.jpg",
    url: "https://www.youtube.com/embed/m6e30MqTbdE?autoplay=1",
    badge: "Latest",
  },
];

export default function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-50 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute w-64 h-64 bg-yellow-300/30 blur-3xl rounded-full top-10 -left-20 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-blue-900/20 blur-3xl rounded-full bottom-[-80px] right-[-60px]"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <span className="inline-block px-5 py-2 rounded-full bg-blue-900 text-yellow-300 text-xs font-bold tracking-widest shadow-lg mb-4">
              Watch & Explore
            </span>
            <h2 className="text-3xl md:text-5xl font-black #17395c mb-3">
              Video Gallery
            </h2>
            <p className="text-gray-600 max-w-xl leading-relaxed">
              Explore inspiring VVM highlights, event moments, and student participation.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg flex gap-4 items-center">
            <div className="w-14 h-14 bg-blue-900 text-yellow-300 flex items-center justify-center rounded-xl text-2xl">
              ▶
            </div>
            <div>
              <h5 className="font-bold #17395c">
                Featured Learning & Event Videos
              </h5>
              <p className="text-gray-500 text-sm">
                Premium visual experience in VVM theme.
              </p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {videos.map((video) => (
            <div
              key={video.id}
              className="group relative rounded-2xl overflow-hidden bg-white/70 backdrop-blur shadow-lg hover:-translate-y-2 transition"
            >
              
              {/* Thumbnail / Video */}
              <div className="relative h-56 overflow-hidden">
                {activeVideo === video.id ? (
                  <iframe
                    src={video.url}
                    className="w-full h-full"
                    allow="autoplay"
                  />
                ) : (
                  <>
                    <img
                      src={video.img}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                      <button
                        onClick={() => setActiveVideo(video.id)}
                        className="w-16 h-16 bg-yellow-300 #17395c rounded-full flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition"
                      >
                        ▶
                      </button>
                    </div>
                  </>
                )}

                {/* Badge */}
                <span className="absolute top-3 left-3 bg-blue-900 text-yellow-300 text-xs px-3 py-1 rounded-full font-bold">
                  {video.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h4 className="font-bold #17395c mb-2">
                  {video.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {video.desc}
                </p>
              </div>
            </div>
          ))}

          {/* CTA Card */}
          <div className="flex items-center justify-center bg-gradient-to-br from-blue-900 to-#17395c text-white rounded-2xl p-8 text-center">
            <div>
              <div className="w-20 h-20 mx-auto mb-4 bg-yellow-300 #17395c flex items-center justify-center rounded-full text-3xl shadow-lg">
                🎬
              </div>
              <h4 className="text-xl font-bold mb-2">
                Explore More Videos
              </h4>
              <p className="text-sm text-white/80 mb-4">
                Visit the official VVM video collection.
              </p>
              <a
                href="https://www.youtube.com/@VidyarthiVigyanManthan"
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-yellow-300 #17395c px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
              >
                Watch More →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}