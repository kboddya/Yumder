import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Image, ScrollView} from 'react-native';
import {router} from 'expo-router';
// 1. Import our custom hook
import {useIngredients} from '../../context/IngredientsContext';
import {GetFavoriteRecepts} from "@/app/services/StorageService";
import {card} from "@/app/entitis/card";

export default function IngredientsScreen() {
    // 2. Get the shared ingredients list from the context
    const {ingredients} = useIngredients();

    // 3. The preview list is now dynamically created from the shared, up-to-date state
    const fridgeIngredientsPreview = ingredients.slice(0, 4);

    const renderIngredient = ({item}: { item: string }) => (
        <View style={styles.itemRow}>
            <Text style={styles.itemText}>{item}</Text>
        </View>
    );


    const renderRecipe = ({item}: { item: card }) => (
        <TouchableOpacity
            style={styles.itemRow}
        >
            <Image source={item.url_to_picture || ""} style={styles.itemImage}/>
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const [favoriteRecipes, setFavoriteRecipes] = React.useState<card[]>([]);

    GetFavoriteRecepts().then(data => {
        if (data) setFavoriteRecipes(data.slice(0, 2));
    })

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* --- HEADER --- */}
                <View style={styles.header}>
                    <View style={styles.headerCard}>
                        <Text style={styles.headerTitle}>My Kitchen</Text>
                    </View>
                </View>

                {/* --- "IN YOUR FRIDGE" CARD --- */}
                <View style={styles.card}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>In My Fridge</Text>
                        <TouchableOpacity onPress={() => router.push('/pages/ingredients-view-all')}>
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={fridgeIngredientsPreview} // This now reflects the true state
                        renderItem={renderIngredient}
                        keyExtractor={(item, index) => index.toString()}
                        scrollEnabled={false}
                        ItemSeparatorComponent={() => <View style={styles.separator}/>}
                    />
                </View>

                {/* --- "FAVORITE RECIPES" CARD --- */}
                <View style={styles.card}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Favorite Recipes</Text>
                        <TouchableOpacity onPress={() => router.push('/pages/recipe-view-all')}>
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList data={favoriteRecipes} renderItem={renderRecipe}
                              keyExtractor={(item, i) => i.toString()} scrollEnabled={false}
                              ItemSeparatorComponent={() => <View style={styles.separator}/>}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// --- STYLES (No changes needed) ---
const styles = StyleSheet.create({
    safeArea: {flex: 1, backgroundColor: '#f5f5ff5'},
    scrollContainer: {paddingBottom: 120},
    header: {paddingTop: 70, paddingHorizontal: 20, marginBottom: 20},
    headerCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.90)',
        borderRadius: 20,
        padding: 25,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)'
    },
    headerTitle: {fontSize: 38, fontWeight: 'bold', color: '#854d0e'},
    card: {
        marginHorizontal: 20,
        marginBottom: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        overflow: 'hidden'
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 10
    },
    sectionTitle: {fontSize: 22, fontWeight: 'bold', color: '#333'},
    viewAllText: {fontSize: 14, color: '#d97706', fontWeight: '600'},
    itemRow: {flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20},
    itemText: {fontSize: 18, color: '#333'},
    itemImage: {width: 50, height: 50, borderRadius: 8, marginRight: 15, backgroundColor: '#f0f0f0'},
    separator: {height: 1, backgroundColor: 'rgba(220, 220, 220, 0.5)', marginLeft: 20,},
});
