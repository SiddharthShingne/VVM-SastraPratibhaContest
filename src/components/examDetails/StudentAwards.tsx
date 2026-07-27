"use client";

import { useMemo } from "react";

const countryCodeMap: Record<number, string> = {
  1: "IND",
  2: "ARE",
  3: "OMN",
  4: "QAT",
  5: "SAU",
  6: "BHR",
  7: "KWT",
};

type AwardRow = {
  level: string;
  name: string;
  criteria: string;
  rewardTitle: string;
  rewardBadgeClass: string;
  rewardDetails: string[];
};

const awardsData: Record<string, { title: string; rows: AwardRow[]; scholarshipNote: string }> = {
  // IND: {
  //   title: "STUDENT AWARDS",
  //   rows: [
  //     {
  //       level: "LEVEL I",
  //       name: "ONLINE EXAMINATION",
  //       criteria: "All paid students will be eligible for the Online Examination.",
  //       rewardTitle: "Participation Certificate",
  //       rewardBadgeClass: "bg-green-100 text-green-600",
  //       rewardDetails: [
  //         "All participants will get participation certificate.",
  //         "Certificates will be available online via student dashboard.",
  //       ],
  //     },
  //     {
  //       level: "LEVEL II",
  //       name: "STATE LEVEL CAMP",
  //       criteria: "The top 25 rankers from each class will qualify to participate in the State Level Camp.",
  //       rewardTitle: "State Rewards",
  //       rewardBadgeClass: "bg-green-100 text-green-600",
  //       rewardDetails: [
  //         "All participants will get participation certificate.",
  //         "Top 3 Winners of each class would get Certificate & Memento.",
  //       ],
  //     },
  //     {
  //       level: "LEVEL III",
  //       name: "NATIONAL LEVEL CAMP",
  //       criteria: "The top 2 winners from each class at the state level will qualify to participate in the National Camp.",
  //       rewardTitle: "National Rewards",
  //       rewardBadgeClass: "bg-yellow-100 text-yellow-700",
  //       rewardDetails: [
  //         "All participants will get participation certificate.",
  //         "Winners would get Certificate & Memento.",
  //       ],
  //     },
  //   ],
  //   scholarshipNote:
  //     "₹2000/month scholarship for 1 year for National Winners, based on project evaluation and mentorship.",
  // },

  ARE: {
    title: "STUDENT AWARDS — UAE",
    rows: [
      {
        level: "LEVEL I",
        name: "ONLINE EXAMINATION",
        criteria: "All paid students will be eligible for the Online Examination.",
        rewardTitle: "Participation Certificate",
        rewardBadgeClass: "bg-green-100 text-green-600",
        rewardDetails: [
          "All participants will get participation certificate.",
          "Certificates will be available online via student dashboard.",
        ],
      },
      {
        level: "LEVEL II",
        name: "REGIONAL LEVEL CAMP",
        criteria: "Top rankers per class will qualify for the Regional Level Camp.",
        rewardTitle: "Regional Rewards",
        rewardBadgeClass: "bg-green-100 text-green-600",
        rewardDetails: [
          "COUNTRY LEVEL RECOGNITION DURING ANNUAL SCIENCE GALA.",
          "TOP PERFORMERS GET EXCLUSIVE INTERACTION OPPORTUNITIES WITH CHIEF GUESTS AT ANNUAL SCIENCE GALA.",
        ],
      },
    ],
    scholarshipNote: "Scholarship details for UAE winners will be announced separately.",
  },

  OMN: {
    title: "STUDENT AWARDS — OMAN",
    rows: [
      {
        level: "LEVEL I",
        name: "ONLINE EXAMINATION",
        criteria: "All paid students will be eligible for the Online Examination.",
        rewardTitle: "Participation Certificate",
        rewardBadgeClass: "bg-green-100 text-green-600",
        rewardDetails: [
          "All participants will get participation certificate.",
          "Certificates will be available online via student dashboard.",
        ],
      },
      {
        level: "LEVEL II",
        name: "REGIONAL LEVEL CAMP",
        criteria: "Top rankers per class will qualify for the Regional Level Camp.",
        rewardTitle: "Regional Rewards",
        rewardBadgeClass: "bg-green-100 text-green-600",
        rewardDetails: [
          "Trophy & Certificate ",
          "Falicitation at Science Gala ",
          "Exclusive opportunity to interact with Chief Guest at Science Gala.",
          "Opportunities to Participate in VVM National Camps.",
          "Opportunities to Participate in India International Festivals",
          "Participate in Sastrayaan Tours",
        ],
      },
    ],
    scholarshipNote: "Scholarship details for Oman winners will be announced separately.",
  },

  QAT: {
    title: "STUDENT AWARDS — QATAR",
    rows: [
      {
        level: "LEVEL I",
        name: "ONLINE EXAMINATION",
        criteria: "All paid students will be eligible for the Online Examination.",
        rewardTitle: "Participation Certificate",
        rewardBadgeClass: "bg-green-100 text-green-600",
        rewardDetails: [
          "All participants will get participation certificate.",
          "Certificates will be available online via student dashboard.",
        ],
      },
      {
        level: "LEVEL II",
        name: "REGIONAL LEVEL CAMP",
        criteria: "Top rankers per class will qualify for the Regional Level Camp.",
        rewardTitle: "Regional Rewards",
        rewardBadgeClass: "bg-green-100 text-green-600",
        rewardDetails: [
          "All participants will get participation certificate.",
          "Top winners would get Certificate & Memento.",
        ],
      },
    ],
    scholarshipNote: "Scholarship details for Qatar winners will be announced separately.",
  },

  SAU: {
    title: "STUDENT AWARDS — SAUDI ARABIA",
    rows: [
      {
        level: "LEVEL I",
        name: "ONLINE EXAMINATION",
        criteria: "All paid students will be eligible for the Online Examination.",
        rewardTitle: "Participation Certificate",
        rewardBadgeClass: "bg-green-100 text-green-600",
        rewardDetails: [
          "Students qualifying at Level 1 will be felicitated with an opportunity to participate in the Shastrayan(a visit to India’s premier research institutes).",
          "Opportunity to participate in the India International Science Festival.",
          "Honoured at the Science Gala with the Silver Honour Roll.",
          "Opportunity to interact with top - notch scientists.",
        ],
      },
      {
        level: "LEVEL II",
        name: "REGIONAL LEVEL CAMP",
        criteria: "Top rankers per class will qualify for the Regional Level Camp.",
        rewardTitle: "Regional Rewards",
        rewardBadgeClass: "bg-green-100 text-green-600",
        rewardDetails: [
          "Students qualifying at Level 2 will be recognized as SPC Winners at the Science Gala.",
          "Opportunity to participate in the Shastrayan.",
          "Opportunity to participate in the India International Science Festival.",
          "Opportunity to interact with top - notch scientists.",
        ],
      },
    ],
    scholarshipNote: "Scholarship details for Saudi Arabia winners will be announced separately.",
  },

  BHR: {
    title: "STUDENT AWARDS — BAHRAIN",
    rows: [
      {
        level: "LEVEL I",
        name: "ONLINE EXAMINATION",
        criteria: "All paid students will be eligible for the Online Examination.",
        rewardTitle: "Participation Certificate",
        rewardBadgeClass: "bg-green-100 text-green-600",
        rewardDetails: [
          "All students who participated in Level 1 will receive  Certificate.",
          "The certificates will be available at the student dashboard on the online portal.",
        ],
      },
      {
        level: "LEVEL II",
        name: "REGIONAL LEVEL CAMP",
        criteria: "The top 15 students from each grade of Level1 will qualify to participate in the level 2. ",
        rewardTitle: "Regional Rewards",
        rewardBadgeClass: "bg-green-100 text-green-600",
        rewardDetails: [
          "The top 2 students from each grade of level 2 will get Sastra Pratibha Title, certificate and Trophy. ",
          "Participate the VVM National camp. ",
          "	Participate Sastrayaan(Education Trip) ",
          "“Meet the Ambasssador” program.",
          "Any important activities related to SIF.",
          "Remaining 3 toppers (except SPs) from each grade (total 18 students) will get runners-up title, certificate and trophy. ",
          "	Runners - up students will get opportunity to join  Sastrayaan(Education Trip)"
        ],
      },
    ],
    scholarshipNote: "Scholarship details for Bahrain winners will be announced separately.",
  },

  KWT: {
    title: "STUDENT AWARDS — KUWAIT",
    rows: [
      {
        level: "LEVEL I",
        name: "ONLINE EXAMINATION",
        criteria: "All paid students will be eligible for the Online Examination.",
        rewardTitle: "Participation Certificate",
        rewardBadgeClass: "bg-green-100 text-green-600",
        rewardDetails: [
          "All participants will get participation certificate.",
          "Certificates will be available online via student dashboard.",
        ],
      },
      {
        level: "LEVEL II",
        name: "REGIONAL LEVEL CAMP",
        criteria: "Top rankers per class will qualify for the Regional Level Camp.",
        rewardTitle: "Regional Rewards",
        rewardBadgeClass: "bg-green-100 text-green-600",
        rewardDetails: [
          "Trophy & Certificate",
          "Falicitation at Science Ghala",
          "Exclusive opportunity to interact with Chief Guest at Science Ghala.",
          "Opportunities to Participate in VVM National Camps.",
          "Opportunities to Participate in India International Festivals",
          "Participate in Sastrayaan Tours"

        ],
      },
    ],
    scholarshipNote: "Scholarship details for Kuwait winners will be announced separately.",
  },
};

