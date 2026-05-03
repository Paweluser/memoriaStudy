import MobileNav from "./Sidebar/MobileNav";

export default function Header() {
    return (
        <header className="border-b p-4 md:p-6 flex justify-between items-center md:hidden">
            <div className="font-(family-name:--julius) font-bold text-xl tracking-widest">
                MEMORIA
            </div>
            <MobileNav />
        </header>
    );
}
