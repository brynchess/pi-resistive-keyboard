//urls
// export const backend_url = "/"
export const backend_url = import.meta.env.VITE_BACKEND_URL
console.log(backend_url)
export const http_url = `http://${backend_url}`
export const websocket_url = `ws://${backend_url}`
export const buttons_url = `${http_url}buttons/`
export const settings_url = `${http_url}settings/`
export const key_options = `${http_url}key-options/`
export const functions = `${http_url}functions/`
export const apps_url = `${http_url}apps/`
export const install_url = `${http_url}install/`

//websocks
export const value_ws = `${websocket_url}value`
export const voltage_ws = `${websocket_url}voltage`