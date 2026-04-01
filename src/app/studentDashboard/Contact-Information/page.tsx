"use client";

import { useEffect, useState } from "react";
import ProfileCard from "@/components/ui/card";
import GlobalLoader from "@/components/GlobalLoader";
type Profile = {
  name: string;
  role: string;
  email: string;
  phone: string;
};


export default function ContactPage() {

const [data, setData] = useState<Profile[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/profile"); // 👈 your API
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [search, setSearch] = useState("");
  const filteredData = data.filter((item) =>
  item.name.toLowerCase().includes(search.toLowerCase()) ||
  item.email.toLowerCase().includes(search.toLowerCase()) ||
  item.phone.includes(search)
);

  // if (!data) return <p>Loading...</p>; // optional loader
  if (!data) return <GlobalLoader />;

  return (
    <div >
      <h1 className="py-5">VIEW PRANT CORDINATOR</h1>

        {/* 🔍 Search Box */}
  <input
    type="text"
    placeholder="Search by name..."
    // value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full md:w-1/3 px-4 py-2 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400"
  />

    {/* 👇 ADD HERE */}
  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
    {filteredData.length === 0 ? (
      <p className="text-gray-500">No results found</p>
    ) : (
      filteredData.map((item, index) => (
        <ProfileCard key={index} {...item} />
      ))
    )}
  </div>

    <div className="p-6">
      {data.map((item, index) => (
  <ProfileCard
    key={index}
    name={item.name}
    role={item.role}
    email={item.email}
    phone={item.phone}
  />
))}
    </div>
</div>
  );
}