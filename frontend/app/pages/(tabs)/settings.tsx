// app/pages/(tabs)/settings.tsx

import React from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// --- TYPE DEFINITION ---
type SettingsRowProps = {
    icon: React.ComponentProps<typeof FontAwesome>['name'];
    label: string;
    onPress: () => void;
};

// --- REUSABLE COMPONENT ---
const SettingsRow = ({ icon, label, onPress }: SettingsRowProps) => (
    <TouchableOpacity style={styles.row} onPress={onPress}>
        <View style={styles.rowLeftContainer}>
            <View style={styles.iconContainer}><FontAwesome name={icon} size={20} color="#d97706" /></View>
            <Text style={styles.rowLabel}>{label}</Text>
        </View>
        <FontAwesome name="chevron-right" size={16} color="#888" />
    </TouchableOpacity>
);

// --- MAIN COMPONENT ---
export default function SettingsScreen() {
    const handleLogout = () => { Alert.alert("Log Out", "Are you sure you want to log out?", [{ text: "Cancel", style: "cancel" }, { text: "Log Out", onPress: () => router.replace('/pages/welcome'), style: "destructive" }]); };
    const handleDeleteAccount = () => { Alert.alert("Delete Account", "This action is permanent and cannot be undone.", [{ text: "Cancel", style: "cancel" }, { text: "Delete", onPress: () => router.replace('/pages/welcome'), style: "destructive" }]); };

    return (
        <ImageBackground style={styles.bgImage}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Settings</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        {/* --- ACCOUNT CARD --- */}
                        <View style={styles.card}>
                            <Text style={styles.sectionHeader}>Account</Text>
                            <SettingsRow icon="envelope-o" label="Email" onPress={() => router.push({ pathname: '/pages/settings/update-settings', params: { field: 'Email' } })} />
                            <View style={styles.separator} />
                            <SettingsRow icon="lock" label="Password" onPress={() => router.push({ pathname: '/pages/settings/update-settings', params: { field: 'Password' } })} />
                            <View style={styles.separator} />
                            <SettingsRow icon="trophy" label="Premium Status" onPress={() => router.push({ pathname: '/pages/settings/update-settings', params: { field: 'Subscription' } })} />
                        </View>
                        {/* --- GENERAL CARD --- */}
                        <View style={styles.card}>
                            <Text style={styles.sectionHeader}>General</Text>
                            <SettingsRow icon="bell-o" label="Notifications" onPress={() => router.push('/pages/settings/notifications-settings')} />
                            <View style={styles.separator} />
                            <SettingsRow icon="question-circle-o" label="Help & Support" onPress={() => router.push('/pages/settings/help-support')} />
                        </View>
                        {/* --- DANGER ZONE --- */}
                        <View style={styles.card}>
                            <TouchableOpacity style={styles.dangerButton} onPress={handleLogout}><FontAwesome name="sign-out" size={22} color="#ef4444" /><Text style={styles.dangerButtonText}>Log Out</Text></TouchableOpacity>
                            <View style={styles.separator} />
                            <TouchableOpacity style={styles.dangerButton} onPress={handleDeleteAccount}><FontAwesome name="trash-o" size={22} color="#ef4444" /><Text style={styles.dangerButtonText}>Delete Account</Text></TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
}

// --- STYLES (from your new design) ---
const styles = StyleSheet.create({
    bgImage: { flex: 1, backgroundColor: '#f8f7f4' },
    safeArea: { flex: 1 },
    header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 20 },
    headerTitle: { fontSize: 42, fontWeight: 'bold', color: '#854d0e' },
    contentContainer: { paddingHorizontal: 20 },
    card: { backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 20, marginBottom: 20, overflow: 'hidden' },
    sectionHeader: { fontSize: 14, fontWeight: '600', color: '#999', paddingHorizontal: 20, paddingTop: 15, paddingBottom: 10 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20 },
    rowLeftContainer: { flexDirection: 'row', alignItems: 'center' },
    iconContainer: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff7ed', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    rowLabel: { fontSize: 18, fontWeight: '500' },
    separator: { height: 1, backgroundColor: 'rgba(220, 220, 220, 0.5)' },
    dangerButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20 },
    dangerButtonText: { color: '#ef4444', fontSize: 18, fontWeight: '500', marginLeft: 15 },
});