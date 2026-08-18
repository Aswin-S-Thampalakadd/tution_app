import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const SettingsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [downloadWifi, setDownloadWifi] = useState(false);

  const settingsSections = [
    {
      title: "General",
      items: [
        {
          icon: "moon-outline",
          label: "Dark Mode",
          type: "switch",
          value: darkMode,
          onValueChange: setDarkMode,
        },
        {
          icon: "language-outline",
          label: "Language",
          type: "link",
          value: "English",
        },
        {
          icon: "globe-outline",
          label: "Region",
          type: "link",
          value: "United States",
        },
      ],
    },
    {
      title: "Learning Preferences",
      items: [
        {
          icon: "volume-high-outline",
          label: "Auto-play Videos",
          type: "switch",
          value: autoPlay,
          onValueChange: setAutoPlay,
        },
        {
          icon: "download-outline",
          label: "Download over WiFi only",
          type: "switch",
          value: downloadWifi,
          onValueChange: setDownloadWifi,
        },
        {
          icon: "notifications-outline",
          label: "Push Notifications",
          type: "switch",
          value: notifications,
          onValueChange: setNotifications,
        },
      ],
    },
    {
      title: "Privacy & Security",
      items: [
        {
          icon: "lock-closed-outline",
          label: "Change Password",
          type: "link",
          value: "",
        },
        {
          icon: "finger-print-outline",
          label: "Biometric Login",
          type: "switch",
          value: false,
        },
        {
          icon: "shield-checkmark-outline",
          label: "Two-Factor Authentication",
          type: "link",
          value: "Disabled",
        },
      ],
    },
    {
      title: "Data & Storage",
      items: [
        {
          icon: "cloud-outline",
          label: "Storage Used",
          type: "link",
          value: "245 MB",
        },
        {
          icon: "refresh-outline",
          label: "Clear Cache",
          type: "link",
          value: "",
        },
      ],
    },
  ];

  const renderSettingItem = (item) => {
    if (item.type === "switch") {
      return (
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name={item.icon} size={22} color="#20434F" />
            <Text style={styles.settingLabel}>{item.label}</Text>
          </View>
          <Switch
            value={item.value}
            onValueChange={item.onValueChange}
            trackColor={{ false: "#e0e0e0", true: "#20434F" }}
            thumbColor={item.value ? "#fff" : "#fff"}
          />
        </View>
      );
    }

    return (
      <TouchableOpacity style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Ionicons name={item.icon} size={22} color="#20434F" />
          <Text style={styles.settingLabel}>{item.label}</Text>
        </View>
        <View style={styles.settingRight}>
          {item.value ? (
            <Text style={styles.settingValue}>{item.value}</Text>
          ) : null}
          <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu-outline" size={28} color="#20434F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {settingsSections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, itemIndex) => (
                <React.Fragment key={itemIndex}>
                  {renderSettingItem(item)}
                  {itemIndex < section.items.length - 1 && (
                    <View style={styles.sectionDivider} />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#20434F",
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#999",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingLabel: {
    fontSize: 15,
    color: "#20434F",
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  settingValue: {
    fontSize: 14,
    color: "#999",
  },
  sectionDivider: {
    height: 1,
    backgroundColor: "#f0f0f0",
  },
  bottomSpacing: {
    height: 20,
  },
});

export default SettingsScreen;
