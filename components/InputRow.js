// components/InputRow.js
import React from 'react';
import { View, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';

export default function InputRow({ value, onChange, onSend, loading, placeholder }) {
  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder || 'Ask Coach...'}
        placeholderTextColor={colors.lightGrey}
        multiline
      />
      <TouchableOpacity
        onPress={onSend}
        style={[styles.btn, loading && styles.btnDisabled]}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={colors.black} />
        ) : (
          <Ionicons name="send" size={24} color={colors.black} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: colors.black,
  },
  input: {
    flex: 1,
    backgroundColor: colors.darkGrey,
    color: colors.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 8,
  },
  btn: {
    backgroundColor: colors.cyan,
    padding: 12,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDisabled: {
    opacity: 0.6,
  },
});
