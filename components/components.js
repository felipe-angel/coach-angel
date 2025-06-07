//components.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function ChatBubble({ role, text }) {
  return (
    <Text style={[styles.bubble, role==='user'?styles.user:styles.bot]}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  bubble: {
    padding: 8,
    borderRadius: 6,
    marginVertical: 4,
    maxWidth: '80%',
  },
  user: { alignSelf: 'flex-end', backgroundColor: '#DCF8C6' },
  bot:  { alignSelf: 'flex-start', backgroundColor: '#eee' },
});
