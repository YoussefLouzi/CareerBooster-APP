import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // ... existing styles ...

  // Experience styles
  experienceItem: {
    marginBottom: 15,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  experienceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  experienceCompany: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3,
  },
  experienceDates: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  experienceDescription: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },

  // Education styles
  educationItem: {
    marginBottom: 15,
  },
  educationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  educationDegree: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  educationInstitution: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3,
  },
  educationYear: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3,
  },
  educationCourses: {
    fontSize: 14,
    color: "#444",
  },

  // Project styles
  projectItem: {
    marginBottom: 15,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  projectDescription: {
    fontSize: 14,
    color: "#444",
    marginBottom: 5,
  },
  projectTechnologies: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3,
  },
  projectLink: {
    fontSize: 14,
    color: "#0077B5",
  },

  // Certification styles
  certificationItem: {
    marginBottom: 15,
  },
  certificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  certificationName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  certificationDetails: {
    fontSize: 14,
    color: "#666",
  },

  // Language styles
  languageItem: {
    marginBottom: 15,
  },
  languageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  languageName: {
    fontSize: 16,
    color: "#333",
  },
  languageProficiency: {
    fontSize: 14,
    color: "#666",
  },

  // Common styles
  itemDivider: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 15,
  },
  addSectionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 10,
  },
  addSectionText: {
    color: "#0077B5",
    marginLeft: 5,
    fontSize: 14,
  },

  // GenerateCVScreen specific styles
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  inputIcon: {
    marginLeft: 12,
    marginRight: 8,
  },

  textArea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#f9f9f9",
    fontSize: 14,
    color: "#333",
    textAlignVertical: "top",
    minHeight: 80,
  },
  skillsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  skillTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0077B5",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  skillTagText: {
    color: "#fff",
    fontSize: 14,
    marginRight: 6,
  },
  addSkillContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  addButton: {
    backgroundColor: "#0077B5",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#0077B5",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
