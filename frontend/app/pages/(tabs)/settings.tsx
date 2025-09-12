// settings.tsx

// 1. --- IMPORTS ---
import React from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView } from 'react-native';
// We need 'router' to handle the navigation when the user logs out.
import { router } from 'expo-router';

// 2. --- THE COMPONENT ---
export default function SettingsScreen() {

  // A placeholder for the user's data.
  const user = {
    email: "hackathon.user@email.com",
  };

  // --- ACTIONS ---

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          onPress: () => {
            console.log("User logged out! Navigating to Auth screen...");
            // We use 'replace' to prevent the user from going "back" to the logged-in area.
            router.replace('/pages/welcome/Auth');
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action is permanent and cannot be undone. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete",
            onPress: () => {
                console.log("User account deleted!"),
                router.replace('/pages/welcome/Auth');
        },
         style: "destructive" }
      ]
    );
  };

  // 3. --- THE UI (What the User Sees) ---
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* --- Account Info Section --- */}
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Logged in as</Text>
          <Text style={styles.infoEmail}>{user.email}</Text>
        </View>

        {/* --- Actions Section --- */}
        {/* We use a View to group our action texts together */}
        <View style={styles.actionsSection}>
          <Text style={styles.actionText} onPress={handleLogout}>
            Log Out
          </Text>

          <Text style={styles.dangerActionText} onPress={handleDeleteAccount}>
            Delete Account
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

// 4. --- THE STYLES ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40, // More space after the title
  },
  infoSection: {
    marginBottom: 40,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoEmail: {
    fontSize: 20,
    marginTop: 5,
  },
  actionsSection: {
    marginTop: 'auto', // This is a clever trick to push this section to the bottom
    paddingBottom: 30,
  },
  actionText: {
    fontSize: 18,
    color: '#007AFF', // A standard blue color for links/actions
    paddingVertical: 15, // Makes the tappable area larger
    textAlign: 'center',
  },
  dangerActionText: {
    fontSize: 16,
    color: '#c53030', // A "danger" red color
    paddingVertical: 15, // Makes the tappable area larger
    textAlign: 'center',
    marginTop: 10,
  },
});