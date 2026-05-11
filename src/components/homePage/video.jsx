
"use client";
import { useState } from "react";
import { useId } from "react";
export default function VideoGallery() {
const [activeVideo, setActiveVideo] = useState(null);

  const videos = [
    {
      id: "video1",
      img: "/images/video1.jpg",
      embed: "az4LDoONNj0",
      title: "SPC-VVM Introduction",
      desc: "Know more about the mission, vision, and spirit of Śāstra Pratibhā Contest.",
      badge: "Featured",
    },
    {
      id: "video2",
      img: "/images/video2.jpg",
      embed: "W7uYZm4su6o",
      title: "Student Participation",
      desc: "See how students engage with SPC-VVM through activities.",
      badge: "Popular",
    },
    {
      id: "video3",
      img: "/images/video3.jpg",
      embed: "Ir8dJMi3pkk",
      title: "National Event Highlights",
      desc: "Watch inspiring national-level moments.",
      badge: "Event",
    },
    {
  id: "video4",
  img: "https://img.youtube.com/vi/m6e30MqTbdE/hqdefault.jpg",
  embed: "m6e30MqTbdE",
  title: "SPC-VVM Video",
  desc: "Watch this informative SPC-VVM video and explore more insights.",
  badge: "New",
},
{
  id: "video5",
  img: "https://img.youtube.com/vi/INSRUPCn7Tw/hqdefault.jpg",
  embed: "INSRUPCn7Tw",
  title: "SPC-VVM Event Video",
  desc: "Watch this engaging SPC-VVM session and explore key highlights.",
  badge: "New",
}
  ];




  return (
    <section className="relative py-16 bg-gradient-to-br from-[#eef3f8] via-[#e4ebf3] to-[#f8fafc] overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#17395c_1px,transparent_1px)] [background-size:26px_26px]"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="mb-10 text-center">
          <span className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-[#17395c] to-[#244d79] text-yellow-400 text-xs font-bold tracking-widest mb-4">
            WATCH & EXPLORE
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-[#17395c] mb-3">
            Video Gallery
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore inspiring SPC highlights, events and student participation.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6">
      {videos.map((item) => (
  <VideoCard 
    key={item.id} 
    item={item} 
    setActiveVideo={setActiveVideo} 
  />
))}
{/* Explore */}
        <div className="rounded-[30px] bg-gradient-to-br from-[#1f446b] to-[#2b5a86] p-8 text-center shadow-xl pt-12">

  {/* Icon */}
  <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-yellow-400 mb-6 shadow-lg">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8 text-[#1f446b]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="7" width="13" height="10" rx="2" />
      <polygon points="16,10 21,7 21,17 16,14" />
    </svg>
  </div>

  {/* Heading */}
  <h4 className="text-white text-xl font-semibold mb-3">
    Explore More Videos
  </h4>

  {/* Description */}
  <p className="text-gray-200 text-sm leading-relaxed mb-6">
    Visit the official SPC video collection and stay connected with inspiring updates.
  </p>

  {/* Button */}
  <a
    href="https://www.youtube.com/@VidyarthiVigyanManthan"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 bg-[#234c74] hover:bg-[#1b3d5c] text-yellow-400 px-6 py-3 rounded-full font-semibold transition"
  >
    Watch More
    <span className="text-lg">→</span>
  </a>

</div> 
 </div>

  

      </div>

      


         {activeVideo && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
    
    <div className="relative w-[90%] md:w-[700px] h-[400px] bg-black rounded-lg overflow-hidden">
      
      <iframe
        src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
        className="w-full h-full"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />

      {/* Close Button */}
      <button
        onClick={() => setActiveVideo(null)}
        className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded"
      >
        ✕
      </button>

    </div>

  </div>
)}
    </section>
  );
}

/* ================= CARD ================= */

function VideoCard({ item , setActiveVideo}) {
  const uniqueId = useId(); // avoid duplicate id issue

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-white">

      <div className="relative h-[230px]">

        {/* Checkbox */}
        <input
          type="checkbox"
          id={uniqueId}
          className="peer hidden"
        />

        {/* Thumbnail */}
       <img
  src={`https://img.youtube.com/vi/${item.embed}/hqdefault.jpg`}
  alt={item.title}
  className="absolute inset-0 w-full h-full object-cover transition peer-checked:opacity-0"
/>

        {/* Iframe */}
        <iframe
          src={`https://www.youtube.com/embed/${item.embed}?autoplay=1&mute=1`}
          className="absolute inset-0 w-full h-full opacity-0 pointer-events-none transition peer-checked:opacity-100 peer-checked:pointer-events-auto z-10"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />

        {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition peer-checked:opacity-0 z-20">
          
       
          <button
  onClick={() => setActiveVideo(item.embed)}
  className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-[#17395c] text-xl shadow-lg cursor-pointer"
>
  ▶
</button>

        </div>

        {/* Badge */}
        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full bg-yellow-400 text-[#17395c]">
          {item.badge}
        </span>

      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-bold text-[#17395c] mb-1">{item.title}</h4>
        <p className="text-sm text-gray-600">{item.desc}</p>
      </div>

   

    </div>
  );
}