// // "use client";

// // import { createContext, useContext, useState } from "react";
// // import GlobalLoader from "@/components/GlobalLoader";

// // type LoaderContextType = {
// //   showLoader: () => void;
// //   hideLoader: () => void;
// // };

// // const LoaderContext = createContext<LoaderContextType | null>(null);

// // export default  function LoaderProvider = ({ children }: { children: React.ReactNode })  {
// //   const [loading, setLoading] = useState(false);

// //   const showLoader = () => setLoading(true);
// //   const hideLoader = () => setLoading(false);

// //   return (
// //     <LoaderContext.Provider value={{ showLoader, hideLoader }}>
// //       {loading && <GlobalLoader />}
// //       {children}
// //     </LoaderContext.Provider>
// //   );
// // };

// // export const useLoader = () => {
// //   const context = useContext(LoaderContext);
// //   if (!context) throw new Error("useLoader must be used inside LoaderProvider");
// //   return context;
// // };

// "use client";

// import { createContext, useContext, useState } from "react";
// import GlobalLoader from "@/components/GlobalLoader";

// type LoaderContextType = {
//   showLoader: () => void;
//   hideLoader: () => void;
// };

// const LoaderContext = createContext<LoaderContextType | null>(null);

// export default function LoaderProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [loading, setLoading] = useState(false);

//   const showLoader = () => setLoading(true);
//   const hideLoader = () => setLoading(false);

//   return (
//     <LoaderContext.Provider value={{ showLoader, hideLoader }}>
//       {loading && <GlobalLoader />}
//       {children}
//     </LoaderContext.Provider>
//   );
// }

// export const useLoader = () => {
//   const context = useContext(LoaderContext);
//   if (!context) throw new Error("useLoader must be used inside LoaderProvider");
//   return context;
// };
"use client";

import Image from "next/image";

export default function GlobalLoader() {
    
  return (
    // <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm fixed inset-0 z-[9999] ...">
       <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white backdrop-blur-sm">
      
      {/* Loader Image */}
      <div className="animate-pulse">
        <Image
          src="/gcc/logo-latest.jpeg"   // 👈 put your image in public folder
          alt="Loading"
          width={80}
          height={80}
        />
      </div>

      {/* Loading Text */}
      <p className="mt-4 text-black text-sm font-semibold animate-pulse">
        Loading...
      </p>
    </div>
  );
}