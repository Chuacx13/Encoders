"use client"

import PreviewModal from '@/app/(components)/PreviewModal';
import { useEffect, useState } from 'react';

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if(!isMounted) {
        return null;
    }

    return <PreviewModal />
}
export default ModalProvider;