"use client";

import { useMemo } from "react";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

const feeStructureData: Record<
  string,
  {
    title: string;
    items: {
      text: string;
      note?: string;
    }[];
  }
  > = {
  IND: {
    title: "India Fee Structure",
    items: [
      {
        text: "Registration fee for students studying in India: 200 INR.",
        note: "Applicable only for Indian students.",
      },
      {
        text: "Payment should be made through the approved India VVM payment process.",
      },
    ],
  },
  ARE: {
    title: "UAE Fee Structure",
    items: [
      {
        text: "Registration fee for students studying in UAE: 25 AED.",
        note: "Applicable only for UAE students.",
      },
      {
        text: "Payment should be made through the approved UAE VVM payment process.",
      },
    ],
  },

  ARE: {
    title: "UAE Fee Structure",
    items: [
      {
        text: "Registration fee for students studying in UAE: 25 AED.",
        note: "Applicable only for UAE students.",
      },
      {
        text: "Payment should be made through the approved UAE VVM payment process.",
      },
    ],
  },

  OMN: {
    title: "Oman Fee Structure",
    items: [
      {
        text: "Registration fee for students studying in Oman: 8.5 AED.",
        note: "Applicable only for Oman students.",
      },
      {
        text: "Payment should be made through the approved Oman VVM payment process.",
      },
    ],
  },

  // QAT: {
  //   title: "Qatar Fee Structure",
  //   items: [
  //     {
  //       text: "Registration fee for students studying in Qatar: QAR XX.",
  //       note: "Applicable only for Qatar students.",
  //     },
  //     {
  //       text: "Payment should be made through the approved Qatar VVM payment process.",
  //     },
  //   ],
  // },

  // SAU: {
  //   title: "Saudi Arabia Fee Structure",
  //   items: [
  //     {
  //       text: "Registration fee for students studying in Saudi Arabia: SAR XX.",
  //       note: "Applicable only for Saudi Arabia students.",
  //     },
  //     {
  //       text: "Payment should be made through the approved Saudi Arabia VVM payment process.",
  //     },
  //   ],
  // },

  BHR: {
    title: "Bahrain Fee Structure",
    items: [
      {
        text: "Registration fee for students studying in Bahrain: 20 AED.",
        note: "Applicable only for Bahrain students.",
      },
      {
        text: "Payment should be made through the approved Bahrain VVM payment process.",
      },
    ],
  },

  // KWT: {
  //   title: "Kuwait Fee Structure",
  //   items: [
  //     {
  //       text: "Registration fee for students studying in Kuwait: KWD XX.",
  //       note: "Applicable only for Kuwait students.",
  //     },
  //     {
  //       text: "Payment should be made through the approved Kuwait VVM payment process.",
  //     },
  //   ],
  // },
};

const countryCodeMap: Record<number, string> = {
  1: "IND",
  2: "ARE",
  3: "OMN",
  // 4: "QAT",
  // 5: "SAU",
  6: "BHR",
  // 7: "KWT",
};

export default function FeeStructure() {


  const countryCode = useMemo(() => {
    if (typeof window === "undefined") return "IND";

    try {
      const loginData = localStorage.getItem("user");

      if (!loginData) return "IND";

      const parsed = JSON.parse(loginData);

      const countryId = parsed?.user?.country_id;

      return countryCodeMap[countryId] || "IND";
    } catch (error) {
      console.error("Unable to parse login data", error);
      return "IND";
    }
  }, []);

  const fee = feeStructureData[countryCode];


  return (
    <div className="min-h-screen pb-12.5">
      {/* ================= Breadcrumb ================= */}
      {/* <div className="bg-[#162a4a] py-12.5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col justify-center min-h-16.25">
            <h6 className="text-white text-[27px] font-medium mb-1">
              Fee Structure
            </h6>

            <nav>
              <ol className="flex items-center gap-2 text-white text-[12px] whitespace-nowrap">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>

                <li>{">"}</li>

                <li>
                  <Link href="/registration" className="hover:underline">
                    Registration
                  </Link>
                </li>

                <li>{">"}</li>

                <li className="text-white">Fee Structure</li>
              </ol>
            </nav>
          </div>
        </div>
      </div> */}

      {/* ================= Content ================= */}
      <div >
        <div className="max-w-5xl mx-auto px-4 my-5">
          <div
            className="relative rounded-[28px] overflow-hidden
            bg-white/70 border border-white/60 backdrop-blur-md
            shadow-[0_22px_50px_rgba(23,57,92,0.11),inset_0_1px_0_rgba(255,255,255,0.72)]
            mb-20"
          >
            <div
              className="absolute top-0 left-0 w-full h-1.25
              bg-linear-to-r from-[#17395c] via-[#f4df17] to-[#17395c]"
            />

            <div className="p-8">
               <h2 className="flex items-center justify-center gap-3 text-[32px] font-extrabold text-[#17395c] mb-6">
                {/* <span className="bg-red-100 p-2 rounded-full flex items-center justify-center">
                  <AlertCircle size={28} className="text-red-500" />
                </span> */}

                <span className="tracking-wide uppercase">
                  {fee.title}
                </span>
              </h2>

              <ul className="mt-2 pl-5 list-disc marker:text-[#17395c]">
                {fee.items.map((item, index) => (
                  <li
                    key={index}
                    className="text-[16px] leading-8 text-[#4f6480] mb-5"
                  >
                    {item.text}

                    {item.note && (
                      <>
                        <br />
                        <span className="text-[#d13b2f] text-[14px] font-semibold">
                          * {item.note}
                        </span>
                      </>
                    )}
                  </li>
                ))}
              </ul>

              <div className="h-px bg-[#17395c]/10 my-8"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-5 mb-20"></div>
    </div>
  );
}