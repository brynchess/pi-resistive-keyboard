import { TabMenu } from 'primereact/tabmenu';
import { useMemo } from 'react';

function MainMenu ({pages = [], activeIndex = 0, setActiveIndex = () => null}) {

    const items = useMemo(() => (
        [
            {label: "Dashboard", icon: "pi pi-home"},
            {label: "Add/remove buttons", icon: "pi pi-tablet"},
            {label: "Manage buttons function", icon: "pi pi-sliders-h"}
        ]
    ))

    return (
        <TabMenu activeIndex={activeIndex} onTabChange={({index}) => setActiveIndex(index)} model={items}/>
    )
}

export default MainMenu;