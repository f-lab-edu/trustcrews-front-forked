import {useEffect, useState} from "react";

export default function useModalPortalElement(isOpen:boolean){
    const [portalElement, setPortalElement] = useState<Element | null>(null);

    useEffect(() => {
        setPortalElement(document.getElementById('modal'));

        if (!isOpen) {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.overflowY = 'auto';

            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }, [isOpen]);
    
    return [portalElement, setPortalElement];
}