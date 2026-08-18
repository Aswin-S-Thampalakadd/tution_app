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

  const stats = [
    { label: "Courses", value: "12", icon: "book-outline", color: "#6C5CE7" },
    { label: "Hours", value: "48.5", icon: "time-outline", color: "#00B894" },
    {
      label: "Certificates",
      value: "4",
      icon: "ribbon-outline",
      color: "#FFD93D",
    },
    {
      label: "Avg. Score",
      value: "92%",
      icon: "stats-chart-outline",
      color: "#FF6B6B",
    },
  ];

  const menuItems = [
    { icon: "bookmark-outline", label: "Saved Courses", color: "#6C5CE7" },
    { icon: "time-outline", label: "Learning History", color: "#00B894" },
    { icon: "trophy-outline", label: "Achievements", color: "#FFD93D" },
    { icon: "card-outline", label: "Payment Methods", color: "#FF6B6B" },
    { icon: "settings-outline", label: "Settings", color: "#6C5CE7" },
    { icon: "help-circle-outline", label: "Help & Support", color: "#00B894" },
    { icon: "information-circle-outline", label: "About", color: "#FFD93D" },
    { icon: "log-out-outline", label: "Logout", color: "#FF6B6B" },
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
      <View style={styles.profileBackground}>
        <View style={styles.profileGradient} />
      </View>
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
          <View key={index} style={styles.statItem}>
            <View
              style={[
                styles.statIconWrapper,
                { backgroundColor: stat.color + "20" },
              ]}
            >
              <Ionicons name={stat.icon} size={18} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={[
          styles.editProfileButton,
          isEditing && styles.editProfileActive,
        ]}
        onPress={() => setIsEditing(!isEditing)}
      >
        <Ionicons
          name={isEditing ? "close-outline" : "create-outline"}
          size={20}
          color="#fff"
        />
        <Text style={styles.editProfileText}>
          {isEditing ? "Cancel" : "Edit Profile"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const ProfileInfo = () => (
    <View style={styles.infoSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        {isEditing && (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveProfile}
          >
            <Ionicons name="save-outline" size={18} color="#fff" />
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <View
            style={[styles.infoIconWrapper, { backgroundColor: "#6C5CE720" }]}
          >
            <Ionicons name="person-outline" size={20} color="#6C5CE7" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Full Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor="#999"
              />
            ) : (
              <Text style={styles.infoValue}>{name}</Text>
            )}
          </View>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoRow}>
          <View
            style={[styles.infoIconWrapper, { backgroundColor: "#00B89420" }]}
          >
            <Ionicons name="mail-outline" size={20} color="#00B894" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Email</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                keyboardType="email-address"
              />
            ) : (
              <Text style={styles.infoValue}>{email}</Text>
            )}
          </View>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoRow}>
          <View
            style={[styles.infoIconWrapper, { backgroundColor: "#FFD93D20" }]}
          >
            <Ionicons name="call-outline" size={20} color="#FFD93D" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Phone</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.infoValue}>{phone}</Text>
            )}
          </View>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoRow}>
          <View
            style={[styles.infoIconWrapper, { backgroundColor: "#FF6B6B20" }]}
          >
            <Ionicons name="school-outline" size={20} color="#FF6B6B" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>School</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={school}
                onChangeText={setSchool}
                placeholder="Enter your school"
                placeholderTextColor="#999"
              />
            ) : (
              <Text style={styles.infoValue}>{school}</Text>
            )}
          </View>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoRow}>
          <View
            style={[styles.infoIconWrapper, { backgroundColor: "#6C5CE720" }]}
          >
            <Ionicons name="clipboard-outline" size={20} color="#6C5CE7" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Bio</Text>
            {isEditing ? (
              <TextInput
                style={[styles.infoInput, styles.bioInput]}
                value={bio}
                onChangeText={setBio}
                placeholder="Enter your bio"
                placeholderTextColor="#999"
                multiline
                numberOfLines={3}
              />
            ) : (
              <Text style={styles.infoValue}>{bio}</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );

  const Preferences = () => (
    <View style={styles.infoSection}>
      <Text style={styles.sectionTitle}>Preferences</Text>
      <View style={styles.infoCard}>
        <View style={styles.preferenceRow}>
          <View style={styles.preferenceLeft}>
            <View
              style={[styles.preferenceIcon, { backgroundColor: "#6C5CE720" }]}
            >
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#6C5CE7"
              />
            </View>
            <View>
              <Text style={styles.preferenceLabel}>Push Notifications</Text>
              <Text style={styles.preferenceSubtext}>
                Receive class reminders
              </Text>
            </View>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: "#F1F2F6", true: "#6C5CE7" }}
            thumbColor="#fff"
            ios_backgroundColor="#F1F2F6"
          />
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.preferenceRow}>
          <View style={styles.preferenceLeft}>
            <View
              style={[styles.preferenceIcon, { backgroundColor: "#00B89420" }]}
            >
              <Ionicons name="moon-outline" size={20} color="#00B894" />
            </View>
            <View>
              <Text style={styles.preferenceLabel}>Dark Mode</Text>
              <Text style={styles.preferenceSubtext}>
                Switch theme appearance
              </Text>
            </View>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: "#F1F2F6", true: "#00B894" }}
            thumbColor="#fff"
            ios_backgroundColor="#F1F2F6"
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
                <View
                  style={[
                    styles.menuIconWrapper,
                    { backgroundColor: item.color + "20" },
                  ]}
                >
                  <Ionicons name={item.icon} size={20} color={item.color} />
                </View>
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
      <StatusBar barStyle="light-content" backgroundColor="#6C5CE7" />

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
    paddingBottom: 16,
    backgroundColor: "#6C5CE7",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: -0.5,
  },
  shareButton: {
    padding: 8,
  },
  profileHeader: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBottom: 20,
    marginBottom: 16,
    position: "relative",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  profileBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },
  profileGradient: {
    flex: 1,
    backgroundColor: "#6C5CE7",
    opacity: 0.8,
  },
  imageContainer: {
    position: "relative",
    marginTop: 40,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: "#6C5CE7",
    backgroundColor: "#fff",
  },
  editImageBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#6C5CE7",
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
    elevation: 4,
    shadowColor: "#6C5CE7",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2D3436",
    marginTop: 12,
    letterSpacing: -0.5,
  },
  profileGrade: {
    fontSize: 15,
    color: "#999",
    marginTop: 2,
  },
  profileStats: {
    flexDirection: "row",
    marginTop: 16,
    paddingHorizontal: 20,
    width: "100%",
    gap: 8,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#F8F9FA",
  },
  statIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3436",
  },
  statLabel: {
    fontSize: 11,
    color: "#999",
    marginTop: 1,
  },
  editProfileButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6C5CE7",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 16,
    gap: 8,
    elevation: 4,
    shadowColor: "#6C5CE7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  editProfileActive: {
    backgroundColor: "#FF6B6B",
    shadowColor: "#FF6B6B",
  },
  editProfileText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3436",
    letterSpacing: -0.3,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 4,
  },
  infoIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    color: "#2D3436",
    fontWeight: "500",
  },
  infoInput: {
    fontSize: 15,
    color: "#2D3436",
    borderWidth: 1,
    borderColor: "#F1F2F6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#F8F9FA",
  },
  bioInput: {
    minHeight: 60,
    textAlignVertical: "top",
  },
  infoDivider: {
    height: 1,
    backgroundColor: "#F1F2F6",
    marginVertical: 8,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00B894",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
    elevation: 4,
    shadowColor: "#00B894",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
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
  preferenceIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  preferenceLabel: {
    fontSize: 15,
    color: "#2D3436",
    fontWeight: "500",
  },
  preferenceSubtext: {
    fontSize: 12,
    color: "#999",
    marginTop: 1,
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
  menuIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  menuLabel: {
    fontSize: 15,
    color: "#2D3436",
    fontWeight: "500",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#F1F2F6",
  },
  bottomSpacing: {
    height: 20,
  },
});

export default ProfileScreen;
