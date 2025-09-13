// app/pages/notifications.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Switch } from 'react-native';
import { Stack } from 'expo-router';

// --- REUSABLE NOTIFICATION ROW COMPONENT ---
// This component will manage the display and interaction for a single notification setting.
const NotificationRow = ({ label, value, onValueChange }: { label: string; value: boolean; onValueChange: (newValue: boolean) => void }) => {
    return (
        <View style={styles.row}>
            <Text style={styles.rowLabel}>{label}</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }} // Colors for the switch track
                thumbColor={value ? "#007AFF" : "#f4f3f4"} // Color for the switch handle
                ios_backgroundColor="#3e3e3e"
                onValueChange={onValueChange} // Function to call when the switch is toggled
                value={value} // The current value (on or off) of the switch
            />
        </View>
    );
};


// --- THE MAIN SCREEN COMPONENT ---
export default function NotificationsScreen() {
    // We need a separate 'state' for each switch to remember its own on/off value.
    const [recipeAlerts, setRecipeAlerts] = useState(true);
    const [favoriteAlerts, setFavoriteAlerts] = useState(true);
    const [accountAlerts, setAccountAlerts] = useState(false);

    return (
        <>
            {/* Sets the title in the header bar */}
            <Stack.Screen options={{ title: "Notifications" }} />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.headerTitle}>Manage Notifications</Text>
                    <Text style={styles.headerSubtitle}>
                        Select which notifications you want to receive about your account and recipes.
                    </Text>

                    {/* --- RECIPE NOTIFICATIONS CARD --- */}
                    <View style={styles.card}>
                        <Text style={styles.sectionHeader}>Recipes</Text>
                        <NotificationRow
                            label="New Recipe Alerts"
                            value={recipeAlerts}
                            onValueChange={setRecipeAlerts} // Pass the 'setter' function to the component
                        />
                        <View style={styles.separator} />
                        <NotificationRow
                            label="Favorite Updates"
                            value={favoriteAlerts}
                            onValueChange={setFavoriteAlerts}
                        />
                    </View>

                    {/* --- ACCOUNT NOTIFICATIONS CARD --- */}
                    <View style={styles.card}>
                        <Text style={styles.sectionHeader}>Account</Text>
                        <NotificationRow
                            label="Security Alerts"
                            value={accountAlerts}
                            onValueChange={setAccountAlerts}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

// --- STYLES ---
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f4f7',
    },
    container: {
        padding: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 20,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    sectionHeader: {
        fontSize: 14,
        fontWeight: '600',
        color: '#999',
        paddingHorizontal: 20,
        paddingTop: 5,
        paddingBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    rowLabel: {
        fontSize: 18,
        fontWeight: '500',
    },
    separator: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginLeft: 20,
    },
});