import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Auth styles
  input: {
    flex: 1,
    padding: 12,
    fontSize: 14,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E3F2FD",
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#F8FBFF",
  },
  btn: {
    backgroundColor: "#1976D2",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#1976D2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    marginTop: 16,
    color: "#1976D2",
    textAlign: "center",
    fontWeight: "600",
  },

  // New styles for GetStartedScreen buttons
  greenBtn: {
    backgroundColor: "#2196F3",
  },
  outlineBtn: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#1976D2",
  },
  outlineBtnText: {
    color: "#1976D2",
    fontWeight: "600",
  },

  // Layout styles
  container: {
    flex: 1,
    backgroundColor: "#F8FBFF",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FBFF",
    padding: 24,
  },

  // CV Form styles
  formContainer: {
    padding: 16,
    backgroundColor: "#F8FBFF",
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1976D2",
  },
  addSectionBtn: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },

  // Course styles
  courseCard: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    ...(typeof window !== "undefined"
      ? { boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }),
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  courseDescription: {
    color: "#666",
    marginBottom: 8,
  },

  // About Us styles
  aboutContainer: {
    padding: 20,
  },
  aboutTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },

  // Custom Drawer Styles
  drawerProfileSection: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1976D2",
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  profileStatus: {
    fontSize: 14,
    color: "#eee",
  },
  drawerBottomSection: {
    marginTop: 20,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  drawerBottomItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  drawerIcon: {
    marginRight: 15,
    color: "#555", // Adjust color as needed
  },
  drawerItemText: {
    fontSize: 16,
    color: "#555", // Adjust color as needed
  },

  // Home Screen Grid Styles
  greetingText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1976D2",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%", // Adjust as needed for spacing
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    ...(typeof window !== "undefined"
      ? { boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }),
  },
  gridItemText: {
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },

  // GenerateCVScreen specific styles
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F8FBFF",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...(typeof window !== "undefined"
      ? { boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }),
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
    borderColor: "#E3F2FD",
    borderRadius: 8,
    backgroundColor: "#F8FBFF",
  },
  inputIcon: {
    marginLeft: 12,
    marginRight: 8,
    color: "#1976D2",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#E3F2FD",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#F8FBFF",
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
    backgroundColor: "#1976D2",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    shadowColor: "#1976D2",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
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
    backgroundColor: "#1976D2",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1976D2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: "#1976D2",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1976D2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // New styles for complex form sections
  experienceItem: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fafafa",
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  experienceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  dateInput: {
    flex: 1,
  },
  addSectionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E3F2FD",
    borderWidth: 2,
    borderColor: "#1976D2",
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  addSectionText: {
    color: "#1976D2",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
