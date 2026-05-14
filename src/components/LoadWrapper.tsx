"use client";
import PageLoader from "./shared/PageLoader";
import { usePageLoader } from "@/hooks/usePageLoader";

export default function LoaderWrapper() {
    const loading = usePageLoader();
    return loading ? <PageLoader /> : null;
}