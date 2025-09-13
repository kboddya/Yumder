// app/pages/recipe-details.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

// Mock data for a single recipe's details
// In a real app, you would fetch this based on the ID passed in the params.
const getRecipeDetails = (id: string) => {
    return {
        id: id,
        name: 'Spaghetti Bolognese',
        // MODIFIED: Image is now a local asset loaded with require().
        // Make sure the relative path is correct for your project structure.
        image: require('../../../assets/images/spaghetti.jpg'),
        ingredients: [
            '500g spaghetti',
            '400g ground beef',
            '1 onion, chopped',
            '2 cloves garlic, minced',
            '800g canned crushed tomatoes',
            '2 tbsp olive oil',
            'Salt and pepper to taste'
        ],
        steps: [
            'Heat olive oil in a large pan over medium heat. Add chopped onion and cook until softened.',
            'Add minced garlic and ground beef. Cook until the beef is browned.',
            'Pour in the crushed tomatoes, season with salt and pepper. Simmer for at least 20 minutes.',
            'Meanwhile, cook the spaghetti according to package directions.',
            'Serve the sauce over the cooked spaghetti. Enjoy!'
        ]
    };
};

export default function RecipeDetailsScreen() {
    // MODIFIED: Removed 'image' from the params, as it's no longer passed.
    const { id, name } = useLocalSearchParams();
    const recipe = getRecipeDetails(id as string); // Fetch full details, including the local image

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView style={styles.container}>
                {/* MODIFIED: The source now uses the local image object from the recipe details */}
                <ImageBackground source={recipe.image} style={styles.headerImage}>
                    <View style={styles.headerOverlay}>
                        <Text style={styles.headerTitle}>{name as string}</Text>
                    </View>
                </ImageBackground>

                <View style={styles.contentContainer}>
                    {/* --- INGREDIENTS SECTION --- */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Ingredients</Text>
                        {recipe.ingredients.map((ingredient, index) => (
                            <Text key={index} style={styles.listItem}>•  {ingredient}</Text>
                        ))}
                    </View>

                    {/* --- PREPARATION SECTION --- */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Preparation Steps</Text>
                        {recipe.steps.map((step, index) => (
                            <View key={index} style={styles.stepItem}>
                                <Text style={styles.stepNumber}>{index + 1}</Text>
                                <Text style={styles.stepText}>{step}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

// STYLES remain unchanged
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f7f4',
    },
    headerImage: {
        width: '100%',
        height: 300,
        justifyContent: 'flex-end',
    },
    headerOverlay: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 20,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    contentContainer: {
        padding: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#854d0e',
    },
    listItem: {
        fontSize: 18,
        lineHeight: 28,
        color: '#333',
    },
    stepItem: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    stepNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#d97706',
        marginRight: 10,
    },
    stepText: {
        fontSize: 18,
        lineHeight: 28,
        color: '#333',
        flex: 1,
    },
});