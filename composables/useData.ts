import { BloodGroup, Donor } from "@prisma/client"

export default () => {
    const useBloodGroup =  () => useState<BloodGroup[]>("bloodGroup", () => []);
    const useDonor = () => useState<Donor[]>("donor", () => []);

    const setBloodGroup = (newBloodGroup: BloodGroup | BloodGroup[]) => {
        const bloodGroup = useBloodGroup();
        if (Array.isArray(newBloodGroup)) {
            bloodGroup.value = newBloodGroup;
        }
        else {
            bloodGroup.value.unshift(newBloodGroup);
        }
    }

    const getBloodGroup = () => {
        const bloodGroup = useBloodGroup();
        return bloodGroup.value;
    }
    
    const setDonor = (newDonor: Donor | Donor[]) => {
        const donor = useDonor();
        if (Array.isArray(newDonor)) {
            donor.value = newDonor;
        }
        else {
            donor.value.unshift(newDonor);
        }
    }

    const getDonor = () => {
        const donor = useDonor();
        return donor.value;
    }

    return {
        useBloodGroup,
        useDonor,
        getBloodGroup,
        setBloodGroup,
        getDonor,
        setDonor
    };
}