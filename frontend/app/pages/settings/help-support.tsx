// app/pages/help-support.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// --- MOCK DATA ---
// In a real app, this might come from an API.
const faqData = [
    {
        question: "How does Yumder find recipes?",
        answer: "Yumder uses a smart algorithm to match the ingredients you have in your fridge with a vast database of recipes from around the world. It prioritizes recipes you can make with the fewest missing ingredients."
    },
    {
        question: "Can I save my favorite recipes?",
        answer: "Absolutely! When you find a recipe you love, simply tap the heart icon to save it to your 'Favorites' tab. You can access your saved recipes at any time, even without an internet connection."
    }
];

// --- REUSABLE FAQ ITEM COMPONENT ---
// This component controls the drop-down logic for a single question.
const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
    // 'useState' gives this component its own memory.
    // 'isExpanded' remembers if the answer should be visible or not.
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        // This function flips the value of isExpanded (true to false, or false to true).
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={styles.faqContainer}>
            <TouchableOpacity style={styles.questionRow} onPress={toggleExpand}>
                <Text style={styles.questionText}>{question}</Text>
                {/* The icon changes based on the 'isExpanded' state */}
                <FontAwesome name={isExpanded ? 'chevron-up' : 'chevron-down'} size={16} color="#555" />
            </TouchableOpacity>

            {/* This is conditional rendering. The answer only appears if 'isExpanded' is true. */}
            {isExpanded && (
                <Text style={styles.answerText}>{answer}</Text>
            )}
        </View>
    );
};


// --- THE MAIN SCREEN COMPONENT ---
export default function HelpSupportScreen() {
    return (
        <>
            {/* This sets the title in the header bar */}
            <Stack.Screen options={{ title: "FAQ" }} />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.headerTitle}>Frequently Asked Questions</Text>

                    {/* We use .map() to create an FaqItem for each item in our data array */}
                    {faqData.map((item, index) => (
                        <FaqItem key={index} question={item.question} answer={item.answer} />
                    ))}
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
        marginBottom: 20,
        textAlign: 'center',
    },
    faqContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 15,
        padding: 20,
        // Shadow for a nice depth effect
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    questionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 18,
        fontWeight: '600',
        flex: 1, // Allows text to wrap if it's long
        marginRight: 10,
    },
    answerText: {
        fontSize: 16,
        color: '#555',
        marginTop: 15,
        lineHeight: 24, // Improves readability
    },
});