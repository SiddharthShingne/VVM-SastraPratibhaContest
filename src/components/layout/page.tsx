import React from "react";

import Header from "../Header";
import Navbar from "../Navbar";
import Footer from "../Footer";

interface LayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
    return (
        <>
            {/* Header */}
            <Header />

            {/* Navbar */}
            <Navbar />

            {/* Page Content */}
            <main style={{ minHeight: "calc(100vh - 160px)" }}>
                {children}
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
}
