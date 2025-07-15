"use client";

import { useState } from "react";
import { useMedications } from "@/features/medications/useMedications";
import Modal from "@/components/Modal";
import MedicationForm from "@/components/MedicationForm";
import MessageBox from "@/components/MessageBox";

export default function MedicationsPage() {
  const { medications, refetch } = useMedications();
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState("");

  const handleCreated = async () => {
    await refetch();
    setShowModal(false);
    setSuccess("Medication added successfully!");
    setTimeout(() => setSuccess(""), 3000); // auto-dismiss
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Medications</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Add Medication
        </button>
      </div>

      {success && <MessageBox type="success" message={success} />}

      {medications.length === 0 ? (
        <p className="text-gray-500 italic">No medications found.</p>
      ) : (
        <table className="w-full border border-gray-200 bg-white rounded-md overflow-hidden text-sm shadow-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Dosage</th>
              <th className="px-4 py-2 text-left">Frequency</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((m) => (
              <tr key={m.id} className="border-t border-gray-100">
                <td className="px-4 py-2">{m.name}</td>
                <td className="px-4 py-2">{m.dosage}</td>
                <td className="px-4 py-2">{m.frequency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add New Medication"
      >
        <MedicationForm onSuccess={handleCreated} />
      </Modal>
    </div>
  );
}
