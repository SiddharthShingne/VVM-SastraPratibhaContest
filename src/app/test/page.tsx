"use client";

import React, { useMemo, useState, useEffect } from "react";
import DataTable, { DataTableColumn } from "@/components/ui/DataTable";

type UserRow = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
};

export default function UsersPage() {
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<UserRow[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setAllUsers([
        {
          id: 1,
          name: "Abhishek Thakre",
          email: "abhishek@gmail.com",
          phone: "9876543210",
          status: "Active",
          createdAt: "2026-03-01T10:30:00",
        },
        {
          id: 2,
          name: "Rahul Sharma",
          email: "",
          phone: "9988776655",
          status: "Inactive",
          createdAt: "2026-02-25T14:10:00",
        },
        {
          id: 3,
          name: "Priya Verma",
          email: "priya@gmail.com",
          phone: "",
          status: "Pending",
          createdAt: "2026-03-03T09:00:00",
        },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  const columns: DataTableColumn<UserRow>[] = useMemo(
    () => [
      {
        key: "id",
        label: "ID",
        sortable: true,
      },
      {
        key: "name",
        label: "Name",
        sortable: true,
        searchable: true,
      },
      {
        key: "email",
        label: "Email",
        sortable: true,
        searchable: true,
      },
      {
        key: "phone",
        label: "Phone",
        sortable: true,
        searchable: true,
      },
      {
        key: "status",
        label: "Status",
        sortable: true,
        searchable: true,
        render: (value) => {
          const status = value || "Not available";

          const styles: Record<string, string> = {
            Active: "bg-emerald-100 text-emerald-700",
            Inactive: "bg-rose-100 text-rose-700",
            Pending: "bg-amber-100 text-amber-700",
            "Not available": "bg-slate-100 text-slate-700",
          };

          return (
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                styles[status] || "bg-slate-100 text-slate-700"
              }`}
            >
              {status}
            </span>
          );
        },
      },
      {
        key: "createdAt",
        label: "Created Date",
        sortable: true,
        searchable: false,
        isDate: true,
      },
    ],
    []
  );

  return (
    <div className="p-4 md:p-6">
      <DataTable<UserRow>
        title="Users List"
        columns={columns}
        data={allUsers}
        allData={allUsers}
        loading={loading}
        pageSize={5}
        exportFileName="users-list"
        searchPlaceholder="Search users..."
        showExport={false}
      />
    </div>
  );
}