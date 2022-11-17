import { ErrorDetailsI } from "~~/interface/AppError";

export default () => {
    const useErrorDetails = () => useState<ErrorDetailsI[] | null>("errorDetails", () => null);
    const useErrorMessage = () => useState<string | null>("errorMessage", () => null); 

    const setErrorDetails = (newErrorDetails: ErrorDetailsI[] | null) => {
        const errorDetails = useErrorDetails();
        errorDetails.value = newErrorDetails;
    }

    const getErrorDetails = () => {
        const errorDetails = useErrorDetails();
        return errorDetails.value;
    }

    const setErrorMessage = (newErrorMessage: string | null) => {
        const errorMessage = useErrorMessage();
        errorMessage.value = newErrorMessage;
    }

    const getErrorMessage = () => {
        const errorMessage = useErrorMessage();
        return errorMessage.value;
    }

    return {
        setErrorDetails,
        setErrorMessage,
        getErrorDetails,
        getErrorMessage
    }
}