/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { FaUserGraduate, FaSchool, FaArrowUp } from "react-icons/fa";
import {
  fetchDashboardCardSummary,
  fetchPrants,
  fetchStateSummary,
} from "@/services/importantDatesService";
import { fetchDistricts } from "@/services/authService";
import { exportStateSummary } from "@/services/importantDatesService";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Assignment {
  id: number;
  coordinatable_type: string;
  coordinatable_id: number;
  coordinatable_name: string;
}

// interface StoredUser {
//   user?: {
//     user_detail?: {
//       assignments?: Assignment[];
//     };
//     country_id?: number;
//   };
// }

interface StoredUser {
  user?: {
    user_detail?: {
      assignments?: Assignment[];
    };
    country_id?: number;
    country_code?: string;
  };
}

interface Prant {
  id: number;
  name: string;
}

interface District {
  id: number;
  name: string;
  prant_id: number;
}

interface CardSummary {
  total_school: number;
  total_student: number;
  upgrade_summary: string;
}

interface StateSummaryRow {
  stateid?: number;
  state_name?: string;
  total_school?: number;
  total_student?: number;
  total_paid_student?: number;
  individual_student?: number;
  total_attempted_level1_students?: number;
  total_submitted_level1_students?: number;
  totals?: Record<string, number>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const ITEMS_PER_PAGE_OPTIONS = [1];

const isDataRow = (row: StateSummaryRow): boolean =>
  !row.totals && !!row.state_name;

function getStateIdFromStorage(): number | null {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    const parsed: StoredUser = JSON.parse(raw);
    const assignments = parsed?.user?.user_detail?.assignments ?? [];
    const stateAssignment = assignments.find(
      (a) => a.coordinatable_type === "State",
    );
    if (stateAssignment?.coordinatable_id) {
      return stateAssignment.coordinatable_id;
    }
    return null;
  } catch {
    return null;
  }
}


