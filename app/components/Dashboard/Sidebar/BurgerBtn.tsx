import { Menu } from 'lucide-react';

type BurgerBtnProps = {
    onClick: () => void;
};

export default function BurgerBtn({ onClick }: BurgerBtnProps) {
    return (
        <button 
            onClick={onClick} 
            className="p-2 -mr-2 hover:text-(--second-color) transition-colors md:hidden"
        >
            <Menu className="w-7 h-7" />
        </button>
    );
}