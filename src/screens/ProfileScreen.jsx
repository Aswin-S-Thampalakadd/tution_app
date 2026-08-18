import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Switch,
  Modal,
  Alert,
  StatusBar,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const { width } = Dimensions.get("window");

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://i.pravatar.cc/150?img=3"
  );
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@email.com");
  const [phone, setPhone] = useState("+1 234 567 8900");
  const [bio, setBio] = useState("Passionate learner | Mathematics enthusiast");
  const [grade, setGrade] = useState("10th Grade");
  const [school, setSchool] = useState("Springfield High School");
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const stats = [
    { label: "Courses", value: "12" },
    { label: "Hours", value: "48.5" },
    { label: "Certificates", value: "4" },
    { label: "Avg. Score", value: "92%" },
  ];

  const menuItems = [
    { icon: "bookmark-outline", label: "Saved Courses", color: "#20434F" },
    { icon: "time-outline", label: "Learning History", color: "#FF9800" },
    { icon: "trophy-outline", label: "Achievements", color: "#FFD700" },
    { icon: "card-outline", label: "Payment Methods", color: "#4CAF50" },
    { icon: "settings-outline", label: "Settings", color: "#2196F3" },
    { icon: "help-circle-outline", label: "Help & Support", color: "#9C27B0" },
    { icon: "information-circle-outline", label: "About", color: "#607D8B" },
    { icon: "log-out-outline", label: "Logout", color: "#F44336" },
  ];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Please grant permission to access your photos."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    setShowEditModal(false);
    Alert.alert("Success", "Profile updated successfully!");
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => Alert.alert("Logged out"),
      },
    ]);
  };

  const ProfileHeader = () => (
    <View style={styles.profileHeader}>
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <View style={styles.editImageBadge}>
          <Ionicons name="camera" size={16} color="#fff" />
        </View>
      </TouchableOpacity>
      <Text style={styles.profileName}>{name}</Text>
      <Text style={styles.profileGrade}>{grade}</Text>
      <View style={styles.profileStats}>
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
            {index < stats.length - 1 && <View style={styles.statDivider} />}
          </React.Fragment>
        ))}
      </View>
      <TouchableOpacity
        style={styles.editProfileButton}
        onPress={() => setIsEditing(!isEditing)}
      >
        <Ionicons
          name={isEditing ? "close" : "create-outline"}
          size={20}
          color="#fff"
        />
        <Text style={styles.editProfileText}>
          {isEditing ? "Close Edit" : "Edit Profile"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const ProfileInfo = () => (
    <View style={styles.infoSection}>
      <Text style={styles.sectionTitle}>Personal Information</Text>
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={20} color="#20434F" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Full Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
              />
            ) : (
              <Text style={styles.infoValue}>{name}</Text>
            )}
          </View>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={20} color="#20434F" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Email</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
            ) : (
              <Text style={styles.infoValue}>{email}</Text>
            )}
          </View>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={20} color="#20434F" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Phone</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone"
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.infoValue}>{phone}</Text>
            )}
          </View>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoRow}>
          <Ionicons name="school-outline" size={20} color="#20434F" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>School</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={school}
                onChangeText={setSchool}
                placeholder="Enter your school"
              />
            ) : (
              <Text style={styles.infoValue}>{school}</Text>
            )}
          </View>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoRow}>
          <Ionicons name="clipboard-outline" size={20} color="#20434F" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Bio</Text>
            {isEditing ? (
              <TextInput
                style={[styles.infoInput, styles.bioInput]}
                value={bio}
                onChangeText={setBio}
                placeholder="Enter your bio"
                multiline
                numberOfLines={3}
              />
            ) : (
              <Text style={styles.infoValue}>{bio}</Text>
            )}
          </View>
        </View>
      </View>
      {isEditing && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
          <Ionicons name="save-outline" size={20} color="#fff" />
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const Preferences = () => (
    <View style={styles.infoSection}>
      <Text style={styles.sectionTitle}>Preferences</Text>
      <View style={styles.infoCard}>
        <View style={styles.preferenceRow}>
          <View style={styles.preferenceLeft}>
            <Ionicons name="notifications-outline" size={20} color="#20434F" />
            <Text style={styles.preferenceLabel}>Push Notifications</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: "#e0e0e0", true: "#20434F" }}
            thumbColor={notifications ? "#fff" : "#fff"}
          />
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.preferenceRow}>
          <View style={styles.preferenceLeft}>
            <Ionicons name="moon-outline" size={20} color="#20434F" />
            <Text style={styles.preferenceLabel}>Dark Mode</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: "#e0e0e0", true: "#20434F" }}
            thumbColor={darkMode ? "#fff" : "#fff"}
          />
        </View>
      </View>
    </View>
  );

  const MenuItems = () => (
    <View style={styles.infoSection}>
      <Text style={styles.sectionTitle}>Menu</Text>
      <View style={styles.infoCard}>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                if (item.label === "Logout") {
                  handleLogout();
                } else {
                  Alert.alert(item.label, `Navigating to ${item.label}`);
                }
              }}
            >
              <View style={styles.menuLeft}>
                <Ionicons name={item.icon} size={22} color={item.color} />
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
            </TouchableOpacity>
            {index < menuItems.length - 1 && (
              <View style={styles.menuDivider} />
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-social-outline" size={24} color="#20434F" />
        </TouchableOpacity>
      </View>

      <ProfileHeader />
      <ProfileInfo />
      <Preferences />
      <MenuItems />

      <View style={styles.bottomSpacing} />
    </ScrollView>
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#20434F",
  },
  shareButton: {
    padding: 8,
  },
  profileHeader: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  imageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#20434F",
  },
  editImageBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#20434F",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#20434F",
    marginTop: 12,
  },
  profileGrade: {
    fontSize: 14,
    color: "#999",
    marginTop: 2,
  },
  profileStats: {
    flexDirection: "row",
    marginTop: 16,
    paddingHorizontal: 20,
    width: "100%",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#20434F",
  },
  statLabel: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: "#e0e0e0",
  },
  editProfileButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#20434F",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 16,
    gap: 8,
  },
  editProfileText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#20434F",
    marginBottom: 10,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 4,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    color: "#20434F",
    fontWeight: "500",
  },
  infoInput: {
    fontSize: 15,
    color: "#20434F",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#f8f9fa",
  },
  bioInput: {
    minHeight: 60,
    textAlignVertical: "top",
  },
  infoDivider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 8,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    gap: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  preferenceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  preferenceLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  preferenceLabel: {
    fontSize: 15,
    color: "#20434F",
    fontWeight: "500",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuLabel: {
    fontSize: 15,
    color: "#20434F",
    fontWeight: "500",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#f0f0f0",
  },
  bottomSpacing: {
    height: 20,
  },
});

export default ProfileScreen;
