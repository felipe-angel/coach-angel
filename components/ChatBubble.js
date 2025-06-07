// components/ChatBubble.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function ChatBubble({ role, text }) {
  const isUser = role === 'user';
  return (
    <View style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}>
      <Text style={[styles.bubbleText, isUser ? styles.userText : styles.botText]}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: '75%',
    borderRadius: 12,
    marginVertical: 6,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.blue,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: colors.darkGrey,
  },
  bubbleText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: colors.white,
  },
  botText: {
    color: colors.lightGrey,
  },
});
