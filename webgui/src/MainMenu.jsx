import { TabMenu } from 'primereact/tabmenu';

function MainMenu ({pages = [], activeIndex = 0, setActiveIndex = () => null}) {

    return (
        <div className="tab-menu">
            <TabMenu activeIndex={activeIndex} onTabChange={({index}) => setActiveIndex(index)} model={pages}/>
        </div>
    )
}

export default MainMenu;