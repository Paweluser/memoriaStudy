'use client';

import { useState } from 'react';
import BurgerBtn from './BurgerBtn';
import Drawer from './Drawer';

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <BurgerBtn onClick={() => setIsOpen(true)} />
            <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}