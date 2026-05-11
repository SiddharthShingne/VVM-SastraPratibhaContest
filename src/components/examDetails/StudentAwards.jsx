
"use client";

export default function StudentAwards() {
  return (
    <div>
      {/* ================= Breadcrumb ================= */}
      <div className="bg-[#162a4a] py-12.5">
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
      </div>

      {/* ================= Main Section ================= */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">

          {/* Glass Card */}
          <div className="relative rounded-[28px] overflow-hidden bg-white/75 border border-white/60 backdrop-blur-xl shadow-[0_22px_50px_rgba(23,57,92,0.11)] mb-20">

            {/* Top Gradient Border */}
            <div className="absolute top-0 left-0 w-full h-1.25 bg-linear-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

            <div className="p-8">

              {/* Header */}
              <div className="text-center mb-6">
                {/* <span className="text-[20px] font-semibold">
                  Awards & Recognition
                </span> */}

                <h6 className="text-[35px] font-extrabold text-[#17395c] mt-2">
                  STUDENT AWARDS
                </h6>
              </div>

              {/* ================= Table ================= */}
              <div className="rounded-[20px] shadow-[0_15px_35px_rgba(23,57,92,0.08)] overflow-hidden">
                <div className="w-full overflow-x-auto">
                  <table className="min-w-175 w-full text-sm">

                  {/* Table Head */}
                  <thead className="bg-linear-to-br from-[#17395c] to-[#244d79] text-white">
                    <tr>
                      <th className="p-4 font-extrabold text-center">Level</th>
                      <th className="p-4 font-extrabold text-center">Name</th>
                      <th className="p-4 font-extrabold text-center">Selection Criteria</th>
                      <th className="p-4 font-extrabold text-center">Reward</th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="text-[#4f6480]">

                    {/* Row */}
                    <tr className="border-b hover:bg-yellow-50">
                      <td className="p-4 font-extrabold text-[#17395c] text-center">
                        LEVEL – I
                      </td>
                      <td className="p-4 font-bold text-[#17395c]">
                        ONLINE EXAMINATION
                      </td>
                      <td className="p-4">
                          All successful participants will be eligible for State Level Examination.
                          
                      </td>
                      <td className="p-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-600 mb-1">
                          Participation Certificate
                        </span>
                        <br />
                        Certificates will be available online via student dashboard.
                      </td>
                    </tr>

                    {/* <tr className="border-b hover:bg-yellow-50">
                      <td className="p-4 font-extrabold text-[#17395c] text-center">
                        LEVEL – II
                      </td>
                      <td className="p-4 font-bold text-[#17395c]">
                        SCHOOL TOPPERS
                      </td>
                      <td className="p-4">
                        Top 3 rankers per class (18 students per school). Minimum 10 students required per class.
                      </td> */}
                      {/* <td className="p-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-600 mb-1">
                          Merit Certificate
                        </span>
                        <br />
                        Available online only.
                      </td> */}
                    {/* </tr> */}

                    <tr className="border-b hover:bg-yellow-50">
                      <td className="p-4 font-extrabold text-[#17395c] text-center">
                        LEVEL – II
                      </td>
                      <td className="p-4 font-bold text-[#17395c]">
                        STATE LEVEL CAMP
                      </td>
                      <td className="p-4">
                          Top 25 qualify for camp. Top 3 per class become winners.
                      </td>
                      <td className="p-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-600 mb-1">
                            State Rewards
                        </span>
                        <br />
                        {/* • Fee waiver (Class 6–10) <br />
                        • Science India e-magazine (Class 11) */}
                      </td>
                    </tr>

                    <tr className="border-b hover:bg-yellow-50">
                      <td className="p-4 font-extrabold text-[#17395c] text-center">
                        LEVEL – III
                      </td>
                      <td className="p-4 font-bold text-[#17395c]">
                        NATIONAL LEVEL CAMP
                      </td>
                      <td className="p-4">
                          Top 2 per state qualify. Top 3 per class become national winners.
                      </td>
                      <td className="p-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 mb-1">
                            National Rewards
                        </span>
                        <br />
                        {/* • Certificate & Memento <br />
                        • ₹5000 / ₹3000 / ₹2000 prizes <br />
                        • NCSM visit */}
                      </td>
                    </tr>

                    <tr className="border-b hover:bg-yellow-50">
                      {/* <td className="p-4 font-extrabold text-[#17395c] text-center">
                        LEVEL – IV
                      </td>
                      <td className="p-4 font-bold text-[#17395c]">
                        NATIONAL LEVEL WINNERS
                      </td>
                      <td className="p-4">
                        Top 2 per state qualify. Top 3 per class become national winners.
                      </td> */}
                      {/* <td className="p-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600 mb-1">
                          National Rewards
                        </span>
                        <br />
                        • Certificate & Memento <br />
                        • ₹25k / ₹15k / ₹10k prizes <br />
                        • Internship & Scholarship
                      </td> */}
                    </tr>

                    {/* <tr>
                      <td className="p-4 font-extrabold text-[#17395c] text-center">
                        Schools
                      </td>
                      <td colSpan="3" className="p-4">
                        Schools with 100+ registrations can access special NCSM activities.
                      </td>
                    </tr> */}

                  </tbody>
                  </table>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#17395c1a] my-8"></div>

              {/* Info Cards */}
              <div className="space-y-5">
{/* 
                <div className="p-5 rounded-[18px] bg-linear-to-br from-[#17395c0d] to-[#f4df1714] border-l-4 border-[#f4df17]">
                  <h5 className="font-extrabold text-[#17395c] mb-2">
                    SRIJAN
                  </h5>
                  <p className="text-[15px] text-[#4f6480]">
                    National and Zonal winners will get internship opportunities
                    (1–3 weeks) in institutions like DRDO, ISRO, CSIR, BARC, etc.
                  </p>
                </div> */}

                <div className="p-5 rounded-[18px] bg-linear-to-br from-[#17395c0d] to-[#f4df1714] border-l-4 border-[#f4df17]">
                  <h5 className="font-extrabold text-[#17395c] mb-2">
                    BHASKARA SCHOLARSHIP
                  </h5>
                  <p className="text-[15px] text-[#4f6480]">
                    ₹2000/month scholarship for 1 year for National Winners,
                    based on project evaluation and mentorship.
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}