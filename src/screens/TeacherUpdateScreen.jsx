import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { saveUserData } from "../services/authService";

const TeacherUpdateScreen = ({ navigation, route }) => {
  const { user, userInfo } = route.params;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.displayName?.split(" ")[0] || "",
    middleName: "",
    lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
    phone: "",
    qualification: "",
    specialization: "",
    experience: "",
    state: "",
    district: "",
    bio: "",
    subjects: "",
  });

  const qualifications = [
    "B.Ed",
    "M.Ed",
    "Ph.D",
    "M.Sc",
    "M.A",
    "B.Sc",
    "B.A",
    "Other",
  ];
  const states = [
    "Kerala",
    "Tamil Nadu",
    "Karnataka",
    "Andhra Pradesh",
    "Maharashtra",
    "Delhi",
    "Other",
  ];

  const handleSubmit = async () => {
    // Validation
    if (!formData.firstName.trim()) {
      Alert.alert("Error", "Please enter your first name");
      return;
    }
    if (!formData.phone.trim()) {
      Alert.alert("Error", "Please enter your phone number");
      return;
    }
    if (!formData.qualification) {
      Alert.alert("Error", "Please select your qualification");
      return;
    }
    if (!formData.specialization.trim()) {
      Alert.alert("Error", "Please enter your specialization");
      return;
    }
    if (!formData.experience) {
      Alert.alert("Error", "Please enter your experience");
      return;
    }

    setLoading(true);
    try {
      await saveUserData(user.uid, {
        ...formData,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        updatedAt: new Date().toISOString(),
        profileCompleted: true,
      });

      Alert.alert("Success", "Profile updated successfully!", [
        {
          text: "Continue",
          onPress: () => navigation.replace("MainApp"),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-outline" size={60} color="#6C5CE7" />
        <Text style={styles.headerTitle}>Complete Your Teacher Profile</Text>
        <Text style={styles.headerSubtitle}>
          Please provide your details to continue
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name *</Text>
          <TextInput
            style={styles.input}
            value={formData.firstName}
            onChangeText={(text) =>
              setFormData({ ...formData, firstName: text })
            }
            placeholder="Enter your first name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Middle Name</Text>
          <TextInput
            style={styles.input}
            value={formData.middleName}
            onChangeText={(text) =>
              setFormData({ ...formData, middleName: text })
            }
            placeholder="Enter your middle name (optional)"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={formData.lastName}
            onChangeText={(text) =>
              setFormData({ ...formData, lastName: text })
            }
            placeholder="Enter your last name (optional)"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number *</Text>
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Qualification *</Text>
          <View style={styles.dropdownContainer}>
            {qualifications.map((qual) => (
              <TouchableOpacity
                key={qual}
                style={[
                  styles.optionButton,
                  formData.qualification === qual && styles.selectedOption,
                ]}
                onPress={() =>
                  setFormData({ ...formData, qualification: qual })
                }
              >
                <Text
                  style={[
                    styles.optionText,
                    formData.qualification === qual &&
                      styles.selectedOptionText,
                  ]}
                >
                  {qual}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Specialization *</Text>
          <TextInput
            style={styles.input}
            value={formData.specialization}
            onChangeText={(text) =>
              setFormData({ ...formData, specialization: text })
            }
            placeholder="e.g., Mathematics, Physics, English"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Years of Experience *</Text>
          <TextInput
            style={styles.input}
            value={formData.experience}
            onChangeText={(text) =>
              setFormData({ ...formData, experience: text })
            }
            placeholder="e.g., 5 years"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Subjects You Can Teach</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.subjects}
            onChangeText={(text) =>
              setFormData({ ...formData, subjects: text })
            }
            placeholder="Enter subjects separated by commas"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bio / About You</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.bio}
            onChangeText={(text) => setFormData({ ...formData, bio: text })}
            placeholder="Tell students about yourself"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>State *</Text>
          <View style={styles.dropdownContainer}>
            {states.map((state) => (
              <TouchableOpacity
                key={state}
                style={[
                  styles.optionButton,
                  formData.state === state && styles.selectedOption,
                ]}
                onPress={() => setFormData({ ...formData, state })}
              >
                <Text
                  style={[
                    styles.optionText,
                    formData.state === state && styles.selectedOptionText,
                  ]}
                >
                  {state}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>District</Text>
          <TextInput
            style={styles.input}
            value={formData.district}
            onChangeText={(text) =>
              setFormData({ ...formData, district: text })
            }
            placeholder="Enter your district (optional)"
          />
        </View>

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Complete Profile</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: "#F8F9FA",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D3436",
    marginTop: 12,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#636E72",
    marginTop: 4,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2D3436",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DFE6E9",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#F8F9FA",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  dropdownContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DFE6E9",
    margin: 4,
    backgroundColor: "#fff",
  },
  selectedOption: {
    backgroundColor: "#6C5CE7",
    borderColor: "#6C5CE7",
  },
  optionText: {
    fontSize: 14,
    color: "#2D3436",
  },
  selectedOptionText: {
    color: "#fff",
  },
  submitButton: {
    backgroundColor: "#6C5CE7",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default TeacherUpdateScreen;
