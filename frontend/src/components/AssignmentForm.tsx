"use client";

import { useAssignments } from "@/features/assignments/useAssignments";
import FormInput from "./FormInput";
import SelectBox from "./SelectBox";
import { useState } from "react";

type Props = {
  onSuccess?: () => void;
};

export default function AssignmentForm({ onSuccess }: Props) {
  const { patients, medications, form, setForm, create } = useAssignments();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.patientId ||
      !form.medicationId ||
      !form.startDate.trim() ||
      !form.numberOfDays
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      await create();
      setError("");
      onSuccess?.(); // parent does refetch and success UI
    } catch {
      setError("Failed to create assignment. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <SelectBox
        label="Patient"
        value={form.patientId}
        onChange={(v) => setForm({ ...form, patientId: v })}
        options={patients.map((p) => ({ value: p.id, label: p.name }))}
      />

      <SelectBox
        label="Medication"
        value={form.medicationId}
        onChange={(v) => setForm({ ...form, medicationId: v })}
        options={medications.map((m) => ({ value: m.id, label: m.name }))}
      />

      <FormInput
        label="Start Date"
        type="date"
        value={form.startDate}
        onChange={(v) => setForm({ ...form, startDate: v })}
      />

      <FormInput
        label="Number of Days"
        type="number"
        value={form.numberOfDays}
        onChange={(v) => setForm({ ...form, numberOfDays: v })}
      />

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
      >
        Submit
      </button>
    </form>
  );
}
