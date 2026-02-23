(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/studentDashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function DashboardPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(35);
    if ($[0] !== "f5d8efa25e5ed6b7ac5244dfa02283316a15053f286c5d374635953eec300e6f") {
        for(let $i = 0; $i < 35; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f5d8efa25e5ed6b7ac5244dfa02283316a15053f286c5d374635953eec300e6f";
    }
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("token") : "TURBOPACK unreachable";
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const token = t0;
    const username = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("username") || "User" : "TURBOPACK unreachable";
    let t1;
    let t2;
    if ($[2] !== router) {
        t1 = ({
            "DashboardPage[useEffect()]": ()=>{
                if (!token) {
                    router.replace("/Login");
                }
            }
        })["DashboardPage[useEffect()]"];
        t2 = [
            token,
            router
        ];
        $[2] = router;
        $[3] = t1;
        $[4] = t2;
    } else {
        t1 = $[3];
        t2 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    if (!token) {
        return null;
    }
    let t3;
    if ($[5] !== router) {
        t3 = ({
            "DashboardPage[handleLogout]": ()=>{
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                router.replace("/Login");
            }
        })["DashboardPage[handleLogout]"];
        $[5] = router;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    const handleLogout = t3;
    const t4 = "min-h-screen bg-linear-to-br from-[#eef2ff] to-[#f8fafc] px-6 py-10";
    const t5 = "max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8";
    const t6 = "bg-white rounded-2xl shadow-lg border border-gray-100 p-6";
    const t7 = "mb-8 text-center";
    const t8 = "w-16 h-16 mx-auto mb-3 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold shadow-md";
    const t9 = username.charAt(0).toUpperCase();
    let t10;
    if ($[7] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t8,
            children: t9
        }, void 0, false, {
            fileName: "[project]/src/app/studentDashboard/page.tsx",
            lineNumber: 69,
            columnNumber: 11
        }, this);
        $[7] = t9;
        $[8] = t10;
    } else {
        t10 = $[8];
    }
    let t11;
    if ($[9] !== username) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-lg font-semibold text-gray-800",
            children: username
        }, void 0, false, {
            fileName: "[project]/src/app/studentDashboard/page.tsx",
            lineNumber: 77,
            columnNumber: 11
        }, this);
        $[9] = username;
        $[10] = t11;
    } else {
        t11 = $[10];
    }
    let t12;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm text-gray-500",
            children: "Student"
        }, void 0, false, {
            fileName: "[project]/src/app/studentDashboard/page.tsx",
            lineNumber: 85,
            columnNumber: 11
        }, this);
        $[11] = t12;
    } else {
        t12 = $[11];
    }
    let t13;
    if ($[12] !== t10 || $[13] !== t11) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t7,
            children: [
                t10,
                t11,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/studentDashboard/page.tsx",
            lineNumber: 92,
            columnNumber: 11
        }, this);
        $[12] = t10;
        $[13] = t11;
        $[14] = t13;
    } else {
        t13 = $[14];
    }
    let t14;
    let t15;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-semibold text-gray-700 mb-2 uppercase tracking-wide",
                children: "Dashboard"
            }, void 0, false, {
                fileName: "[project]/src/app/studentDashboard/page.tsx",
                lineNumber: 102,
                columnNumber: 16
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/studentDashboard/page.tsx",
            lineNumber: 102,
            columnNumber: 11
        }, this);
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider",
            children: "Result"
        }, void 0, false, {
            fileName: "[project]/src/app/studentDashboard/page.tsx",
            lineNumber: 103,
            columnNumber: 11
        }, this);
        $[15] = t14;
        $[16] = t15;
    } else {
        t14 = $[15];
        t15 = $[16];
    }
    let t16;
    let t17;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t15,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition",
                            children: "Level 1 Result"
                        }, void 0, false, {
                            fileName: "[project]/src/app/studentDashboard/page.tsx",
                            lineNumber: 113,
                            columnNumber: 47
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition",
                            children: "Level 2 Result"
                        }, void 0, false, {
                            fileName: "[project]/src/app/studentDashboard/page.tsx",
                            lineNumber: 113,
                            columnNumber: 170
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/studentDashboard/page.tsx",
                    lineNumber: 113,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/studentDashboard/page.tsx",
            lineNumber: 113,
            columnNumber: 11
        }, this);
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider",
            children: "Study Material"
        }, void 0, false, {
            fileName: "[project]/src/app/studentDashboard/page.tsx",
            lineNumber: 114,
            columnNumber: 11
        }, this);
        $[17] = t16;
        $[18] = t17;
    } else {
        t16 = $[17];
        t17 = $[18];
    }
    let t18;
    let t19;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t17,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition",
                            children: "Study Material"
                        }, void 0, false, {
                            fileName: "[project]/src/app/studentDashboard/page.tsx",
                            lineNumber: 124,
                            columnNumber: 47
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition",
                            children: "Contact Information"
                        }, void 0, false, {
                            fileName: "[project]/src/app/studentDashboard/page.tsx",
                            lineNumber: 124,
                            columnNumber: 170
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/studentDashboard/page.tsx",
                    lineNumber: 124,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/studentDashboard/page.tsx",
            lineNumber: 124,
            columnNumber: 11
        }, this);
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider",
            children: "Profile"
        }, void 0, false, {
            fileName: "[project]/src/app/studentDashboard/page.tsx",
            lineNumber: 125,
            columnNumber: 11
        }, this);
        $[19] = t18;
        $[20] = t19;
    } else {
        t18 = $[19];
        t19 = $[20];
    }
    let t20;
    let t21;
    if ($[21] === Symbol.for("react.memo_cache_sentinel")) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            className: "px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition",
            children: "Edit Profile"
        }, void 0, false, {
            fileName: "[project]/src/app/studentDashboard/page.tsx",
            lineNumber: 135,
            columnNumber: 11
        }, this);
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            className: "px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition",
            children: "Update Password"
        }, void 0, false, {
            fileName: "[project]/src/app/studentDashboard/page.tsx",
            lineNumber: 136,
            columnNumber: 11
        }, this);
        $[21] = t20;
        $[22] = t21;
    } else {
        t20 = $[21];
        t21 = $[22];
    }
    let t22;
    if ($[23] !== handleLogout) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: "space-y-6 text-sm",
            children: [
                t14,
                t16,
                t18,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        t19,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "space-y-2",
                            children: [
                                t20,
                                t21,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    onClick: handleLogout,
                                    className: "px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-500 cursor-pointer transition",
                                    children: "Logout"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/studentDashboard/page.tsx",
                                    lineNumber: 145,
                                    columnNumber: 107
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/studentDashboard/page.tsx",
                            lineNumber: 145,
                            columnNumber: 71
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/studentDashboard/page.tsx",
                    lineNumber: 145,
                    columnNumber: 61
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/studentDashboard/page.tsx",
            lineNumber: 145,
            columnNumber: 11
        }, this);
        $[23] = handleLogout;
        $[24] = t22;
    } else {
        t22 = $[24];
    }
    let t23;
    if ($[25] !== t13 || $[26] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
            className: t6,
            children: [
                t13,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/studentDashboard/page.tsx",
            lineNumber: 153,
            columnNumber: 11
        }, this);
        $[25] = t13;
        $[26] = t22;
        $[27] = t23;
    } else {
        t23 = $[27];
    }
    let t24;
    if ($[28] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-2xl font-bold text-center mb-8 text-gray-800",
            children: "IMPORTANT DATES TO REMEMBER"
        }, void 0, false, {
            fileName: "[project]/src/app/studentDashboard/page.tsx",
            lineNumber: 162,
            columnNumber: 11
        }, this);
        $[28] = t24;
    } else {
        t24 = $[28];
    }
    let t25;
    if ($[29] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                className: "bg-indigo-50 text-gray-800 text-left",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                        className: "p-4 font-semibold",
                        children: "Sr. No."
                    }, void 0, false, {
                        fileName: "[project]/src/app/studentDashboard/page.tsx",
                        lineNumber: 169,
                        columnNumber: 71
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                        className: "p-4 font-semibold",
                        children: "Name"
                    }, void 0, false, {
                        fileName: "[project]/src/app/studentDashboard/page.tsx",
                        lineNumber: 169,
                        columnNumber: 117
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                        className: "p-4 font-semibold",
                        children: "Detail"
                    }, void 0, false, {
                        fileName: "[project]/src/app/studentDashboard/page.tsx",
                        lineNumber: 169,
                        columnNumber: 160
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/studentDashboard/page.tsx",
                lineNumber: 169,
                columnNumber: 18
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/studentDashboard/page.tsx",
            lineNumber: 169,
            columnNumber: 11
        }, this);
        $[29] = t25;
    } else {
        t25 = $[29];
    }
    let t26;
    if ($[30] === Symbol.for("react.memo_cache_sentinel")) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
            className: "border-t hover:bg-gray-50 transition",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    className: "p-4",
                    children: "1"
                }, void 0, false, {
                    fileName: "[project]/src/app/studentDashboard/page.tsx",
                    lineNumber: 176,
                    columnNumber: 64
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    className: "p-4 font-medium",
                    children: "Level 1 Exam"
                }, void 0, false, {
                    fileName: "[project]/src/app/studentDashboard/page.tsx",
                    lineNumber: 176,
                    columnNumber: 90
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    className: "p-4",
                    children: "GCC - November 8 for all GCC countries for all classes."
                }, void 0, false, {
                    fileName: "[project]/src/app/studentDashboard/page.tsx",
                    lineNumber: 176,
                    columnNumber: 139
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/studentDashboard/page.tsx",
            lineNumber: 176,
            columnNumber: 11
        }, this);
        $[30] = t26;
    } else {
        t26 = $[30];
    }
    let t27;
    if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
            className: "border-t hover:bg-gray-50 transition",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    className: "p-4",
                    children: "2"
                }, void 0, false, {
                    fileName: "[project]/src/app/studentDashboard/page.tsx",
                    lineNumber: 183,
                    columnNumber: 64
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    className: "p-4 font-medium",
                    children: "Level 2 Exam"
                }, void 0, false, {
                    fileName: "[project]/src/app/studentDashboard/page.tsx",
                    lineNumber: 183,
                    columnNumber: 90
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    className: "p-4",
                    children: "International students contact Science India forum."
                }, void 0, false, {
                    fileName: "[project]/src/app/studentDashboard/page.tsx",
                    lineNumber: 183,
                    columnNumber: 139
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/studentDashboard/page.tsx",
            lineNumber: 183,
            columnNumber: 11
        }, this);
        $[31] = t27;
    } else {
        t27 = $[31];
    }
    let t28;
    if ($[32] === Symbol.for("react.memo_cache_sentinel")) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "md:col-span-3 bg-white rounded-2xl shadow-lg border border-gray-100 p-8",
            children: [
                t24,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-x-auto rounded-xl border border-gray-200",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full text-sm text-gray-700",
                        children: [
                            t25,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: [
                                    t26,
                                    t27,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-t hover:bg-gray-50 transition",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-4",
                                                children: "3"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/studentDashboard/page.tsx",
                                                lineNumber: 190,
                                                columnNumber: 296
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-4 font-medium",
                                                children: "State Camp"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/studentDashboard/page.tsx",
                                                lineNumber: 190,
                                                columnNumber: 322
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-4",
                                                children: "Contact respective international forum for details."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/studentDashboard/page.tsx",
                                                lineNumber: 190,
                                                columnNumber: 369
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/studentDashboard/page.tsx",
                                        lineNumber: 190,
                                        columnNumber: 243
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/studentDashboard/page.tsx",
                                lineNumber: 190,
                                columnNumber: 226
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/studentDashboard/page.tsx",
                        lineNumber: 190,
                        columnNumber: 173
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/studentDashboard/page.tsx",
                    lineNumber: 190,
                    columnNumber: 106
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/studentDashboard/page.tsx",
            lineNumber: 190,
            columnNumber: 11
        }, this);
        $[32] = t28;
    } else {
        t28 = $[32];
    }
    let t29;
    if ($[33] !== t23) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t4,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: t5,
                children: [
                    t23,
                    t28
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/studentDashboard/page.tsx",
                lineNumber: 197,
                columnNumber: 31
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/studentDashboard/page.tsx",
            lineNumber: 197,
            columnNumber: 11
        }, this);
        $[33] = t23;
        $[34] = t29;
    } else {
        t29 = $[34];
    }
    return t29;
}
_s(DashboardPage, "vQduR7x+OPXj6PSmJyFnf+hU7bg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DashboardPage;
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_studentDashboard_page_tsx_1f642673._.js.map