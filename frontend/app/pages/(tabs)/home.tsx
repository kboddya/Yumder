// app/(tabs)/home.tsx

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Stack} from 'expo-router';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
            <Text>This is the main screen of the app.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});