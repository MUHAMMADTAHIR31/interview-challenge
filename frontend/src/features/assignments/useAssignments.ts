import { useEffect, useState } from "react";
import { fetchFromAPI } from "@/lib/api";
import { Assignment, Patient, Medication } from "@/types/models";

export function useAssignments() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [medications, setMedications] = useState<Medication[]>([]);

    const [form, setForm] = useState({
        patientId: "",
        medicationId: "",
        startDate: "",
        numberOfDays: "",
    });

    /** 🔄 Fetch all assignments, patients, and medications */
    const loadAll = async () => {
        try {
            const [pats, meds, assigns] = await Promise.all([
                fetchFromAPI<Patient[]>("/patients"),
                fetchFromAPI<Medication[]>("/medications"),
                fetchFromAPI<Assignment[]>("/assignments"),
            ]);
            setPatients(pats);
            setMedications(meds);
            setAssignments(assigns);
        } catch (error) {
            console.error("Failed to load assignment data:", error);
        }
    };

    /** ✅ Create assignment and refresh lists */
    const create = async () => {
        try {
            await fetchFromAPI("/assignments", {
                method: "POST",
                body: JSON.stringify({
                    patientId: Number(form.patientId),
                    medicationId: Number(form.medicationId),
                    startDate: form.startDate,
                    numberOfDays: Number(form.numberOfDays),
                }),
            });
            setForm({ patientId: "", medicationId: "", startDate: "", numberOfDays: "" });
            await loadAll(); // refresh
        } catch (error) {
            console.error("Failed to create assignment:", error);
        }
    };

    useEffect(() => {
        loadAll();
    }, []);

    return {
        assignments,
        patients,
        medications,
        form,
        setForm,
        create,
        refetch: loadAll,
    };
}
