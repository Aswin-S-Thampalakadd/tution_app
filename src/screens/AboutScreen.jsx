import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Linking,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const AboutScreen = ({ navigation }) => {
  const appVersion = "1.0.0";

  const socialLinks = [
    { icon: "logo-facebook", color: "#1877F2", url: "https://facebook.com" },
    { icon: "logo-twitter", color: "#1DA1F2", url: "https://twitter.com" },
    { icon: "logo-instagram", color: "#E4405F", url: "https://instagram.com" },
    { icon: "logo-youtube", color: "#FF0000", url: "https://youtube.com" },
  ];

  const features = [
    "Interactive live classes",
    "Personalized learning paths",
    "Expert tutors",
    "Progress tracking",
    "Certificates on completion",
    "24/7 support",
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu-outline" size={28} color="#20434F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="school-outline" size={60} color="#20434F" />
          </View>
          <Text style={styles.appName}>Tuition App</Text>
          <Text style={styles.appVersion}>Version {appVersion}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Us</Text>
          <Text style={styles.sectionText}>
            Tuition App is a leading online learning platform that connects
            students with expert tutors. Our mission is to make quality
            education accessible to everyone, anywhere, at any time.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connect With Us</Text>
          <View style={styles.socialContainer}>
            {socialLinks.map((social, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.socialButton, { backgroundColor: social.color }]}
                onPress={() => Linking.openURL(social.url)}
              >
                <Ionicons name={social.icon} size={24} color="#fff" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.legalButton}>
            <Text style={styles.legalText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.legalButton}>
            <Text style={styles.legalText}>Terms of Service</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.copyright}>
          © 2026 Tuition App. All rights reserved.
        </Text>

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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logoContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F0F4F8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#20434F",
  },
  appVersion: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#20434F",
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 10,
  },
  featureText: {
    fontSize: 14,
    color: "#20434F",
  },
  socialContainer: {
    flexDirection: "row",
    gap: 12,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  legalButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  legalText: {
    fontSize: 15,
    color: "#20434F",
  },
  copyright: {
    textAlign: "center",
    fontSize: 12,
    color: "#999",
    marginTop: 20,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default AboutScreen;
