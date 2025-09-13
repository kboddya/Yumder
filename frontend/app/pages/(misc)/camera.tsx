// app/pages/camera.tsx

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';

export default function CameraScreen() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Scan Ingredients',
                    headerStyle: { backgroundColor: '#f8f7f4' },
                    headerTitleStyle: { color: '#854d0e' },
                    headerTintColor: '#854d0e',
                }}
            />
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.text}>Camera Page</Text>
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f7f4',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        color: '#333',
    },
});