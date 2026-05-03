import { ElementType } from 'react';

export type MenuLink = {
    label: string;
    href: string;
    icon: ElementType; 
};

export type MenuGroup = {
    title: string;
    links: MenuLink[];
};