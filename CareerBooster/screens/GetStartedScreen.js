import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { styles } from '../styles';

// Placeholder image - you should replace this with your actual image asset
const PlaceholderImage = require('../assets/play.png'); 

export default function GetStartedScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.centerContainer}> {/* Using centerContainer for overall centering */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        {/* Replace with your actual image component */}
        {/* <Image source={PlaceholderImage} style={{ width: 150, height: 150, marginBottom: 30 }} /> */}

        <Text style={[styles.aboutTitle, { marginBottom: 8 }]}>Let's Get Started</Text>
        <Text style={[styles.aboutText, { textAlign: 'center', marginBottom: 40 }]}>
          Sign Up Now And Enjoy Seamless Career Boosting Experience.
        </Text>

        <TouchableOpacity
          style={[styles.btn, styles.greenBtn, { marginBottom: 12, width: '100%' }]} // Added width: '100%' for full width buttons
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.btnText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.outlineBtn, { width: '100%' }]} // Added width: '100%' for full width buttons
          onPress={() => navigation.navigate('Login')}
        >
           <Text style={[styles.btnText, styles.outlineBtnText]}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
} 