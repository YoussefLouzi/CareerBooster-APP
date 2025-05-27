import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Auth styles
  input: {
    flex: 1,
    padding: 12,
    fontSize: 14,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 12,
  },
  btn: {
    backgroundColor: "#0077B5",
    padding: 15,
    borderRadius: 6,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    marginTop: 16,
    color: "#0077B5",
    textAlign: "center",
  },

  // New styles for GetStartedScreen buttons
  greenBtn: {
    backgroundColor: "#4CAF50",
  },
  outlineBtn: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#0077B5", // Use the primary color for outline
  },
  outlineBtnText: {
    color: "#0077B5", // Use the primary color for text
  },

  // Layout styles
  container: {
    flex: 1,
    padding: 24,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // CV Form styles
  formContainer: {
    padding: 16,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addSectionBtn: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
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
    backgroundColor: "#0077B5", // Match drawer header background
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
    color: "#E53935", // Example color from the image header
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
