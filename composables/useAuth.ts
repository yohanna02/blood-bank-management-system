import { AuthI } from "~~/interface/User";
// import { useStorage } from "@vueuse/core";

export default () => {

    const { setErrorDetails, setErrorMessage, getErrorDetails, getErrorMessage } = useErrors();

    const useUser = () => useState<string | undefined | null>("user", () => undefined);
    const useAccessToken = () => useState<string | undefined | null>("token", () => undefined);

    const setAccessToken = (newAccessToken: string | undefined | null) => {
        const accessToken = useAccessToken();
        accessToken.value = newAccessToken;
    }

    const setUser = (newUser: string | undefined | null) => {
        const user = useUser();
        user.value = newUser;
    }

    const login = async (body: AuthI) => {
        const { data, error } = await useFetch("/api/auth/login", {
            method: "post",
            body
        });

        
    }

    const register = async(body: AuthI) => {
        setErrorDetails(null);
        setErrorMessage(null);
        const { data, error } = await useFetch("/api/auth/register", {
            method: "post",
            body
        });
        if (error.value) {
            if (error.value?.data?.data?.errorDetails?.details) {
                setErrorDetails(error.value?.data.data.errorDetails.details);
                setErrorMessage(null);
            }
            else {
                setErrorDetails(null);
                setErrorMessage(error.value?.data.data.message);
            }
            clearError();
        }
        else {
            setUser(data.value?.user.email);
            setAccessToken(data.value?.accessToken);
            useLocalStorage("accessToken", data.value?.accessToken);
            setErrorDetails(null);
            setErrorMessage(null);
        }
    }

    const logout = async () => {
        setAccessToken(null);
        setUser(null);
    }

    const initAuth = async () => {
        
    }

    return {
        useUser,
        login,
        register,
        logout,
        initAuth
    }
}