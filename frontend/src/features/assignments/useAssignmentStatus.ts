import { useEffect, useState } from "react";
import { fetchFromAPI } from "@/lib/api";
import { Assignment } from "@/types/models";

type StatusItem = {
    assignmentId: number;
    remainingDays: number;
};

export function useAssignmentStatus() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [statusMap, setStatusMap] = useState<Record<number, number>>({});

    /** 🔄 Load assignments and their remaining days */
    const load = async () => {
        try {
            const data = await fetchFromAPI<Assignment[]>("/assignments");
            setAssignments(data);

            const statusList = await Promise.all(
                data.map((a) =>
                    fetchFromAPI<StatusItem>(`/assignments/${a.id}/remaining-days`)
                )
            );

            const statusRecord = Object.fromEntries(
                statusList.map((s) => [s.assignmentId, s.remainingDays])
            );

            setStatusMap(statusRecord);
        } catch (error) {
            console.error("Failed to load assignment status:", error);
        }
    };

    useEffect(() => {
        load();
    }, []);

    return {
        assignments,
        statusMap,
    };
}
