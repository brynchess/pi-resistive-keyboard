import { Card } from "primereact/card";
import MainMenu from "./MainMenu";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import AddButtonsPage from "./pages/AddButtonsPage/AddButtonsPage";
import ManageButtonsPage from "./pages/ManageButtonsPage/ManageButtonsPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import { useState } from "react";
import OAAppsManagerPage from "./pages/OAAppsManager/OAAppsManagerPage";


function MainPage () {
    const [ activeIndex, setActiveIndex ] = useState(0)
    const pages = [
        {label: "Dashboard", icon: "pi pi-home", component: <DashboardPage />},
        {label: "Add/remove buttons", icon: "pi pi-tablet", component: <AddButtonsPage />},
        {label: "Manage buttons function", icon: "pi pi-sliders-h", component: <ManageButtonsPage />},
        {label: "Settings", icon: "pi pi-cog", component: <SettingsPage />},
        {label: "OA Apps Manager", icon: "pi pi-desktop", component: <OAAppsManagerPage />}
    ]

    return (
        <Card className="content-wrapper" header={<MainMenu pages={pages} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />}>
            {pages[activeIndex]?.component}
        </Card>
    )
}

export default MainPage;