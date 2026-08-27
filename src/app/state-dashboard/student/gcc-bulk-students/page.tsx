/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getGccBulkStudents } from "@/services/authService";

// ─── Types ────────────────────────────────────────────────────────────────
type BulkStudent = {
    id: number;
    name: string;
    username?: string;
    password?: string;
    nationalId?: string;
    school?: string;
    classId?: number;
    dob?: string;
    gender?: string;
    parentName?: string;
    parentMobile?: string;
    parentEmail?: string;
    nationality?: string;
    division?: string;
    isPaid?: boolean;
    createdAt?: string;
    countryCode?: string;
};

const CLASS_MAP: Record<number, string> = {
    1: "Grade 6",
    2: "Grade 7",
    3: "Grade 8",
    4: "Grade 9",
    5: "Grade 10",
    6: "Grade 11",
};

// const getZoneId = (): number | null => {
//     try {
//         if (typeof window === "undefined") return null;
//         const raw = localStorage.getItem("user");
//         if (!raw) return null;
//         const parsed = JSON.parse(raw);
//         const assignments = parsed?.user?.user_detail?.assignments || [];
//         const zoneAssignment = assignments.find(
//             (a: any) => a.coordinatable_type === "Zone"
//         );
//         return zoneAssignment?.coordinatable_id ?? zoneAssignment?.zone_id ?? null;
//     } catch {
//         return null;
//     }
// };

const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

const formatDOB = (dateStr: string | null | undefined) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

