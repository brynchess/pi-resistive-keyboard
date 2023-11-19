import { get_ws_address } from "./tools/get_ws_address"

export const http_url = import.meta.env.VITE_BACKEND_URL
export const websocket_url = get_ws_address()
export const buttons_url = `${http_url}buttons/`
export const settings_url = `${http_url}settings/`
export const key_options = `${http_url}key-options/`
export const functions = `${http_url}functions/`
export const apps_url = `${http_url}apps/`
export const install_url = `${http_url}install/`
export const update_url = `${http_url}update/`

//websocks
export const value_ws = `${websocket_url}value`
export const voltage_ws = `${websocket_url}voltage`