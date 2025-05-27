import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Text,
} from "react-native";
import { useAuth } from "../App";
import { API_BASE_URL } from "../config";
import { GreetingHeader } from "../components/GreetingHeader";
import { AnalysisCard } from "../components/AnalysisCard";
import { ProgressTracker } from "../components/ProgressTracker";

export default function HomeScreen() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [homeData, setHomeData] = useState(null);
  const [error, setError] = useState(null);

  const fetchHomeData = async () => {
    try {
      if (!user?.token) return;

      const response = await fetch(`${API_BASE_URL}/api/home`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch home data");
      }

      const data = await response.json();
      setHomeData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching home data:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, [user]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchHomeData();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E53935" />
        <Text style={styles.loadingText}>Loading your career data...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <GreetingHeader
        userName={user?.name}
        subtitle="Track your career progress"
      />

      {homeData?.userProgress && (
        <View style={styles.section}>
          <ProgressTracker {...homeData.userProgress} />
        </View>
      )}

      {homeData?.recentAnalyses && homeData.recentAnalyses.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Analysis</Text>
          </View>

          {homeData.recentAnalyses[0].strengths.map((strength, index) => (
            <AnalysisCard
              key={`strength-${index}`}
              title={strength.title}
              description={strength.description}
              icon={strength.icon}
              type="strength"
            />
          ))}

          {homeData.recentAnalyses[0].improvements.map((improvement, index) => (
            <AnalysisCard
              key={`improvement-${index}`}
              title={improvement.title}
              description={improvement.description}
              icon={improvement.icon}
              type="improvement"
            />
          ))}
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },

  loadingAnimation: {
    width: 200,
    height: 200,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  errorContainer: {
    margin: 20,
    padding: 15,
    backgroundColor: "#FFEBEE",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FFCDD2",
  },
  errorText: {
    color: "#D32F2F",
    fontSize: 14,
  },
});
