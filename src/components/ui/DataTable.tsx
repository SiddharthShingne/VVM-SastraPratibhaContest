/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useMemo, useState } from "react";


// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Search,
//   ArrowUpDown,
//   ArrowUp,
//   ArrowDown,
//   Download,
//   Filter,
//   CalendarDays,
//   RefreshCcw,
// } from "lucide-react";

// type SortDirection = "asc" | "desc" | null;

// export type DataTableColumn<T> = {
//   key: keyof T | string;
//   label: string;
//   sortable?: boolean;
//   searchable?: boolean;
//   isDate?: boolean;
//   className?: string;
//   headerClassName?: string;
//   render?: (value: any, row: T, index: number) => React.ReactNode;
// };

// type DataTableProps<T> = {
//   columns: DataTableColumn<T>[];
//   data: T[];
//   allData?: T[];
//   loading?: boolean;
//   title?: string;
//   searchPlaceholder?: string;
//   exportFileName?: string;
//   pageSize?: number;
//   showExport?: boolean;
//   showRefresh?: boolean;
//   onRefresh?: () => void;
// };

// function formatCellValue(value: any) {
//   if (value === null || value === undefined || value === "") {
//     return "Not available";
//   }
//   return String(value);
// }

// function isValidDate(value: any) {
//   if (!value) return false;
//   const d = new Date(value);
//   return !isNaN(d.getTime());
// }

// function formatDate(value: any) {
//   if (!isValidDate(value)) return "Not available";
//   const d = new Date(value);
//   return d.toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// }

// function getNestedValue(obj: Record<string, string>, path: string) {
//   if (!obj || !path) return undefined;
//   return path.split(".").reduce((acc, key) => acc?.[key], obj);
// }

// function exportToCSV<T>(
//   fileName: string,
//   rows: T[],
//   columns: DataTableColumn<T>[]
// ) {
//   const headers = columns.map((col) => `"${col.label.replace(/"/g, '""')}"`);

//   const csvRows = rows.map((row) => {
//     return columns
//       .map((col) => {
//         const rawValue =
//           typeof col.key === "string"
//             ? getNestedValue(row, col.key)
//             : row[col.key as keyof T];

//         const cellValue = col.isDate ? formatDate(rawValue) : formatCellValue(rawValue);
//         return `"${String(cellValue).replace(/"/g, '""')}"`;
//       })
//       .join(",");
//   });

//   const csvContent = [headers.join(","), ...csvRows].join("\n");
//   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//   const url = URL.createObjectURL(blob);

//   const link = document.createElement("a");
//   link.href = url;
//   link.setAttribute("download", `${fileName || "table-data"}.csv`);
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
//   URL.revokeObjectURL(url);
// }

// export default function DataTable<T extends Record<string, string>>({
//   columns,
//   data,
//   allData,
//   loading = false,
//   title = "Data Table",
//   searchPlaceholder = "Search...",
//   exportFileName = "table-data",
//   pageSize = 10,
//   showExport = true,
//   showRefresh = false,
//   onRefresh,
// }: DataTableProps<T>) {
//   const sourceData = allData && allData.length ? allData : data;

//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortKey, setSortKey] = useState<string | null>(null);
//   const [sortDirection, setSortDirection] = useState<SortDirection>(null);
//   const [selectedDateColumn, setSelectedDateColumn] = useState<string>("");
//   const [selectedDateValue, setSelectedDateValue] = useState<string>("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [dateFilterOpen, setDateFilterOpen] = useState(false);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, selectedDateValue, selectedDateColumn, data]);

//   const searchableColumns = useMemo(() => {
//     return columns.filter((col) => col.searchable !== false);
//   }, [columns]);

//   const dateColumns = useMemo(() => {
//     return columns.filter((col) => col.isDate);
//   }, [columns]);

//   const filteredData = useMemo(() => {
//     let rows = [...sourceData];

//     if (searchTerm.trim()) {
//       const q = searchTerm.toLowerCase();
//       rows = rows.filter((row) =>
//         searchableColumns.some((col) => {
//           const value =
//             typeof col.key === "string"
//               ? getNestedValue(row, col.key)
//               : row[col.key as keyof T];

