"use client";
import Image from "next/image";
const Gallery = () => {
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
        <section className="px-3 md:px-6 lg:px-10 py-6 text-center">
            {/* IMAGE GALLERY */}
            <h1 className="text-2xl md:text-3xl font-semibold mb-5 text-[#03133d]">
                Image Gallery
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
                {imagePaths.map((src, idx) => (
                    <div
                        key={idx}
                        className="relative w-full aspect-4/3 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                    >
                        <Image
                            src={src}
                            alt={`Gallery ${idx + 1}`}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover hover:scale-105 transition-transform duration-300"
                            quality={80}
                        />
                    </div>
                ))}
            </div>
            {/* VIDEO GALLERY */}
            <h1 className="text-2xl md:text-3xl font-semibold mt-12 mb-5 text-[#03133d]">
                Video Gallery
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 justify-center">
                {videoPaths.map((src, idx) => (
                    <div
                        key={idx}
                        className="max-w-sm mx-auto bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                        <video
                            src={src}
                            controls
                            preload="metadata"
                            className="w-full aspect-video object-cover"
                        />
                    </div>
                ))}
            </div>
        </section>   
    );
};
export default Gallery;
