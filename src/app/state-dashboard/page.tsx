
"use client";

import { FaUserGraduate, FaSchool, FaCheckCircle, FaClock } from "react-icons/fa";

export default function StateDashboardPage() {
  const stats = [
    {
      title: "Total Students",
      // value: "12,450",
      icon: <FaUserGraduate />,
    },
    {
      title: "Total Schools",
      // value: "320",
      icon: <FaSchool />,
    },
    {
      title: "Paid ",
      // value: "10,800",
      icon: <FaCheckCircle />,
    } 
    ,
     {
      title: "Unpaid ",
      // value: "10,800",
      icon: "❌",
    } 
  ];


  return (
    <div className=" min-h-[150vh] p-6 py-8">
      
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          State Coordinator Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Overview of students, schools and activities
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {/* {item.value} */}
                </h2>
              </div>

              <div className="text-blue-600 text-2xl">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

   

      {/* Quick Actions */}
   
    </div>
  );
}