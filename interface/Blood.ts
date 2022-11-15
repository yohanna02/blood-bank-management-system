import { DonorSex } from "@prisma/client";

export interface BloodGroupI {
    name: string;
    pintAvailable: number;
};

export interface DonorI {
    name: string;
    bloodGroupId: string;
    sex: DonorSex;
    email: string;
    phoneNumber: string;
}