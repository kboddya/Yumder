import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
// 1. Import our custom hook
import { useIngredients } from '../../context/IngredientsContext';

export default function IngredientsViewAllScreen() {
    // 2. Get the shared data and functions from the context
    const { ingredients, addIngredient, removeIngredient } = useIngredients();
    
    // This local state is still needed for the UI logic of this screen
    const [isEditing, setIsEditing] = useState(false);
    const [newIngredient, setNewIngredient] = useState('');

    const handleAddIngredient = () => {
        // 3. Call the shared 'addIngredient' function from the context
        const success = addIngredient(newIngredient);
        if (success) {
            setNewIngredient(''); // Clear input only on success
        } else if (newIngredient.trim() !== '') {
            Alert.alert("Duplicate Ingredient", `"${newIngredient.trim()}" is already in your fridge.`);
        }
    };

    const renderIngredient = ({ item, index }: { item: string, index: number }) => (
        <View style={styles.itemRow}>
            <Text style={styles.itemText}>{item}</Text>
            {isEditing && (
                // 4. Call the shared 'removeIngredient' function from the context
                <TouchableOpacity onPress={() => removeIngredient(index)} style={styles.removeButton}>
                    <FontAwesome name="trash" size={24} color="#e53e3e" />
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'In My Fridge',
                    headerStyle: { backgroundColor: '#f8f7f4' },
                    headerTitleStyle: { color: '#854d0e' },
                    headerTintColor: '#854d0e',
                    headerRight: () => (
                        <View style={styles.headerButtons}>
                            <TouchableOpacity onPress={() => router.push('/pages/camera')} style={styles.headerButton}>
                                <FontAwesome name="camera" size={22} color="#854d0e" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setIsEditing(!isEditing)} style={styles.headerButton}>
                                <Text style={styles.headerButtonText}>{isEditing ? 'Done' : 'Edit'}</Text>
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
            <SafeAreaView style={styles.container}>
                {isEditing && (
                    <View style={styles.addSection}>
                        <TextInput
                            style={styles.input}
                            placeholder="Add new ingredient..."
                            placeholderTextColor="#999"
                            value={newIngredient}
                            onChangeText={setNewIngredient}
                            onSubmitEditing={handleAddIngredient}
                        />
                        <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
                            <Text style={styles.addButtonText}>ADD</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {/* 5. The FlatList automatically uses the always-up-to-date 'ingredients' from the context */}
                <FlatList
                    data={ingredients}
                    renderItem={renderIngredient}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    style={styles.list}
                />
            </SafeAreaView>
        </>
    );
}

// STYLES remain unchanged
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f7f4' }, list: { flex: 1, }, itemRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 18, paddingHorizontal: 20, backgroundColor: '#fff', }, itemText: { fontSize: 18, color: '#333', }, separator: { height: 1, backgroundColor: '#f0f0f0', marginLeft: 20, }, headerButtons: { flexDirection: 'row', alignItems: 'center', }, headerButton: { marginLeft: 20, }, headerButtonText: { color: '#854d0e', fontSize: 17, fontWeight: '600', }, removeButton: { padding: 5, }, addSection: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#e0e0e0', padding: 10, }, input: { flex: 1, fontSize: 18, paddingVertical: 10, paddingHorizontal: 5, color: '#333', }, addButton: { backgroundColor: '#854d0e', paddingHorizontal: 25, paddingVertical: 12, borderRadius: 8, justifyContent: 'center', }, addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16, },
});