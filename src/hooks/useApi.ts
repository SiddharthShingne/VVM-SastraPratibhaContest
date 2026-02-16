"use client";
import { useState } from "react";
import { API_BASE_URL } from "@/lib/config";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export function useApi() {
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const request = async (
    endpoint: string,
    method: Method = "GET",
    body?: unknown,
) => {
    setLoading(true);
    setError(null);

    try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        },
        credentials: "include",
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
    } catch (err: unknown) {
    if (err instanceof Error) {
        setError(err.message);
    } else {
        setError("Unexpected error");
    }
    throw err;
    } finally {
    setLoading(false);
    }
};

return { request, loading, error };
}