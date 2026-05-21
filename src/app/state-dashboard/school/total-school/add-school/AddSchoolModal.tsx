/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { checkUsername, registerSchool } from "@/services/uaeService";
import { fetchDistricts } from "@/services/authService";
import axiosInstance from "@/services/axiosInstance";
import { fetchRegionsWithCities } from "@/services/importantDatesService";


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
function ResultDialog({ dialog, onClose,}: {  dialog: { type: "success" | "error"; title: string; message: string };
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
    const [showPwd, setShowPwd] = useState(false);
    const [showCPwd, setShowCPwd] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [resultDialog, setResultDialog] = useState<{ type: "success" | "error"; title: string; message: string; } | null>(null);
    // ── Username ───────────────────────────────────────────────────────────────
    const [username, setUsername] = useState("");
    const [usernameMsg, setUsernameMsg] = useState<{
        text: string;
        ok: boolean;
    } | null>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // ── Master data ────────────────────────────────────────────────────────────
    const [states, setStates] = useState<MasterItem[]>([]);
    const [districts, setDistricts] = useState<MasterItem[]>([]);
    const [cities, setCities] = useState<MasterItem[]>([]);
    const [boards, setBoards] = useState<MasterItem[]>([]);
    // const [schoolTypes, setSchoolTypes] = useState<MasterItem[]>([]);
    const [loadingDist, setLoadingDist] = useState(false);
    const [loadingCity, setLoadingCity] = useState(false);

    const [regions, setRegions] = useState<{ value: string; label: string; cities?: any[] }[]>([]);
    const [citiesForRegion, setCitiesForRegion] = useState<{ value: string; label: string }[]>([]);
    const [loadingRegions, setLoadingRegions] = useState(false);


    const userData = getUserFromStorage();
    const countryCode: string = userData?.user?.country_code || userData?.country_code || "AE";
    const countryId: number = userData?.user?.country_id || 1;
    const countryName: string = COUNTRY_NAME_MAP[countryCode] || countryCode;


    const resetForm = () => {
        setForm(emptyForm);
        setUsername("");
        setUsernameMsg(null);
        setErrors({});
        setDistricts([]);
        setCities([]);
        setCitiesForRegion([]);
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
        QA: 42,
        AE: 40,
        OM: 41,
        SA: 43,
        BH: 39,
        KW: 44,
    };

    // ── Form ───────────────────────────────────────────────────────────────────
    const emptyForm = {
        schoolName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        principalSalutation: "",
        principalName: "",
        coordinatorSalutation: "",
        coordinatorName: "",
        coordinatorDesignation: "",
        schoolType: "",
        schoolBoard: "",
        state: "",
        district: "",
        country: "",
        region: "",      // district_id from fetchRegionsWithCities
        city: "",
        address: "",
        pincode: "",
        referral: "",
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

        // axiosInstance
        //     .get("/get-states")
        //     .then((res) => {
        //         const d: Record<string, unknown>[] =
        //             res.data?.data ?? res.data ?? [];
        //         console.log("✅ States:", res.data);
        //         setStates(normalize(d, ["id", "state_id"], ["name", "state_name"]));
        //     })
        //     .catch(() => console.error("Failed to load states"));

        // axiosInstance
        //     .get("/get-boards")
        //     .then((res) => {
        //         const d: Record<string, unknown>[] =
        //             res.data?.data ?? res.data ?? [];
        //         console.log("✅ Boards:", res.data);
        //         setBoards(normalize(d, ["id", "board_id"], ["name", "board_name"]));
        //     })
        //     .catch(() => console.error("Failed to load boards"));

        // axiosInstance
        //     .get("/get-school-types")
        //     .then((res) => {
        //         const d: Record<string, unknown>[] =
        //             res.data?.data ?? res.data ?? [];
        //         console.log("✅ School Types:", res.data);
        //         setSchoolTypes(
        //             normalize(d, ["id", "type_id"], ["name", "type_name"])
        //         );
        //     })
        //     .catch(() => console.error("Failed to load school types"));
    }, [open]);

    // ── Fetch districts when state changes ────────────────────────────────────
    useEffect(() => {
        if (!form.state) {
            setDistricts([]);
            setCities([]);
            set("district", "");
            set("city", "");
            return;
        }
        setLoadingDist(true);
        setDistricts([]);
        setCities([]);
        set("district", "");
        set("city", "");

        fetchDistricts({ state_ids: [Number(form.state)], prant_ids: [] })
            .then((res) => {
                console.log("✅ Districts:", res);
                const d: Record<string, unknown>[] = res?.data ?? res ?? [];
                setDistricts(
                    d.map((item) => ({
                        id: (item.id ?? item.dist_id ?? item.district_id) as
                            | number
                            | string,
                        name: (item.name ??
                            item.dist_name ??
                            item.district_name) as string,
                    }))
                );
            })
            .catch(() => console.error("Failed to load districts"))
            .finally(() => setLoadingDist(false));
    }, [form.state]);

    // ── Fetch cities when district changes ────────────────────────────────────
    useEffect(() => {
        if (!form.district) {
            setCities([]);
            set("city", "");
            return;
        }
        setLoadingCity(true);
        setCities([]);
        set("city", "");

        axiosInstance
            .get(`/get-cities/${form.district}`)
            .then((res) => {
                console.log("✅ Cities:", res.data);
                const d: Record<string, unknown>[] =
                    res.data?.data ?? res.data ?? [];
                setCities(
                    d.map((c) => ({
                        id: (c.id ?? c.city_id) as number | string,
                        name: (c.name ?? c.city_name) as string,
                    }))
                );
            })
            .catch(() => console.error("Failed to load cities"))
            .finally(() => setLoadingCity(false));
    }, [form.district]);
    // ✅ ADD:
    useEffect(() => {
        if (!open) return;
        setLoadingRegions(true);
        fetchRegionsWithCities(countryCode)
            .then((res: any) => {
                const formatted = res?.data?.map((r: any) => ({
                    value: String(r.district_id),
                    label: r.name,
                    cities: r.cities || [],
                })) || [];
                setRegions(formatted);
            })
            .catch(() => console.error("Failed to load regions"))
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
    const handleUsernameChange = (val: string) => {
        setUsername(val);
        setUsernameMsg(null);
        if (errors.username)
            setErrors((prev) => ({ ...prev, username: "" }));
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (!val.trim()) return;

        debounceRef.current = setTimeout(async () => {
            try {
                const res = await checkUsername(val);
                const resStr = typeof res === "string" ? res : JSON.stringify(res);
                const isAvailable = resStr.toLowerCase().includes("available");
                setUsernameMsg({
                    text: isAvailable ? "Username is available!" : "Username is already taken",
                    ok: isAvailable
                });
            } catch {
                setUsernameMsg({ text: "Error checking username", ok: false });
            }
        }, 600);
    };

    // ── Validation ────────────────────────────────────────────────────────────
    // ✅ REPLACE the entire validate() content with this improved version:
    const validate = () => {
        const e: Record<string, string> = {};
        const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRx = /^[0-9]{8,10}$/;
        const nameRx = /^[A-Za-z\s]+$/;

        // School Info
        if (!form.schoolName.trim())
            e.schoolName = "School name is required";
        else if (form.schoolName.trim().length < 3)
            e.schoolName = "School name must be at least 3 characters";
        else if (!nameRx.test(form.schoolName))
            e.schoolName = "School name must contain only letters and spaces";

        if (!form.email)
            e.email = "Email address is required";
        else if (!emailRx.test(form.email))
            e.email = "Please enter a valid email (e.g. school@example.com)";

        if (!form.phone)
            e.phone = "Phone number is required";
        else if (!phoneRx.test(form.phone))
            e.phone = "Enter a valid 8–10 digit phone number";

        // Username
        if (!username.trim())
            e.username = "Username is required";
        else if (username.trim().length < 4)
            e.username = "Username must be at least 4 characters";
        else if (!usernameMsg)
            e.username = "Please wait, checking username availability...";
        else if (!usernameMsg.ok)
            e.username = usernameMsg.text;
        // Password
        if (!form.password)
            e.password = "Password is required";
        else if (form.password.length < 6)
            e.password = "Password must be at least 6 characters";
        else if (!/(?=.*[A-Z])/.test(form.password))
            e.password = "Password must contain at least one uppercase letter";
        else if (!/(?=.*[0-9])/.test(form.password))
            e.password = "Password must contain at least one number";

        if (!form.confirmPassword)
            e.confirmPassword = "Please confirm your password";
        else if (form.password !== form.confirmPassword)
            e.confirmPassword = "Passwords do not match";

        // Principal
        if (!form.principalSalutation)
            e.principalSalutation = "Please select a salutation";
        if (!form.principalName)
            e.principalName = "Principal name is required";
        else if (!nameRx.test(form.principalName))
            e.principalName = "Name must contain only letters and spaces";

        // Coordinator
        if (!form.coordinatorSalutation)
            e.coordinatorSalutation = "Please select a salutation";
        if (!form.coordinatorName)
            e.coordinatorName = "Coordinator name is required";
        else if (!nameRx.test(form.coordinatorName))
            e.coordinatorName = "Name must contain only letters and spaces";
        if (!form.coordinatorDesignation)
            e.coordinatorDesignation = "Designation is required";
        else if (!nameRx.test(form.coordinatorDesignation))
            e.coordinatorDesignation = "Designation must contain only letters and spaces";

        // School details
        // if (!form.schoolType) e.schoolType = "Please select a school type";
        if (!form.schoolBoard) e.schoolBoard = "Please select a school board";

        // Location
        if (!form.region) e.region = "Please select a region";
        if (!form.city) e.city = "Please select a city";
        if (!form.address.trim()) e.address = "School address is required";

        // Referral
        if (!form.referral) e.referral = "Please select how you heard about VVM";

        setErrors(e);
        return Object.keys(e).length === 0;
    };
    // ── Submit ────────────────────────────────────────────────────────────────

    // ❌ Your current handleSubmit ends without closing properly.
    // ✅ REPLACE the entire handleSubmit with this:

    const handleDiscard = () => {
        resetForm();
        setOpen(false);
    };
    const handleSubmit = async () => {
        if (!validate()) return;
        setSubmitting(true);
        try {
            const payload = {
                country_id: countryCode,
                sch_name: form.schoolName,
                name_1: form.principalSalutation,
                name_2: form.coordinatorSalutation,
                principal: form.principalName,
                exam_cordinator: form.coordinatorName,
                exam_coordinator_designation: form.coordinatorDesignation,
                school_type: 3,                        // ✅ default, backend requires it
                board_id: BOARD_ID_MAP[form.schoolBoard] || 0,              // was: form.schoolBoard
                sub_board_id: null,
                email: form.email,
                parent_mobile: form.phone,
                state_id: COUNTRY_STATE_MAP[countryCode] || 0,
                dist_id: Number(form.region),
                city_id: Number(form.city),
                address: form.address,
                pincode: "00000",
                hear: Number(form.referral),
                username,
                password: form.password,
                cpassword: form.confirmPassword,
                from_admin: 1,
            };

            console.log("📤 Payload:", JSON.stringify(payload, null, 2));
            const res = await registerSchool(payload);
            console.log("✅ Registered:", res);

            if (res?.status === true) {
                resetForm();              // ← resets form but keeps modal open
                setResultDialog({
                    type: "success",
                    title: "Success!",
                    message: res.message || "School registered successfully!",
                });
                onSuccess?.();
            } else {
                setResultDialog({
                    type: "error",
                    title: "Registration Failed",
                    message: res?.message || "Something went wrong. Please try again.",
                });
            }
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            setResultDialog({
                type: "error",
                title: "Error",
                message: err?.response?.data?.message || "Something went wrong. Please try again.",
            });
        } finally {
            setSubmitting(false);
        }
    };


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

                    {/* ── School Information ─────────────────────────────────────────── */}
                    <div>
                        <SectionHeading>School Information</SectionHeading>
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                            <Field label="School Name" required error={errors.schoolName}>
                                <input
                                    type="text"
                                    placeholder="School Name"
                                    value={form.schoolName}
                                    onChange={(e) =>
                                        set("schoolName", e.target.value.replace(/[^A-Za-z\s]/g, ""))
                                    }
                                    className={ic("schoolName")}
                                />
                            </Field>

                            <Field label="School Email-id" required error={errors.email}>
                                <input
                                    type="email"
                                    placeholder="School Email-id"
                                    value={form.email}
                                    onChange={(e) => set("email", e.target.value)}
                                    className={ic("email")}
                                />
                            </Field>

                            <Field
                                label="Phone/Mobile Number"
                                required
                                error={errors.phone}
                            >
                                <input
                                    type="text"
                                    maxLength={10}
                                    placeholder="Phone/Mobile Number"
                                    value={form.phone}
                                    onChange={(e) =>
                                        set("phone", e.target.value.replace(/\D/g, ""))
                                    }
                                    className={ic("phone")}
                                />
                            </Field>

                            {/* Username */}
                            <Field label="Username" required error={errors.username}>
                                <input
                                    type="text"
                                    placeholder="Select Username"
                                    value={username}
                                    onChange={(e) => handleUsernameChange(e.target.value)}
                                    className={`${inputCls} ${(usernameMsg && !usernameMsg.ok) || errors.username
                                        ? inputErrCls
                                        : ""
                                        }`}
                                />
                                {usernameMsg && (
                                    <p
                                        className={`text-xs ${usernameMsg.ok ? "text-green-600" : "text-red-500"
                                            }`}
                                    >
                                        {usernameMsg.text}
                                    </p>
                                )}
                            </Field>

                            {/* Password */}
                            <Field label="Password" required error={errors.password}>
                                <div
                                    className={`flex h-10 items-center overflow-hidden rounded-md border bg-gray-50 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 ${errors.password
                                        ? "border-red-400 bg-red-50"
                                        : "border-gray-300 focus-within:border-blue-500"
                                        }`}
                                >
                                    <input
                                        type={showPwd ? "text" : "password"}
                                        placeholder="Password"
                                        value={form.password}
                                        onChange={(e) => set("password", e.target.value)}
                                        className="h-full w-full bg-transparent px-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPwd(!showPwd)}
                                        className="shrink-0 px-3 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                            </Field>

                            {/* Confirm Password */}
                            <Field
                                label="Confirm Password"
                                required
                                error={errors.confirmPassword}
                            >
                                <div
                                    className={`flex h-10 items-center overflow-hidden rounded-md border bg-gray-50 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 ${errors.confirmPassword
                                        ? "border-red-400 bg-red-50"
                                        : "border-gray-300 focus-within:border-blue-500"
                                        }`}
                                >
                                    <input
                                        type={showCPwd ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        value={form.confirmPassword}
                                        onChange={(e) => set("confirmPassword", e.target.value)}
                                        className="h-full w-full bg-transparent px-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCPwd(!showCPwd)}
                                        className="shrink-0 px-3 text-gray-400 hover:text-gray-600"
                                    >
                                        {showCPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                            </Field>

                            {/* School Type */}
                            {/* <Field label="School Type" required error={errors.schoolType}>
                                <select
                                    value={form.schoolType}
                                    onChange={(e) => set("schoolType", e.target.value)}
                                    className={sc("schoolType")}
                                >
                                    <option value="">Select Option</option>
                                    {schoolTypes.map((t) => (
                                        <option key={t.id} value={t.id}>
                                            {t.name}
                                        </option>
                                    ))}
                                </select>
                            </Field> */}

                            {/* School Board */}
                            <Field label="School Board" required error={errors.schoolBoard}>
                                <select
                                    value={form.schoolBoard}
                                    onChange={(e) => set("schoolBoard", e.target.value)}
                                    className={sc("schoolBoard")}
                                >
                                    <option value="">Select Board</option>
                                    {boardOptions.map((b) => (
                                        <option key={b} value={b}>{b}</option>
                                    ))}
                                </select>
                            </Field>
                        </div>
                    </div>

                    {/* ── Principal Details ──────────────────────────────────────────── */}
                    <div>
                        <SectionHeading>Principal Details</SectionHeading>
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                            <Field label="Principal Salutation" required error={errors.principalSalutation}>
                                <select
                                    value={form.principalSalutation}
                                    onChange={(e) => set("principalSalutation", e.target.value)}
                                    className={sc("principalSalutation")}
                                >
                                    <option value="">Select</option>
                                    {salutationOptions.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </Field>

                            <Field
                                label="Principal Name"
                                required
                                error={errors.principalName}
                            >
                                <input
                                    type="text"
                                    placeholder="Principal name"
                                    value={form.principalName}
                                    onChange={(e) =>
                                        set(
                                            "principalName",
                                            e.target.value.replace(/[^A-Za-z\s]/g, "")
                                        )
                                    }
                                    className={ic("principalName")}
                                />
                            </Field>
                        </div>
                    </div>

                    {/* ── Exam Coordinator Details ───────────────────────────────────── */}
                    <div>
                        <SectionHeading>Exam Coordinator Details</SectionHeading>
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                            {/* Coordinator Salutation — same pattern */}
                            <Field label="Exam Coordinator Salutation" required error={errors.coordinatorSalutation}>
                                <select
                                    value={form.coordinatorSalutation}
                                    onChange={(e) => set("coordinatorSalutation", e.target.value)}
                                    className={sc("coordinatorSalutation")}
                                >
                                    <option value="">Select</option>
                                    {salutationOptions.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </Field>
                            <Field
                                label="Exam Coordinator Name"
                                required
                                error={errors.coordinatorName}
                            >
                                <input
                                    type="text"
                                    placeholder="Exam Coordinator Name"
                                    value={form.coordinatorName}
                                    onChange={(e) =>
                                        set(
                                            "coordinatorName",
                                            e.target.value.replace(/[^A-Za-z\s]/g, "")
                                        )
                                    }
                                    className={ic("coordinatorName")}
                                />
                            </Field>

                            <Field
                                label="Exam Coordinator Designation"
                                required
                                error={errors.coordinatorDesignation}
                            >
                                <input
                                    type="text"
                                    placeholder="Exam Coordinator Designation"
                                    value={form.coordinatorDesignation}
                                    onChange={(e) =>
                                        set(
                                            "coordinatorDesignation",
                                            e.target.value.replace(/[^A-Za-z\s]/g, "")
                                        )
                                    }
                                    className={ic("coordinatorDesignation")}
                                />
                            </Field>
                        </div>
                    </div>

                    {/* ── Location ──────────────────────────────────────────────────── */}
                    <div>
                        <SectionHeading>Location</SectionHeading>
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                            {/* Country — read only */}
                            <Field label="Country">
                                <input
                                    type="text"
                                    value={countryName}
                                    disabled
                                    className={`${inputCls} opacity-70 cursor-not-allowed`}
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
                                        <option key={r.value} value={r.value}>{r.label}</option>
                                    ))}
                                </select>
                            </Field>

                            {/* City */}
                            <Field label="City" required error={errors.city}>
                                <select
                                    value={form.city}
                                    onChange={(e) => set("city", e.target.value)}
                                    disabled={!form.region || citiesForRegion.length === 0}
                                    className={`${sc("city")} disabled:cursor-not-allowed disabled:opacity-50`}
                                >
                                    <option value="">
                                        {!form.region ? "Select region first" : "Select City"}
                                    </option>
                                    {citiesForRegion.map((c) => (
                                        <option key={c.value} value={c.value}>{c.label}</option>
                                    ))}
                                </select>
                            </Field>

                            {/* Address */}
                            <Field label="Address" required error={errors.address}>
                                <input
                                    type="text"
                                    placeholder="Enter Address"
                                    value={form.address}
                                    onChange={(e) => set("address", e.target.value)}
                                    className={ic("address")}
                                />
                            </Field>

                            {/* Pincode REMOVED — not shown to user */}

                        </div>
                    </div>

                    {/* ── How did you hear ──────────────────────────────────────────── */}
                    <div>
                        <SectionHeading>Additional Information</SectionHeading>
                        <div className="mt-4">
                            <p className="mb-3 text-sm font-medium text-gray-700">
                                How did you get to know about VVM?{" "}
                                <span className="text-red-500">*</span>
                            </p>
                            <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-2">
                                {referralOptions.map((opt) => (
                                    <label
                                        key={opt.id}
                                        className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700 select-none"
                                    >
                                        <input
                                            type="radio"
                                            name="referral"
                                            value={opt.id}
                                            checked={form.referral === opt.id}
                                            onChange={() => set("referral", opt.id)}
                                            className="h-4 w-4 accent-blue-600"
                                        />
                                        {opt.name}
                                    </label>
                                ))}
                            </div>
                            {errors.referral && (
                                <p className="mt-2 text-xs text-red-500">{errors.referral}</p>
                            )}
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

