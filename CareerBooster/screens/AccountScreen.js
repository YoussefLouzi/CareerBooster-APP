import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../App";
import { styles } from "../styles";
import AppHeader from "../components/AppHeader";

export default function AccountScreen() {
  const { user, logout } = useAuth();

  const accountSections = [
    {
      title: "Profile Information",
      items: [
        {
          icon: "person-outline",
          label: "Full Name",
          value: user?.name || "Not provided",
        },
        {
          icon: "mail-outline",
          label: "Email",
          value: user?.email || "Not provided",
        },
        { icon: "calendar-outline", label: "Member Since", value: "2024" },
        {
          icon: "shield-checkmark-outline",
          label: "Account Status",
          value: "Active",
        },
      ],
    },
    {
      title: "App Statistics",
      items: [
        { icon: "document-text-outline", label: "CVs Created", value: "0" },
        { icon: "school-outline", label: "Courses Completed", value: "0" },
        { icon: "trophy-outline", label: "Achievements", value: "0" },
        { icon: "time-outline", label: "Last Login", value: "Today" },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: "notifications-outline",
          label: "Notifications",
          value: "Enabled",
          action: true,
        },
        {
          icon: "moon-outline",
          label: "Dark Mode",
          value: "Disabled",
          action: true,
        },
        {
          icon: "language-outline",
          label: "Language",
          value: "English",
          action: true,
        },
        {
          icon: "lock-closed-outline",
          label: "Privacy Settings",
          value: "Manage",
          action: true,
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader showSearch={false} showBackButton={false} title="My Account" />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={accountStyles.profileHeader}>
          <View style={accountStyles.avatarContainer}>
            <View style={accountStyles.avatar}>
              <Ionicons name="person" size={40} color="#FFFFFF" />
            </View>
            <View style={accountStyles.statusBadge}>
              <Ionicons name="checkmark" size={12} color="#FFFFFF" />
            </View>
          </View>
          <View style={accountStyles.profileInfo}>
            <Text style={accountStyles.profileName}>
              {user?.name || "User"}
            </Text>
            <Text style={accountStyles.profileEmail}>
              {user?.email || "user@example.com"}
            </Text>
            <View style={accountStyles.membershipBadge}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={accountStyles.membershipText}>Premium Member</Text>
            </View>
          </View>
        </View>

        {/* Account Sections */}
        {accountSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={accountStyles.section}>
            <Text style={accountStyles.sectionTitle}>{section.title}</Text>
            <View style={accountStyles.sectionCard}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    accountStyles.sectionItem,
                    itemIndex === section.items.length - 1 &&
                      accountStyles.lastItem,
                  ]}
                  disabled={!item.action}
                >
                  <View style={accountStyles.itemLeft}>
                    <View style={accountStyles.iconContainer}>
                      <Ionicons name={item.icon} size={20} color="#1976D2" />
                    </View>
                    <Text style={accountStyles.itemLabel}>{item.label}</Text>
                  </View>
                  <View style={accountStyles.itemRight}>
                    <Text style={accountStyles.itemValue}>{item.value}</Text>
                    {item.action && (
                      <Ionicons name="chevron-forward" size={16} color="#999" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Action Buttons */}
        <View style={accountStyles.actionSection}>
          <TouchableOpacity style={accountStyles.editButton}>
            <Ionicons name="create-outline" size={20} color="#1976D2" />
            <Text style={accountStyles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={accountStyles.helpButton}>
            <Ionicons name="help-circle-outline" size={20} color="#1976D2" />
            <Text style={accountStyles.helpButtonText}>Help & Support</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={accountStyles.logoutButton} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
          <Text style={accountStyles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={accountStyles.versionText}>CareerBooster v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const accountStyles = {
  profileHeader: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#1976D2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#1976D2",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1976D2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  statusBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  membershipBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  membershipText: {
    fontSize: 12,
    color: "#FF8F00",
    fontWeight: "600",
    marginLeft: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1976D2",
    marginBottom: 12,
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#1976D2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  itemLabel: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemValue: {
    fontSize: 14,
    color: "#666",
    marginRight: 8,
  },
  actionSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  editButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    padding: 16,
    marginRight: 8,
  },
  editButtonText: {
    color: "#1976D2",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  helpButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    padding: 16,
    marginLeft: 8,
  },
  helpButtonText: {
    color: "#1976D2",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F44336",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#F44336",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  versionText: {
    textAlign: "center",
    fontSize: 12,
    color: "#999",
    marginBottom: 20,
  },
};
