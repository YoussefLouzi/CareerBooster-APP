import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const ProgressTracker = ({ 
  completedAnalyses,
  completedCourses,
  skillScore,
  lastAnalysisDate 
}) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Your Progress</Text>
      <Text style={styles.subtitle}>
        Last analysis: {new Date(lastAnalysisDate).toLocaleDateString()}
      </Text>
    </View>
    
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Icon name="document-text" size={24} color="#E53935" />
        <Text style={styles.statValue}>{completedAnalyses}</Text>
        <Text style={styles.statLabel}>Analyses</Text>
      </View>
      
      <View style={styles.statItem}>
        <Icon name="school" size={24} color="#E53935" />
        <Text style={styles.statValue}>{completedCourses}</Text>
        <Text style={styles.statLabel}>Courses</Text>
      </View>
      
      <View style={styles.statItem}>
        <Icon name="trophy" size={24} color="#E53935" />
        <Text style={styles.statValue}>{skillScore}</Text>
        <Text style={styles.statLabel}>Skill Score</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
}); 