'use client'
import { createContext, useContext, useState } from "react";

type AlgoContextType = {
    section: string;
    algo: string | null;
    table: number[] | null;
    setAlgoContext: (data: {
        section: string;
        algo?: string;
        table?: number[] | any;
    }) => void;
};

const AlgoContext = createContext<AlgoContextType | null>(null);

export function AlgoProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState({
        section: "general",
        algo: null,
        table: null,
    });

    const setAlgoContext = (data: any) => {
        setState(prev => ({ ...prev, ...data }));
    };

    return (
        <AlgoContext.Provider value={{ ...state, setAlgoContext }}>
            {children}
        </AlgoContext.Provider>
    );
}

export function useAlgoContext() {
    const ctx = useContext(AlgoContext);
    if (!ctx) throw new Error("useAlgoContext must be used inside AlgoProvider");
    return ctx;
}
