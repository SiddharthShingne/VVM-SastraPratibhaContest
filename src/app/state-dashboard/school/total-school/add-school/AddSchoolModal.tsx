/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect, useRef } from "react";
// import { Eye, EyeOff, X } from "lucide-react";
// import { fetchDistricts } from "@/services/authService";
import { fetchRegionsWithCities } from "@/services/importantDatesService";
import { addSchool } from "@/services/uaeService";
import { X } from "lucide-react";
const getUserFromStorage = () => {
    try {
        if (typeof window === "undefined") return null;
        const raw = localStorage.getItem("user");
        if (!raw) return null;
        return JSON.parse(raw);
    } catch { return null; }
};

const COUNTRY_NAME_MAP: Record<string, string> = {
    SA: "Saudi Arabia", AE: "UAE", OM: "Oman",
    KW: "Kuwait", BH: "Bahrain", QA: "Qatar",
};

const salutationOptions = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];
const BOARD_ID_MAP: Record<string, number> = {
    CBSE: 1,
    ICSE: 2,
    IB: 3,
    IGCSE: 4,
};
const boardOptions = ["CBSE", "ICSE", "IB", "IGCSE"];
// ─── Types ────────────────────────────────────────────────────────────────────
interface MasterItem {
    id: number | string;
    name: string;
}



interface AddSchoolModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onSuccess?: () => void;
}

// ─── Reusable Field Wrapper ───────────────────────────────────────────────────
function Field({
    label,
    required,
    error,
    children,
}: {
    label: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
                {label}
                {required && <span className="ml-0.5 text-red-500">*</span>}
            </label>
            {children}
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}

// ─── Shared class strings ─────────────────────────────────────────────────────
const inputCls =
    "h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";
const inputErrCls =
    "border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-100";
const selectCls =
    "h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 cursor-pointer appearance-none";

// ─── Section Heading ──────────────────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-3 pb-1">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                {children}
            </span>
            <div className="h-px flex-1 bg-blue-100" />
        </div>
    );
}

