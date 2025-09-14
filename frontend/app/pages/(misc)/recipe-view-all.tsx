// app/pages/recipe-view-all.tsx

import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Image,
    TouchableOpacity,
    Modal,
    ScrollView,
    ImageBackground
} from 'react-native';
import {Stack, router} from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Import FontAwesome for the icon
import {card} from "@/app/entitis/card";
import {GetFavoriteRecepts} from "@/app/services/StorageService";
import {RemoveFavoriteRecepts} from "../../services/StorageService";

export default function RecipeViewAllScreen() {
    // MODIFIED: Manage recipes in state to allow for removal
    const [recipes, setRecipes] = useState<card[]>([]);
    const [isEditing, setIsEditing] = useState(false);

    GetFavoriteRecepts().then(data => {
        if (data) setRecipes(data);
    })

    const [modalVisible, setModalVisible] = useState(false);
    const [item, setItem] = useState<card | undefined>(undefined);


    // Function to handle removing a recipe
    const handleRemoveRecipe = (item: card) => {
        RemoveFavoriteRecepts(item)
    };

    const renderRecipe = ({item}: { item: card }) => (
        <View style={styles.itemRow}>
            {/* The recipe details are now wrapped in a View to separate touch targets */}
            <TouchableOpacity
                style={styles.recipeTouchable}
                onPress={() => {
                    !isEditing
                    setItem(item)
                    setModalVisible(true)
                }}
            >
                <Image source={{uri: item.url_to_picture}} style={styles.itemImage}/>
                <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
            {/* The remove button only appears when isEditing is true */}
            {isEditing && (
                <TouchableOpacity onPress={() => handleRemoveRecipe(item)} style={styles.removeButton}>
                    <FontAwesome name="trash" size={24} color="#e53e3e"/>
                </TouchableOpacity>
            )}
        </View>
    );

    if (modalVisible) {
        return (
            <>
                <Stack.Screen options={{headerShown: false}}/>
                <ScrollView style={stylesModal.container}>
                    {/* MODIFIED: The source now uses the local image object from the recipe details */}
                    <ImageBackground source={{uri: item?.url_to_picture}} style={stylesModal.headerImage}>
                        <View style={stylesModal.headerOverlay}>
                            <Text style={stylesModal.headerTitle}>{item?.name}</Text>
                        </View>
                    </ImageBackground>

                    <View style={stylesModal.contentContainer}>
                        {/* --- INGREDIENTS SECTION --- */}
                        <View style={stylesModal.section}>
                            <Text style={stylesModal.sectionTitle}>Ingredients</Text>
                            <Text style={stylesModal.listItem}>{item?.ingredients}</Text>
                        </View>

                        {/* --- PREPARATION SECTION --- */}
                        <View style={stylesModal.section}>
                            <Text style={stylesModal.sectionTitle}>Preparation Steps</Text>
                            <Text style={stylesModal.stepText}>{item?.instructions}</Text>
                        </View>
                    </View>
                </ScrollView>
            </>)
    } else {
        return (
            <>
                <Stack.Screen
                    options={{
                        title: 'Favorite Recipes',
                        headerStyle: {backgroundColor: '#f8f7f4'},
                        headerTitleStyle: {color: '#854d0e'},
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
                        keyExtractor={(item, i) => i.toString()}
                        ItemSeparatorComponent={() => <View style={styles.separator}/>}
                    />
                </SafeAreaView>
            </>
        );
    }
}

// STYLES UPDATED for the new functionality
const styles = StyleSheet.create({
    safeArea: {flex: 1, backgroundColor: '#f8f7f4'},
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
    itemText: {fontSize: 18, color: '#333'},
    itemImage: {width: 50, height: 50, borderRadius: 8, marginRight: 15, backgroundColor: '#f0f0f0'},
    separator: {height: 1, backgroundColor: '#f0f0f0', marginLeft: 85}, // Indent separator
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

const stylesModal = StyleSheet.create({
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
