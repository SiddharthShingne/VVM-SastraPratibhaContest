
"use client";

const VideoGallery = () => {
  return (
    <section className="relative overflow-hidden py-12 
      bg-[linear-gradient(135deg,#eef3f8_0%,#e4ebf3_45%,#f8fafc_100%)]">

      {/* 🔥 Glow Shapes */}
      <div className="absolute w-[260px] h-[260px] bg-yellow-300/30 blur-[80px] rounded-full top-5 left-[-60px]"></div>
      <div className="absolute w-[320px] h-[320px] bg-blue-900/20 blur-[90px] rounded-full bottom-[-60px] right-[-80px]"></div>

      {/* 🔲 Grid */}
      <div className="absolute inset-0 opacity-10 
        bg-[radial-gradient(#17395c_1px,transparent_1px)] 
        bg-[size:26px_26px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">

        {/* TOP */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-12">

          {/* LEFT */}
          <div>
            <span className="inline-block px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase 
              bg-gradient-to-r from-[#17395c] to-[#244d79] text-yellow-400 shadow-md">
              Watch & Explore
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#17395c] mt-4">
              Video Gallery
            </h2>

            <p className="text-gray-600 mt-4 max-w-xl">
              Explore inspiring VVM highlights, event moments, student participation,
              and important campaign videos in one premium showcase.
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4 p-6 rounded-2xl bg-white/70 backdrop-blur shadow-lg">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#17395c] to-[#244d79] 
              flex items-center justify-center text-yellow-400 text-xl">
              ▶
            </div>
            <div>
              <h5 className="font-bold text-[#17395c]">
                Featured Learning & Event Videos
              </h5>
              <p className="text-gray-500 text-sm">
                Designed in the official VVM theme with premium visual experience.
              </p>
            </div>
          </div>

        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* CARD */}
          {[
            {
              id: "video1",
              img: "/images/video1.jpg",
              video: "az4LDoONNj0",
              title: "VVM Introduction",
              desc: "Know more about the mission, vision, and spirit of VVM.",
              badge: "Featured"
            },
            {
              id: "video2",
              img: "/images/video2.jpg",
              video: "W7uYZm4su6o",
              title: "Student Participation",
              desc: "See how students engage with VVM activities.",
              badge: "Popular"
            },
            {
              id: "video3",
              img: "/images/video3.jpg",
              video: "Ir8dJMi3pkk",
              title: "Event Highlights",
              desc: "Watch inspiring national-level moments.",
              badge: "Event"
            }
          ].map((item) => (
            <div key={item.id}
              className="relative rounded-2xl overflow-hidden bg-white/70 backdrop-blur shadow-lg transition hover:-translate-y-2">

              {/* VIDEO AREA */}
              <div className="relative h-[250px] overflow-hidden">

                <input type="checkbox" id={item.id} className="hidden peer" />

                {/* IMAGE */}
                <img
                  src={item.img}
                  alt=""
                  className="w-full h-full object-cover transition peer-checked:opacity-0"
                />

                {/* IFRAME */}
                <iframe
                  src={`https://www.youtube.com/embed/${item.video}?autoplay=1`}
                  className="absolute inset-0 w-full h-full opacity-0 pointer-events-none 
                  peer-checked:opacity-100 peer-checked:pointer-events-auto"
                  allow="autoplay"
                />

                {/* PLAY BUTTON */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition">
                  <label
                    htmlFor={item.id}
                    className="w-16 h-16 flex items-center justify-center rounded-full 
                    bg-yellow-400 text-[#17395c] text-xl cursor-pointer shadow-lg"
                  >
                    ▶
                  </label>
                </div>

                {/* BADGE */}
                <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full 
                  bg-gradient-to-r from-[#17395c] to-[#244d79] text-yellow-400">
                  {item.badge}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h4 className="font-bold text-[#17395c]">{item.title}</h4>
                <p className="text-gray-500 text-sm mt-2">{item.desc}</p>
              </div>
            </div>
          ))}

          {/* CTA CARD */}
          <div className="flex items-center justify-center rounded-2xl 
            bg-gradient-to-br from-[#17395c] to-[#244d79] text-white p-6 text-center">

            <div>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-400 
                flex items-center justify-center text-[#17395c] text-xl">
                🎬
              </div>

              <h4 className="font-bold text-lg">Explore More Videos</h4>

              <p className="text-sm opacity-80 mt-2">
                Visit official VVM YouTube channel.
              </p>

              <a
                href="https://www.youtube.com/@VidyarthiVigyanManthan"
                target="_blank"
                className="inline-block mt-4 bg-yellow-400 text-[#17395c] px-5 py-2 rounded-full font-bold"
              >
                Watch More →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VideoGallery;