import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
  Linking,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth } from "../App";
import { API_BASE_URL, MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from "../config";

export default function CoursesScreen() {
  const { user, logout } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [parsingError, setParsingError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const logDebug = (message, data = null) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}${
      data ? "\nData: " + JSON.stringify(data, null, 2) : ""
    }`;
    console.log(logMessage);
    setDebugInfo((prev) => (prev ? prev + "\n" + logMessage : logMessage));
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          logout();
        },
      },
    ]);
  };

  const pickDocument = async () => {
    try {
      logDebug("Opening document picker...");
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      logDebug("Document picker result:", result);

      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        file.type = "application/pdf";

        logDebug("Selected file:", {
          name: file.name,
          size: file.size,
          type: file.type,
          uri: file.uri,
        });
        setSelectedFile(file);
        await handleCVUpload(file);
      } else {
        logDebug("No file selected or picker cancelled");
      }
    } catch (err) {
      console.error("Error picking document:", err);
      logDebug("Document picker error", {
        error: err.message,
        stack: err.stack,
        name: err.name,
      });
      Alert.alert("Error", "Failed to pick document. Please try again.");
    }
  };

  const handleCVUpload = async (file) => {
    setLoading(true);
    setParsingError(null);
    setDebugInfo(null);
    setLoadingStep("Preparing file for upload...");

    try {
      logDebug("Preparing file for upload", {
        name: file.name,
        size: file.size,
        type: file.type,
        uri: file.uri,
        allowedTypes: ALLOWED_FILE_TYPES,
      });

      if (file.size > MAX_FILE_SIZE) {
        throw new Error(
          `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`
        );
      }

      const formData = new FormData();

      if (Platform.OS === "web") {
        const response = await fetch(file.uri);
        const blob = await response.blob();
        const fileToUpload = new File([blob], file.name || "document.pdf", {
          type: "application/pdf",
        });

        logDebug("File to upload (web):", {
          name: fileToUpload.name,
          size: fileToUpload.size,
          type: fileToUpload.type,
          originalType: file.type,
        });

        formData.append("file", fileToUpload, fileToUpload.name);
      } else {
        const fileToUpload = {
          uri:
            Platform.OS === "ios" ? file.uri.replace("file://", "") : file.uri,
          type: "application/pdf",
          name: file.name || "document.pdf",
        };

        logDebug("File to upload (native):", fileToUpload);
        formData.append("file", {
          uri: fileToUpload.uri,
          type: fileToUpload.type,
          name: fileToUpload.name,
        });
      }

      setLoadingStep("Uploading CV to server...");

      if (!user?.token) {
        throw new Error(
          "Authentication token is missing. Please log in again."
        );
      }

      const response = await fetch(`${API_BASE_URL}/api/cv/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      logDebug("Backend response received", {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      });

      if (!response.ok) {
        const errorData = await response.text();
        logDebug("Backend error response", {
          status: response.status,
          errorText: errorData,
          headers: Object.fromEntries(response.headers.entries()),
        });

        if (response.status === 401) {
          throw new Error("Authentication failed. Please log in again.");
        } else if (response.status === 413) {
          throw new Error("File is too large. Please upload a smaller file.");
        } else if (response.status === 415) {
          throw new Error("Invalid file type. Please upload a PDF file.");
        } else {
          throw new Error(`Server error: ${response.status} - ${errorData}`);
        }
      }

      setLoadingStep("Processing CV content...");
      const data = await response.json();
      logDebug("Analysis complete", {
        recommendationsCount: data.courseRecommendations?.length,
        data: data,
      });

      setRecommendations(data);
      setShowRecommendations(true);
    } catch (error) {
      console.error("Error analyzing CV:", error);
      logDebug("Analysis error", {
        error: error.message,
        stack: error.stack,
      });
      setParsingError(error.message);
      Alert.alert(
        "Error",
        error.message || "Failed to analyze CV. Please try again."
      );
    } finally {
      setLoading(false);
      setLoadingStep("");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.title}>AI Course Recommendations</Text>
            <Text style={styles.subtitle}>
              Upload your CV to get personalized course recommendations
            </Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="log-out-outline" size={24} color="#FF3B30" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.uploadSection}>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={pickDocument}
          disabled={loading}
        >
          <Icon name="cloud-upload-outline" size={24} color="#fff" />
          <Text style={styles.uploadButtonText}>
            {loading ? "Analyzing..." : "Upload CV"}
          </Text>
        </TouchableOpacity>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#1976D2" />
            <Text style={styles.loadingText}>{loadingStep}</Text>
          </View>
        )}
        <Text style={styles.uploadHint}>Upload your CV in PDF format</Text>
      </View>

      {showRecommendations && recommendations && (
        <View style={styles.recommendationsSection}>
          <View style={styles.sectionHeader}>
            <Icon name="document-text-outline" size={24} color="#E53935" />
            <Text style={styles.sectionTitle}>AI Recommendations</Text>
          </View>
          <View style={styles.recommendationsBox}>
            <Text style={styles.recommendationsText}>
              {recommendations.recommendations}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FBFF",
  },
  header: {
    backgroundColor: "#ffffff",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1976D2",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  logoutText: {
    marginLeft: 5,
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "500",
  },
  uploadSection: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#ffffff",
    margin: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1976D2",
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#1976D2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "600",
  },
  uploadHint: {
    marginTop: 5,
    color: "#888",
    fontSize: 14,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  loadingText: {
    marginLeft: 10,
    color: "#666",
    fontSize: 15,
  },
  recommendationsSection: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1976D2",
    marginLeft: 8,
  },
  recommendationsBox: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  recommendationsText: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
  },
});
