import {useEffect, useRef, useState} from "react";

export default function useDropdownState(){
    const [openDropdown, setOpenDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleDocumentClick = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setOpenDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => document.removeEventListener('click', handleDocumentClick);
    }, []);


    return {openDropdown, setOpenDropdown, dropdownRef};
}