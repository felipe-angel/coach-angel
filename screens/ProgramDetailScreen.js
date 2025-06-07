// screens/ProgramDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../theme/colors';

export default function ProgramDetailScreen({ route }) {
  const { program } = route.params;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={[colors.blue, colors.cyan]} style={styles.header}>
        <Text style={styles.title}>{program.title}</Text>
      </LinearGradient>
      <Text style={styles.text}>{program.description}</Text>
      <Text style={styles.text}>Week-by-week plan coming soon.</Text>
      <Text style={styles.disclaimer}>
        Educational purposes only. Not medical advice.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: colors.black },
  header: { padding: 20, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
  title: { color: colors.white, fontSize: 22, fontWeight: 'bold' },
  text: { color: colors.lightGrey, fontSize: 16, marginBottom: 10 },
  disclaimer: { marginTop: 20, color: colors.lightGrey, fontSize: 12, textAlign: 'center' },
});
