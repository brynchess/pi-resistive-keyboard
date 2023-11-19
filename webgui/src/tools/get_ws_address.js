export function get_ws_address () {
    if (import.meta.env.DEV){
        const url = import.meta.env.VITE_BACKEND_URL
        return url.replace('http://', 'ws://')
    }
    const currentURL = window.location.href;
    return currentURL.replace('http://', 'ws://')
}