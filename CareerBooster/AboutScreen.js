import React from 'react';
import { View, Text, StyleSheet, Linking, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Ionicons name="information-circle-outline" size={48} color="#0077B5" style={{ marginBottom: 16 }} />
      <Text style={styles.title}>About Career Booster</Text>
      <Text style={styles.mission}>Our mission is to empower job seekers to create outstanding CVs, improve their skills, and boost their careers with smart, modern tools.</Text>
      <Text style={styles.sectionTitle}>Features</Text>
      <Text style={styles.feature}>• CV Compatibility Check (ATS-ready)</Text>
      <Text style={styles.feature}>• Personalized Course Suggestions</Text>
      <Text style={styles.feature}>• CV Builder with Real-time Preview</Text>
      <Text style={styles.feature}>• Export CV as PDF/DOCX</Text>
      <Text style={styles.feature}>• Modern, accessible, and responsive design</Text>
      <Text style={styles.sectionTitle}>Contact & Credits</Text>
      <Text style={styles.contact}>Developed by the Career Booster Team</Text>
      <Text style={styles.contact}>Contact: <Text style={styles.link} onPress={() => Linking.openURL('mailto:contact@careerbooster.com')}>contact@careerbooster.com</Text></Text>
      <Text style={styles.contact}>GitHub: <Text style={styles.link} onPress={() => Linking.openURL('https://github.com/your-repo')}>github.com/your-repo</Text></Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f3f2ef',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#004c75',
    marginBottom: 8,
    textAlign: 'center',
  },
  mission: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0077B5',
    marginTop: 16,
    marginBottom: 8,
  },
  feature: {
    fontSize: 15,
    color: '#333',
    marginBottom: 4,
  },
  contact: {
    fontSize: 15,
    color: '#333',
    marginBottom: 4,
  },
  link: {
    color: '#0077B5',
    textDecorationLine: 'underline',
  },
}); 