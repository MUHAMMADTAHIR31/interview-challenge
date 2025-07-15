export type Patient = {
    id: number;
    name: string;
    dateOfBirth: string;
    createdAt: string;
};

export type Medication = {
    id: number;
    name: string;
    dosage: string;
    frequency: string;
    createdAt: string;
};

export type Assignment = {
    id: number;
    patient: Patient;
    medication: Medication;
    startDate: string;
    numberOfDays: number;
};
