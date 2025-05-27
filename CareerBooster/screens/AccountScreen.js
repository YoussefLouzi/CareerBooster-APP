import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../App';
import { styles } from '../styles';

export default function AccountScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.centerContainer}>
      <Text style={styles.aboutTitle}>Account</Text>
      <Text style={styles.aboutText}>Welcome, {user?.name || 'User'}!</Text>
      <TouchableOpacity style={[styles.btn, { marginTop: 20 }]} onPress={logout}>
        <Text style={styles.btnText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
} 