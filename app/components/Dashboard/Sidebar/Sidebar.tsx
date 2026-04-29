import SidebarList from "./SidebarList";

export default function Sidebar() {
    return (
        <aside className="w-full md:w-64 border-r flex-col hidden md:flex">
            <div className="p-6 border-b">
                <h1 className="text-2xl font-(family-name:--julius) font-bold tracking-widest">
                    MEMORIA
                </h1>
            </div>
            <SidebarList />
        </aside>
    );
}
