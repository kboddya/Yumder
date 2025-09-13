// app/pages/recipe-view-all.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Import FontAwesome for the icon

type Recipe = {
    id: string;
    name: string;
    image: any;
};

// --- MOCK DATA ---
const initialFavoriteRecipes: Recipe[] = [
    { id: '1', name: 'Spaghetti', image: require('../../../assets/images/spaghetti.jpg') },
    { id: '2', name: 'Vegetable Casserole', image: require('../../../assets/images/casserole.jpg') },
    { id: '3', name: 'Chicken Curry', image: require('../../../assets/images/curry.jpg') },
    { id: '4', name: 'Tacos', image: require('../../../assets/images/tacos.jpg') },
];

export default function RecipeViewAllScreen() {
    // MODIFIED: Manage recipes in state to allow for removal
    const [recipes, setRecipes] = useState(initialFavoriteRecipes);
    const [isEditing, setIsEditing] = useState(false);

    // Function to handle removing a recipe
    const handleRemoveRecipe = (id: string) => {
        setRecipes(currentRecipes => currentRecipes.filter(recipe => recipe.id !== id));
    };

    const renderRecipe = ({ item }: { item: Recipe }) => (
        <View style={styles.itemRow}>
            {/* The recipe details are now wrapped in a View to separate touch targets */}
            <TouchableOpacity
                style={styles.recipeTouchable}
                onPress={() => !isEditing && router.push({ // Disable navigation while editing
                    pathname: '/pages/recipe-details',
                    params: { id: item.id, name: item.name }
                })}
            >
                <Image source={item.image} style={styles.itemImage} />
                <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
            {/* The remove button only appears when isEditing is true */}
            {isEditing && (
                <TouchableOpacity onPress={() => handleRemoveRecipe(item.id)} style={styles.removeButton}>
                    <FontAwesome name="trash" size={24} color="#e53e3e" />
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Favorite Recipes',
                    headerStyle: { backgroundColor: '#f8f7f4' },
                    headerTitleStyle: { color: '#854d0e' },
                    headerTintColor: '#854d0e',
                    // MODIFIED: Added headerRight for the Edit/Done button
                    headerRight: () => (
                        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
                            <Text style={styles.headerButtonText}>{isEditing ? 'Done' : 'Edit'}</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <SafeAreaView style={styles.safeArea}>
                <FlatList
                    data={recipes} // Use the state variable here
                    renderItem={renderRecipe}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            </SafeAreaView>
        </>
    );
}

// STYLES UPDATED for the new functionality
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f8f7f4' },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Allows the trash icon to sit on the right
        paddingVertical: 15,
        paddingLeft: 20, // Adjust padding for a cleaner look
        paddingRight: 10,
        backgroundColor: '#fff'
    },
    recipeTouchable: { // New style for the tappable recipe area
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    itemText: { fontSize: 18, color: '#333' },
    itemImage: { width: 50, height: 50, borderRadius: 8, marginRight: 15, backgroundColor: '#f0f0f0' },
    separator: { height: 1, backgroundColor: '#f0f0f0', marginLeft: 85 }, // Indent separator
    headerButtonText: {
        color: '#854d0e',
        fontSize: 17,
        fontWeight: '600',
        marginRight: 10,
    },
    removeButton: {
        padding: 10, // Larger touch target for the trash icon
    },
});