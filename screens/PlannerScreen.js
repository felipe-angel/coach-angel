// screens/PlannerScreen.js
import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import { generateWorkoutPlan } from '../lib/ai/openai';

const { width } = Dimensions.get('window');

export default function PlannerScreen() {
  const [goal, setGoal]         = useState('');
  const [days, setDays]         = useState('');
  const [duration, setDuration] = useState('');
  const [injuries, setInjuries] = useState('');
  const [plan, setPlan]         = useState(null);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const workout = await generateWorkoutPlan({
        goal,
        daysPerWeek:      parseInt(days, 10),
        durationMinutes:  parseInt(duration, 10),
        injuries: injuries
          .split(',')
          .map(i => i.trim())
          .filter(Boolean),
      });
      setPlan(workout);
    } catch (err) {
      setPlan({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient colors={[colors.blue, colors.purple]} style={styles.header}>
        <Text style={styles.headerText}>Generate Workout Plan</Text>
      </LinearGradient>

      <View style={styles.form}>
        <InputField label="Goal" value={goal} onChange={setGoal} placeholder="e.g. Strength" />
        <InputField label="Days per Week" value={days} onChange={setDays} placeholder="3" numeric />
        <InputField
          label="Session Duration (min)"
          value={duration}
          onChange={setDuration}
          placeholder="45"
          numeric
        />
        <InputField
          label="Injuries (comma-separated)"
          value={injuries}
          onChange={setInjuries}
          placeholder="e.g. Knee"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}
          activeOpacity={0.8}
        >
          <LinearGradient colors={[colors.cyan, colors.blue]} style={styles.buttonInner}>
            {loading ? (
              <ActivityIndicator color={colors.white} style={{ marginRight: 8 }} />
            ) : (
              <Ionicons name="play" size={20} color={colors.white} style={{ marginRight: 8 }} />
            )}
            <Text style={styles.buttonText}>
              {loading ? 'Generating…' : 'Generate Plan'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {plan && (
        <View style={styles.result}>
          {plan.error ? (
            <Text style={styles.error}>{plan.error}</Text>
          ) : (
            Object.entries(plan).map(([day, exercises]) => (
              <View key={day} style={styles.card}>
                <Text style={styles.dayTitle}>{day}</Text>
                {exercises.map((ex,i) => (
                  <Text key={i} style={styles.exercise}>
                    ⦁ {ex.name}
                    {ex.reps ? `: ${ex.reps}` : ex.duration ? ` (${ex.duration})` : ''}
                  </Text>
                ))}
              </View>
            ))
          )}
        </View>
      )}
    </ScrollView>
  );
}

function InputField({ label, value, onChange, placeholder, numeric }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.cyan}
        keyboardType={numeric ? 'numeric' : 'default'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { padding: 20, backgroundColor: colors.black, paddingBottom: 40 },
  header:      { padding: 30, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
  headerText:  { color: colors.white, fontSize: 22, fontWeight: 'bold' },
  form:        { marginBottom: 16 },
  inputGroup:  { marginBottom: 16 },
  label:       { color: colors.white, fontSize: 14, marginBottom: 6 },
  input:       { backgroundColor: colors.darkGrey, color: colors.white, padding: 12, borderRadius: 8, fontSize: 16 },
  button:      { alignItems: 'center', marginTop: 10 },
  buttonInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 8, width: width * 0.6 },
  buttonText:  { color: colors.white, fontSize: 16, fontWeight: '600' },
  result:      { marginTop: 20 },
  card:        { backgroundColor: colors.darkGrey, padding: 16, borderRadius: 8, marginBottom: 14 },
  dayTitle:    { color: colors.cyan, fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  exercise:    { color: colors.white, fontSize: 14, marginVertical: 2 },
  error:       { color: colors.error, textAlign: 'center', fontSize: 16, marginVertical: 20 },
});
