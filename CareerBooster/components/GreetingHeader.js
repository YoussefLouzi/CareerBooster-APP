import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const GreetingHeader = ({ userName, subtitle }) => (
  <View style={styles.header}>
    <Text style={styles.greeting}>
      Welcome back, {userName || 'User'}!
    </Text>
    <Text style={styles.subtitle}>
      {subtitle || "Let's boost your career today"}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
}); 