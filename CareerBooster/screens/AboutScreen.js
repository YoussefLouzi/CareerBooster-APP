import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from '../styles';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.aboutContainer}>
      <Text style={styles.aboutTitle}>About Career Booster</Text>
      
      <Text style={styles.aboutText}>
        Career Booster is your comprehensive career development companion, designed to help you create professional CVs, 
        improve your job search success, and enhance your skills through personalized course recommendations.
      </Text>

      <Text style={styles.sectionTitle}>Key Features:</Text>
      <Text style={styles.aboutText}>
        • Professional CV Generation{'\n'}
        • ATS Compatibility Check{'\n'}
        • Personalized Course Recommendations{'\n'}
        • Career Development Resources
      </Text>

      <Text style={styles.sectionTitle}>Our Mission:</Text>
      <Text style={styles.aboutText}>
        To empower professionals with the tools and resources they need to advance their careers and achieve their goals.
      </Text>

      <Text style={styles.sectionTitle}>Contact:</Text>
      <Text style={styles.aboutText}>
        For support or inquiries, please contact us at:{'\n'}
        support@careerbooster.com
      </Text>
    </ScrollView>
  );
} 