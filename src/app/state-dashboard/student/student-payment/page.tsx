/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useRef, useEffect } from "react";
import { FaUniversity, FaWifi, FaUpload, FaFilePdf, FaImage, FaTimes, FaInfoCircle, FaCheckCircle ,FaTimesCircle} from "react-icons/fa";
import { makePayment } from "@/services/authService";
/* ── Constants ── */
const UNIT_PRICE = 100; // ← change this when API is ready

const BANK_DETAILS = {
    accountNumber: "7009607017",
    accountName: "VIDYARTHI VIGYAN MANTHAN",
    ifsc: "IDIB000D008",
    branch: "Indian Bank, Defence Colony, New Delhi",
};

/* ── Helpers ── */
const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

type PaymentMode = "online" | "offline";

/* ── Component ── */
export default function PaymentForm() {
    const [mode, setMode] = useState<PaymentMode>("online");
    const [studentCount, setStudentCount] = useState<string>("");
    const [receipt, setReceipt] = useState<File | null>(null);
    const [receiptError, setReceiptError] = useState("");
    const [countError, setCountError] = useState("");
    const [loading, setLoading] = useState(false);
   
    const fileRef = useRef<HTMLInputElement>(null);
    const auth = typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("user") || "null")
        : null;

    const userId = auth?.user?.id;

  
    const count = parseInt(studentCount) || 0;
    const subTotal = count * UNIT_PRICE;

    const [dialog, setDialog] = useState({
        isOpen: false,
        type: "success" as "success" | "error",
        title: "",
        message: "",
    });
    const showDialog = (type: "success" | "error", title: string, message: string) => {
        setDialog({
            isOpen: true,
            type,
            title,
            message,
        });
    };

    const closeDialog = () => {
        setDialog({ ...dialog, isOpen: false });
    };

    /* ── File pick ── */
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        const allowed = ["application/pdf", "image/jpeg", "image/png", "image/jpg", "image/webp"];
        if (!allowed.includes(f.type)) {
            setReceiptError("Only PDF and Image files are allowed");
            setReceipt(null);
            return;
        }
        setReceiptError("");
        setReceipt(f);
    };

    const removeFile = () => {
        setReceipt(null);
        if (fileRef.current) fileRef.current.value = "";
    };

    /* ── Submit ── */
    const handleSubmit = async () => {
        let valid = true;

        if (!studentCount || count <= 0) {
            setCountError("Number of Students is required");
            valid = false;
        } else {
            setCountError("");
        }

        if (mode === "offline" && !receipt) {
            setReceiptError("Payment Receipt is required");
            valid = false;
        } else if (mode === "online") {
            setReceiptError("");
        }

        if (!valid) return;

        try {
            setLoading(true);


            let res;

            if (mode === "offline" && receipt) {
                const formData = new FormData();
                formData.append("user_id", String(userId));
                formData.append("student_count", String(count));
                formData.append("amount", String(subTotal));
                formData.append("payment_mode", "offline");
                formData.append("receipt", receipt);

                res = await makePayment(formData);

                showDialog(
                    "success",
                    "Payment Submitted",
                    res?.message || "Offline payment submitted successfully."
                );

            } else {
                res = await makePayment({
                    user_id: userId,
                    student_count: count,
                    amount: subTotal,
                    payment_mode: "online",
                });

                if (res?.payment_url) {
                    window.location.href = res.payment_url;
                    return;
                }

                showDialog(
                    res?.status ? "success" : "error",
                    res?.status ? "Payment Successful" : "Payment Failed",
                    res?.message || "Something went wrong"
                );
            }

        } catch (err: any) {
            showDialog(
                "error",
                "Payment Failed",
                err?.message || "Server error occurred"
            );
        } finally {
            setLoading(false);
        }
    };
    const handleDiscard = () => {
        setMode("online");
        setStudentCount("");
        setReceipt(null);
        setReceiptError("");
        setCountError("");
        
    };

    const isSubmitDisabled =
        loading ||
        !studentCount ||
        count <= 0 ||
        (mode === "offline" && !receipt) ||
        mode === "online"; // disables submit for online mode
    /* ── Success screen ── */
    useEffect(() => {
        if (!userId) {
            showDialog(
                "error",
                "Authentication Error",
                "User not found. Please login again."
            );
            setLoading(false);
        }
    }, [userId]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white rounded-[30px] shadow-xl relative overflow-hidden">

                {dialog.isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full px-8 py-10 text-center">

                            <div className={`mx-auto mb-5 w-16 h-16 rounded-full flex items-center justify-center
        ${dialog.type === "success" ? "bg-emerald-50" : "bg-red-50"}`}>

                                {dialog.type === "success"
                                    ? <FaCheckCircle className="text-emerald-500 text-3xl" />
                                    : <FaTimesCircle className="text-red-500 text-3xl" />}
                            </div>

                            <h3 className="text-xl font-semibold mb-2">{dialog.title}</h3>

                            <p className="text-sm text-gray-500 mb-6">
                                {dialog.message}
                            </p>

                            <button
                                onClick={closeDialog}
                                className={`px-6 py-2 rounded-lg text-white
          ${dialog.type === "success"
                                        ? "bg-blue-600 hover:bg-blue-700"
                                        : "bg-red-500 hover:bg-red-600"}`}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                )}
                {/* TOP GRADIENT BORDER */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

                <div className="p-8 md:p-10">

                    {/* TITLE */}
                    <h2 className="text-2xl font-extrabold text-[#17395c] mb-1">Pay Fees</h2>
                    <p className="text-sm text-[#7a90a8] mb-7">Select your payment mode and fill in the details below.</p>

                    {/* MODE TOGGLE */}
                    <div className="flex gap-3 mb-8">
                        {(["online", "offline"] as PaymentMode[]).map((m) => (
                            <button
                                key={m}
                                onClick={() => setMode(m)}
                                className={[
                                    "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200",
                                    mode === m
                                        ? "bg-gradient-to-br from-[#17395c] to-[#1f4e7a] text-white border-white/20 shadow-[0_6px_20px_rgba(23,57,92,0.28)]"
                                        : "text-[#4a6278] border-[#d0dde9] hover:border-[#17395c] hover:text-[#17395c] bg-white",
                                ].join(" ")}
                            >
                                {m === "online" ? <FaWifi className={mode === m ? "text-[#f4df17]" : "text-[#7a8fa6]"} /> : <FaUniversity className={mode === m ? "text-[#f4df17]" : "text-[#7a8fa6]"} />}
                                {m.charAt(0).toUpperCase() + m.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* STUDENT COUNT */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-[#243f5c] mb-1.5">
                            Number of Students <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            min={1}
                            value={studentCount}
                            onChange={(e) => { setStudentCount(e.target.value); if (e.target.value) setCountError(""); }}
                            placeholder="Enter number of students"
                            className={[
                                "w-full px-4 py-3 rounded-xl border text-sm text-[#243f5c] outline-none transition-all",
                                countError
                                    ? "border-red-400 ring-2 ring-red-100"
                                    : "border-[#d0dde9] focus:border-[#17395c] focus:ring-2 focus:ring-[#17395c]/10",
                            ].join(" ")}
                        />
                        {countError && <p className="text-xs text-red-500 mt-1">{countError}</p>}
                    </div>

                    {/* SUBTOTAL */}
                    <div className="bg-[#f4f7fb] border border-dashed border-[#c9d6e4] rounded-xl px-5 py-4 mb-6 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-[#7a90a8] font-medium mb-0.5">Sub Total</p>
                            <p className="text-2xl font-extrabold text-[#17395c]">{formatINR(subTotal)}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[11px] text-[#7a90a8]">Fees per Student</p>
                            <p className="text-sm font-bold text-[#4a6278]">{formatINR(UNIT_PRICE)}</p>
                        </div>
                    </div>

                    {/* ── ONLINE MODE ── */}
                    {mode === "online" && (
                        <div className="bg-[#f4f7fb] border border-[#c9d6e4] rounded-xl p-5 mb-6 text-center">
                            <FaWifi className="text-3xl text-[#17395c] mx-auto mb-2" />
                            <p className="text-sm font-semibold text-[#243f5c] mb-1">Online Payment Gateway</p>
                            <p className="text-xs text-[#7a90a8]">
                                You will be redirected to the payment gateway after submitting.
                            </p>
                        </div>
                    )}

                    {/* ── OFFLINE MODE ── */}
                    {mode === "offline" && (
                        <>
                            {/* Receipt Upload */}
                            <div className="mb-5">
                                <label className="block text-sm font-semibold text-[#243f5c] mb-1.5">
                                    Payment Receipt (PDF/Image) <span className="text-red-500">*</span>
                                </label>

                                {!receipt ? (
                                    <label
                                        className={[
                                            "flex flex-col items-center justify-center gap-2 w-full px-4 py-6 rounded-xl border-2 border-dashed cursor-pointer transition-all",
                                            receiptError
                                                ? "border-red-400 bg-red-50"
                                                : "border-[#c9d6e4] hover:border-[#17395c] hover:bg-[#f0f5fb] bg-[#f4f7fb]",
                                        ].join(" ")}
                                    >
                                        <FaUpload className="text-xl text-[#7a90a8]" />
                                        <span className="text-sm text-[#4a6278] font-medium">Click to upload receipt</span>
                                        <span className="text-[11px] text-[#7a90a8]">* Only PDF and Image files are allowed</span>
                                        <input
                                            ref={fileRef}
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png,.webp"
                                            onChange={handleFile}
                                            className="hidden"
                                        />
                                    </label>
                                ) : (
                                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#c9d6e4] bg-[#f4f7fb]">
                                        {receipt.type === "application/pdf"
                                            ? <FaFilePdf className="text-xl text-red-500 shrink-0" />
                                            : <FaImage className="text-xl text-blue-500 shrink-0" />
                                        }
                                        <span className="text-sm text-[#243f5c] font-medium flex-1 truncate">{receipt.name}</span>
                                        <button onClick={removeFile} className="text-[#7a90a8] hover:text-red-500 transition-colors">
                                            <FaTimes />
                                        </button>
                                    </div>
                                )}

                                {receiptError && <p className="text-xs text-red-500 mt-1">{receiptError}</p>}
                            </div>

                            {/* Bank Details */}
                            <div className="rounded-xl border border-[#c9d6e4] overflow-hidden mb-6">
                                <div className="bg-gradient-to-r from-[#17395c] to-[#1f4e7a] px-5 py-3 flex items-center gap-2">
                                    <FaUniversity className="text-[#f4df17]" />
                                    <span className="text-sm font-bold text-white">Account Details</span>
                                </div>
                                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        ["Current Account Number", BANK_DETAILS.accountNumber],
                                        ["Account Name", BANK_DETAILS.accountName],
                                        ["IFSC Code", BANK_DETAILS.ifsc],
                                        ["Branch Name & Add", BANK_DETAILS.branch],
                                    ].map(([label, value]) => (
                                        <div key={label}>
                                            <p className="text-[10px] text-[#7a90a8] font-bold uppercase tracking-wider mb-0.5">{label}</p>
                                            <p className="text-sm font-semibold text-[#243f5c]">{value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Notice */}
                            <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6">
                                <FaInfoCircle className="text-amber-500 shrink-0 mt-0.5" />
                                <div className="text-xs text-amber-800 leading-relaxed space-y-1">
                                    <p>It may take up to <b>48 hours</b> for student Login Credentials to activate after offline payment.</p>
                                    {/* <p>If payment status is not updated within the due time, contact <b>9899615277</b>. Please be ready with:</p> */}
                                    {/* <ul className="list-disc ml-4 mt-1 space-y-0.5">
                                        <li>School Name &amp; Username</li>
                                        <li>State &amp; City</li>
                                        <li>Payment Amount</li>
                                    </ul> */}
                                </div>
                            </div>
                        </>
                    )}

                    {/* ACTION BUTTONS */}
                    <div className="flex gap-3 justify-end">
                        <button
                            onClick={handleDiscard}
                            disabled={loading}
                            className="px-6 py-2.5 rounded-xl border border-[#d0dde9] text-[#4a6278] text-sm font-semibold hover:bg-[#f0f4f8] transition-all disabled:opacity-50"
                        >
                            Discard
                        </button>
                        <button
                            onClick={handleSubmit}
                            // disabled={isSubmitDisabled}
                            className="px-8 py-2.5 rounded-xl text-white text-sm font-semibold bg-gradient-to-r from-[#17395c] to-[#2c5b84] shadow-lg hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    Please wait...
                                </span>
                            ) : "Submit"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}