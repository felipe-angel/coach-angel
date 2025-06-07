// screens/HomeScreen.js
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import { IS_PREMIUM } from '../lib/constants';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const features = [
    {
      id: 'programs',
      icon: 'list',
      title: 'Free Programs',
      subtitle: 'Hypertrophy, Powerlifting, Cardio',
      colors: [colors.mint, colors.blue],
      onPress: () => navigation.navigate('Programs'),
    },
    ...(IS_PREMIUM
      ? [
          {
            id: 'chat',
            icon: 'chatbubbles-outline',
            title: 'Chat with Coach',
            subtitle: 'Instant AI Q&A',
            colors: [colors.purple, colors.pink],
            onPress: () => navigation.navigate('Chat'),
          },
          {
            id: 'planner',
            icon: 'barbell-outline',
            title: 'Workout Planner',
            subtitle: 'Generate custom plans',
            colors: [colors.blue, colors.purple],
            onPress: () => navigation.navigate('Planner'),
          },
          {
            id: 'macros',
            icon: 'calculator-outline',
            title: 'Macros & Calories',
            subtitle: 'Calculate your intake',
            colors: [colors.mint, colors.purple],
            onPress: () => navigation.navigate('Macros'),
          },
        ]
      : []),
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} />
      <LinearGradient colors={[colors.purple, colors.black]} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>CoachApp</Text>
          <Text style={styles.subtitle}>Your digital gym mirror</Text>
        </View>

        <View style={styles.buttonContainer}>
          {features.map(feat => (
            <TouchableOpacity
              key={feat.id}
              style={styles.card}
              onPress={feat.onPress}
              activeOpacity={0.85}
            >
              <LinearGradient colors={feat.colors} style={styles.iconCircle}>
                <Ionicons name={feat.icon} size={26} color={colors.black} />
              </LinearGradient>
              <Text style={styles.cardTitle}>{feat.title}</Text>
              <Text style={styles.cardSubtitle}>{feat.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {!IS_PREMIUM && (
          <Text style={styles.disclaimer}>Upgrade to Premium to unlock AI chat and more.</Text>
        )}
        <Text style={styles.footer}>Start your transformation</Text>
        <Text style={styles.disclaimer}>Not medical advice. For education only.</Text>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:      { flex: 1, backgroundColor: colors.black },
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: { alignItems: 'center', marginTop: 40 },
  title: { color: colors.white, fontSize: 38, fontWeight: 'bold' },
  subtitle: { color: colors.cyan, fontSize: 16, marginTop: 6 },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  card: {
    width: width * 0.44,
    backgroundColor: colors.darkGrey,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cardTitle: { color: colors.white, fontSize: 16, fontWeight: '600', textAlign: 'center' },
  cardSubtitle: { color: colors.cyan, fontSize: 12, marginTop: 2, textAlign: 'center' },
  footer: { color: colors.white, fontSize: 14, marginBottom: 12 },
  disclaimer: { color: colors.lightGrey, fontSize: 12, marginBottom: 24, textAlign: 'center' },
});