export default function GccBulkStudentsPage() {
    const [students, setStudents] = useState<BulkStudent[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const s = {
        page: { minHeight: "100vh", padding: "24px", fontFamily: "'Segoe UI', sans-serif" } as React.CSSProperties,
        card: { background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", marginBottom: 20 } as React.CSSProperties,
        tableHeader: {
            padding: "14px 24px", borderBottom: "1px solid #f3f4f6",
            display: "flex", justifyContent: "space-between", alignItems: "center",
        } as React.CSSProperties,
        th: {
            padding: "10px 12px", textAlign: "left" as const, fontSize: 11, fontWeight: 700,
            color: "#6b7280", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const,
            background: "#f9fafb", position: "sticky" as const, top: 0, zIndex: 2,
            boxShadow: "inset 0 -1px 0 #e5e7eb",
        },
        td: {
            padding: "10px 12px", fontSize: 13, color: "#374151",
            whiteSpace: "nowrap" as const, borderBottom: "1px dashed #f3f4f6",
        },
    };

    const columns = [
        "SR. NO.", "NAME", "USERNAME", "PASSWORD", "NATIONAL ID",
        "SCHOOL NAME", "CLASS", "DIVISION", "DOB", "GENDER",
        "NATIONALITY", "PARENT NAME", "PARENT MOBILE", "PARENT EMAIL",
        "COUNTRY", "PAYMENT STATUS", "CREATED AT",
    ];

    // const fetchBulkStudents = async () => {
    //     setLoading(true);
    //     setError("");
    //     setStudents([]);
    //     try {
    //         const zoneId = getZoneId();
    //         if (!zoneId) {
    //             setError("Zone ID not found. Please refresh the page or log in again.");
    //             return;
    //         }

    //         const res = await getGccBulkStudents(zoneId);

    //         // TODO: confirm exact response shape from backend once tested
    //         const raw: any[] = res?.data?.students?.data || res?.data || [];

    //         const formatted: BulkStudent[] = raw.map((st: any) => ({
    //             id: st.id,
    //             name: st.name || "-",
    //             username: st.user?.username || "-",
    //             password: st.user?.temp_password || "-",
    //             nationalId: st.national_id || "-",
    //             school: st.school_name || "-",
    //             classId: st.class_id,
    //             dob: st.date_of_birth,
    //             gender: st.gender === 1 ? "Male" : st.gender === 2 ? "Female" : "-",
    //             parentName: st.parent_name || "-",
    //             parentMobile: st.parent_phone_number || "-",
    //             parentEmail: st.parent_email || "-",
    //             nationality: st.nationality || "-",
    //             division: st.division || "-",
    //             isPaid: st.payment_status === 1,
    //             createdAt: st.created_at,
    //             countryCode: st.country_code || "-",
    //         }));

    //         setStudents(formatted);
    //     } catch (err: any) {
    //         setError(err?.message || "Failed to fetch GCC bulk students.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };



    const fetchBulkStudents = async () => {
        setLoading(true);
        setError("");
        setStudents([]);
        try {
            const res = await getGccBulkStudents();

            // TODO: confirm exact response shape from backend once tested
            const raw: any[] = res?.data?.students?.data || res?.data || [];

            const formatted: BulkStudent[] = raw.map((st: any) => ({
                id: st.id,
                name: st.name || "-",
                username: st.user?.username || "-",
                password: st.user?.temp_password || "-",
                nationalId: st.national_id || "-",
                school: st.school_name || "-",
                classId: st.class_id,
                dob: st.date_of_birth,
                gender: st.gender === 1 ? "Male" : st.gender === 2 ? "Female" : "-",
                parentName: st.parent_name || "-",
                parentMobile: st.parent_phone_number || "-",
                parentEmail: st.parent_email || "-",
                nationality: st.nationality || "-",
                division: st.division || "-",
                isPaid: st.payment_status === 1,
                createdAt: st.created_at,
                countryCode: st.country_code || "-",
            }));

            setStudents(formatted);
        } catch (err: any) {
            setError(err?.message || "Failed to fetch GCC bulk students.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchBulkStudents();
    }, []);

    return (
        <div style={s.page}>
            <div style={s.card}>
                <div style={s.tableHeader}>
                    <h2 style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: 0 }}>
                        GCC Bulk Students
                    </h2>
                    <span style={{ fontSize: 12, color: "#6b7280" }}>
                        Total: {students.length}
                    </span>
                </div>

                {error && (
                    <div style={{ padding: "12px 24px", color: "#dc2626", fontSize: 13 }}>
                        ❌ {error}
                    </div>
                )}

                <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "70vh" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1200 }}>
                        <thead>
                            <tr>
                                {columns.map((h) => <th key={h} style={s.th}>{h}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={columns.length} style={{ ...s.td, textAlign: "center", padding: 40 }}>
                                        Loading...
                                    </td>
                                </tr>
                            ) : students.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} style={{ ...s.td, textAlign: "center", padding: 40 }}>
                                        No data found
                                    </td>
                                </tr>
                            ) : (
                                students.map((row, i) => (
                                    <tr key={row.id} style={{ background: row.isPaid ? "#f0fdf4" : "#fff1f2" }}>
                                        <td style={{ ...s.td, color: "#94a3b8", fontSize: 12 }}>{i + 1}</td>
                                        <td style={{ ...s.td, color: "#2563eb", fontWeight: 600 }}>{row.name}</td>
                                        <td style={s.td}>{row.username}</td>
                                        <td style={s.td}>{row.password}</td>
                                        <td style={s.td}>{row.nationalId}</td>
                                        <td style={{ ...s.td, maxWidth: 200, whiteSpace: "normal" }}>{row.school}</td>
                                        <td style={s.td}>{row.classId ? CLASS_MAP[row.classId] || `ID ${row.classId}` : "-"}</td>
                                        <td style={s.td}>{row.division}</td>
                                        <td style={s.td}>{formatDOB(row.dob)}</td>
                                        <td style={s.td}>{row.gender}</td>
                                        <td style={s.td}>{row.nationality}</td>
                                        <td style={s.td}>{row.parentName}</td>
                                        <td style={s.td}>{row.parentMobile}</td>
                                        <td style={s.td}>{row.parentEmail}</td>
                                        <td style={s.td}>{row.countryCode}</td>
                                        <td style={s.td}>
                                            <span style={{
                                                padding: "3px 10px", borderRadius: 12, fontSize: 11, fontWeight: 600,
                                                background: row.isPaid ? "#bbf7d0" : "#fecaca",
                                                color: row.isPaid ? "#15803d" : "#dc2626",
                                            }}>
                                                {row.isPaid ? "Paid" : "Pending"}
                                            </span>
                                        </td>
                                        <td style={s.td}>{formatDate(row.createdAt)}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}