//           return String(value ?? "")
//             .toLowerCase()
//             .includes(q);
//         })
//       );
//     }

//     if (selectedDateColumn && selectedDateValue) {
//       rows = rows.filter((row) => {
//         const value = getNestedValue(row, selectedDateColumn);
//         if (!isValidDate(value)) return false;

//         const rowDate = new Date(value);
//         const filterDate = new Date(selectedDateValue);

//         return (
//           rowDate.getFullYear() === filterDate.getFullYear() &&
//           rowDate.getMonth() === filterDate.getMonth() &&
//           rowDate.getDate() === filterDate.getDate()
//         );
//       });
//     }

//     if (sortKey && sortDirection) {
//       rows.sort((a, b) => {
//         const aVal = getNestedValue(a, sortKey);
//         const bVal = getNestedValue(b, sortKey);

//         const aIsDate = isValidDate(aVal);
//         const bIsDate = isValidDate(bVal);

//         let result = 0;

//         if (aIsDate && bIsDate) {
//           result = new Date(aVal).getTime() - new Date(bVal).getTime();
//         } else if (typeof aVal === "number" && typeof bVal === "number") {
//           result = aVal - bVal;
//         } else {
//           result = String(aVal ?? "").localeCompare(String(bVal ?? ""), undefined, {
//             numeric: true,
//             sensitivity: "base",
//           });
//         }

//         return sortDirection === "asc" ? result : -result;
//       });
//     }

//     return rows;
//   }, [
//     sourceData,
//     searchTerm,
//     searchableColumns,
//     selectedDateColumn,
//     selectedDateValue,
//     sortKey,
//     sortDirection,
//   ]);

//   const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));

//   const paginatedData = useMemo(() => {
//     const start = (currentPage - 1) * pageSize;
//     return filteredData.slice(start, start + pageSize);
//   }, [filteredData, currentPage, pageSize]);

//   const handleSort = (key: string) => {
//     if (sortKey !== key) {
//       setSortKey(key);
//       setSortDirection("asc");
//       return;
//     }

//     if (sortDirection === "asc") {
//       setSortDirection("desc");
//     } else if (sortDirection === "desc") {
//       setSortDirection(null);
//       setSortKey(null);
//     } else {
//       setSortDirection("asc");
//     }
//   };

//   const renderSortIcon = (key: string) => {
//     if (sortKey !== key || !sortDirection) {
//       return <ArrowUpDown className="h-4 w-4" />;
//     }
//     if (sortDirection === "asc") {
//       return <ArrowUp className="h-4 w-4" />;
//     }
//     return <ArrowDown className="h-4 w-4" />;
//   };

//   return (
//     <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
//       <div className="flex flex-col gap-4 border-b border-slate-200 px-4 py-4 sm:px-6">
//         <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
//           <div>
//             <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
//             <p className="text-sm text-slate-500">
//               Total Records: {filteredData.length}
//             </p>
//           </div>

//           <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
//             <div className="relative w-full sm:w-72">
//               <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//               <input
//                 type="text"
//                 placeholder={searchPlaceholder}
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="h-11 w-full rounded-xl border border-slate-300 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
//               />
//             </div>

//             {dateColumns.length > 0 && (
//               <div className="relative">
//                 <button
//                   type="button"
//                   onClick={() => setDateFilterOpen((prev) => !prev)}
//                   className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
//                 >
//                   <Filter className="h-4 w-4" />
//                   Date Filter
//                 </button>

//                 {dateFilterOpen && (
//                   <div className="absolute right-0 z-20 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
//                     <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
//                       <CalendarDays className="h-4 w-4" />
//                       Filter by date
//                     </div>

//                     <div className="space-y-3">
//                       <select
//                         value={selectedDateColumn}
//                         onChange={(e) => setSelectedDateColumn(e.target.value)}
//                         className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
//                       >
//                         <option value="">Select date column</option>
//                         {dateColumns.map((col) => (
//                           <option key={String(col.key)} value={String(col.key)}>
//                             {col.label}
//                           </option>
//                         ))}
//                       </select>