// Result dialog component for success/error messages after form submission:
function ResultDialog({ dialog, onClose, }: {
    dialog: { type: "success" | "error"; title: string; message: string };
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl">
                {/* Icon */}
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border-4"
                    style={{
                        borderColor: dialog.type === "success" ? "#4ade80" : "#f87171",
                    }}
                >
                    {dialog.type === "success" ? (
                        <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                </div>
                <h2 className="mb-2 text-xl font-bold text-gray-800">{dialog.title}</h2>
                <p className="mb-7 text-sm text-gray-500">{dialog.message}</p>
                <button
                    onClick={onClose}
                    className={`w-full rounded-xl py-3 text-sm font-bold text-white transition active:scale-95 ${dialog.type === "success"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                        }`}
                >
                    Ok, got it!
                </button>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AddSchoolModal({ open, setOpen, onSuccess, }: AddSchoolModalProps) {
    // ── UI state ───────────────────────────────────────────────────────────────
    // const [showPwd, setShowPwd] = useState(false);
    // const [showCPwd, setShowCPwd] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [resultDialog, setResultDialog] = useState<{ type: "success" | "error"; title: string; message: string; } | null>(null);
    // ── Username ───────────────────────────────────────────────────────────────
    // const [username, setUsername] = useState("");
    // const [usernameMsg, setUsernameMsg] = useState<{
    //     text: string;
    //     ok: boolean;
    // } | null>(null);
    // const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // ── Master data ────────────────────────────────────────────────────────────
    // const [states, setStates] = useState<MasterItem[]>([]);
    // const [districts, setDistricts] = useState<MasterItem[]>([]);
    // const [cities, setCities] = useState<MasterItem[]>([]);
    // const [boards, setBoards] = useState<MasterItem[]>([]);
    // const [schoolTypes, setSchoolTypes] = useState<MasterItem[]>([]);
    // const [loadingDist, setLoadingDist] = useState(false);
    // const [loadingCity, setLoadingCity] = useState(false);

    const [regions, setRegions] = useState<{ value: string; label: string; cities?: any[] }[]>([]);
    const [citiesForRegion, setCitiesForRegion] = useState<{ value: string; label: string }[]>([]);
    const [loadingRegions, setLoadingRegions] = useState(false);


    const userData = getUserFromStorage();
    const countryCode: string = userData?.user?.country_code || userData?.country_code || "AE";
    const countryId: number = userData?.user?.country_id || 1;
    const countryName: string = COUNTRY_NAME_MAP[countryCode] || countryCode;


    // const resetForm = () => {
    //     setForm(emptyForm);
    //     // setUsername("");
    //     // setUsernameMsg(null);
    //     setErrors({});
    //     // setDistricts([]);
    //     // setCities([]);
    //     setCitiesForRegion([]);
    // };


    const resetForm = () => {
        setForm(emptyForm);
        setErrors({});
    };

    // ── Referral options ───────────────────────────────────────────────────────
    const referralOptions = [
        { id: "1", name: "National Council of Science Museums" },
        { id: "2", name: "School Circular / Teacher" },
        { id: "3", name: "Website" },
        { id: "4", name: "State Coordinator" },
        { id: "5", name: "News / Print Media" },
        { id: "6", name: "Friends / Family" },
    ];

    // ✅ ADD after COUNTRY_NAME_MAP at top of file:
    const COUNTRY_STATE_MAP: Record<string, number> = {
        IN: 1,
        AE: 2,
        OM: 3,
        QA: 4,
        SA: 5,
        BH: 6,
        KW: 7,
    };

    // ── Form ───────────────────────────────────────────────────────────────────
    const emptyForm = {
        schoolName: "",
        // email: "",
        // phone: "",
        // password: "",
        // confirmPassword: "",
        // principalSalutation: "",
        // principalName: "",
        // coordinatorSalutation: "",
        // coordinatorName: "",
        // coordinatorDesignation: "",
        // schoolType: "",
        // schoolBoard: "",
        // state: "",
        // district: "",
        // country: "",
        region: "",      // district_id from fetchRegionsWithCities
        // city: "",
        // address: "",
        // pincode: "",
        // referral: "",
    };

    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const set = (field: string, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    // ── Fetch master data on open ──────────────────────────────────────────────
    useEffect(() => {
        if (!open) return;

        const normalize = (
            arr: Record<string, unknown>[],
            idKeys: string[],
            nameKeys: string[]
        ): MasterItem[] =>
            arr.map((item) => ({
                id:
                    (idKeys.find((k) => item[k] !== undefined) &&
                        item[idKeys.find((k) => item[k] !== undefined)!]) as
                    | number
                    | string,
                name: (nameKeys.find((k) => item[k] !== undefined) &&
                    item[nameKeys.find((k) => item[k] !== undefined)!]) as string,
            }));

    }, [open]);

    // ── Fetch districts when state changes ────────────────────────────────────
    // useEffect(() => {
    //     if (!form.state) {
    //         setDistricts([]);
    //         setCities([]);
    //         set("district", "");
    //         set("city", "");
    //         return;
    //     }
    //     setLoadingDist(true);
    //     setDistricts([]);
    //     setCities([]);
    //     set("district", "");
    //     set("city", "");

    //     fetchDistricts({ state_ids: [Number(form.state)], prant_ids: [] })
    //         .then((res) => {
    //             console.log("✅ Districts:", res);
    //             const d: Record<string, unknown>[] = res?.data ?? res ?? [];
    //             setDistricts(
    //                 d.map((item) => ({
    //                     id: (item.id ?? item.dist_id ?? item.district_id) as
    //                         | number
    //                         | string,
    //                     name: (item.name ??
    //                         item.dist_name ??
    //                         item.district_name) as string,
    //                 }))
    //             );
    //         })
    //         .catch(() => console.error("Failed to load districts"))
    //         .finally(() => setLoadingDist(false));
    // }, [form.state]);

    // ── Fetch cities when district changes ────────────────────────────────────
    // useEffect(() => {
    //     if (!form.district) {
    //         setCities([]);
    //         set("city", "");
    //         return;
    //     }
    //     setLoadingCity(true);
    //     setCities([]);
    //     set("city", "");

    //     axiosInstance
    //         .get(`/get-cities/${form.district}`)
    //         .then((res) => {
    //             console.log("✅ Cities:", res.data);
    //             const d: Record<string, unknown>[] =
    //                 res.data?.data ?? res.data ?? [];
    //             setCities(
    //                 d.map((c) => ({
    //                     id: (c.id ?? c.city_id) as number | string,
    //                     name: (c.name ?? c.city_name) as string,
    //                 }))
    //             );
    //         })
    //         .catch(() => console.error("Failed to load cities"))
    //         .finally(() => setLoadingCity(false));
    // }, [form.district]);

    // Region Useffect:
    useEffect(() => {
        if (!open) return;
        setLoadingRegions(true);
        fetchRegionsWithCities(countryCode)
            .then((res: any) => {
                const formatted = res?.data?.map((r: any) => ({
                    value: r.code,    // ✅ "KSA-CENTRAL", "KSA-EAST" etc.
                    label: r.name,    // ✅ "Central Region" etc.
                })) || [];
                setRegions(formatted);
            })
            .catch(() => setRegions([]))
            .finally(() => setLoadingRegions(false));
    }, [open]);

    // ✅ ADD — cities update when region changes:
    useEffect(() => {
        if (!form.region) { setCitiesForRegion([]); set("city", ""); return; }
        const selected = regions.find((r) => r.value === form.region);
        const formatted = selected?.cities?.map((c: any) => ({
            value: String(c.id),
            label: c.name,
        })) || [];
        setCitiesForRegion(formatted);
        set("city", "");
    }, [form.region, regions]);



    // ── Username debounce check ───────────────────────────────────────────────
    // const handleUsernameChange = (val: string) => {
    //     setUsername(val);
    //     setUsernameMsg(null);
    //     if (errors.username)
    //         setErrors((prev) => ({ ...prev, username: "" }));
    //     if (debounceRef.current) clearTimeout(debounceRef.current);
    //     if (!val.trim()) return;

    //     debounceRef.current = setTimeout(async () => {
    //         try {
    //             const res = await checkUsername(val);
    //             const resStr = typeof res === "string" ? res : JSON.stringify(res);
    //             const isAvailable = resStr.toLowerCase().includes("available");
    //             setUsernameMsg({
    //                 text: isAvailable ? "Username is available!" : "Username is already taken",
    //                 ok: isAvailable
    //             });
    //         } catch {
    //             setUsernameMsg({ text: "Error checking username", ok: false });
    //         }
    //     }, 600);
    // };

    // ── Validation ────────────────────────────────────────────────────────────
    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.schoolName.trim())
            e.schoolName = "School name is required";
        else if (form.schoolName.trim().length < 3)
            e.schoolName = "School name must be at least 3 characters";
        if (!form.region)
            e.region = "Please select a region";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    // ── Submit ────────────────────────────────────────────────────────────────
    const handleDiscard = () => {
        resetForm();
        setOpen(false);
    }
    // ✅ Add this helper in both AddSchoolModal.tsx and page.tsx
    const getStateId = (): number => {
        try {
            const raw = localStorage.getItem("user");
            if (!raw) return 0;
            const parsed = JSON.parse(raw);
            const assignments = parsed?.user?.user_detail?.assignments;
            if (Array.isArray(assignments) && assignments.length > 0) {
                return assignments[0]?.coordinatable_id || 0;
            }
            return 0;
        } catch {
            return 0;
        }
    };
    const handleSubmit = async () => {
        if (!validate()) return;
        setSubmitting(true);
        try {
            const payload = {
                state_id: getStateId(),   // reads coordinatable_id: 41 from localStorage
                school_name: form.schoolName.trim(),
                region_code: form.region,
            };

            console.log("📤 Payload:", payload);
            const res = await addSchool(payload);
            console.log("✅ Response:", res);

            // addSchool returns res.data directly, check for id or school_name
            if (res?.id || res?.school_name || res?.status === true) {
                resetForm();
                setResultDialog({
                    type: "success",
                    title: "School Added!",
                    message: res?.message || "School has been registered successfully.",
                });
                onSuccess?.();
            } else {
                setResultDialog({
                    type: "error",
                    title: "Failed",
                    message: res?.message || "Something went wrong. Please try again.",
                });
            }
        } catch {
            setResultDialog({
                type: "error",
                title: "Error",
                message: "Something went wrong. Please try again.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    // const handleSubmit = async () => {
    //     if (!validate()) return;
    //     setSubmitting(true);
    //     try {
    //         const stateIdMap: Record<string, number> = {
    //             QA: 42, AE: 40, OM: 41, SA: 43, BH: 39, KW: 44,
    //         };

    //         const payload = {
    //             state_id: stateIdMap[countryCode] || 0,
    //             school_name: form.schoolName,
    //             region_code: selectedRegionCode, // see note below
    //         };
    //         const res = await addSchool(payload);
    //         if (res?.data || res?.id || res?.school_name) {
    //             resetForm();              // ← resets form but keeps modal open
    //             setResultDialog({
    //                 type: "success",
    //                 title: "Success!",
    //                 message: res.message || "School registered successfully!",
    //             });
    //             onSuccess?.();
    //         } else {
    //             setResultDialog({
    //                 type: "error",
    //                 title: "Registration Failed",
    //                 message: res?.message || "Something went wrong. Please try again.",
    //             });
    //         }
    //     } catch (error: unknown) {
    //         const err = error as { response?: { data?: { message?: string } } };
    //         setResultDialog({
    //             type: "error",
    //             title: "Error",
    //             message: err?.response?.data?.message || "Something went wrong. Please try again.",
    //         });
    //     } finally {
    //         setSubmitting(false);
    //     }
    // };


    if (!open) return null;

    // ── Helper: input class with error state ──────────────────────────────────
    const ic = (field: string) =>
        `${inputCls} ${errors[field] ? inputErrCls : ""}`;

    const sc = (field: string) =>
        `${selectCls} ${errors[field] ? "border-red-400 bg-red-50" : ""}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="relative flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">

                {/* ── Header ───────────────────────────────────────────────────────── */}
                <div className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-7 py-4">
                    <div>
                        <h2 className="text-xl font-bold text-[#0B1B4D]">Add School</h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                            Fill in all required fields to register a new school
                        </p>
                    </div>
                    <button
                        onClick={handleDiscard}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* ── Scrollable Body ───────────────────────────────────────────────── */}
                <div className="flex-1 overflow-y-auto px-7 py-5 space-y-7">
                    <div>
                        <SectionHeading>School Information</SectionHeading>
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

                            {/* School Name */}
                            <Field label="School Name" required error={errors.schoolName}>
                                <input
                                    type="text"
                                    placeholder="Enter School Name"
                                    value={form.schoolName}
                                    onChange={(e) => set("schoolName", e.target.value)}
                                    className={ic("schoolName")}
                                />
                            </Field>

                            {/* Region */}
                            <Field label="Region" required error={errors.region}>
                                <select
                                    value={form.region}
                                    onChange={(e) => set("region", e.target.value)}
                                    disabled={loadingRegions}
                                    className={sc("region")}
                                >
                                    <option value="">
                                        {loadingRegions ? "Loading regions..." : "Select Region"}
                                    </option>
                                    {regions.map((r) => (
                                        <option key={r.value} value={r.value}>
                                            {r.label}
                                        </option>
                                    ))}
                                </select>
                            </Field>

                        </div>
                    </div>
                </div>

                {/* ── Footer ───────────────────────────────────────────────────────── */}
                <div className="flex shrink-0 items-center justify-center gap-4 border-t border-gray-200 bg-gray-50 px-7 py-4">
                    <button
                        onClick={handleDiscard}
                        disabled={submitting}
                        className="rounded-lg border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 disabled:opacity-50"
                    >
                        Discard
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="rounded-lg bg-blue-600 px-10 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {submitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
            {/* ✅ ADD — Result Dialog */}
            {resultDialog && (
                <ResultDialog
                    dialog={resultDialog}
                    onClose={() => {
                        if (resultDialog.type === "success") setOpen(false);
                        setResultDialog(null);
                    }}
                />
            )}
        </div>

    );
}

