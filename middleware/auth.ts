export default defineNuxtRouteMiddleware((to, from) => {
    const { useUser } = useAuth();
    if (!useUser().value) {
        return navigateTo('/login')
    }
});