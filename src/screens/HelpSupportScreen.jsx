import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const HelpSupportScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      id: "1",
      question: "How do I enroll in a course?",
      answer:
        "To enroll in a course, go to the course details page and click on the 'Enroll Now' button. You'll be prompted to complete the payment process.",
    },
    {
      id: "2",
      question: "How can I access my certificates?",
      answer:
        "Your certificates are available in the 'My Learnings' section. Navigate to the 'Completed' tab and click on 'View Certificate' for any completed course.",
    },
    {
      id: "3",
      question: "What payment methods are accepted?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. You can add your payment methods in the Payments section.",
    },
    {
      id: "4",
      question: "How do I contact a tutor?",
      answer:
        "You can message your tutors directly through the Messages section. Simply select the tutor you want to contact and send them a message.",
    },
    {
      id: "5",
      question: "Can I get a refund?",
      answer:
        "Yes, we offer a 30-day money-back guarantee for all courses. Contact our support team to initiate a refund request.",
    },
  ];

  const supportOptions = [
    { icon: "chatbubbles-outline", label: "Live Chat", color: "#20434F" },
    { icon: "mail-outline", label: "Email Support", color: "#FF9800" },
    { icon: "call-outline", label: "Call Support", color: "#4CAF50" },
    { icon: "help-circle-outline", label: "FAQ", color: "#2196F3" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu-outline" size={28} color="#20434F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search help articles..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <Text style={styles.sectionTitle}>Contact Support</Text>
        <View style={styles.supportGrid}>
          {supportOptions.map((item, index) => (
            <TouchableOpacity key={index} style={styles.supportCard}>
              <View
                style={[styles.supportIcon, { backgroundColor: item.color }]}
              >
                <Ionicons name={item.icon} size={24} color="#fff" />
              </View>
              <Text style={styles.supportLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {faqs.map((faq) => (
          <TouchableOpacity key={faq.id} style={styles.faqCard}>
            <View style={styles.faqHeader}>
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Ionicons name="chevron-down-outline" size={20} color="#20434F" />
            </View>
            <Text style={styles.faqAnswer}>{faq.answer}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.emailButton}>
          <Ionicons name="mail-outline" size={20} color="#fff" />
          <Text style={styles.emailButtonText}>Send us an Email</Text>
        </TouchableOpacity>

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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: "#20434F",
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#20434F",
    marginTop: 20,
    marginBottom: 12,
  },
  supportGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  supportCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  supportIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  supportLabel: {
    fontSize: 13,
    color: "#20434F",
    fontWeight: "500",
  },
  faqCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: "600",
    color: "#20434F",
    flex: 1,
    marginRight: 8,
  },
  faqAnswer: {
    fontSize: 13,
    color: "#666",
    marginTop: 8,
    lineHeight: 20,
  },
  emailButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#20434F",
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 10,
    gap: 8,
  },
  emailButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomSpacing: {
    height: 20,
  },
});

export default HelpSupportScreen;
