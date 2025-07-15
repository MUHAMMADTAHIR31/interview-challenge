"use client";

import { useAssignmentStatus } from "@/features/assignments/useAssignmentStatus";

export default function AssignmentStatusPage() {
  const { assignments, statusMap } = useAssignmentStatus();

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Treatment Status</h1>

      {assignments.length === 0 ? (
        <p className="text-gray-500 italic">No assignments found.</p>
      ) : (
        <table className="w-full border border-gray-200 bg-white rounded-md overflow-hidden text-sm shadow-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Patient</th>
              <th className="px-4 py-2 text-left">Medication</th>
              <th className="px-4 py-2 text-left">Start Date</th>
              <th className="px-4 py-2 text-left">Duration</th>
              <th className="px-4 py-2 text-left">Remaining</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a.id} className="border-t border-gray-100">
                <td className="px-4 py-2">{a.patient.name}</td>
                <td className="px-4 py-2">{a.medication.name}</td>
                <td className="px-4 py-2">{a.startDate}</td>
                <td className="px-4 py-2">{a.numberOfDays} days</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      statusMap[a.id] === 0
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {statusMap[a.id] ?? "..."} days
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