function getCountryCodeFromStorage(): string {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return "";
    const parsed: StoredUser = JSON.parse(raw);
    return (parsed?.user as any)?.country_code ?? "";
  } catch {
    return "";
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function Badge({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center justify-center min-w-8 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-semibold text-xs">
      {value}
    </span>
  );
}

function ExportBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-xs font-semibold rounded-lg transition-all duration-150 shadow-sm whitespace-nowrap"
    >
      Export
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function StateDashboardPage() {
  // const [stateId, setStateId] = useState<number | null>(null);

  // useEffect(() => {
  //   const id = getStateIdFromStorage();
  //   setStateId(id);
  // }, []);

  const [stateId, setStateId] = useState<number | null>(null);
  const [countryCode, setCountryCode] = useState<string>("");

  useEffect(() => {
    const id = getStateIdFromStorage();
    setStateId(id);
    setCountryCode(getCountryCodeFromStorage());
  }, []);

  const [prants, setPrants] = useState<Prant[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  const [selectedFilter, setSelectedFilter] = useState<{
    type: "prant" | "district";
    prantId: number;
    districtId: number | null;
    label: string;
  } | null>(null);

  const [summary, setSummary] = useState<CardSummary | null>(null);
  const [stateSummaryRows, setStateSummaryRows] = useState<StateSummaryRow[]>(
    [],
  );
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // ── Fetch Prants once we have stateId ────────────────────────────────────
  useEffect(() => {
    if (!stateId) return;
    fetchPrants({ state_ids: [stateId] })
      .then(async (res: any) => {
        const prantList: Prant[] = res.data ?? [];
        setPrants(prantList);

        if (prantList.length > 0) {
          const allDistricts: District[] = [];
          await Promise.all(
            prantList.map((p) =>
              fetchDistricts({
                state_ids: [stateId],
                prant_ids: [p.id],
              }).then((data: District[]) => {
                allDistricts.push(...(data ?? []));
              }),
            ),
          );
          setDistricts(allDistricts);
        }
      })
      .catch(console.error);
  }, [stateId]);

  // ── Fetch dashboard data whenever filter or stateId changes ──────────────
  useEffect(() => {
    if (!stateId) return;

    const prantId = selectedFilter?.prantId ?? null;
    const districtId = selectedFilter?.districtId ?? null;

    const payload = {
      zone_id: [] as number[],
      state_id: [stateId],
      prant_id: prantId ? [prantId] : [],
      district_id: districtId ? [districtId] : [],
    };

    fetchDashboardCardSummary(payload)
      .then((res: any) => setSummary(res.data?.[0] ?? null))
      .catch(console.error);

    setLoading(true);
    fetchStateSummary(payload)
      .then((res: any) => {
        const rows: StateSummaryRow[] = (res.data ?? []).filter(isDataRow);
        setStateSummaryRows(rows);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [stateId, selectedFilter]);

  // ── Close dropdown on outside click ──────────────────────────────────────
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      const dropdown = document.getElementById("region-dropdown-wrapper");
      if (dropdown && !dropdown.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  // ── Build the combined dropdown options ───────────────────────────────────
  const dropdownOptions = useMemo(() => {
    const options: Array<{
      label: string;
      subLabel?: string;
      value: {
        type: "prant" | "district";
        prantId: number;
        districtId: number | null;
        label: string;
      };
      isPrantHeader: boolean;
    }> = [];

    prants.forEach((p) => {
      options.push({
        label: p.name,
        isPrantHeader: true,
        value: {
          type: "prant",
          prantId: p.id,
          districtId: null,
          label: p.name,
        },
      });

      districts
        .filter((d) => d.prant_id === p.id)
        .forEach((d) => {
          options.push({
            label: d.name,
            subLabel: p.name,
            isPrantHeader: false,
            value: {
              type: "district",
              prantId: p.id,
              districtId: d.id,
              label: d.name,
            },
          });
        });
    });

    return options;
  }, [prants, districts]);

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return dropdownOptions;
    return dropdownOptions.filter((o) =>
      o.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [dropdownOptions, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(stateSummaryRows.length / itemsPerPage),
  );
  const paginated = stateSummaryRows.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const totals = useMemo(() => {
    const schools = stateSummaryRows.reduce(
      (s, r) => s + (r.total_school ?? 0),
      0,
    );
    const individual = stateSummaryRows.reduce(
      (s, r) => s + (r.individual_student ?? 0),
      0,
    );
    const total = stateSummaryRows.reduce(
      (s, r) => s + (r.total_student ?? 0),
      0,
    );
    const paid = stateSummaryRows.reduce(
      (s, r) => s + (r.total_paid_student ?? 0),
      0,
    );
    const lvl1Attempted = stateSummaryRows.reduce(
      (s, r) => s + (r.total_attempted_level1_students ?? 0),
      0,
    );
    const lvl1Submitted = stateSummaryRows.reduce(
      (s, r) => s + (r.total_submitted_level1_students ?? 0),
      0,
    );
    return { schools, individual, total, paid, lvl1Attempted, lvl1Submitted };
  }, [stateSummaryRows]);

  const handleExport = async () => {
    if (!stateId) return;
    try {
      const payload = {
        search: "",
        filters: {
          state_id: [stateId],
          prant_id: selectedFilter?.prantId ? [selectedFilter.prantId] : [],
          district_id: selectedFilter?.districtId
            ? [selectedFilter.districtId]
            : [],
        },
      };
      const blob = await exportStateSummary(payload);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "state-summary.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error(err);
      alert("Export failed");
    }
  };

  const studentDetailHref = countryCode === "AE"
    ? "/state-dashboard/student/total-student"
    : "/state-dashboard/student/new-student-registrations";


  const upgradedMatch = summary?.upgrade_summary?.match(/(\d+)\s*\(Upgraded\)/);
  const nonUpgradedMatch = summary?.upgrade_summary?.match(
    /(\d+)\s*\(Non-?Upgraded\)/,
  );

  const upgraded = upgradedMatch ? upgradedMatch[1] : "0";
  const nonUpgraded = nonUpgradedMatch ? nonUpgradedMatch[1] : "0";
  // ── Stat cards — NO left accent border, rounded-square icon ──────────────
  const stats = [
    {
      label: "Student Count",
      value: (summary?.total_student ?? 0).toLocaleString(),
      icon: <FaUserGraduate size={20} />,
      iconBg: "bg-emerald-50 text-emerald-500",
      href: studentDetailHref,
    },
    {
      label: "School Count",
      value: (summary?.total_school ?? 0).toLocaleString(),
      icon: <FaSchool size={20} />,
      iconBg: "bg-amber-50 text-amber-500",
      href: "/state-dashboard/school/total-school",
    },
    // {
    //   label: "Upgraded Students",
    //   value: summary?.upgrade_summary ?? "0 (Upgraded) / 0 (Non-Upgraded)",
    //   icon: <FaArrowUp size={20} />,
    //   iconBg: "bg-sky-50 text-sky-500",
    // },
    {
      label: "Upgraded Students",
      value: (
        <div className="flex items-baseline flex-wrap gap-x-0.5 text-xs sm:text-sm">
          <span className="font-extrabold">{upgraded}</span>
          <span className="text-[9px] sm:text-[11px] text-slate-400">
            (Upgraded)
          </span>
          <span className="mx-0.5 text-slate-300">/</span>
          <span className="font-extrabold">{nonUpgraded}</span>
          <span className="text-[9px] sm:text-[11px] text-slate-400">
            (Non-Upgraded)
          </span>
        </div>
      ),
      icon: <FaArrowUp size={20} />,
      iconBg: "bg-sky-50 text-sky-500",
      href: null,
    },
  ];

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .anim-down { animation: fadeSlideDown 0.35s ease both; }
        .anim-up   { animation: fadeSlideUp 0.4s ease both; }
        .anim-fade { animation: fadeIn 0.25s ease both; }

        @media (max-width: 640px) {
          .resp-table thead { display: none; }
          .resp-table tbody tr {
            display: block;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            margin-bottom: 12px;
            padding: 12px;
          }
          .resp-table tbody td {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 6px 4px;
            border: none;
            font-size: 13px;
          }
          .resp-table tbody td::before {
            content: attr(data-label);
            font-weight: 600;
            color: #94a3b8;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            flex-shrink: 0;
            margin-right: 8px;
          }
          .resp-table tfoot tr {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            border-top: 2px solid #e2e8f0;
            padding-top: 8px;
          }
          .resp-table tfoot td { padding: 4px 8px; font-size: 13px; }
        }
      `}</style>

      <div className="min-h-screen p-3 sm:p-5 lg:p-8">
        {/* ── Page Title ── */}
        <div className="mb-3 sm:mb-5 anim-down">
          <h1 className="text-lg sm:text-2xl font-bold text-slate-800 tracking-tight">
            State Coordinator Dashboard
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Monitor student and school data by region
          </p>
        </div>

        {/* ── Stat Cards — no left accent border ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-5">
          {/* {stats.map((s, i) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3 sm:p-3
                         flex items-center gap-3 sm:gap-4
                         hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 anim-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              
              <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 ${s.iconBg}`}>
                {s.icon}
              </div>
              <div className="min-w-0">
                <p className="text-slate-400 text-[11px] sm:text-sm font-bold mb-0.5 truncate">
                  {s.label}
                </p>
                <div className="text-blue-600 font-extrabold text-sm sm:text-base leading-tight break-words">
                  {s.value}
                </div>
              </div>
            </div>
          ))} */}
          {stats.map((s, i) => {
            const card = (
              <div
                key={s.label}
                className={`bg-white rounded-2xl border border-slate-100 shadow-sm p-3 sm:p-3
                 flex items-center gap-3 sm:gap-4
                 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 anim-up
                 ${s.href ? "cursor-pointer" : ""}`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  className={`w-8 h-8 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 ${s.iconBg}`}
                >
                  {s.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-slate-400 text-[10px] sm:text-xs font-bold mb-0.5 truncate">
                    {s.label}
                  </p>
                  <div className="text-blue-600 font-extrabold text-xs sm:text-sm leading-tight">
                    {s.value}
                  </div>
                </div>
              </div>
            );

            return s.href ? (
              <Link key={s.label} href={s.href} className="block">
                {card}
              </Link>
            ) : (
              <div key={s.label}>{card}</div> // remove key from inner div since it's on outer
            );
          })}
        </div>

        {/* ── Search + Export row — OUTSIDE the table card, above it ── */}
        <div
          className="mb-4 flex flex-wrap items-center gap-2 sm:gap-3 relative z-50 anim-down"
          style={{ animationDelay: "60ms" }}
        >
          {/* Region / District dropdown */}
          <div
            id="region-dropdown-wrapper"
            className="relative w-full sm:w-72 min-w-0"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div
              className={`flex items-center gap-2 w-full px-4 py-2.5 rounded-xl border bg-white text-sm
                          cursor-pointer transition-all duration-150 shadow-sm
                          ${
                            dropdownOpen
                              ? "border-blue-400 ring-2 ring-blue-100"
                              : "border-slate-200 hover:border-blue-300"
                          }`}
              onClick={() => setDropdownOpen((o) => !o)}
            >
              <svg
                className="text-slate-400 shrink-0"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder={
                  selectedFilter ? selectedFilter.label : "Select Region"
                }
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setDropdownOpen(true);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(true);
                }}
                className="flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 text-sm min-w-0"
              />
              {selectedFilter || search ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFilter(null);
                    setSearch("");
                    setPage(1);
                  }}
                  className="text-slate-300 hover:text-slate-500 transition-colors shrink-0"
                  aria-label="Clear filter"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              ) : (
                <svg
                  className={`text-slate-400 shrink-0 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              )}
            </div>

            {/* Dropdown panel */}
            {dropdownOpen && (
              <div className="absolute z-[9999] mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden anim-fade">
                <button
                  className="w-full text-left px-4 py-2.5 text-sm text-slate-500 hover:bg-slate-50 transition-colors border-b border-slate-100 font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFilter(null);
                    setSearch("");
                    setDropdownOpen(false);
                    setPage(1);
                  }}
                >
                  All Regions
                </button>
                <div className="max-h-60 overflow-y-auto">
                  {filteredOptions.length === 0 ? (
                    <div className="px-4 py-4 text-sm text-slate-400 text-center">
                      No results found
                    </div>
                  ) : (
                    filteredOptions.map((opt, i) => (
                      <button
                        key={i}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                          ${
                            opt.isPrantHeader
                              ? "font-semibold text-slate-700 hover:bg-blue-50 bg-slate-50/50"
                              : "font-normal text-slate-600 hover:bg-blue-50 pl-8"
                          }
                          ${selectedFilter?.label === opt.value.label ? "bg-blue-50 text-blue-600" : ""}
                        `}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFilter(opt.value);
                          setSearch("");
                          setDropdownOpen(false);
                          setPage(1);
                        }}
                      >
                        {!opt.isPrantHeader && (
                          <span className="text-slate-300 mr-1.5">└</span>
                        )}
                        {opt.label}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Active filter badge */}
          {selectedFilter && (
            <div className="flex items-center gap-2 anim-fade w-full sm:w-auto flex-wrap">
              <span className="text-xs text-slate-400">Showing:</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
                {selectedFilter.type === "district" ? "District" : "Region"}:{" "}
                {selectedFilter.label}
                <button
                  onClick={() => {
                    setSelectedFilter(null);
                    setPage(1);
                  }}
                  className="hover:text-blue-800 transition-colors"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </span>
            </div>
          )}

          {/* Export button — blue, top right, outside table card */}
          <button
            onClick={handleExport}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-700
                       text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow-md
                       transition-all duration-200 active:scale-95  w-full sm:w-auto whitespace-nowrap sm:ml-auto"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </button>
        </div>

        {/* ── Table Card ── */}
        <div
          className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden anim-up"
          style={{ animationDelay: "200ms" }}
        >
          {/* Table card header — title only, no export button here */}
          <div className="px-4 sm:px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Student &amp; School Details
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full min-w-[500px] text-sm resp-table">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-100">
                  {[
                    ["SR. NO.", "sr"],
                    ["STATE NAME", "state"],
                    ["SCHOOLS REGISTERED", "schools"],
                    ["INDIVIDUAL STUDENTS", "ind"],
                    ["TOTAL STUDENTS", "total"],
                    // ["TOTAL PAID STUDENTS", "paid"],
                    // ["LEVEL-1 ATTEMPTED STUDENTS", "att"],
                    // ["LEVEL-1 SUBMITTED STUDENTS", "sub"],
                    // ["EXPORT SUBMITTED STUDENTS", "exp1"],
                    // ["EXPORT LEVEL 2 SUBMITTED STUDENTS", "exp2"],
                  ].map(([h]) => (
                    <th
                      key={h}
                      className="px-3 sm:px-4 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i} className="border-b border-slate-50">
                      {Array.from({ length: 10 }).map((__, j) => (
                        <td key={j} className="px-3 sm:px-4 py-3">
                          <div className="h-4 bg-slate-100 rounded animate-pulse w-12 sm:w-16" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : paginated.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-slate-300">
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.35-4.35" />
                        </svg>
                        <span className="text-sm font-medium">
                          No records found
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginated.map((row, idx) => (
                    <tr
                      key={row.stateid ?? idx}
                      className="border-b border-slate-50 hover:bg-blue-50/30 transition-colors duration-100"
                    >
                      <td
                        className="px-3 sm:px-4 py-3 text-slate-400 text-xs"
                        data-label="SR. NO."
                      >
                        {(page - 1) * itemsPerPage + idx + 1}
                      </td>
                      <td
                        className="px-3 sm:px-4 py-3 text-slate-700 font-semibold whitespace-nowrap"
                        data-label="STATE NAME"
                      >
                        {row.state_name}
                      </td>
                      <td
                        className="px-3 sm:px-4 py-3"
                        data-label="SCHOOLS REGISTERED"
                      >
                        <Link href="/state-dashboard/school/total-school">
                          <span className="inline-flex items-center justify-center min-w-[2rem] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-semibold text-xs cursor-pointer hover:bg-blue-100 transition-colors">
                            {row.total_school ?? 0}
                          </span>
                        </Link>
                      </td>
                      <td
                        className="px-3 sm:px-4 py-3"
                        data-label="INDIVIDUAL STUDENTS"
                      >
                        <Link
                          href={
                            countryCode === "AE"
                              ? "/state-dashboard/student/view-indivisual-student"
                              : "/state-dashboard/student/new-student-registrations"
                          }
                        >
                          <span className="inline-flex items-center justify-center min-w-[2rem] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-semibold text-xs cursor-pointer hover:bg-blue-100 transition-colors">
                            {row.individual_student ?? 0}
                          </span>
                        </Link>
                      </td>
                      <td
                        className="px-3 sm:px-4 py-3"
                        data-label="TOTAL STUDENTS"
                      >
                        <Link href={studentDetailHref}>
                          <span className="inline-flex items-center justify-center min-w-[2rem] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-semibold text-xs cursor-pointer hover:bg-blue-100 transition-colors">
                            {row.total_student ?? 0}
                          </span>
                        </Link>
                      </td>
                      {/* <td className="px-3 sm:px-4 py-3" data-label="TOTAL PAID STUDENTS">
                        <Badge value={row.total_paid_student ?? 0} />
                      </td> */}
                      {/* <td className="px-3 sm:px-4 py-3" data-label="LEVEL-1 ATTEMPTED STUDENTS">
                        <Badge value={row.total_attempted_level1_students ?? 0} />
                      </td> */}
                      {/* <td className="px-3 sm:px-4 py-3" data-label="LEVEL-1 SUBMITTED STUDENTS">
                        <Badge value={row.total_submitted_level1_students ?? 0} />
                      </td> */}
                      {/* ✅ Export Submitted — uncommented */}
                      {/* <td className="px-3 sm:px-4 py-3" data-label="EXPORT SUBMITTED STUDENTS">
                        <ExportBtn onClick={handleExport} />
                      </td> */}
                      {/* ✅ Export Level 2 — uncommented */}
                      {/* <td className="px-3 sm:px-4 py-3" data-label="EXPORT LEVEL 2 SUBMITTED STUDENTS">
                        <ExportBtn onClick={handleExport} />
                      </td> */}
                    </tr>
                  ))
                )}
              </tbody>

              {/* Totals footer */}
              {!loading && paginated.length > 0 && (
                <tfoot>
                  <tr className="bg-slate-50 font-bold text-slate-700 border-t-2 border-slate-200">
                    <td
                      className="px-2 sm:px-4 py-2 sm:py-3 text-xs text-slate-500"
                      colSpan={2}
                    >
                      Total
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                      {totals.schools}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                      {totals.individual}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                      {totals.total}
                    </td>
                    {/* <td className="px-3 sm:px-4 py-3 text-sm">{totals.paid}</td>
                    <td className="px-3 sm:px-4 py-3 text-sm">{totals.lvl1Attempted}</td>
                    <td className="px-3 sm:px-4 py-3 text-sm">{totals.lvl1Submitted}</td> */}
                    <td colSpan={2} />
                  </tr>
                </tfoot>
              )}
            </table>
          </div>

          {/* ── Pagination ── */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 
           px-3 sm:px-5 py-3 sm:py-4"
          >
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Items per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setPage(1);
                }}
                className="border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
              >
                {ITEMS_PER_PAGE_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>
                {stateSummaryRows.length === 0
                  ? "0 – 0 of 0"
                  : `${(page - 1) * itemsPerPage + 1} – ${Math.min(page * itemsPerPage, stateSummaryRows.length)} of ${stateSummaryRows.length}`}
              </span>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
                className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
                className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
