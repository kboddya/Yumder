// app/pages/(tabs)/ingredients.tsx

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Image, Alert, ScrollView, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

// --- MOCK DATA ---
const fridgeIngredients = [
    { id: '1', name: 'Salad', icon: 'leaf' },
    { id: '2', name: 'Tomato', icon: 'apple-alt' },
    { id: '3', name: 'Cheese', icon: 'cheese' },
    { id: '4', name: 'Salmon', icon: 'fish' },
];
const favoriteRecipes = [
    { id: '1', name: 'Spaghetti', image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffitaliancook.com%2Fwp-content%2Fuploads%2F2024%2F07%2Fspaghetti-napoli-beitragsbild.jpg&f=1&nofb=1&ipt=a908289c380e8bbbae4d529e9236ca10c15abd79e3bf183ae1ba7ad194d62337' },
    { id: '2', name: 'Vegetable Casserole', image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.culinaryhill.com%2Fwp-content%2Fuploads%2F2018%2F01%2FCheesy-Vegetable-Casserole-Culinary-Hill-square.jpg&f=1&nofb=1&ipt=da3736ab2950e14d219358e0836d7e2d2ac621080785d1287568bf46b2046816' },
];

export default function IngredientsScreen() {
    const renderIngredient = ({ item }: { item: { name: string, icon: string } }) => (
        <View style={styles.itemRow}>
            <FontAwesome5 name={item.icon} size={20} color="#854d0e" style={styles.itemIcon} />
            <Text style={styles.itemText}>{item.name}</Text>
        </View>
    );
    const renderRecipe = ({ item }: { item: { name: string, image: string } }) => (
        <TouchableOpacity style={styles.itemRow}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <ImageBackground source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2Fe3%2Fa5%2Fd0%2Fe3a5d05f404c56afa57c023f4ba44612.jpg&f=1&nofb=1&ipt=2f59979f9de057207af679113cf98c3db3370328e5853bb167d0826af1c90d91' }} style={styles.bgImage}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {/* --- NEW FROSTED GLASS HEADER --- */}
                    <View style={styles.header}>
                        <View style={styles.headerCard}>
                            <Text style={styles.headerTitle}>My Kitchen</Text>
                        </View>
                    </View>

                    {/* --- "IN YOUR FRIDGE" CARD --- */}
                    <View style={styles.card}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>In Your Fridge</Text>
                            <TouchableOpacity onPress={() => router.push({ pathname: '/pages/view-all', params: { title: 'In Your Fridge' } })}>
                                <Text style={styles.viewAllText}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList data={fridgeIngredients} renderItem={renderIngredient} keyExtractor={item => item.id} scrollEnabled={false} ItemSeparatorComponent={() => <View style={styles.separator} />} />
                    </View>

                    {/* --- "FAVORITE RECIPES" CARD --- */}
                    <View style={styles.card}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Favorite Recipes</Text>
                            <TouchableOpacity onPress={() => router.push({ pathname: '/pages/view-all', params: { title: 'Favorite Recipes' } })}>
                                <Text style={styles.viewAllText}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList data={favoriteRecipes} renderItem={renderRecipe} keyExtractor={item => item.id} scrollEnabled={false} ItemSeparatorComponent={() => <View style={styles.separator} />} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    scrollContainer: {
        paddingBottom: 120, // Extra space at the bottom to not be hidden by the tab bar
    },
    header: {
        paddingTop: 70, // Generous padding to clear the notch/camera
        paddingHorizontal: 20,
        marginBottom: 20, // Creates space between header and first card
    },
    headerCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.90)', // Higher opacity for better readability
        borderRadius: 20,
        padding: 25,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    headerTitle: {
        fontSize: 38,
        fontWeight: 'bold',
        color: '#854d0e', // Dark, rich brown for high contrast
    },
    card: {
        marginHorizontal: 20,
        marginBottom: 20,
        // --- THE FROSTED GLASS EFFECT ---
        backgroundColor: 'rgba(255, 255, 255, 0.85)', // Semi-transparent white
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)', // Subtle white border
        overflow: 'hidden', // Ensures content respects the rounded corners
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 10,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    viewAllText: {
        fontSize: 14,
        color: '#d97706',
        fontWeight: '600',
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    itemIcon: {
        marginRight: 15,
        width: 20,
        textAlign: 'center',
    },
    itemText: {
        fontSize: 18,
        color: '#333',
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 15,
        backgroundColor: '#f0f0f0',
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(220, 220, 220, 0.5)', // Semi-transparent separator
        marginLeft: 60,
    },
});