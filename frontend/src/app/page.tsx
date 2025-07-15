"use client";

import Link from "next/link";
import { usePatients } from "@/features/patients/usePatients";
import { useMedications } from "@/features/medications/useMedications";
import { useAssignments } from "@/features/assignments/useAssignments";
import { useAssignmentStatus } from "@/features/assignments/useAssignmentStatus";

export default function Home() {
  const { patients } = usePatients();
  const { medications } = useMedications();
  const { assignments } = useAssignments();
  const { statusMap } = useAssignmentStatus();

  const totalAssignments = assignments.length;
  const completed = Object.values(statusMap).filter((d) => d === 0).length;
  const active = totalAssignments - completed;

  const stats = [
    {
      label: "Patients",
      count: patients.length,
      color: "bg-blue-100 text-blue-800",
      href: "/patients",
    },
    {
      label: "Medications",
      count: medications.length,
      color: "bg-green-100 text-green-800",
      href: "/medications",
    },
    {
      label: "Assignments",
      count: totalAssignments,
      color: "bg-indigo-100 text-indigo-800",
      href: "/assignments",
    },
    {
      label: "Active Treatments",
      count: active,
      color: "bg-yellow-100 text-yellow-800",
      href: "/status",
    },
    {
      label: "Completed Treatments",
      count: completed,
      color: "bg-gray-100 text-gray-800",
      href: "/status",
    },
  ];

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
      <p className="text-base text-gray-600">
        Welcome to the Medication Tracker App.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`rounded-md p-5 min-h-[120px] flex flex-col justify-center items-center text-center font-medium border ${stat.color} hover:shadow-md transition`}
          >
            <div className="text-2xl font-bold">{stat.count}</div>
            <div className="text-sm">{stat.label}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
