"use client";

import { useState } from "react";
import { usePatients } from "@/features/patients/usePatients";
import PatientForm from "@/components/PatientForm";
import Modal from "@/components/Modal";
import MessageBox from "@/components/MessageBox";

export default function PatientPage() {
  const { patients, refetch } = usePatients();
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState("");

  const handleCreated = async () => {
    await refetch(); // ✅ reload data
    setShowModal(false); // ✅ close modal
    setSuccess("Patient added successfully!");
    setTimeout(() => setSuccess(""), 3000); // auto-clear message
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Patients</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Patient
        </button>
      </div>

      {success && <MessageBox type="success" message={success} />}

      {patients.length === 0 ? (
        <p className="text-gray-500 italic">No patients found.</p>
      ) : (
        <table className="w-full border border-gray-200 bg-white rounded-md overflow-hidden text-sm shadow-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id} className="border-t border-gray-100">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.dateOfBirth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add New Patient"
      >
        <PatientForm onSuccess={handleCreated} />
      </Modal>
    </div>
  );
}
