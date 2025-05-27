import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const REQUIRED_SECTIONS = ['Summary', 'Experience', 'Education', 'Skills'];

export default function CVCompatibilityScreen() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const mockAnalyzeCV = () => {
    setLoading(true);
    setTimeout(() => {
      setResult({
        score: 78,
        missing: ['Summary', 'Projects'],
        suggestions: ['Add a professional summary.', 'Include a Projects section.']
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Ionicons name="document-text-outline" size={48} color="#0077B5" style={{ marginBottom: 16 }} />
      <Text style={styles.title}>CV Compatibility Check</Text>
      <Text style={styles.subtitle}>Check if your CV meets ATS standards and includes all necessary sections.</Text>
      <TouchableOpacity style={styles.button} onPress={mockAnalyzeCV} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Analyzing...' : 'Analyze My CV'}</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#0077B5" style={{ marginTop: 16 }} />}
      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Score: {result.score}%</Text>
          <Text style={styles.resultSubtitle}>Missing Sections:</Text>
          {result.missing.map((section, idx) => (
            <Text key={idx} style={styles.missingText}>- {section}</Text>
          ))}
          <Text style={styles.resultSubtitle}>Suggestions:</Text>
          {result.suggestions.map((s, idx) => (
            <Text key={idx} style={styles.suggestionText}>• {s}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f3f2ef',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#004c75',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0077B5',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0077B5',
    marginBottom: 8,
  },
  resultSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#004c75',
    marginTop: 12,
  },
  missingText: {
    color: '#e93445',
    fontSize: 15,
    marginLeft: 8,
  },
  suggestionText: {
    color: '#0077B5',
    fontSize: 15,
    marginLeft: 8,
  },
}); 