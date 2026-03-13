
// "use client";

// import React, { useMemo, useState, useEffect } from "react";
// import DataTable, { DataTableColumn } from "@/components/ui/DataTable";

// type UserRow = {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   status: string;
//   createdAt: string;
// };

// export default function StudyMaterial() {
//   const [loading, setLoading] = useState(true);
//   const [allUsers, setAllUsers] = useState<UserRow[]>([]);

//   useEffect(() => {
//     setTimeout(() => {
//       setAllUsers([
//         {
//           id: 1,
//           name: "Abhishek Thakre",
//           email: "abhishek@gmail.com",
//           phone: "9876543210",
//           status: "Active",
//           createdAt: "2026-03-01T10:30:00",
          
//         },
//         {
//           id: 2,
//           name: "Rahul Sharma",
//           email: "",
//           phone: "9988776655",
//           status: "Inactive",
//           createdAt: "2026-02-25T14:10:00",
//         },
//         {
//           id: 3,
//           name: "Priya Verma",
//           email: "priya@gmail.com",
//           phone: "",
//           status: "Pending",
//           createdAt: "2026-03-03T09:00:00",
//         },
//       ]);
//       setLoading(false);
//     }, 1200);
//   }, []);

//   const columns: DataTableColumn<UserRow>[] = useMemo(
//     () => [
//       {
//         key: "id",
//         label: "ID",
//         sortable: false,
//       },
//        {
//         key: "Language",
//         label: "Language",
//         sortable: false,
//       },
//       {
//         key: "Life Story of Dr. Satyendra Nath Bose",
//         label: "Life Story of Dr. Satyendra Nath Bose",
//         sortable: false,
//         searchable: false,
//       },
//       {
//         key: "	ICS-Indian Contributions to Science",
//         label: "ICS-Indian Contributions to Science",
//         sortable: false,
//         searchable: false,
//       },
//       {
//         key: "	IKS - Supplementary Book",
//         label: "ICS - Supplementary Book",
//         sortable: false,
//         searchable: false,
//       },
//     //   {
//     //     key: "status",
//     //     label: "Status",
//     //     sortable: true,
//     //     searchable: true,
//     //     render: (value) => {
//     //       const status = value || "Not available";

//     //       const styles: Record<string, string> = {
//     //         Active: "bg-emerald-100 text-emerald-700",
//     //         Inactive: "bg-rose-100 text-rose-700",
//     //         Pending: "bg-amber-100 text-amber-700",
//     //         "Not available": "bg-slate-100 text-slate-700",
//     //       };

//     //       return (
//     //         <span
//     //           className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
//     //             styles[status] || "bg-slate-100 text-slate-700"
//     //           }`}
//     //         >
//     //           {status}
//     //         </span>
//     //       );
//     //     },
//     //   },
//     //   {
//     //     key: "createdAt",
//     //     label: "Created Date",
//     //     sortable: true,
//     //     searchable: false,
//     //     isDate: true,
//     //   },
//     ],
//     []
//   );

//   return (
//     <div className="p-4 md:p-6">
//       <DataTable<UserRow>
//         title="Study Material"
//         columns={columns}
//         data={allUsers}
//         allData={allUsers}
//         loading={loading}
//         pageSize={5}
//         exportFileName="study_material"
        
//         showExport={false}
//       />
//     </div>
//   );
// }

"use client";

import React, { useMemo, useState, useEffect } from "react";
import DataTable, { DataTableColumn } from "@/components/ui/DataTable";

type MaterialRow = {
  id: number;
  language: string;
  bose: string;
  ics: string;
  iks: string;
};

export default function StudyMaterial() {
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<MaterialRow[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setAllUsers([
        { id: 1, language: "English", bose: "btn", ics: "btn", iks: "btn" },
        { id: 2, language: "Hindi", bose: "btn", ics: "btn", iks: "na" },
        { id: 3, language: "Marathi", bose: "btn", ics: "btn", iks: "na" },
        { id: 4, language: "Tamil", bose: "btn", ics: "btn", iks: "na" },
        { id: 5, language: "Telugu", bose: "btn", ics: "btn", iks: "na" },
        { id: 6, language: "Kannada", bose: "btn", ics: "btn", iks: "na" },
        { id: 7, language: "Malayalam", bose: "soon", ics: "btn", iks: "na" },
        { id: 8, language: "Bengali", bose: "btn", ics: "btn", iks: "na" },
        { id: 9, language: "Gujarati", bose: "soon", ics: "btn", iks: "na" },
        { id: 10, language: "Odia", bose: "soon", ics: "btn", iks: "na" },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const renderButton = (value: string) => {
    if (value === "btn") {
      return (
        <button className="inline-flex items-center bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          Download/View
        </button>
      );
    }

    if (value === "soon") {
      return <span className="inline-flex items-center bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold">Uploading Soon</span>;
    }

    return <span className="inline-flex items-center bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold">N/A</span>;
  };

  // const columns: DataTableColumn<MaterialRow>[] = useMemo(
  //   () => [
  //     {
  //       key: "id",
  //       label: "ID",
  //     },
  //     {
  //       key: "language",
  //       label: "Language",
  //     },
  //     {
  //       key: "bose",
  //       label: "Life Story of Dr. Satyendra Nath Bose",
  //       sortable: false,
  //       searchable: false,
  //       render: (value) => renderButton(value),
  //     },
  //     {
  //       key: "ics",
  //       label: "ICS - Indian Contributions to Science",
  //       sortable: false,
  //       searchable: false,
  //       render: (value) => renderButton(value),
  //     },
  //     {
  //       key: "iks",
  //       label: "IKS - Supplementary Book",
  //       sortable: false,
  //       searchable: false,
  //       render: (value) => renderButton(value),
  //     },
  //   ],
  //   []
  // );
  const columns: DataTableColumn<MaterialRow>[] = useMemo(
  () => [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "language",
      label: "Language",
    },
    {
      key: "bose",
      label: "Life Story of Dr. Satyendra Nath Bose",
      sortable: false,
      searchable: false,
      render: (value, row, index) => renderButton(value as string),
    },
    {
      key: "ics",
      label: "ICS - Indian Contributions to Science",
      sortable: false,
      searchable: false,
      render: (value, row, index) => renderButton(value as string),
    },
    {
      key: "iks",
      label: "IKS - Supplementary Book",
      sortable: false,
      searchable: false,
      render: (value, row, index) => renderButton(value as string),
    },
  ],
  []
);

  return (
<div className="w-full overflow-x-auto">
      <DataTable<MaterialRow>
        title="Study Material"
        columns={columns}
        data={allUsers}
        allData={allUsers}
        loading={loading}
        pageSize={10}
        exportFileName="study_material"
        showExport={false}
         showSearch={false}
  showTotalRecords={false}
      />
    </div>
  );
}