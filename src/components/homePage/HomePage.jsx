import MidCard from "@/components/homePage/MidCard";
import Gallery from "@/components/homePage/Gallery";
import VVMExamInfo from "@/components/homePage/VVMExamInfo";
import Contact from "@/components/homePage/Contact";
import VideoGallery from "@/components/homePage/video";
export default function HomePage() {
    return (
        <>
            <MidCard />
            {/* <VVMExamInfo /> */}
            <Gallery />
         <VideoGallery />
            <Contact />
        </>
    );
}