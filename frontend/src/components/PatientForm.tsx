"use client";

import { useState } from "react";
import FormInput from "./FormInput";
import { usePatients } from "@/features/patients/usePatients";
import MessageBox from "./MessageBox";

type Props = {
  onSuccess?: () => void;
};

export default function PatientForm({ onSuccess }: Props) {
  const { name, setName, dateOfBirth, setDateOfBirth, create } = usePatients();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !dateOfBirth.trim()) {
      setError("Both fields are required.");
      return;
    }

    try {
      await create();
      setError("");
      onSuccess?.(); // parent handles closing + refresh
    } catch {
      setError("Failed to add patient.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <MessageBox type="error" message={error} />}
      <FormInput label="Name" value={name} onChange={setName} />
      <FormInput
        type="date"
        label="Date of Birth"
        value={dateOfBirth}
        onChange={setDateOfBirth}
      />
      <button className="bg-blue-600 text-white py-2 px-4 rounded">
        Submit
      </button>
    </form>
  );
}
