// settings.tsx

// 1. --- IMPORTS ---
import React from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';


// A reusable component for our list items to keep the code clean
const SettingsRow = ({ icon, label, onPress }: { icon: any; label: string; onPress: () => void }) => (
    <TouchableOpacity style={styles.row} onPress={onPress}>
        <View style={styles.rowLeftContainer}>
            <View style={styles.iconContainer}>
                <FontAwesome name={icon} size={20} color="#007AFF" />
            </View>
            <Text style={styles.rowLabel}>{label}</Text>
        </View>
        <FontAwesome name="chevron-right" size={16} color="#888" />
    </TouchableOpacity>
);


// 2. --- THE MAIN COMPONENT ---
export default function SettingsScreen() {

    // --- ACTION HANDLERS ---
    const handleNavigation = (screen: string) => {
        Alert.alert("Navigate", `This will take you to the ${screen} screen.`);
    };

    const handleLogout = () => {
        Alert.alert("Log Out", "Are you sure you want to log out?", [
            { text: "Cancel", style: "cancel" },
            { text: "Log Out", onPress: () => router.replace('/pages/welcome'), style: "destructive" }
        ]);
    };

    const handleDeleteAccount = () => {
        Alert.alert("Delete Account", "This action is permanent and cannot be undone.", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", onPress: () => router.replace('/pages/welcome'), style: "destructive" }
        ]);
    };

    // 3. --- THE UI (What the User Sees) ---
    return (
        // SafeAreaView ensures content doesn't go under the phone's notch or status bar.
        <SafeAreaView style={styles.safeArea}>

            {/* HEADER SECTION */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Settings</Text>
                <Text style={styles.headerSubtitle}>Account Information</Text>
            </View>

            {/* Use ScrollView in case the content becomes longer than the screen */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>

                {/* ACCOUNT CARD */}
                <View style={styles.card}>
                    <Text style={styles.sectionHeader}>Account</Text>
                    <SettingsRow
                        icon="user-o"
                        label="Username"
                        onPress={() => router.push({ pathname: '/pages/settings/update-settings', params: { field: 'Username' } })}
                    />
                    <View style={styles.separator} />
                    <SettingsRow
                    icon="lock"
                    label="Password"
                    onPress={() => router.push({ pathname: '/pages/settings/update-settings', params: { field: 'Password' } })}
                    />
                    <View style={styles.separator} />
                    <SettingsRow
                    icon="envelope-o"
                    label="Email"
                    onPress={() => router.push({ pathname: '/pages/settings/update-settings', params: { field: 'Email' } })}
                    />
                    <View style={styles.separator} />
                    <SettingsRow
                    icon="trophy"
                    label="Premium"
                    onPress={() => router.push({ pathname: '/pages/settings/update-settings', params: { field: 'Subscription' } })}
                    />
                </View>

                {/* GENERAL CARD */}
                <View style={styles.card}>
                    <Text style={styles.sectionHeader}>General</Text>
                    <SettingsRow
                    icon="bell-o"
                    label="Notifications"
                    onPress={() => router.push({ pathname: '/pages/settings/notifications-settings', params: { field: 'Notifications' } })}
                    />
                    <View style={styles.separator} />
                    <SettingsRow
                    icon="question-circle-o"
                    label="Help & Support"
                    onPress={() => router.push('/pages/settings/help-support')}
                    />
                </View>

                {/* DANGER ZONE CARD */}
                <View style={styles.card}>
                    <TouchableOpacity style={styles.dangerButton} onPress={handleLogout}>
                        <FontAwesome name="sign-out" size={22} color="#c53030" />
                        <Text style={styles.dangerButtonText}>Log Out</Text>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    <TouchableOpacity style={styles.dangerButton} onPress={handleDeleteAccount}>
                        <FontAwesome name="trash-o" size={22} color="#c53030" />
                        <Text style={styles.dangerButtonText}>Delete Account</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

// 4. --- THE STYLES (This is where the magic happens!) ---
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f4f7', // Light grey background for the whole screen
    },
    header: {
        backgroundColor: '#007AFF', // The vibrant blue from the design
        paddingHorizontal: 20,
        paddingVertical: 30,
        paddingTop: 50,
    },
    headerTitle: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#fff',
        marginTop: 4,
    },
    scrollContainer: {
        padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 20,
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Shadow for Android
        elevation: 3,
    },
    sectionHeader: {
        fontSize: 14,
        fontWeight: '600',
        color: '#999',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    rowLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20, // Makes it a perfect circle
        backgroundColor: '#eef5ff', // Light blue background for the icon
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    rowLabel: {
        fontSize: 18,
        fontWeight: '500',
    },
    separator: {
        height: 1,
        backgroundColor: '#f0f0f0', // Very light grey line
        marginLeft: 75, // Indent the separator to align with text
    },
    dangerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    dangerButtonText: {
        color: '#c53030', // A "danger" red color
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 15,
    },
});