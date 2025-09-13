// app/pages/view-all.tsx

    import React from 'react';
    import { View, Text, StyleSheet, SafeAreaView, FlatList, Image } from 'react-native';
    import { Stack, useLocalSearchParams } from 'expo-router';

    // --- MOCK DATA (This screen needs access to the data to display it) ---
    const fridgeIngredients = [
        { id: '1', name: 'Salad' },
        { id: '2', name: 'Tomato' },
        { id: '3', name: 'Cheese' },
        { id: '4', name: 'Salmon' },
        { id: '5', name: 'Chicken Breast' },
        { id: '6', name: 'Broccoli' },
    ];

    const favoriteRecipes = [
        { id: '1', name: 'Spaghetti', image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffitaliancook.com%2Fwp-content%2Fuploads%2F2024%2F07%2Fspaghetti-napoli-beitragsbild.jpg&f=1&nofb=1&ipt=a908289c380e8bbbae4d529e9236ca10c15abd79e3bf183ae1ba7ad194d62337' },
        { id: '2', name: 'Vegetable Casserole', image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.culinaryhill.com%2Fwp-content%2Fuploads%2F2018%2F01%2FCheesy-Vegetable-Casserole-Culinary-Hill-square.jpg&f=1&nofb=1&ipt=da3736ab2950e14d219358e0836d7e2d2ac621080785d1287568bf46b2046816' },
        { id: '3', name: 'Chicken Curry', image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkitchenofdebjani.com%2Fwp-content%2Fuploads%2F2023%2F04%2Feasy-indian-chicken-curry-Recipe-for-beginners-Debjanir-rannaghar.jpg&f=1&nofb=1&ipt=9628fba1e6a04ab897044c738d423a4f9b9f39f8cde5e0f46cb59ecbb269662b' },
        { id: '4', name: 'Tacos', image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flp-cms-production.imgix.net%2Fimage_browser%2Ftacos_mexico_G.jpg%3Fauto%3Dformat%26fit%3Dcrop%26q%3D40%26sharp%3D10%26vib%3D20%26ixlib%3Dreact-8.6.4&f=1&nofb=1&ipt=0c90c0c8c422cecdc6fbf0c8289a7b72c11618216577a44534f0e6010fd7d9a1' },
    ];


    export default function ViewAllScreen() {
        // Get the 'title' parameter we passed from the home screen
        const { title } = useLocalSearchParams();

        // --- Decide which data and which render function to use ---
        const isIngredients = title === 'In Your Fridge';
        const data = isIngredients ? fridgeIngredients : favoriteRecipes;

        // --- Reusable render functions from the home screen ---
        const renderIngredient = ({ item }: { item: { name: string } }) => (
            <View style={styles.itemRow}>
                <Text style={styles.itemText}>{item.name}</Text>
            </View>
        );

        const renderRecipe = ({ item }: { item: { name: string, image: string } }) => (
            <View style={styles.itemRow}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <Text style={styles.itemText}>{item.name}</Text>
            </View>
        );

        return (
            <>
                {/* Dynamically set the header title based on the parameter */}
                <Stack.Screen options={{ title: title as string }} />
                <SafeAreaView style={styles.safeArea}>
                    {isIngredients ? (
                    <FlatList
                        data={fridgeIngredients}
                        renderItem={renderIngredient}
                        keyExtractor={(item) => item.id}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                ) : (
                    <FlatList
                        data={favoriteRecipes}
                        renderItem={renderRecipe}
                        keyExtractor={(item) => item.id}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                )}
                </SafeAreaView>
            </>
        );
    }

    // --- STYLES (Reusing styles from our home screen for consistency) ---
    const styles = StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: '#fff',
        },
        itemRow: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 15,
            paddingHorizontal: 20,
        },
        itemText: {
            fontSize: 18,
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
            backgroundColor: '#f0f0f0',
            marginLeft: 20,
        },
    });