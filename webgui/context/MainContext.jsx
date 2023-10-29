import { createContext } from "react";

export const MainContext = createContext(
    {
        showError: () => null,
        showInfo: () => null,
        showWarn: () => null,
        showSuccess: () => null,
        connectionStatus: "Closed",
        websocketValue: 0,
        setShouldConnect: () => Boolean,
        sendCloseWebsocketMessage: () => null
    }
)