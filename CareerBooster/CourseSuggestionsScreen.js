import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const API_URL = 'http://localhost:8080/api/courses';
const categories = [
  'Data Science',
  'Business',
  'Programming',
  'Design',
  'Marketing',
  'Personal Development',
  'Health',
  'Language Learning',
];

export default function CourseSuggestionsScreen() {
  const [category, setCategory] = useState(categories[0]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBackendCourses = async (cat) => {
    setLoading(true);
    setError('');
    setCourses([]);
    try {
      const response = await fetch(`${API_URL}?category=${encodeURIComponent(cat)}`);
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      setCourses(data.elements || []);
    } catch (err) {
      setError('Could not fetch courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchBackendCourses(category);
  }, [category]);

  return (
    <View style={styles.container}>
      <Ionicons name="book-outline" size={48} color="#0077B5" style={{ marginBottom: 16 }} />
      <Text style={styles.title}>Course Suggestions</Text>
      <View style={styles.filters}>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={setCategory}
        >
          {categories.map(cat => <Picker.Item key={cat} label={cat} value={cat} />)}
        </Picker>
      </View>
      {loading && <ActivityIndicator size="large" color="#0077B5" style={{ marginTop: 16 }} />}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <FlatList
        data={courses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.courseCard}>
            <Ionicons name="school-outline" size={32} color="#0077B5" style={{ marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.courseTitle}>{item.name}</Text>
              <Text style={styles.courseProvider}>{item.partnerIds ? `Provider: ${item.partnerIds.join(', ')}` : ''}</Text>
              <Text style={styles.courseRating}>ID: {item.id}</Text>
            </View>
            <TouchableOpacity style={styles.viewButton} onPress={() => {
              if (item.slug) {
                const url = `https://www.coursera.org/learn/${item.slug}`;
                Alert.alert('Open Course', url);
              }
            }}>
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
          </View>
        )}
        style={{ width: '100%' }}
        ListEmptyComponent={!loading && <Text style={{ textAlign: 'center', color: '#86888A', marginTop: 24 }}>No courses found for this category.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  picker: {
    flex: 1,
    height: 40,
    marginHorizontal: 4,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#004c75',
  },
  courseProvider: {
    fontSize: 14,
    color: '#86888A',
    marginBottom: 4,
  },
  courseRating: {
    fontSize: 14,
    color: '#0077B5',
  },
  viewButton: {
    backgroundColor: '#0077B5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  error: {
    color: '#e93445',
    marginBottom: 12,
    textAlign: 'center',
  },
}); 