export default function StudentAwards() {
  const countryCode = useMemo(() => {
    if (typeof window === "undefined") return "IN";

    try {
      const loginData = localStorage.getItem("user");
      if (!loginData) return "IN";

      const parsed = JSON.parse(loginData);
      const countryId = parsed?.user?.country_id;

      return countryCodeMap[countryId] || "IN";
    } catch (error) {
      console.error("Unable to parse login data", error);
      return "IN";
    }
  }, []);

  const awards = awardsData[countryCode] || awardsData["IN"];

  if (!awards) return null;

  return (
    <div>
      {/* ================= Breadcrumb ================= */}
      {/* <div className="bg-[#162a4a] py-12.5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col justify-center min-h-16.25">
            <h6 className="text-white text-[27px] font-medium mb-1">
              Student Awards
            </h6>

            <ol className="flex text-white text-[12px] gap-2">
              <li>Home</li>
              <li>{">"}</li>
              <li>Exam Details</li>
              <li>{">"}</li>
              <li className="font-semibold">Student Awards</li>
            </ol>
          </div>
        </div>
      </div> */}

      {/* ================= Main Section ================= */}
      <div >
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative rounded-[28px] overflow-hidden bg-white/75 border border-white/60 backdrop-blur-xl shadow-[0_22px_50px_rgba(23,57,92,0.11)] mb-20">
            <div className="absolute top-0 left-0 w-full h-1.25 bg-linear-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

            <div className="p-8">
              {/* <div className="text-center mb-6">
                <h6 className="text-[35px] font-extrabold text-[#17395c] mt-2">
                  {awards.title}
                </h6>
              </div> */}

              {/* ================= Table ================= */}
              <div className="rounded-[20px] shadow-[0_15px_35px_rgba(23,57,92,0.08)] overflow-hidden">
                <div className="w-full overflow-x-auto">
                  <table className="min-w-175 w-full text-sm">
                    <thead className="bg-linear-to-br from-[#17395c] to-[#244d79] text-white">
                      <tr>
                        <th className="p-4 font-extrabold text-center">Level</th>
                        <th className="p-4 font-extrabold text-center">Name</th>
                        <th className="p-4 font-extrabold text-center">Selection Criteria</th>
                        <th className="p-4 font-extrabold text-center">Reward</th>
                      </tr>
                    </thead>

                    <tbody className="text-[#4f6480]">
                      {awards.rows.map((row, i) => (
                        <tr key={i} className="border-b hover:bg-yellow-50">
                          <td className="p-4 font-extrabold text-[#17395c] text-center">
                            {row.level}
                          </td>
                          <td className="p-4 font-bold text-[#17395c]">{row.name}</td>
                          <td className="p-4">{row.criteria}</td>
                          <td className="p-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-1 ${row.rewardBadgeClass}`}
                            >
                              {row.rewardTitle}
                            </span>
                            <br />
                            {row.rewardDetails.map((detail, j) => (
                              <span key={j}>
                                {detail}
                                {j < row.rewardDetails.length - 1 && <br />}
                              </span>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* <div className="h-px bg-[#17395c1a] my-8"></div> */}

              {/* <div className="space-y-5">
                <div className="p-5 rounded-[18px] bg-linear-to-br from-[#17395c0d] to-[#f4df1714] border-l-4 border-[#f4df17]">
                  <h5 className="font-extrabold text-[#17395c] mb-2">
                    BHASKARA SCHOLARSHIP
                  </h5>
                  <p className="text-[15px] text-[#4f6480]">{awards.scholarshipNote}</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}