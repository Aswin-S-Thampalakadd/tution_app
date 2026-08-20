import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  signInWithGoogle,
  checkUserRole,
  saveUserData,
} from "../services/authService";
import { auth } from "../config/firebase";

const { width, height } = Dimensions.get("window");

const SignInScreen = ({ navigation }) => {
  const [loadingStudent, setLoadingStudent] = useState(false);
  const [loadingTeacher, setLoadingTeacher] = useState(false);

  const handleGoogleSignIn = async (selectedRole) => {
    if (selectedRole === "student") {
      setLoadingStudent(true);
    } else {
      setLoadingTeacher(true);
    }

    try {
      const { user, userInfo } = await signInWithGoogle();

      if (!user) {
        throw new Error("Failed to get user information");
      }

      const role = await checkUserRole(user.uid);

      if (role) {
        if (role === "student") {
          navigation.replace("MainApp");
        } else if (role === "teacher") {
          navigation.replace("MainApp");
        }
      } else {
        const userData = {
          email: user.email,
          displayName: user.displayName || userInfo?.data?.displayName || "",
          photoURL: user.photoURL || userInfo?.data?.photoURL || "",
          role: selectedRole,
          uid: user.uid,
          createdAt: new Date().toISOString(),
        };

        await saveUserData(user.uid, userData);

        if (selectedRole === "student") {
          navigation.replace("StudentUpdate", { user, userInfo });
        } else {
          navigation.replace("TeacherUpdate", { user, userInfo });
        }
      }
    } catch (error) {
      Alert.alert("Sign In Error", error.message);
    } finally {
      setLoadingStudent(false);
      setLoadingTeacher(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Image
            source={require("../../assets/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>TutorApp</Text>
          <Text style={styles.subtitle}>Learn & Teach Anytime, Anywhere</Text>
        </View>

        <View style={styles.roleSelectionContainer}>
          <Text style={styles.roleSelectionTitle}>Choose Your Role</Text>
          <Text style={styles.roleSelectionSubtitle}>
            Sign in to continue as a Student or Teacher
          </Text>

          <TouchableOpacity
            style={[
              styles.googleButton,
              styles.studentButton,
              loadingStudent && styles.disabledButton,
            ]}
            onPress={() => handleGoogleSignIn("student")}
            disabled={loadingStudent}
          >
            {loadingStudent ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <View style={styles.buttonIconContainer}>
                  <Ionicons name="logo-google" size={24} color="#fff" />
                </View>
                <View style={styles.buttonTextContainer}>
                  <Text style={styles.buttonRoleLabel}>STUDENT</Text>
                  <Text style={styles.googleButtonText}>
                    Continue with Google
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#fff" />
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.googleButton,
              styles.teacherButton,
              loadingTeacher && styles.disabledButton,
            ]}
            onPress={() => handleGoogleSignIn("teacher")}
            disabled={loadingTeacher}
          >
            {loadingTeacher ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <View style={styles.buttonIconContainer}>
                  <Ionicons name="logo-google" size={24} color="#fff" />
                </View>
                <View style={styles.buttonTextContainer}>
                  <Text style={styles.buttonRoleLabel}>TEACHER</Text>
                  <Text style={styles.googleButtonText}>
                    Continue with Google
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#fff" />
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="book-outline" size={20} color="#6C5CE7" />
            </View>
            <Text style={styles.featureText}>Quality Courses</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="people-outline" size={20} color="#6C5CE7" />
            </View>
            <Text style={styles.featureText}>Expert Teachers</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="calendar-outline" size={20} color="#6C5CE7" />
            </View>
            <Text style={styles.featureText}>Flexible Schedule</Text>
          </View>
        </View>

        <Text style={styles.termsText}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FE",
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 30,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2D3436",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: "#636E72",
    letterSpacing: 0.3,
  },
  roleSelectionContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 5,
    marginBottom: 24,
  },
  roleSelectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2D3436",
    textAlign: "center",
    marginBottom: 4,
  },
  roleSelectionSubtitle: {
    fontSize: 13,
    color: "#636E72",
    textAlign: "center",
    marginBottom: 24,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 3,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  studentButton: {
    backgroundColor: "#6C5CE7",
    shadowColor: "#6C5CE7",
  },
  teacherButton: {
    backgroundColor: "#00B894",
    shadowColor: "#00B894",
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  buttonTextContainer: {
    flex: 1,
  },
  buttonRoleLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "rgba(255,255,255,0.7)",
    letterSpacing: 1.5,
    marginBottom: 1,
  },
  googleButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  featureItem: {
    alignItems: "center",
  },
  featureIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(108, 92, 231, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  featureText: {
    fontSize: 11,
    color: "#2D3436",
    fontWeight: "500",
  },
  termsText: {
    fontSize: 11,
    color: "#B2BEC3",
    textAlign: "center",
    marginTop: 4,
    lineHeight: 16,
  },
});

export default SignInScreen;
