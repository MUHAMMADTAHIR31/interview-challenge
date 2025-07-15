"use client";

import { useState } from "react";
import { useAssignments } from "@/features/assignments/useAssignments";
import Modal from "@/components/Modal";
import AssignmentForm from "@/components/AssignmentForm";
import MessageBox from "@/components/MessageBox";

export default function AssignmentsPage() {
  const { assignments, refetch } = useAssignments();
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState("");

  const handleCreated = async () => {
    await refetch();
    setShowModal(false);
    setSuccess("Assignment created successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Assignments</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          + Assign Medication
        </button>
      </div>

      {success && <MessageBox type="success" message={success} />}

      {assignments.length === 0 ? (
        <p className="text-gray-500 italic">No assignments found.</p>
      ) : (
        <table className="w-full border border-gray-200 bg-white rounded-md overflow-hidden text-sm shadow-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Patient</th>
              <th className="px-4 py-2 text-left">Medication</th>
              <th className="px-4 py-2 text-left">Start Date</th>
              <th className="px-4 py-2 text-left">Duration (days)</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a.id} className="border-t border-gray-100">
                <td className="px-4 py-2">{a.patient.name}</td>
                <td className="px-4 py-2">{a.medication.name}</td>
                <td className="px-4 py-2">{a.startDate}</td>
                <td className="px-4 py-2">{a.numberOfDays}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Assign New Medication"
      >
        <AssignmentForm onSuccess={handleCreated} />
      </Modal>
    </div>
  );
}
