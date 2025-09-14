import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import {GetIngredients, SetIngredients} from "@/app/services/StorageService";


interface IngredientsContextType {
    ingredients: string[];
    addIngredient: (name: string) => boolean; // Returns true on success, false on duplicate
    removeIngredient: (indexToRemove: number) => void;
}

const IngredientsContext = createContext<IngredientsContextType | undefined>(undefined);

export const IngredientsProvider = ({ children }: { children: ReactNode }) => {
    const [ingredients, setIngredients] = useState<string[]>([]);

    useEffect(() => {
        GetIngredients().then(res => {
            if (res) setIngredients(res);
        })
    }, [ingredients]);

    const removeIngredient = (indexToRemove: number) => {
        const filtered = ingredients.filter((_, index) => index !== indexToRemove);
        SetIngredients(filtered);
        setIngredients(filtered);
    };

    const addIngredient = (name: string): boolean => {
        const trimmedName = name.trim();
        const alreadyExists = ingredients.some(
            (ingredient) => ingredient.toLowerCase() === trimmedName.toLowerCase()
        );

        if (alreadyExists || trimmedName === '') {
            return false; // Indicate failure (duplicate or empty)
        }

        SetIngredients([trimmedName, ...ingredients]);
        setIngredients(currentIngredients => [trimmedName, ...currentIngredients]);
        return true; // Indicate success
    };

    return (
        <IngredientsContext.Provider value={{ ingredients, addIngredient, removeIngredient }}>
            {children}
        </IngredientsContext.Provider>
    );
};

// Create a custom hook to make it easy to use the context in our components.
export const useIngredients = () => {
    const context = useContext(IngredientsContext);
    if (context === undefined) {
        throw new Error('useIngredients must be used within an IngredientsProvider');
    }
    return context;
};