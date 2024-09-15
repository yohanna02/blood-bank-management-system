import type { Donor } from "@prisma/client";

export interface AuthI {
    email: string;
    password: string;
}

export interface AuthResponseI {
    user: {
        email: string;
    }
    accessToken: string;
}

export type DonorReg = Omit<Donor, "id" | "createdAt">;