//                       <input
//                         type="date"
//                         value={selectedDateValue}
//                         onChange={(e) => setSelectedDateValue(e.target.value)}
//                         className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
//                       />

//                       <button
//                         type="button"
//                         onClick={() => {
//                           setSelectedDateColumn("");
//                           setSelectedDateValue("");
//                           setDateFilterOpen(false);
//                         }}
//                         className="w-full rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
//                       >
//                         Clear Filter
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {showRefresh && (
//               <button
//                 type="button"
//                 onClick={onRefresh}
//                 className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
//               >
//                 <RefreshCcw className="h-4 w-4" />
//                 Refresh
//               </button>
//             )}

//             {showExport && (
//               <button
//                 type="button"
//                 onClick={() => exportToCSV(exportFileName, filteredData, columns)}
//                 className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:from-indigo-700 hover:to-violet-700"
//               >
//                 <Download className="h-4 w-4" />
//                 Export
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full text-left">
//           <thead className="bg-slate-50">
//             <tr>
//               {columns.map((col) => (
//                 <th
//                   key={String(col.key)}
//                   className={`whitespace-nowrap px-4 py-4 text-xs font-semibold uppercase tracking-wider text-slate-600 sm:px-6 ${col.headerClassName || ""}`}
//                 >
//                   <div className="flex items-center gap-2">
//                     <span>{col.label}</span>
//                     {col.sortable !== false && (
//                       <button
//                         type="button"
//                         onClick={() => handleSort(String(col.key))}
//                         className="rounded-md p-1 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
//                       >
//                         {renderSortIcon(String(col.key))}
//                       </button>
//                     )}
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-slate-100">
//             {loading ? (
//               Array.from({ length: 6 }).map((_, rowIndex) => (
//                 <tr key={rowIndex}>
//                   {columns.map((col, colIndex) => (
//                     <td
//                       key={`${rowIndex}-${colIndex}`}
//                       className="px-4 py-4 sm:px-6"
//                     >
//                       <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             ) : paginatedData.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={columns.length}
//                   className="px-4 py-12 text-center text-sm font-medium text-slate-500 sm:px-6"
//                 >
//                   Not available
//                 </td>
//               </tr>
//             ) : (
//               paginatedData.map((row, rowIndex) => (
//                 <tr
//                   key={rowIndex}
//                   className="transition hover:bg-indigo-50/40"
//                 >
//                   {columns.map((col) => {
//                     const value =
//                       typeof col.key === "string"
//                         ? getNestedValue(row, col.key)
//                         : row[col.key as keyof T];

//                     return (
//                       <td
//                         key={String(col.key)}
//                         className={`px-4 py-4 text-sm text-slate-700 sm:px-6 ${col.className || ""}`}
//                       >
//                         {col.render
//                           ? col.render(value, row, rowIndex)
//                           : col.isDate
//                           ? formatDate(value)
//                           : formatCellValue(value)}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
//         <p className="text-sm text-slate-500">
//           Showing{" "}
//           {filteredData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{" "}
//           {Math.min(currentPage * pageSize, filteredData.length)} of{" "}
//           {filteredData.length} entries
//         </p>

//         <div className="flex flex-wrap items-center gap-2">
//           <button
//             type="button"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
//             className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             Prev
//           </button>

//           {Array.from({ length: totalPages }).map((_, index) => {
//             const page = index + 1;
//             return (
//               <button
//                 key={page}
//                 type="button"
//                 onClick={() => setCurrentPage(page)}
//                 className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
//                   currentPage === page
//                     ? "bg-indigo-600 text-white shadow-md"
//                     : "border border-slate-300 text-slate-700 hover:bg-slate-100"
//                 }`}
//               >
//                 {page}
//               </button>
//             );
//           })}

//           <button
//             type="button"
//             disabled={currentPage === totalPages}
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(totalPages, prev + 1))
//             }
//             className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Download,
  Filter,
  CalendarDays,
  RefreshCcw,
} from "lucide-react";

type SortDirection = "asc" | "desc" | null;

