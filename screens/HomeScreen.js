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
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} />
      <LinearGradient colors={[colors.black, colors.black]} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>CoachApp</Text>
          <Text style={styles.subtitle}>Your digital gym mirror</Text>
        </View>

        <View style={styles.buttonContainer}>
          {/* Free Programs */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Programs')}
            activeOpacity={0.8}
          >
            <LinearGradient colors={[colors.cyan, colors.blue]} style={styles.iconCircle}>
              <Ionicons name="list" size={28} color={colors.white} />
            </LinearGradient>
            <Text style={styles.cardTitle}>Free Programs</Text>
            <Text style={styles.cardSubtitle}>Hypertrophy, Powerlifting, Cardio</Text>
          </TouchableOpacity>

          {IS_PREMIUM && (
            <>
              {/* Chat with Coach */}
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('Chat')}
                activeOpacity={0.8}
              >
                <LinearGradient colors={[colors.blue, colors.cyan]} style={styles.iconCircle}>
                  <Ionicons name="chatbubbles-outline" size={28} color={colors.white} />
                </LinearGradient>
                <Text style={styles.cardTitle}>Chat with Coach</Text>
                <Text style={styles.cardSubtitle}>Instant AI Q&A</Text>
              </TouchableOpacity>

              {/* Workout Planner */}
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('Planner')}
                activeOpacity={0.8}
              >
                <LinearGradient colors={[colors.blue, colors.purple]} style={styles.iconCircle}>
                  <Ionicons name="barbell-outline" size={28} color={colors.white} />
                </LinearGradient>
                <Text style={styles.cardTitle}>Workout Planner</Text>
                <Text style={styles.cardSubtitle}>Generate custom plans</Text>
              </TouchableOpacity>

              {/* Macros & Calories */}
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('Macros')}
                activeOpacity={0.8}
              >
                <LinearGradient colors={[colors.cyan, colors.purple]} style={styles.iconCircle}>
                  <Ionicons name="calculator-outline" size={28} color={colors.white} />
                </LinearGradient>
                <Text style={styles.cardTitle}>Macros & Calories</Text>
                <Text style={styles.cardSubtitle}>Calculate your intake</Text>
              </TouchableOpacity>
            </>
          )}
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
  container:     { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'space-between' },
  header:        { alignItems: 'center', marginTop: 40 },
  title:         { color: colors.white, fontSize: 36, fontWeight: 'bold' },
  subtitle:      { color: colors.cyan, fontSize: 16, marginTop: 6 },
  buttonContainer:{ width: '100%', marginVertical: 20 },
  card:          {
    backgroundColor: colors.darkGrey,
    borderRadius:    12,
    padding:         20,
    marginVertical:  10,
    alignItems:      'center',
    shadowColor:     colors.white,
    shadowOffset:    { width: 0, height: 4 },
    shadowOpacity:   0.15,
    shadowRadius:    8,
    elevation:       5,
  },
  iconCircle:    {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardTitle:     { color: colors.white, fontSize: 18, fontWeight: '600' },
  cardSubtitle:  { color: colors.cyan, fontSize: 14, marginTop: 4 },
  footer:        { color: colors.white, fontSize: 14, marginBottom: 12 },
  disclaimer:    { color: colors.lightGrey, fontSize: 12, marginBottom: 24 },
});
