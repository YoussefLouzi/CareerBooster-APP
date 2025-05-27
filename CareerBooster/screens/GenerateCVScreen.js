import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles";
import AppHeader from "../components/AppHeader";
import { useAuth } from "../App";
import { API_BASE_URL } from "../config";
import { Linking } from "react-native";

export default function GenerateCVScreen({ navigation }) {
  // Get authentication context
  const { user } = useAuth();

  // Basic Information
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    linkedin: "",
    github: "",
    website: "",
    summary: "",
  });

  // Skills
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  // Experience
  const [experiences, setExperiences] = useState([]);

  // Education
  const [education, setEducation] = useState([]);

  // Projects
  const [projects, setProjects] = useState([]);

  // Certifications
  const [certifications, setCertifications] = useState([]);

  // Languages
  const [languages, setLanguages] = useState([]);

  // Hobbies & Interests
  const [hobbies, setHobbies] = useState([]);
  const [newHobby, setNewHobby] = useState("");

  // Volunteering
  const [volunteering, setVolunteering] = useState([]);
  const [newVolunteering, setNewVolunteering] = useState("");

  // Awards & Achievements
  const [awards, setAwards] = useState([]);
  const [newAward, setNewAward] = useState("");

  // Loading state for CV generation
  const [isGenerating, setIsGenerating] = useState(false);

  // Functions to manage data
  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  // Functions for hobbies
  const addHobby = () => {
    if (newHobby.trim()) {
      setHobbies([...hobbies, newHobby.trim()]);
      setNewHobby("");
    }
  };

  const removeHobby = (index) => {
    const updatedHobbies = [...hobbies];
    updatedHobbies.splice(index, 1);
    setHobbies(updatedHobbies);
  };

  // Functions for volunteering
  const addVolunteering = () => {
    if (newVolunteering.trim()) {
      setVolunteering([...volunteering, newVolunteering.trim()]);
      setNewVolunteering("");
    }
  };

  const removeVolunteering = (index) => {
    const updatedVolunteering = [...volunteering];
    updatedVolunteering.splice(index, 1);
    setVolunteering(updatedVolunteering);
  };

  // Functions for awards
  const addAward = () => {
    if (newAward.trim()) {
      setAwards([...awards, newAward.trim()]);
      setNewAward("");
    }
  };

  const removeAward = (index) => {
    const updatedAwards = [...awards];
    updatedAwards.splice(index, 1);
    setAwards(updatedAwards);
  };

  // Function to generate CV
  const generateCV = async () => {
    console.log("🚀 Generate CV button clicked!");
    console.log("User token:", user?.token ? "Present" : "Missing");
    setIsGenerating(true);

    try {
      // Prepare CV data
      const cvData = {
        personalInfo: {
          name: personalInfo.name,
          email: personalInfo.email,
          phone: personalInfo.phone,
          title: personalInfo.title,
          linkedin: personalInfo.linkedin,
          github: personalInfo.github,
          website: personalInfo.website,
        },
        summary: personalInfo.summary,
        skills: skills,
        experiences: experiences,
        education: education,
        projects: projects,
        certifications: certifications,
        languages: languages,
        hobbies: hobbies,
        volunteering: volunteering,
        awards: awards,
      };

      console.log("📤 Sending CV data:", cvData);
      console.log("🌐 API URL:", `${API_BASE_URL}/api/cv-generator`);

      // First, create the CV
      const createResponse = await fetch(`${API_BASE_URL}/api/cv-generator`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`, // Add authentication
        },
        body: JSON.stringify(cvData),
      });

      console.log("📥 Response status:", createResponse.status);
      console.log("📥 Response ok:", createResponse.ok);

      if (!createResponse.ok) {
        const errorText = await createResponse.text();
        console.error("❌ API Error:", errorText);
        throw new Error(
          `Failed to create CV: ${createResponse.status} - ${errorText}`
        );
      }

      const createdCV = await createResponse.json();
      console.log("✅ CV created successfully:", createdCV);

      // Mobile-friendly PDF handling
      const pdfUrl = `${API_BASE_URL}/api/cv-generator/${createdCV.id}/export/pdf?template=modern`;
      console.log("🔗 PDF URL:", pdfUrl);
      console.log("🚨 About to show Alert dialog...");

      // Quick test: try to open PDF directly
      setTimeout(() => {
        console.log("🔗 Testing direct PDF access...");
        fetch(pdfUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })
          .then((response) => {
            console.log("📄 Direct PDF test - Status:", response.status);
            if (response.ok) {
              return response.blob();
            } else {
              throw new Error(`HTTP ${response.status}`);
            }
          })
          .then((blob) => {
            console.log("✅ PDF blob received, size:", blob.size);
            const url = window.URL.createObjectURL(blob);
            window.open(url, "_blank");
            setTimeout(() => window.URL.revokeObjectURL(url), 1000);
          })
          .catch((error) => {
            console.error("❌ Direct PDF test failed:", error);
          });
      }, 1000);

      Alert.alert(
        "✅ CV Generated Successfully!",
        "Your CV has been created. What would you like to do?",
        [
          {
            text: "📱 Share PDF",
            onPress: async () => {
              try {
                if (Platform.OS === "web") {
                  navigator.clipboard.writeText(pdfUrl);
                  Alert.alert(
                    "📋 Link Copied",
                    "PDF link copied to clipboard!"
                  );
                } else {
                  // For mobile: copy link for sharing
                  Alert.alert(
                    "📱 Share PDF",
                    "PDF link: " +
                      pdfUrl +
                      "\n\nCopy this link to share your CV!"
                  );
                }
              } catch (error) {
                console.error("Share error:", error);
                Alert.alert("Error", "Could not share PDF");
              }
            },
          },
          {
            text: "👁️ View PDF",
            onPress: async () => {
              try {
                if (Platform.OS === "web") {
                  // For web: fetch PDF with auth and create blob URL
                  const pdfResponse = await fetch(pdfUrl, {
                    method: "GET",
                    headers: {
                      Authorization: `Bearer ${user?.token}`,
                    },
                  });

                  if (pdfResponse.ok) {
                    const blob = await pdfResponse.blob();
                    const url = window.URL.createObjectURL(blob);
                    window.open(url, "_blank");
                    // Clean up the blob URL after a delay
                    setTimeout(() => window.URL.revokeObjectURL(url), 1000);
                  } else {
                    Alert.alert("Error", "Could not load PDF");
                  }
                } else {
                  // For mobile: open in system browser with auth (limited support)
                  Linking.openURL(pdfUrl).catch(() => {
                    Alert.alert("Error", "Could not open PDF link");
                  });
                }
              } catch (error) {
                console.error("View error:", error);
                Alert.alert("Error", "Could not open PDF");
              }
            },
          },
          {
            text: "✅ Done",
            style: "cancel",
          },
        ]
      );
    } catch (error) {
      console.error("Error generating CV:", error);
      Alert.alert("Error", "Failed to generate CV. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader showSearch={false} showBackButton={true} title="CV Builder" />
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Contact Information</Text>

        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="person-outline"
                size={20}
                color="#86888A"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                value={personalInfo.name}
                onChangeText={(text) =>
                  setPersonalInfo({ ...personalInfo, name: text })
                }
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Professional Title</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="briefcase-outline"
                size={20}
                color="#86888A"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="e.g. Software Engineer"
                value={personalInfo.title}
                onChangeText={(text) =>
                  setPersonalInfo({ ...personalInfo, title: text })
                }
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#86888A"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={personalInfo.email}
                onChangeText={(text) =>
                  setPersonalInfo({ ...personalInfo, email: text })
                }
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="call-outline"
                size={20}
                color="#86888A"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                value={personalInfo.phone}
                onChangeText={(text) =>
                  setPersonalInfo({ ...personalInfo, phone: text })
                }
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>LinkedIn (optional)</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="logo-linkedin"
                size={20}
                color="#86888A"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="linkedin.com/in/username"
                value={personalInfo.linkedin}
                onChangeText={(text) =>
                  setPersonalInfo({ ...personalInfo, linkedin: text })
                }
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>GitHub (optional)</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="logo-github"
                size={20}
                color="#86888A"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="github.com/username"
                value={personalInfo.github}
                onChangeText={(text) =>
                  setPersonalInfo({ ...personalInfo, github: text })
                }
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Personal Website (optional)</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="globe-outline"
                size={20}
                color="#86888A"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="yourwebsite.com"
                value={personalInfo.website}
                onChangeText={(text) =>
                  setPersonalInfo({ ...personalInfo, website: text })
                }
                autoCapitalize="none"
              />
            </View>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Summary (2-4 lines)</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Write a short professional summary highlighting your strengths and career goals"
              value={personalInfo.summary}
              onChangeText={(text) =>
                setPersonalInfo({ ...personalInfo, summary: text })
              }
              multiline={true}
              numberOfLines={4}
            />
          </View>
        </View>
        <Text style={styles.sectionTitle}>Technical Skills</Text>
        <View style={styles.card}>
          <View style={styles.skillsList}>
            {skills.map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillTagText}>{skill}</Text>
                <TouchableOpacity onPress={() => removeSkill(index)}>
                  <Ionicons name="close-circle" size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={styles.addSkillContainer}>
            <View style={[styles.inputWrapper, { flex: 1 }]}>
              <TextInput
                style={styles.input}
                placeholder="Add a skill"
                value={newSkill}
                onChangeText={setNewSkill}
              />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={addSkill}>
              <Ionicons name="add" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Hobbies & Interests</Text>
        <View style={styles.card}>
          <View style={styles.skillsList}>
            {hobbies.map((hobby, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillTagText}>{hobby}</Text>
                <TouchableOpacity onPress={() => removeHobby(index)}>
                  <Ionicons name="close-circle" size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={styles.addSkillContainer}>
            <View style={[styles.inputWrapper, { flex: 1 }]}>
              <TextInput
                style={styles.input}
                placeholder="Add a hobby or interest"
                value={newHobby}
                onChangeText={setNewHobby}
              />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={addHobby}>
              <Ionicons name="add" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Volunteering Experience</Text>
        <View style={styles.card}>
          <View style={styles.skillsList}>
            {volunteering.map((vol, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillTagText}>{vol}</Text>
                <TouchableOpacity onPress={() => removeVolunteering(index)}>
                  <Ionicons name="close-circle" size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={styles.addSkillContainer}>
            <View style={[styles.inputWrapper, { flex: 1 }]}>
              <TextInput
                style={styles.input}
                placeholder="Add volunteering experience"
                value={newVolunteering}
                onChangeText={setNewVolunteering}
              />
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={addVolunteering}
            >
              <Ionicons name="add" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Awards & Achievements</Text>
        <View style={styles.card}>
          <View style={styles.skillsList}>
            {awards.map((award, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillTagText}>{award}</Text>
                <TouchableOpacity onPress={() => removeAward(index)}>
                  <Ionicons name="close-circle" size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={styles.addSkillContainer}>
            <View style={[styles.inputWrapper, { flex: 1 }]}>
              <TextInput
                style={styles.input}
                placeholder="Add an award or achievement"
                value={newAward}
                onChangeText={setNewAward}
              />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={addAward}>
              <Ionicons name="add" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            { marginVertical: 20 },
            isGenerating && { opacity: 0.7 },
          ]}
          onPress={generateCV}
          disabled={isGenerating}
        >
          <Text style={styles.buttonText}>
            {isGenerating ? "Generating PDF..." : "Generate PDF CV"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
