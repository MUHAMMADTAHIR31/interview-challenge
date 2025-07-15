"use client";

import { useMedications } from "@/features/medications/useMedications";
import FormInput from "./FormInput";
import { useState } from "react";

type Props = {
  onSuccess?: () => void;
};

export default function MedicationForm({ onSuccess }: Props) {
  const { name, setName, dosage, setDosage, frequency, setFrequency, create } =
    useMedications();

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !dosage.trim() || !frequency.trim()) {
      setError("All fields are required.");
      return;
    }

    try {
      await create(); // just create
      setError("");
      onSuccess?.(); // parent handles refetch + success msg
    } catch {
      setError("Something went wrong while adding the medication.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <FormInput label="Name" value={name} onChange={setName} />
      <FormInput label="Dosage" value={dosage} onChange={setDosage} />
      <FormInput label="Frequency" value={frequency} onChange={setFrequency} />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
      >
        Submit
      </button>
    </form>
  );
}
