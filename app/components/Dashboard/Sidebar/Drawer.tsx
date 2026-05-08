import { X } from 'lucide-react';
import SidebarList from './SidebarList';

type DrawerProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function Drawer({ isOpen, onClose }: DrawerProps) {
    return (
        <>
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-(--second-color)/50 md:hidden" 
                    onClick={onClose} 
                />
            )}
            <div 
                className={`fixed inset-y-0 right-0 z-50 w-full bg-(--main-color) flex flex-col transform transition-transform duration-300 ease-in-out md:hidden ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="p-4 md:p-6 border-b flex justify-between items-center">
                    <div className="font-(family-name:--julius) font-bold text-xl tracking-widest">
                        MEMORIA
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2 -mr-2 hover:text-(--second-color) rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto ">
                    <SidebarList onClose={onClose} />
                </div>
            </div>
        </>
    );
}