export type DataTableColumn<T> = {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  searchable?: boolean;
  isDate?: boolean;
  className?: string;
  headerClassName?: string;
  render?: (value: string, row: T, index: number) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  allData?: T[];
  loading?: boolean;
  title?: string;
  searchPlaceholder?: string;
  exportFileName?: string;
  pageSize?: number;
  showExport?: boolean;
  showRefresh?: boolean;
  onRefresh?: () => void;

  showSearch?: boolean;
  showTotalRecords?: boolean;
};

  function formatCellValue(value: string) {
  if (value === null || value === undefined || value === "") {
    return "Not available";
  }
  return String(value);
}

function isValidDate(value: string) {
  if (!value) return false;
  const d = new Date(value);
  return !isNaN(d.getTime());
}

function formatDate(value: string) {
  if (!isValidDate(value)) return "Not available";
  const d = new Date(value);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getNestedValue(obj: Record<string, string>, path: string) {
  // if (!obj || !path) return undefined;
  // return path.split(".").reduce((acc, key) => acc[key], obj);

    return path.split(".").reduce((acc, key) => {
    if (typeof acc === "object" && acc !== null && key in acc) {
      return (acc as Record<string, string>)[key];
    }
    return undefined; // agar path invalid hai
  }, obj as Record<string, string>);
}

function exportToCSV<T>(
  fileName: string,
  rows: T[],
  columns: DataTableColumn<T>[]
) {
  const headers = columns.map((col) => `"${col.label.replace(/"/g, '""')}"`);

  const csvRows = rows.map((row) => {
    return columns
      .map((col) => {
        const rawValue =
          typeof col.key === "string"
            ? getNestedValue(row, col.key)
            : row[col.key as keyof T];
            

 
  const cellValue = col.isDate
  ? formatDate(String(rawValue ?? ""))
  : formatCellValue(String(rawValue ?? ""));


        return `"${String(cellValue).replace(/"/g, '""')}"`;
      })
      .join(",");
  });

  const csvContent = [headers.join(","), ...csvRows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${fileName || "table-data"}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function DataTable<T extends Record<string, string>>({
  columns,
  data,
  allData,
  loading = false,
  title = "Data Table",
  searchPlaceholder = "Search...",
  exportFileName = "table-data",
  pageSize = 10,
  showExport = true,
  showRefresh = false,
  onRefresh,
  showSearch = true,
  showTotalRecords = true,
}: DataTableProps<T>) {
  const sourceData = allData && allData.length ? allData : data;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [selectedDateColumn, setSelectedDateColumn] = useState<string>("");
  const [selectedDateValue, setSelectedDateValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilterOpen, setDateFilterOpen] = useState(false);

useEffect(() => {
  if (currentPage !== 1) {
    setCurrentPage(1);
  }
}, [searchTerm, selectedDateValue, selectedDateColumn, data]);

  const searchableColumns = useMemo(() => {
    return columns.filter((col) => col.searchable !== false);
  }, [columns]);

  const dateColumns = useMemo(() => {
    return columns.filter((col) => col.isDate);
  }, [columns]);

  const filteredData = useMemo(() => {
    let rows = [...sourceData];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      rows = rows.filter((row) =>
        searchableColumns.some((col) => {
          const value =
            typeof col.key === "string"
              ? getNestedValue(row, col.key)
              : row[col.key as keyof T];

          return String(value ?? "")
            .toLowerCase()
            .includes(q);
        })
      );
    }

    if (selectedDateColumn && selectedDateValue) {
      rows = rows.filter((row) => {
        const value = getNestedValue(row, selectedDateColumn);
        if (!isValidDate(value)) return false;

        const rowDate = new Date(value);
        const filterDate = new Date(selectedDateValue);

        return (
          rowDate.getFullYear() === filterDate.getFullYear() &&
          rowDate.getMonth() === filterDate.getMonth() &&
          rowDate.getDate() === filterDate.getDate()
        );
      });
    }

    if (sortKey && sortDirection) {
      rows.sort((a, b) => {
        const aVal = getNestedValue(a, sortKey);
        const bVal = getNestedValue(b, sortKey);

        const aIsDate = isValidDate(aVal);
        const bIsDate = isValidDate(bVal);

        let result = 0;

        if (aIsDate && bIsDate) {
          result = new Date(aVal).getTime() - new Date(bVal).getTime();
        } else if (typeof aVal === "number" && typeof bVal === "number") {
          result = aVal - bVal;
        } else {
          result = String(aVal ?? "").localeCompare(String(bVal ?? ""), undefined, {
            numeric: true,
            sensitivity: "base",
          });
        }

        return sortDirection === "asc" ? result : -result;
      });
    }

    return rows;
  }, [
    sourceData,
    searchTerm,
    searchableColumns,
    selectedDateColumn,
    selectedDateValue,
    sortKey,
    sortDirection,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handleSort = (key: string) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDirection("asc");
      return;
    }

    if (sortDirection === "asc") setSortDirection("desc");
    else if (sortDirection === "desc") {
      setSortDirection(null);
      setSortKey(null);
    } else setSortDirection("asc");
  };

  const renderSortIcon = (key: string) => {
    if (sortKey !== key || !sortDirection) return <ArrowUpDown className="h-4 w-4" />;
    if (sortDirection === "asc") return <ArrowUp className="h-4 w-4" />;
    return <ArrowDown className="h-4 w-4" />;
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-4 border-b border-slate-200 px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">{title}</h2>

            {showTotalRecords && (
              <p className="text-sm text-slate-500">
                Total Records: {filteredData.length}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

            {showSearch && (
              <div className="relative w-full sm:w-72">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-300 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            )}

            {dateColumns.length > 0 && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDateFilterOpen((prev) => !prev)}
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  <Filter className="h-4 w-4" />
                  Date Filter
                </button>

                {dateFilterOpen && (
                  <div className="absolute right-0 z-20 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <CalendarDays className="h-4 w-4" />
                      Filter by date
                    </div>

                    <div className="space-y-3">
                      <select
                        value={selectedDateColumn}
                        onChange={(e) => setSelectedDateColumn(e.target.value)}
                        className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                      >
                        <option value="">Select date column</option>
                        {dateColumns.map((col) => (
                          <option key={String(col.key)} value={String(col.key)}>
                            {col.label}
                          </option>
                        ))}
                      </select>

                      <input
                        type="date"
                        value={selectedDateValue}
                        onChange={(e) => setSelectedDateValue(e.target.value)}
                        className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDateColumn("");
                          setSelectedDateValue("");
                          setDateFilterOpen(false);
                        }}
                        className="w-full rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                      >
                        Clear Filter
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {showRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </button>
            )}

            {showExport && (
              <button
                type="button"
                onClick={() => exportToCSV(exportFileName, filteredData, columns)}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:from-indigo-700 hover:to-violet-700"
              >
                <Download className="h-4 w-4" />
                Export
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`whitespace-nowrap px-4 py-4 text-xs font-semibold uppercase tracking-wider text-slate-600 sm:px-6 ${col.headerClassName || ""}`}
                >
                  <div className="flex items-center gap-2">
                    <span>{col.label}</span>
                    {col.sortable !== false && (
                      <button
                        type="button"
                        onClick={() => handleSort(String(col.key))}
                        className="rounded-md p-1 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
                      >
                        {renderSortIcon(String(col.key))}
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading ? (
              Array.from({ length: 6 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <td key={`${rowIndex}-${colIndex}`} className="px-4 py-4 sm:px-6">
                      <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                    </td>
                  ))}
                </tr>
              ))
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-sm font-medium text-slate-500 sm:px-6">
                  Not available
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="transition hover:bg-indigo-50/40">
                  {columns.map((col) => {
                    const value =
                      typeof col.key === "string"
                        ? getNestedValue(row, col.key)
                        : row[col.key as keyof T];

                    return (
                      <td
                        key={String(col.key)}
                        className={`px-4 py-4 text-sm text-slate-700 sm:px-6 ${col.className || ""}`}
                      >
                        {col.render
                          ? col.render(value, row, rowIndex)
                          : col.isDate
                          ? formatDate(value)
                          : formatCellValue(value)}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-slate-500">
          Showing {filteredData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, filteredData.length)} of{" "}
          {filteredData.length} entries
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-indigo-600 text-white shadow-md"
                    : "border border-slate-300 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}