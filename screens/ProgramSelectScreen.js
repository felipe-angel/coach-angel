// screens/ProgramSelectScreen.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PROGRAMS } from '../lib/constants';
import colors from '../theme/colors';

export default function ProgramSelectScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Choose a Free Program</Text>
      {PROGRAMS.map(p => (
        <TouchableOpacity
          key={p.id}
          style={styles.card}
          onPress={() => navigation.navigate('ProgramDetail', { program: p })}
        >
          <LinearGradient colors={[colors.blue, colors.cyan]} style={styles.cardInner}>
            <Text style={styles.cardTitle}>{p.title}</Text>
            <Text style={styles.cardDesc}>{p.description}</Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
      <Text style={styles.disclaimer}>
        Educational purposes only. Not medical advice.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: colors.black },
  header: { color: colors.white, fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: { marginBottom: 16, borderRadius: 12, overflow: 'hidden' },
  cardInner: { padding: 16 },
  cardTitle: { color: colors.white, fontSize: 18, fontWeight: '600', marginBottom: 6 },
  cardDesc: { color: colors.lightGrey, fontSize: 14 },
  disclaimer: { marginTop: 30, color: colors.lightGrey, fontSize: 12, textAlign: 'center' },
});
