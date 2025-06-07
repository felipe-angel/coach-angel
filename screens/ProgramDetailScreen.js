// screens/ProgramDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../theme/colors';

export default function ProgramDetailScreen({ route }) {
  const { program } = route.params;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={[colors.blue, colors.purple]} style={styles.header}>
        <Text style={styles.title}>{program.title}</Text>
      </LinearGradient>
      <View style={styles.contentBox}>
        <Text style={styles.text}>{program.description}</Text>
        <Text style={styles.text}>Week-by-week plan coming soon.</Text>
        <Text style={styles.disclaimer}>
          Educational purposes only. Not medical advice.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: colors.black },
  header: { padding: 24, borderRadius: 16, alignItems: 'center', marginBottom: 20 },
  title: { color: colors.white, fontSize: 24, fontWeight: 'bold' },
  contentBox: { backgroundColor: colors.darkGrey, borderRadius: 16, padding: 20 },
  text: { color: colors.lightGrey, fontSize: 16, marginBottom: 10 },
  disclaimer: { marginTop: 20, color: colors.lightGrey, fontSize: 12, textAlign: 'center' },
});
