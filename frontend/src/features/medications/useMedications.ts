import { useEffect, useState } from "react";
import { fetchFromAPI } from "@/lib/api";
import { Medication } from "@/types/models";

export function useMedications() {
    const [medications, setMedications] = useState<Medication[]>([]);
    const [name, setName] = useState("");
    const [dosage, setDosage] = useState("");
    const [frequency, setFrequency] = useState("");


    const load = async () => {
        try {
            const data = await fetchFromAPI<Medication[]>("/medications");
            setMedications(data);
        } catch (error) {
            console.error("Failed to load medications:", error);
        }
    };


    const create = async () => {
        try {
            await fetchFromAPI("/medications", {
                method: "POST",
                body: JSON.stringify({ name, dosage, frequency }),
            });
            setName("");
            setDosage("");
            setFrequency("");
            await load(); // Refresh after creation
        } catch (error) {
            console.error("Failed to create medication:", error);
        }
    };

    useEffect(() => {
        load();
    }, []);

    return {
        medications,
        name,
        setName,
        dosage,
        setDosage,
        frequency,
        setFrequency,
        create,
        refetch: load,
    };
}
