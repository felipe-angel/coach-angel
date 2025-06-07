// screens/MacroCalculatorScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ChatBubble    from '../components/ChatBubble';
import InputRow      from '../components/InputRow';
import colors        from '../theme/colors';
import { adjustMacroPlan } from '../lib/ai/openai';

const SYSTEM_PROMPT = `
You are "MacroMaster," a super-smart diet guru helping people get shredded and jacked!
…Always respond with a concise JSON containing keys: calories, protein, fats, carbs.
`;

export default function MacroCalculatorScreen() {
  const [weight, setWeight]   = useState('');
  const [goal, setGoal]       = useState('recomposition');
  const [activity, setActivity]= useState('moderate');

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsgs, setChatMsgs] = useState([
    { role: 'assistant', content: 'How can I help adjust your plan?' },
  ]);
  const [chatInput, setChatInput]   = useState('');
  const [chatLoading, setChatLoading]= useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    if (chatOpen) scrollRef.current?.scrollToEnd({ animated: true });
  }, [chatMsgs, chatOpen, chatLoading]);

  const calculateBase = () => {
    const w = parseFloat(weight) || 0;
    let cals = ({
      'aggressive cut': 10,
      cut:               12,
      recomposition:     15,
      'lean bulk':       16,
    }[goal] || 15) * w;

    cals += ({
      light:       -250,
      moderate:     0,
      active:     +150,
      'very active':+250,
    }[activity] || 0);

    const protRate = goal === 'aggressive cut' ? 1.3 : 1.15;
    const fatRate  = ({
      'aggressive cut': 0.3,
      cut:              0.5,
      recomposition:    0.6,
      'lean bulk':      0.65,
    }[goal] || 0.6);

    const protein = Math.round(w * protRate);
    const fats    = Math.round(w * fatRate);
    const carbCals= cals - protein * 4 - fats * 9;
    const carbs   = Math.max(0, Math.round(carbCals / 4));

    return { calories: Math.round(cals), protein, fats, carbs };
  };

  const handleCalculate = () => {
    setLoading(true);
    setChatOpen(false);
    setResults(null);
    setTimeout(() => {
      setResults(calculateBase());
      setLoading(false);
    }, 200);
  };

  const sendChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: 'user', content: chatInput.trim() };
    const updated = [...chatMsgs, userMsg];
    setChatMsgs(updated);
    setChatInput('');
    setChatLoading(true);

    try {
      const adjusted = await adjustMacroPlan({
        plan:     results,
        feedback: chatInput.trim(),
      });
      setResults(adjusted);
      setChatMsgs(prev => [
        ...prev,
        { role: 'assistant', content: JSON.stringify(adjusted) },
      ]);
    } catch (err) {
      setChatMsgs(prev => [
        ...prev,
        { role: 'assistant', content: `Error: ${err.message}` },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.form}>
        {/* Base calculator UI */}
        <Text style={styles.label}>Weight (lbs):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="150"
          placeholderTextColor={colors.lightGrey}
          value={weight}
          onChangeText={setWeight}
        />
        {/* … pickers, calculate button … */}
        <TouchableOpacity
          style={styles.calcBtn}
          onPress={handleCalculate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.cyan} />
          ) : (
            <LinearGradient
              colors={[colors.blue, colors.purple]}
              style={styles.calcGradient}
            >
              <Ionicons name="calculator" size={20} color={colors.white} />
              <Text style={styles.calcText}>Calculate</Text>
            </LinearGradient>
          )}
        </TouchableOpacity>

        {results && (
          <View style={styles.results}>
            {Object.entries(results).map(([lbl, val]) => (
              <View key={lbl} style={styles.card}>
                <Text style={styles.cardTitle}>{lbl}</Text>
                <Text style={styles.cardVal}>{typeof val === 'number' ? `${val}` : val}</Text>
              </View>
            ))}

            {!chatOpen && (
              <TouchableOpacity
                onPress={() => setChatOpen(true)}
                style={styles.openChatBtn}
              >
                <Text style={styles.openChatText}>Chat to Adjust Plan</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      {chatOpen && (
        <KeyboardAvoidingView
          style={styles.chatOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.select({ ios: 90, android: 70 })}
        >
          <ScrollView
            ref={scrollRef}
            style={styles.chatScroll}
            contentContainerStyle={styles.chatContent}
          >
            {chatMsgs.map((m,i) => (
              <ChatBubble key={i} role={m.role} text={m.content} />
            ))}
            {chatLoading && (
              <ActivityIndicator color={colors.cyan} style={{ margin: 8 }} />
            )}
          </ScrollView>
          <InputRow
            value={chatInput}
            onChange={setChatInput}
            onSend={sendChat}
            loading={chatLoading}
            placeholder="Type feedback…"
          />
        </KeyboardAvoidingView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  form:      { padding: 16 },
  label:     { color: colors.white, fontSize: 16, marginTop: 12 },
  input:     {
    backgroundColor: colors.darkGrey,
    color:      colors.white,
    borderRadius: 6,
    padding:    10,
    marginTop:  4,
  },
  calcBtn:     { marginTop: 20, alignItems: 'center' },
  calcGradient:{ flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 8 },
  calcText:    { color: colors.white, fontSize: 16, fontWeight: '600', marginLeft: 8 },
  results:     { marginTop: 24 },
  card:        { backgroundColor: colors.darkGrey, flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderRadius: 8, marginBottom: 10 },
  cardTitle:   { color: colors.white, fontSize: 16 },
  cardVal:     { color: colors.cyan, fontSize: 18, fontWeight: '700' },
  openChatBtn: { marginTop: 12, alignSelf: 'center' },
  openChatText:{ color: colors.blue, fontSize: 16 },

  // chat overlay
  chatOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.darkGrey, borderTopLeftRadius: 12, borderTopRightRadius: 12, maxHeight: '50%' },
  chatScroll:  { padding: 12 },
  chatContent: { paddingBottom: 10 },
});
