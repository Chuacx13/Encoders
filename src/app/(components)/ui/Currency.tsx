"use client"
import { useState, useEffect } from 'react';

interface CurrencyProps {
    value?: string | number;
}

const Currency:React.FC<CurrencyProps> = ({ value }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }

    return ( 
        <p className="font-semibold">
            {(Number(value))} points
        </p>
    );
}

export default Currency;