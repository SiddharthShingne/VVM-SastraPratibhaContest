"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function usePageLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    let cancelled = false;

    const show = setTimeout(() => {
      if (!cancelled) setLoading(true);
    }, 0);

    const hide = setTimeout(() => {
      if (!cancelled) setLoading(false);
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [pathname, searchParams]);

  return loading;
}
