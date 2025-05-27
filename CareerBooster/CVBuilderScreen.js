import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const defaultSections = [
  { key: 'personal', label: 'Personal Information', placeholder: 'Name, Email, Phone' },
  { key: 'summary', label: 'Professional Summary', placeholder: 'Brief summary about you' },
  { key: 'experience', label: 'Work Experience', placeholder: 'List your jobs and roles' },
  { key: 'education', label: 'Education', placeholder: 'Your degrees and schools' },
  { key: 'skills', label: 'Skills', placeholder: 'Your skills' },
  { key: 'projects', label: 'Projects/Certifications', placeholder: 'Projects or certifications' },
];

export default function CVBuilderScreen() {
  const [sections, setSections] = useState(defaultSections.map(s => ({ ...s, content: '' })));
  const [customSections, setCustomSections] = useState([]);
  const [customTitle, setCustomTitle] = useState('');
  const [customContent, setCustomContent] = useState('');

  const addCustomSection = () => {
    if (customTitle && customContent) {
      setCustomSections([...customSections, { label: customTitle, content: customContent }]);
      setCustomTitle('');
      setCustomContent('');
    }
  };

  const updateSection = (idx, text) => {
    const newSections = [...sections];
    newSections[idx].content = text;
    setSections(newSections);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Ionicons name="create-outline" size={48} color="#0077B5" style={{ marginBottom: 16 }} />
      <Text style={styles.title}>CV Builder</Text>
      {sections.map((section, idx) => (
        <View key={section.key} style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>{section.label}</Text>
          <TextInput
            style={styles.input}
            placeholder={section.placeholder}
            value={section.content}
            onChangeText={text => updateSection(idx, text)}
            multiline
          />
        </View>
      ))}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionLabel}>Add Custom Section</Text>
        <TextInput
          style={styles.input}
          placeholder="Section Title"
          value={customTitle}
          onChangeText={setCustomTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Section Content"
          value={customContent}
          onChangeText={setCustomContent}
          multiline
        />
        <TouchableOpacity style={styles.addButton} onPress={addCustomSection}>
          <Text style={styles.addButtonText}>Add Section</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.previewTitle}>Real-time Preview</Text>
      <View style={styles.previewCard}>
        {sections.map((section, idx) => (
          section.content ? (
            <View key={idx} style={{ marginBottom: 8 }}>
              <Text style={styles.previewLabel}>{section.label}:</Text>
              <Text style={styles.previewContent}>{section.content}</Text>
            </View>
          ) : null
        ))}
        {customSections.map((section, idx) => (
          <View key={idx} style={{ marginBottom: 8 }}>
            <Text style={styles.previewLabel}>{section.label}:</Text>
            <Text style={styles.previewContent}>{section.content}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.exportButton}>
        <Ionicons name="download-outline" size={20} color="#fff" />
        <Text style={styles.exportButtonText}>Export as PDF/DOCX</Text>
      </TouchableOpacity>
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
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0077B5',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#f5f8fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dce0e6',
    padding: 10,
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
    minHeight: 40,
  },
  addButton: {
    backgroundColor: '#0077B5',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#004c75',
    marginTop: 16,
    marginBottom: 8,
  },
  previewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  previewLabel: {
    fontWeight: '600',
    color: '#0077B5',
  },
  previewContent: {
    color: '#333',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0077B5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 8,
  },
  exportButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
}); 