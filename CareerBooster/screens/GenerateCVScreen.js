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

  // State for project technology inputs
  const [projectTechInputs, setProjectTechInputs] = useState({});

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

  // Functions for experiences
  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    setExperiences([...experiences, newExperience]);
  };

  const updateExperience = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
  };

  const removeExperience = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
  };

  // Functions for education
  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
    };
    setEducation([...education, newEducation]);
  };

  const updateEducation = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  const removeEducation = (index) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    setEducation(updatedEducation);
  };

  // Functions for projects
  const addProject = () => {
    const newProject = {
      name: "",
      description: "",
      technologies: [],
      url: "",
      startDate: "",
      endDate: "",
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const removeProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  const addProjectTechnology = (projectIndex, technology) => {
    if (technology.trim()) {
      const updatedProjects = [...projects];
      updatedProjects[projectIndex].technologies.push(technology.trim());
      setProjects(updatedProjects);
    }
  };

  const removeProjectTechnology = (projectIndex, techIndex) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].technologies.splice(techIndex, 1);
    setProjects(updatedProjects);
  };

  // Functions for certifications
  const addCertification = () => {
    const newCertification = {
      name: "",
      issuer: "",
      date: "",
      expiryDate: "",
      credentialId: "",
      credentialUrl: "",
    };
    setCertifications([...certifications, newCertification]);
  };

  const updateCertification = (index, field, value) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index][field] = value;
    setCertifications(updatedCertifications);
  };

  const removeCertification = (index) => {
    const updatedCertifications = [...certifications];
    updatedCertifications.splice(index, 1);
    setCertifications(updatedCertifications);
  };

  // Functions for languages
  const addLanguage = () => {
    const newLanguage = {
      name: "",
      proficiency: "",
    };
    setLanguages([...languages, newLanguage]);
  };

  const updateLanguage = (index, field, value) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index][field] = value;
    setLanguages(updatedLanguages);
  };

  const removeLanguage = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    setLanguages(updatedLanguages);
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

        {/* Professional Experience Section */}
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        <View style={styles.card}>
          {experiences.map((experience, index) => (
            <View key={index} style={styles.experienceItem}>
              <View style={styles.experienceHeader}>
                <Text style={styles.experienceTitle}>
                  Experience {index + 1}
                </Text>
                <TouchableOpacity onPress={() => removeExperience(index)}>
                  <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Company</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="business-outline"
                    size={20}
                    color="#86888A"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Company name"
                    value={experience.company}
                    onChangeText={(text) =>
                      updateExperience(index, "company", text)
                    }
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Position</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="briefcase-outline"
                    size={20}
                    color="#86888A"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Job title"
                    value={experience.position}
                    onChangeText={(text) =>
                      updateExperience(index, "position", text)
                    }
                  />
                </View>
              </View>

              <View style={styles.dateRow}>
                <View style={styles.dateInput}>
                  <Text style={styles.inputLabel}>Start Date</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons
                      name="calendar-outline"
                      size={20}
                      color="#86888A"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="MM/YYYY"
                      value={experience.startDate}
                      onChangeText={(text) =>
                        updateExperience(index, "startDate", text)
                      }
                    />
                  </View>
                </View>

                <View style={styles.dateInput}>
                  <Text style={styles.inputLabel}>End Date</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons
                      name="calendar-outline"
                      size={20}
                      color="#86888A"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="MM/YYYY or Present"
                      value={experience.endDate}
                      onChangeText={(text) =>
                        updateExperience(index, "endDate", text)
                      }
                    />
                  </View>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                  style={styles.textArea}
                  placeholder="Describe your responsibilities and achievements"
                  value={experience.description}
                  onChangeText={(text) =>
                    updateExperience(index, "description", text)
                  }
                  multiline={true}
                  numberOfLines={3}
                />
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={styles.addSectionButton}
            onPress={addExperience}
          >
            <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
            <Text style={styles.addSectionText}>Add Experience</Text>
          </TouchableOpacity>
        </View>

        {/* Education Section */}
        <Text style={styles.sectionTitle}>Education</Text>
        <View style={styles.card}>
          {education.map((edu, index) => (
            <View key={index} style={styles.experienceItem}>
              <View style={styles.experienceHeader}>
                <Text style={styles.experienceTitle}>
                  Education {index + 1}
                </Text>
                <TouchableOpacity onPress={() => removeEducation(index)}>
                  <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Institution</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="school-outline"
                    size={20}
                    color="#86888A"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="University/School name"
                    value={edu.institution}
                    onChangeText={(text) =>
                      updateEducation(index, "institution", text)
                    }
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Degree</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="ribbon-outline"
                    size={20}
                    color="#86888A"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Bachelor's, Master's, PhD, etc."
                    value={edu.degree}
                    onChangeText={(text) =>
                      updateEducation(index, "degree", text)
                    }
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Field of Study</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="book-outline"
                    size={20}
                    color="#86888A"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Computer Science, Engineering, etc."
                    value={edu.fieldOfStudy}
                    onChangeText={(text) =>
                      updateEducation(index, "fieldOfStudy", text)
                    }
                  />
                </View>
              </View>

              <View style={styles.dateRow}>
                <View style={styles.dateInput}>
                  <Text style={styles.inputLabel}>Start Date</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons
                      name="calendar-outline"
                      size={20}
                      color="#86888A"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="MM/YYYY"
                      value={edu.startDate}
                      onChangeText={(text) =>
                        updateEducation(index, "startDate", text)
                      }
                    />
                  </View>
                </View>

                <View style={styles.dateInput}>
                  <Text style={styles.inputLabel}>End Date</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons
                      name="calendar-outline"
                      size={20}
                      color="#86888A"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="MM/YYYY or Present"
                      value={edu.endDate}
                      onChangeText={(text) =>
                        updateEducation(index, "endDate", text)
                      }
                    />
                  </View>
                </View>
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={styles.addSectionButton}
            onPress={addEducation}
          >
            <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
            <Text style={styles.addSectionText}>Add Education</Text>
          </TouchableOpacity>
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

        {/* Projects Section */}
        <Text style={styles.sectionTitle}>Projects</Text>
        <View style={styles.card}>
          {projects.map((project, index) => (
            <View key={index} style={styles.experienceItem}>
              <View style={styles.experienceHeader}>
                <Text style={styles.experienceTitle}>Project {index + 1}</Text>
                <TouchableOpacity onPress={() => removeProject(index)}>
                  <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Project Name</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="code-outline"
                    size={20}
                    color="#86888A"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Project name"
                    value={project.name}
                    onChangeText={(text) => updateProject(index, "name", text)}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                  style={styles.textArea}
                  placeholder="Describe the project and your role"
                  value={project.description}
                  onChangeText={(text) =>
                    updateProject(index, "description", text)
                  }
                  multiline={true}
                  numberOfLines={3}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Technologies</Text>
                <View style={styles.skillsList}>
                  {project.technologies.map((tech, techIndex) => (
                    <View key={techIndex} style={styles.skillTag}>
                      <Text style={styles.skillTagText}>{tech}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          removeProjectTechnology(index, techIndex)
                        }
                      >
                        <Ionicons
                          name="close-circle"
                          size={18}
                          color="#FFFFFF"
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
                <View style={styles.addSkillContainer}>
                  <View style={[styles.inputWrapper, { flex: 1 }]}>
                    <TextInput
                      style={styles.input}
                      placeholder="Add technology"
                      value={projectTechInputs[index] || ""}
                      onChangeText={(text) =>
                        setProjectTechInputs({
                          ...projectTechInputs,
                          [index]: text,
                        })
                      }
                      onSubmitEditing={() => {
                        if (projectTechInputs[index]?.trim()) {
                          addProjectTechnology(index, projectTechInputs[index]);
                          setProjectTechInputs({
                            ...projectTechInputs,
                            [index]: "",
                          });
                        }
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                      if (projectTechInputs[index]?.trim()) {
                        addProjectTechnology(index, projectTechInputs[index]);
                        setProjectTechInputs({
                          ...projectTechInputs,
                          [index]: "",
                        });
                      }
                    }}
                  >
                    <Ionicons name="add" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Project URL (optional)</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="link-outline"
                    size={20}
                    color="#86888A"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="https://github.com/username/project"
                    value={project.url}
                    onChangeText={(text) => updateProject(index, "url", text)}
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={styles.addSectionButton}
            onPress={addProject}
          >
            <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
            <Text style={styles.addSectionText}>Add Project</Text>
          </TouchableOpacity>
        </View>

        {/* Certifications Section */}
        <Text style={styles.sectionTitle}>Certifications</Text>
        <View style={styles.card}>
          {certifications.map((cert, index) => (
            <View key={index} style={styles.experienceItem}>
              <View style={styles.experienceHeader}>
                <Text style={styles.experienceTitle}>
                  Certification {index + 1}
                </Text>
                <TouchableOpacity onPress={() => removeCertification(index)}>
                  <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Certification Name</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="ribbon-outline"
                    size={20}
                    color="#86888A"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="AWS Certified Developer, etc."
                    value={cert.name}
                    onChangeText={(text) =>
                      updateCertification(index, "name", text)
                    }
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Issuer</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="business-outline"
                    size={20}
                    color="#86888A"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Amazon Web Services, Microsoft, etc."
                    value={cert.issuer}
                    onChangeText={(text) =>
                      updateCertification(index, "issuer", text)
                    }
                  />
                </View>
              </View>

              <View style={styles.dateRow}>
                <View style={styles.dateInput}>
                  <Text style={styles.inputLabel}>Date Obtained</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons
                      name="calendar-outline"
                      size={20}
                      color="#86888A"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="MM/YYYY"
                      value={cert.date}
                      onChangeText={(text) =>
                        updateCertification(index, "date", text)
                      }
                    />
                  </View>
                </View>

                <View style={styles.dateInput}>
                  <Text style={styles.inputLabel}>Expiry Date</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons
                      name="calendar-outline"
                      size={20}
                      color="#86888A"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="MM/YYYY or Never"
                      value={cert.expiryDate}
                      onChangeText={(text) =>
                        updateCertification(index, "expiryDate", text)
                      }
                    />
                  </View>
                </View>
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={styles.addSectionButton}
            onPress={addCertification}
          >
            <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
            <Text style={styles.addSectionText}>Add Certification</Text>
          </TouchableOpacity>
        </View>

        {/* Languages Section */}
        <Text style={styles.sectionTitle}>Languages</Text>
        <View style={styles.card}>
          {languages.map((language, index) => (
            <View key={index} style={styles.experienceItem}>
              <View style={styles.experienceHeader}>
                <Text style={styles.experienceTitle}>Language {index + 1}</Text>
                <TouchableOpacity onPress={() => removeLanguage(index)}>
                  <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Language</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="language-outline"
                    size={20}
                    color="#86888A"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="English, Spanish, French, etc."
                    value={language.name}
                    onChangeText={(text) => updateLanguage(index, "name", text)}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Proficiency Level</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="bar-chart-outline"
                    size={20}
                    color="#86888A"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Native, Fluent, Intermediate, Basic"
                    value={language.proficiency}
                    onChangeText={(text) =>
                      updateLanguage(index, "proficiency", text)
                    }
                  />
                </View>
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={styles.addSectionButton}
            onPress={addLanguage}
          >
            <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
            <Text style={styles.addSectionText}>Add Language</Text>
          </TouchableOpacity>
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
