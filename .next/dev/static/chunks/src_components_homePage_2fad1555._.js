(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/homePage/Gallery.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
"use client";
;
;
;
const Gallery = ()=>{
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(7);
    if ($[0] !== "52de52e81d2cce74e92a31921bd2e73c50755a604219ade435100e9919016547") {
        for(let $i = 0; $i < 7; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "52de52e81d2cce74e92a31921bd2e73c50755a604219ade435100e9919016547";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = [
            "/home/img-1.jpg",
            "/home/img-2.jpg",
            "/home/img-3.jpg",
            "/home/img-4.jpg",
            "/home/img-5.jpg",
            "/home/img-6.jpg",
            "/home/img-7.jpg",
            "/home/img-8.jpg"
        ];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const imagePaths = t0;
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [
            "/home/video-01.mp4",
            "/home/video-02.mp4",
            "/home/video-03.mp4"
        ];
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const videoPaths = t1;
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "text-xl md:text-3xl font-bold mb-4 text-[#03133d]",
            children: "Image Gallery"
        }, void 0, false, {
            fileName: "[project]/src/components/homePage/Gallery.jsx",
            lineNumber: 31,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    let t4;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3",
            children: imagePaths.map(_temp)
        }, void 0, false, {
            fileName: "[project]/src/components/homePage/Gallery.jsx",
            lineNumber: 39,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "text-xl md:text-3xl font-bold mt-10 mb-4 text-[#03133d]",
            children: "Video Gallery"
        }, void 0, false, {
            fileName: "[project]/src/components/homePage/Gallery.jsx",
            lineNumber: 40,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[4] = t3;
        $[5] = t4;
    } else {
        t3 = $[4];
        t4 = $[5];
    }
    let t5;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-2 md:p-6 lg:p-8 text-center",
            children: [
                t2,
                t3,
                t4,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
                    children: videoPaths.map(_temp2)
                }, void 0, false, {
                    fileName: "[project]/src/components/homePage/Gallery.jsx",
                    lineNumber: 49,
                    columnNumber: 69
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/homePage/Gallery.jsx",
            lineNumber: 49,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    return t5;
};
_c = Gallery;
const __TURBOPACK__default__export__ = Gallery;
function _temp(src, idx) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full transition-transform hover:scale-105",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: src,
            alt: `Gallery ${idx + 1}`,
            width: 300,
            height: 200,
            className: "rounded-md shadow-sm object-cover",
            quality: 75
        }, void 0, false, {
            fileName: "[project]/src/components/homePage/Gallery.jsx",
            lineNumber: 58,
            columnNumber: 81
        }, this)
    }, idx, false, {
        fileName: "[project]/src/components/homePage/Gallery.jsx",
        lineNumber: 58,
        columnNumber: 10
    }, this);
}
function _temp2(src_0, idx_0) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full transition-transform hover:scale-105",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
            src: src_0,
            controls: true,
            preload: "none",
            className: "rounded-md shadow-sm object-cover w-full h-55"
        }, void 0, false, {
            fileName: "[project]/src/components/homePage/Gallery.jsx",
            lineNumber: 61,
            columnNumber: 83
        }, this)
    }, idx_0, false, {
        fileName: "[project]/src/components/homePage/Gallery.jsx",
        lineNumber: 61,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "Gallery");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/homePage/VVMExamInfo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/* eslint-disable react/no-unescaped-entities */ /* eslint-disable react/jsx-key */ "use client";
