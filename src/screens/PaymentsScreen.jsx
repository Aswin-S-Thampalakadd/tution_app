import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const PaymentsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("History");

  const paymentHistory = [
    {
      id: "1",
      course: "Mathematics",
      amount: "$49.99",
      date: "Dec 15, 2025",
      status: "completed",
    },
    {
      id: "2",
      course: "Physics",
      amount: "$39.99",
      date: "Nov 20, 2025",
      status: "completed",
    },
    {
      id: "3",
      course: "English Literature",
      amount: "$29.99",
      date: "Nov 5, 2025",
      status: "completed",
    },
    {
      id: "4",
      course: "Web Development",
      amount: "$79.99",
      date: "Oct 15, 2025",
      status: "completed",
    },
  ];

  const paymentMethods = [
    {
      id: "1",
      type: "Visa",
      last4: "4242",
      expiry: "12/26",
      default: true,
    },
    {
      id: "2",
      type: "Mastercard",
      last4: "8888",
      expiry: "08/27",
      default: false,
    },
    {
      id: "3",
      type: "PayPal",
      email: "john@email.com",
      default: false,
    },
  ];

  const renderPaymentItem = ({ item }) => (
    <View style={styles.paymentCard}>
      <View style={styles.paymentHeader}>
        <View style={styles.paymentLeft}>
          <Text style={styles.paymentCourse}>{item.course}</Text>
          <Text style={styles.paymentDate}>{item.date}</Text>
        </View>
        <Text style={styles.paymentAmount}>{item.amount}</Text>
      </View>
      <View
        style={[
          styles.paymentStatus,
          {
            backgroundColor:
              item.status === "completed" ? "#E8F5E9" : "#FFF3E0",
            alignSelf: "flex-start",
          },
        ]}
      >
        <Text
          style={[
            styles.paymentStatusText,
            {
              color: item.status === "completed" ? "#4CAF50" : "#FF9800",
            },
          ]}
        >
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Text>
      </View>
    </View>
  );

  const renderMethodItem = ({ item }) => (
    <View style={styles.methodCard}>
      <View style={styles.methodIcon}>
        <Ionicons
          name={item.type === "PayPal" ? "logo-paypal" : "card-outline"}
          size={24}
          color="#20434F"
        />
      </View>
      <View style={styles.methodContent}>
        <Text style={styles.methodType}>{item.type}</Text>
        {item.last4 ? (
          <Text style={styles.methodDetails}>
            •••• {item.last4} • Expires {item.expiry}
          </Text>
        ) : (
          <Text style={styles.methodDetails}>{item.email}</Text>
        )}
      </View>
      {item.default && (
        <View style={styles.defaultBadge}>
          <Text style={styles.defaultText}>Default</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu-outline" size={28} color="#20434F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payments</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Spent</Text>
          <Text style={styles.summaryAmount}>$199.96</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Courses Purchased</Text>
          <Text style={styles.summaryAmount}>4</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "History" && styles.activeTab]}
          onPress={() => setActiveTab("History")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "History" && styles.activeTabText,
            ]}
          >
            Payment History
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Methods" && styles.activeTab]}
          onPress={() => setActiveTab("Methods")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Methods" && styles.activeTabText,
            ]}
          >
            Payment Methods
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activeTab === "History" ? paymentHistory : paymentMethods}
        renderItem={
          activeTab === "History" ? renderPaymentItem : renderMethodItem
        }
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={
          activeTab === "Methods" ? (
            <TouchableOpacity style={styles.addCardButton}>
              <Ionicons name="add-circle-outline" size={24} color="#20434F" />
              <Text style={styles.addCardText}>Add New Payment Method</Text>
            </TouchableOpacity>
          ) : null
        }
      />
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
  summaryContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    paddingVertical: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  summaryCard: {
    flex: 1,
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#999",
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#20434F",
    marginTop: 4,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: "#e0e0e0",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#20434F",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#999",
  },
  activeTabText: {
    color: "#fff",
  },
  listContent: {
    padding: 20,
    paddingBottom: 20,
  },
  paymentCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  paymentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentLeft: {
    flex: 1,
  },
  paymentCourse: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#20434F",
  },
  paymentDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  paymentAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#20434F",
  },
  paymentStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 8,
  },
  paymentStatusText: {
    fontSize: 11,
    fontWeight: "500",
  },
  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  methodIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F0F4F8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  methodContent: {
    flex: 1,
  },
  methodType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#20434F",
  },
  methodDetails: {
    fontSize: 13,
    color: "#999",
    marginTop: 2,
  },
  defaultBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  defaultText: {
    fontSize: 11,
    color: "#4CAF50",
    fontWeight: "500",
  },
  addCardButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#20434F",
    borderStyle: "dashed",
    gap: 8,
  },
  addCardText: {
    fontSize: 14,
    color: "#20434F",
    fontWeight: "500",
  },
});

export default PaymentsScreen;
