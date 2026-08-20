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

const StudentUpdateScreen = ({ navigation, route }) => {
  const { user, userInfo } = route.params;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.displayName?.split(" ")[0] || "",
    middleName: "",
    lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
    phone: "",
    standard: "",
    state: "",
    district: "",
  });

  const standards = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11th",
    "12th",
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
    if (!formData.standard) {
      Alert.alert("Error", "Please select your standard");
      return;
    }
    if (!formData.state) {
      Alert.alert("Error", "Please select your state");
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
        <Ionicons name="school-outline" size={60} color="#6C5CE7" />
        <Text style={styles.headerTitle}>Complete Your Student Profile</Text>
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
          <Text style={styles.label}>Standard *</Text>
          <View style={styles.dropdownContainer}>
            {standards.map((std) => (
              <TouchableOpacity
                key={std}
                style={[
                  styles.optionButton,
                  formData.standard === std && styles.selectedOption,
                ]}
                onPress={() => setFormData({ ...formData, standard: std })}
              >
                <Text
                  style={[
                    styles.optionText,
                    formData.standard === std && styles.selectedOptionText,
                  ]}
                >
                  {std}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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

export default StudentUpdateScreen;
