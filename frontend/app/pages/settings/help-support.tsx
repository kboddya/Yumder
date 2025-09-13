import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const faqData = [ { question: "How does Yumder find recipes?", answer: "Yumder uses a smart algorithm to match the ingredients you have..." }, { question: "Can I save my favorite recipes?", answer: "Absolutely! Simply tap the heart icon to save it to your 'Favorites' tab." } ];

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <View style={styles.card}><TouchableOpacity style={styles.questionRow} onPress={() => setIsExpanded(!isExpanded)}><Text style={styles.questionText}>{question}</Text><FontAwesome name={isExpanded ? 'chevron-up' : 'chevron-down'} size={16} color="#555" /></TouchableOpacity>{isExpanded && (<Text style={styles.answerText}>{answer}</Text>)}</View>
    );
};

export default function HelpSupportScreen() {
    return (
        <>
            <Stack.Screen options={{ title: "Help & Support", headerStyle: { backgroundColor: '#f8f7f4' }, headerTitleStyle: { color: '#854d0e' } }} />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.headerTitle}>Frequently Asked Questions</Text>
                    {faqData.map((item, index) => (<FaqItem key={index} question={item.question} answer={item.answer} />))}
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f8f7f4' },
    container: { padding: 20 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#854d0e' },
    card: { backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 20, marginBottom: 15, padding: 20 },
    questionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    questionText: { fontSize: 18, fontWeight: '600', flex: 1, marginRight: 10 },
    answerText: { fontSize: 16, color: '#555', marginTop: 15, lineHeight: 24 },
});