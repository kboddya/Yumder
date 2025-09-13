// This is the corrected _layout.tsx file

import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Let's add icons back for a nicer look

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>

            {/* This is now the FIRST tab because it's written first. */}
            <Tabs.Screen
                name="home" // This links directly to your `home.tsx` file
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            
            <Tabs.Screen
                name="ingredients" // This links directly to your `ingredients.tsx` file
                options={{
                    title: 'Ingredients',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
            />

            {/* This is the SECOND tab because it's written second. */}
            <Tabs.Screen
                name="settings" // This links directly to your `settings.tsx` file
                options={{
                    title: 'Settings',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
            />

        </Tabs>
    );
}