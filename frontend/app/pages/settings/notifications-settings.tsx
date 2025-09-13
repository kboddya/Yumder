import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Switch } from 'react-native';
import { Stack } from 'expo-router';

const NotificationRow = ({ label, value, onValueChange }: { label: string; value: boolean; onValueChange: (newValue: boolean) => void }) => (
    <View style={styles.row}><Text style={styles.rowLabel}>{label}</Text><Switch trackColor={{ false: "#dcdcdc", true: "#fef3c7" }} thumbColor={value ? "#d97706" : "#f4f3f4"} onValueChange={onValueChange} value={value} /></View>
);

export default function NotificationsScreen() {
    const [recipeAlerts, setRecipeAlerts] = useState(true);
    const [favoriteAlerts, setFavoriteAlerts] = useState(true);
    const [accountAlerts, setAccountAlerts] = useState(false);

    return (
        <>
            <Stack.Screen options={{ title: "Notifications", headerStyle: { backgroundColor: '#f8f7f4' }, headerTitleStyle: { color: '#854d0e' } }} />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.headerTitle}>Manage Notifications</Text>
                    <View style={styles.card}>
                        <NotificationRow label="New Recipe Alerts" value={recipeAlerts} onValueChange={setRecipeAlerts} />
                        <View style={styles.separator} />
                        <NotificationRow label="Favorite Updates" value={favoriteAlerts} onValueChange={setFavoriteAlerts} />
                    </View>
                    <View style={styles.card}>
                        <NotificationRow label="Security Alerts" value={accountAlerts} onValueChange={setAccountAlerts} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f8f7f4' },
    container: { padding: 20 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#854d0e' },
    card: { backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 20, overflow: 'hidden' },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20 },
    rowLabel: { fontSize: 18, fontWeight: '500' },
    separator: { height: 1, backgroundColor: 'rgba(220, 220, 220, 0.5)', marginLeft: 20 },
});