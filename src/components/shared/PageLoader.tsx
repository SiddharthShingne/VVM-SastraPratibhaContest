"use client";
export default function PageLoader() {
    return (
        <div style={{
            position: "fixed", inset: 0,
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(3px)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            zIndex: 99999,
        }}>
            {/* Logo */}
            <img
                src="/logo-footer.png"
                alt="Logo"
                style={{ height: 120, objectFit: "contain", marginBottom: 24 }}
            />

            {/* Spinner */}
            {/* <svg viewBox="0 0 52 52" width="52" height="52"
                style={{ animation: "spin 0.9s linear infinite" }}>
                <circle cx="26" cy="26" r="22" fill="none"
                    stroke="#e5e7eb" strokeWidth="4" />
                <circle cx="26" cy="26" r="22" fill="none"
                    stroke="#3b82f6" strokeWidth="4"
                    strokeDasharray="138" strokeDashoffset="100"
                    strokeLinecap="round" />
            </svg> */}

            <p style={{ marginTop: 8, fontSize: 20, color: "#6b7280", fontWeight: 700 }}>
                Loading, please wait…
            </p>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}