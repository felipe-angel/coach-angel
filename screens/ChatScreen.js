// screens/ChatScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ChatBubble from '../components/ChatBubble';
import InputRow    from '../components/InputRow';
import colors      from '../theme/colors';
import { chatCompletion } from '../lib/ai/openai';

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '👋 Hi, I’m Coach. Let’s crush those fitness goals!' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages, loading]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      const assistantMsg = await chatCompletion(updated);
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: `⚠️ Error: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={[colors.black, colors.black]} style={styles.container}>
      <ScrollView
        ref={scrollRef}
        style={styles.messages}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((m,i) => (
          <ChatBubble key={i} role={m.role} text={m.content} />
        ))}
        {loading && <ActivityIndicator size="small" color={colors.cyan} style={styles.loader} />}
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <InputRow value={input} onChange={setInput} onSend={send} loading={loading} />
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1 },
  messages:       { flex: 1, padding: 16 },
  messagesContent:{ paddingBottom: 20 },
  loader:         { marginTop: 10 },
  inputContainer: {
    borderTopColor: '#222',
    borderTopWidth: 1,
  },
});
