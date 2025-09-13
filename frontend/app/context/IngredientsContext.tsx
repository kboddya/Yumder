import React, { createContext, useState, useContext, ReactNode } from 'react';

// This is the initial data, our single source of truth now.
const initialFridgeIngredients: string[] = [
    'Salad', 'Tomato', 'Cheese', 'Salmon', 'Chicken Breast', 'Broccoli'
];

// Define the shape of the data and functions our context will provide.
interface IngredientsContextType {
    ingredients: string[];
    addIngredient: (name: string) => boolean; // Returns true on success, false on duplicate
    removeIngredient: (indexToRemove: number) => void;
}

// Create the context.
const IngredientsContext = createContext<IngredientsContextType | undefined>(undefined);

// Create the Provider component. This component will wrap our app.
export const IngredientsProvider = ({ children }: { children: ReactNode }) => {
    const [ingredients, setIngredients] = useState<string[]>(initialFridgeIngredients);

    const removeIngredient = (indexToRemove: number) => {
        setIngredients(currentIngredients =>
            currentIngredients.filter((_, index) => index !== indexToRemove)
        );
    };

    const addIngredient = (name: string): boolean => {
        const trimmedName = name.trim();
        const alreadyExists = ingredients.some(
            (ingredient) => ingredient.toLowerCase() === trimmedName.toLowerCase()
        );

        if (alreadyExists || trimmedName === '') {
            return false; // Indicate failure (duplicate or empty)
        }

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