;
;
const VVMExamInfo = ()=>{
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(18);
    if ($[0] !== "e26e9418e88af8a2585d1175e71a1e82a4d9c84a3b2c729f663ae8c4c9ec6aea") {
        for(let $i = 0; $i < 18; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e26e9418e88af8a2585d1175e71a1e82a4d9c84a3b2c729f663ae8c4c9ec6aea";
    }
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("details");
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = [
            "Eligibility",
            "Students from Class VI to XI studying under CBSE, ICSE and State Boards"
        ];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    let t1;
    let t2;
    let t3;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [
            "Language",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    "English, Hindi, Marathi, Tamil, Telugu, Kannada, Bengali, Gujarati, Punjabi, Odia, Malayalam, Assamese, Sanskrit, Urdu",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                        fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                        lineNumber: 27,
                        columnNumber: 143
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-red-500 text-xs italic",
                        children: "Note: If less than 100 students are registered in any other language than English or Hindi, question paper will be available in English or Hindi only."
                    }, void 0, false, {
                        fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                        lineNumber: 27,
                        columnNumber: 149
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true)
        ];
        t2 = [
            "Exam Venue",
            "School/Home"
        ];
        t3 = [
            "Fee",
            "Rs. 200/- (Rupees Two Hundred only)"
        ];
        $[2] = t1;
        $[3] = t2;
        $[4] = t3;
    } else {
        t1 = $[2];
        t2 = $[3];
        t3 = $[4];
    }
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
            children: "NO CASH / DD / Cheque"
        }, void 0, false, {
            fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
            lineNumber: 40,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    let t5;
    let t6;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
            fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
            lineNumber: 48,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
            fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
            lineNumber: 49,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[6] = t5;
        $[7] = t6;
    } else {
        t5 = $[6];
        t6 = $[7];
    }
    let t7;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = [
            "Mode of Payment",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    "Through payment gateway and ONLINE (RTGS/NEFT) payment only.",
                    " ",
                    t4,
                    " will be acceptable.",
                    t5,
                    t6,
                    "Exam Coordinators depositing fee directly in VVM's account are requested to retain deposit slip with Transaction ID, Date & Time.",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                        fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                        lineNumber: 58,
                        columnNumber: 262
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-red-500 text-xs italic",
                        children: "This option is not applicable for Individually registering students."
                    }, void 0, false, {
                        fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                        lineNumber: 58,
                        columnNumber: 268
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true)
        ];
        $[8] = t7;
    } else {
        t7 = $[8];
    }
    let t8;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = [
            "ONLINE Payment Details for School Exam Coordinator Only",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Current Account Number:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                                lineNumber: 65,
                                columnNumber: 77
                            }, ("TURBOPACK compile-time value", void 0)),
                            " 7009670017"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                        lineNumber: 65,
                        columnNumber: 72
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Account Name:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                                lineNumber: 65,
                                columnNumber: 139
                            }, ("TURBOPACK compile-time value", void 0)),
                            " VIDYARTHI VIGYAN MANTHAN"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                        lineNumber: 65,
                        columnNumber: 134
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "IFSC Code:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                                lineNumber: 65,
                                columnNumber: 205
                            }, ("TURBOPACK compile-time value", void 0)),
                            " IDIB000D008"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                        lineNumber: 65,
                        columnNumber: 200
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Branch Name & Address:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                                lineNumber: 65,
                                columnNumber: 255
                            }, ("TURBOPACK compile-time value", void 0)),
                            " Indian Bank, Defence Colony, New Delhi"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                        lineNumber: 65,
                        columnNumber: 250
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true)
        ];
        $[9] = t8;
    } else {
        t8 = $[9];
    }
    let t9;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = [
            t0,
            t1,
            t2,
            t3,
            t7,
            t8,
            [
                "Website URL",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: "https://www.vvm.org.in",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-blue-600 underline",
                    children: "www.vvm.org.in"
                }, void 0, false, {
                    fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                    lineNumber: 72,
                    columnNumber: 51
                }, ("TURBOPACK compile-time value", void 0))
            ]
        ];
        $[10] = t9;
    } else {
        t9 = $[10];
    }
    const details = t9;
    let t10;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = [
            {
                content: "Science and Mathematics from text books",
                contribution: "50% (50 Questions) [1 Mark Each]",
                curriculum: "NCERT & State Board Textbooks"
            },
            {
                content: "Indian Contributions to Science",
                contribution: "20% (20 Questions)",
                curriculum: "VVM Study Material"
            },
            {
                content: "Life Story of Dr. Satyendra Nath Bose",
                contribution: "20% (20 Questions)",
                curriculum: "VVM Study Material"
            },
            {
                content: "Logic & Reasoning",
                contribution: "10% (10 Questions)",
                curriculum: "General Reading"
            }
        ];
        $[11] = t10;
    } else {
        t10 = $[11];
    }
    const syllabus = t10;
    let t11;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = [
            {
                content: "Science and Mathematics from text books",
                contribution: "60% (30 Questions) [2 Marks Each]",
                curriculum: "NCERT & State Board Textbooks"
            },
            {
                content: "Indian Contribution to Science",
                contribution: "20% (10 Questions)",
                curriculum: "VVM Study Material"
            },
            {
                content: "Life Story of Dr. Satyendra Nath Bose",
                contribution: "10% (5 Questions)",
                curriculum: "VVM Study Material"
            },
            {
                content: "Logic & Reasoning",
                contribution: "10% (5 Questions)",
                curriculum: "General Reading"
            }
        ];
        $[12] = t11;
    } else {
        t11 = $[12];
    }
    const syllabusLevel2 = t11;
    let t12;
    if ($[13] !== activeTab) {
        const awards = [
            {
                level: "School Level",
                awards: [
                    "Digital participation certificate for all students",
                    "Merit certificates for top performers"
                ]
            },
            {
                level: "State Level",
                awards: [
                    "Top students receive State Rank certificates",
                    "Invitation to State Science Camp"
                ]
            },
            {
                level: "National Level",
                awards: [
                    "National Rank certificates",
                    "Invitation to National Science Camp",
                    "Cash prizes & scholarships"
                ]
            }
        ];
        let t13;
        if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
            t13 = [
                "details",
                "syllabus",
                "syllabus2",
                "awards"
            ];
            $[15] = t13;
        } else {
            t13 = $[15];
        }
        const t14 = t13.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setActiveTab(tab),
                className: `px-6 py-3 rounded-md font-semibold transition ${activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`,
                children: tab === "details" ? "VVM Details" : tab === "syllabus" ? "Syllabus Level I" : tab === "syllabus2" ? "Syllabus Level II" : "Awards & Recognition"
            }, tab, false, {
                fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                lineNumber: 145,
                columnNumber: 32
            }, ("TURBOPACK compile-time value", void 0)));
        let t15;
        if ($[16] !== t14) {
            t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-4 mb-6 justify-center",
                children: t14
            }, void 0, false, {
                fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                lineNumber: 148,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0));
            $[16] = t14;
            $[17] = t15;
        } else {
            t15 = $[17];
        }
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto my-10 px-4",
            children: [
                t15,
                activeTab === "details" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-x-auto border rounded-lg",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full text-sm",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: details.map(_temp)
                        }, void 0, false, {
                            fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                            lineNumber: 154,
                            columnNumber: 175
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                        lineNumber: 154,
                        columnNumber: 141
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                    lineNumber: 154,
                    columnNumber: 90
                }, ("TURBOPACK compile-time value", void 0)),
                activeTab === "syllabus" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-x-auto border rounded-lg",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                className: "bg-gray-200",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3",
                                            children: "Content"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                                            lineNumber: 154,
                                            columnNumber: 374
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3",
                                            children: "Contribution"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                                            lineNumber: 154,
                                            columnNumber: 412
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3",
                                            children: "Curriculum"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                                            lineNumber: 154,
                                            columnNumber: 455
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                                    lineNumber: 154,
                                    columnNumber: 370
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                                lineNumber: 154,
                                columnNumber: 339
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: syllabus.map(_temp2)
                            }, void 0, false, {
                                fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                                lineNumber: 154,
                                columnNumber: 509
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                        lineNumber: 154,
                        columnNumber: 305
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                    lineNumber: 154,
                    columnNumber: 254
                }, ("TURBOPACK compile-time value", void 0)),
                activeTab === "syllabus2" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-x-auto border rounded-lg",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                className: "bg-gray-200",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3",
                                            children: "Content"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                                            lineNumber: 154,
                                            columnNumber: 711
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3",
                                            children: "Contribution"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                                            lineNumber: 154,
                                            columnNumber: 749
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3",
                                            children: "Curriculum"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                                            lineNumber: 154,
                                            columnNumber: 792
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                                    lineNumber: 154,
                                    columnNumber: 707
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                                lineNumber: 154,
                                columnNumber: 676
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: syllabusLevel2.map(_temp3)
                            }, void 0, false, {
                                fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                                lineNumber: 154,
                                columnNumber: 846
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                        lineNumber: 154,
                        columnNumber: 642
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                    lineNumber: 154,
                    columnNumber: 591
                }, ("TURBOPACK compile-time value", void 0)),
                activeTab === "awards" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid md:grid-cols-3 gap-6",
                    children: awards.map(_temp5)
                }, void 0, false, {
                    fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                    lineNumber: 154,
                    columnNumber: 931
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
            lineNumber: 154,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[13] = activeTab;
        $[14] = t12;
    } else {
        t12 = $[14];
    }
    return t12;
};
_s(VVMExamInfo, "DtrmlXmMAVQ+KcDoLyoyaEi0MLY=");
_c = VVMExamInfo;
const __TURBOPACK__default__export__ = VVMExamInfo;
function _temp(t0, idx) {
    const [title, value] = t0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        className: idx % 2 ? "bg-gray-100" : "bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-4 py-3 font-semibold w-1/3",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                lineNumber: 165,
                columnNumber: 73
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-6 py-3",
                children: value
            }, void 0, false, {
                fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                lineNumber: 165,
                columnNumber: 131
            }, this)
        ]
    }, idx, true, {
        fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
        lineNumber: 165,
        columnNumber: 10
    }, this);
}
function _temp2(s, i) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        className: i % 2 ? "bg-gray-50" : "bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-4 py-3",
                children: s.content
            }, void 0, false, {
                fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                lineNumber: 168,
                columnNumber: 68
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-4 py-3",
                children: s.contribution
            }, void 0, false, {
                fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                lineNumber: 168,
                columnNumber: 110
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-4 py-3",
                children: s.curriculum
            }, void 0, false, {
                fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                lineNumber: 168,
                columnNumber: 157
            }, this)
        ]
    }, i, true, {
        fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
        lineNumber: 168,
        columnNumber: 10
    }, this);
}
function _temp3(s_0, i_0) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        className: i_0 % 2 ? "bg-gray-50" : "bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-4 py-3",
                children: s_0.content
            }, void 0, false, {
                fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                lineNumber: 171,
                columnNumber: 72
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-4 py-3",
                children: s_0.contribution
            }, void 0, false, {
                fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                lineNumber: 171,
                columnNumber: 116
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-4 py-3",
                children: s_0.curriculum
            }, void 0, false, {
                fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                lineNumber: 171,
                columnNumber: 165
            }, this)
        ]
    }, i_0, true, {
        fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
        lineNumber: 171,
        columnNumber: 10
    }, this);
}
function _temp4(a, j) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: "px-4 py-3 border-t text-sm",
        children: a
    }, j, false, {
        fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
        lineNumber: 174,
        columnNumber: 10
    }, this);
}
function _temp5(level, i_1) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border rounded-lg overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-blue-600 text-white px-4 py-3 font-bold",
                children: level.level
            }, void 0, false, {
                fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                lineNumber: 177,
                columnNumber: 71
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                children: level.awards.map(_temp4)
            }, void 0, false, {
                fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
                lineNumber: 177,
                columnNumber: 150
            }, this)
        ]
    }, i_1, true, {
        fileName: "[project]/src/components/homePage/VVMExamInfo.tsx",
        lineNumber: 177,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "VVMExamInfo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_homePage_2fad1555._.js.map