// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { useLocalSearchParams, Stack } from 'expo-router'; // <-- Import the hook and Stack

// export default function UpdateAccountScreen() {
//   // Use the hook to get the parameters
//   const { field } = useLocalSearchParams();

//   return (
//     <>
//       {/* This component lets us customize the header */}
//       <Stack.Screen
//         options={{
//           title: `${field} options`, // Set the header title dynamically
//           headerBackTitle: 'Settings', // Change the text next to the back arrow
//         }}
//       />
//       <View style={styles.container}>
//         <Text style={styles.title}>These are the {field} options</Text>
//         {/* Here you would add an input field and a save button */}
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f4f7',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
// });

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';

export default function UpdateAccountScreen() {
  const { field } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ title: `Update ${field}`, headerStyle: { backgroundColor: '#f8f7f4' }, headerTitleStyle: { color: '#854d0e' } }} />
      <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <Text style={styles.title}>Update Your {field as string}</Text>
            <Text style={styles.subtitle}>Input fields will go here.</Text>
          </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f8f7f4' },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#854d0e' },
    subtitle: { fontSize: 16, color: '#a16207' },
});