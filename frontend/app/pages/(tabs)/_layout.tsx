// app/pages/(tabs)/_layout.tsx

import { Tabs } from 'expo-router';
// The import path is updated to point to the new components folder
import CustomTabBar from '../../components/CustomTabBar';

export default function TabLayout() {
  return (
    <Tabs
        // Tell the navigator to use our custom component
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
            headerShown: false, // We will build custom headers in each screen
        }}
    >
      {/* 
        The order you write them here is the order they will appear.
        1st: home, 2nd: ingredients, 3rd: settings
      */}
      <Tabs.Screen name="home" />
      <Tabs.Screen name="ingredients" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}