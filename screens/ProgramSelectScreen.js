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
import { Ionicons } from '@expo/vector-icons';
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
          <LinearGradient colors={[colors.mint, colors.blue]} style={styles.cardInner}>
            <Ionicons
              name={p.id === 'cardio' ? 'bicycle' : p.id === 'powerlifting' ? 'trophy' : 'barbell'}
              size={20}
              color={colors.black}
              style={{ marginRight: 8 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{p.title}</Text>
              <Text style={styles.cardDesc}>{p.description}</Text>
            </View>
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
  header: { color: colors.white, fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { marginBottom: 16, borderRadius: 16, overflow: 'hidden' },
  cardInner: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16 },
  cardTitle: { color: colors.white, fontSize: 16, fontWeight: '600', marginBottom: 4 },
  cardDesc: { color: colors.lightGrey, fontSize: 12 },
  disclaimer: { marginTop: 30, color: colors.lightGrey, fontSize: 12, textAlign: 'center' },
});
