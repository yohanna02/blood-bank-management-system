import { AuthI, AuthResponseI } from "~~/interface/User";
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

    const setAuth = (data: AuthResponseI | null, error: any) => {
        if (error) {
            if (error.data?.data?.errorDetails?.details) {
                setErrorDetails(error.data.data.errorDetails.details);
                setErrorMessage(null);
            }
            else {
                setErrorDetails(null);
                setErrorMessage(error.data.data.message);
            }
            clearError();
        }
        else {
            setUser(data?.user.email);
            setAccessToken(data?.accessToken);
            useLocalStorage("user", data);
            setErrorDetails(null);
            setErrorMessage(null);
        }
    }

    const login = async (body: AuthI) => {
        setErrorDetails(null);
        setErrorMessage(null);
        const { data, error } = await useFetch("/api/auth/login", {
            method: "post",
            body
        });

        setAuth(data.value, error.value);
        
    }
 
    const register = async(body: AuthI) => {
        setErrorDetails(null);
        setErrorMessage(null);
        const { data, error } = await useFetch("/api/auth/register", {
            method: "post",
            body
        });

        setAuth(data.value, error.value);
        
    }

    const logout = async () => {
        setAccessToken(null);
        setUser(null);
        useLocalStorage("user", "").value = null;
        navigateTo("/login");
    }

    const initAuth = async () => {
        const userString = localStorage.getItem("user");
        if (userString) {
            const user = JSON.parse(userString);
            setAuth(user, null);
            navigateTo("/blood");
        }
    }

    return {
        useUser,
        login,
        register,
        logout,
        initAuth,
        useAccessToken
    }
}