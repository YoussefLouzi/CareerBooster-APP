import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../App';
import { API_BASE_URL, MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from '../config';

export default function CheckCVScreen() {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [parsingError, setParsingError] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });
      
      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        file.type = 'application/pdf';
        setSelectedFile(file);
        await analyzeCV(file);
      } else {
        console.log('No file selected or picker cancelled');
      }
    } catch (err) {
      console.error('Error picking document:', err);
      Alert.alert('Error', 'Failed to pick document. Please try again.');
    }
  };

  const analyzeCV = async (file) => {
    setLoading(true);
    setAnalysis(null);
    setParsingError(null);
    setLoadingStep('Preparing file for upload...');

    try {
      if (file.size > MAX_FILE_SIZE) {
        throw new Error(`File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`);
      }

      const formData = new FormData();

      if (Platform.OS === 'web') {
        const response = await fetch(file.uri);
        const blob = await response.blob();
        const fileToUpload = new File([blob], file.name || 'document.pdf', {
          type: 'application/pdf'
        });
        formData.append('file', fileToUpload, fileToUpload.name);
      } else {
        formData.append('file', {
          uri: Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri,
          type: 'application/pdf',
          name: file.name || 'document.pdf'
        });
      }

      setLoadingStep('Uploading CV to server...');

      if (!user?.token) {
        throw new Error('Authentication token is missing. Please log in again.');
      }

      const uploadUrl = `${API_BASE_URL}/api/cv/upload?analysisType=general_analysis`;

      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        }
      });

      if (!response.ok) {
        const errorData = await response.text();
        if (response.status === 401) {
          throw new Error('Authentication failed. Please log in again.');
        } else if (response.status === 413) {
          throw new Error('File is too large. Please upload a smaller file.');
        } else if (response.status === 415) {
          throw new Error('Invalid file type. Please upload a PDF file.');
        } else {
          throw new Error(`Server error: ${response.status} - ${errorData}`);
        }
      }

      setLoadingStep('Processing CV content...');
      const data = await response.json();
      setAnalysis(data.recommendations);
    } catch (error) {
      console.error('Error analyzing CV:', error);
      setParsingError(error.message);
      Alert.alert('Error', error.message || 'Failed to analyze CV. Please try again.');
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  const renderScore = (score) => (
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreText}>{score}</Text>
      <Text style={styles.scoreLabel}>Overall Score</Text>
    </View>
  );

  const renderSection = (title, data) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Icon
          name={data.present ? 'checkmark-circle' : 'close-circle'}
          size={24}
          color={data.present ? '#4CAF50' : '#F44336'}
        />
        <Text style={styles.sectionTitle}>{title}</Text>
        {data.present && <Text style={styles.sectionScore}>{data.score}%</Text>}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analyze Your CV</Text>
        <Text style={styles.subtitle}>Get feedback and suggestions to improve your CV</Text>
      </View>

      <TouchableOpacity style={styles.uploadButton} onPress={pickDocument} disabled={loading}>
        <Icon name="cloud-upload-outline" size={24} color="#E53935" />
        <Text style={styles.uploadButtonText}>
          {loading ? 'Analyzing...' : (selectedFile ? selectedFile.name : 'Upload your CV (PDF)')}
        </Text>
      </TouchableOpacity>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E53935" />
          <Text style={styles.loadingText}>{loadingStep}</Text>
        </View>
      )}

      {parsingError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {parsingError}</Text>
        </View>
      )}

      {analysis && !loading && !parsingError && (
        <View style={styles.analysisContainer}>
          <Text style={styles.analysisTitle}>Analysis Results:</Text>
          <Text style={styles.analysisText}>{analysis}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E53935',
    borderRadius: 8,
    padding: 15,
    marginVertical: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  uploadButtonText: {
    marginLeft: 10,
    color: '#E53935',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 15,
  },
  analysisContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  analysisText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  errorContainer: {
    marginTop: 20,
    backgroundColor: '#FFEEEE',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#FFDDDD',
  },
  errorText: {
    fontSize: 16,
    color: '#D32F2F',
  },
  scoreContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#E53935',
  },
  scoreLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginVertical: 15,
  },
  section: {
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  sectionScore: {
    marginLeft: 'auto',
    color: '#666',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFF5F5',
    borderRadius: 8,
  },
  suggestionText: {
    marginLeft: 10,
    flex: 1,
    color: '#333',
  },
}); 