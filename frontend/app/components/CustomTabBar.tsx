// app/components/CustomTabBar.tsx

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
// To get the correct types, you may need to install this package: npm install @react-navigation/bottom-tabs
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

// This is a mapping of route names to their icon names. It's cleaner than multiple 'if' statements.
const iconMap: { [key: string]: React.ComponentProps<typeof FontAwesome>['name'] } = {
    home: 'home',
    ingredients: 'cutlery',
    settings: 'cog',
};

// We apply the 'BottomTabBarProps' type here. This fixes all the "any" errors inside.
export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    return (
        <View style={styles.tabBarContainer}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                // Look up the correct icon name from our map
                const iconName = iconMap[route.name] || 'circle'; // Fallback to a circle icon if not found

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        onPress={onPress}
                        style={styles.tabItem}
                    >
                        <FontAwesome name={iconName} size={22} color={isFocused ? '#d97706' : '#a3a3a3'} />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

// Styles are perfect, no changes needed here.
const styles = StyleSheet.create({
    tabBarContainer: {
        position: 'absolute', bottom: 25, left: 20, right: 20,
        flexDirection: 'row', backgroundColor: '#ffffff', borderRadius: 30,
        height: 60, justifyContent: 'space-around', alignItems: 'center',
        shadowColor: "#000", shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1, shadowRadius: 10, elevation: 10,
    },
    tabItem: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
    },
});