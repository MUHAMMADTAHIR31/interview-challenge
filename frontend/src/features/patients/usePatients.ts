import { useEffect, useState } from "react";
import { fetchFromAPI } from "@/lib/api";
import { Patient } from "@/types/models";

export function usePatients() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

    const refetch = async () => {
        const data = await fetchFromAPI<Patient[]>("/patients");
        setPatients(data);
    };

    const create = async () => {
        await fetchFromAPI("/patients", {
            method: "POST",
            body: JSON.stringify({ name, dateOfBirth }),
        });
        setName("");
        setDateOfBirth("");
    };

    useEffect(() => {
        refetch();
    }, []);

    return {
        patients,
        name,
        setName,
        dateOfBirth,
        setDateOfBirth,
        create,
        refetch,
    };
}