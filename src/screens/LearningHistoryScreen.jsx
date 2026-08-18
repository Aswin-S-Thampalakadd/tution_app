import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const LearningHistoryScreen = ({ navigation }) => {
  const historyData = [
    {
      id: "1",
      title: "Mathematics",
      type: "Completed",
      date: "Dec 15, 2025",
      duration: "12 weeks",
      score: "92%",
      status: "completed",
    },
    {
      id: "2",
      title: "Physics",
      type: "In Progress",
      date: "Started Nov 1, 2025",
      duration: "8/10 weeks",
      score: "85%",
      status: "in-progress",
    },
    {
      id: "3",
      title: "English Literature",
      type: "In Progress",
      date: "Started Nov 15, 2025",
      duration: "4/8 weeks",
      score: "78%",
      status: "in-progress",
    },
    {
      id: "4",
      title: "Web Development",
      type: "Completed",
      date: "Oct 30, 2025",
      duration: "16 weeks",
      score: "95%",
      status: "completed",
    },
    {
      id: "5",
      title: "Chemistry",
      type: "Completed",
      date: "Sep 20, 2025",
      duration: "14 weeks",
      score: "88%",
      status: "completed",
    },
  ];

  const renderHistoryItem = ({ item }) => (
    <TouchableOpacity style={styles.historyCard}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>{item.title}</Text>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                item.status === "completed" ? "#E8F5E9" : "#FFF3E0",
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color: item.status === "completed" ? "#4CAF50" : "#FF9800",
              },
            ]}
          >
            {item.status === "completed" ? "Completed" : "In Progress"}
          </Text>
        </View>
      </View>
      <View style={styles.historyDetails}>
        <View style={styles.historyRow}>
          <Ionicons name="calendar-outline" size={16} color="#999" />
          <Text style={styles.historyText}>{item.date}</Text>
        </View>
        <View style={styles.historyRow}>
          <Ionicons name="time-outline" size={16} color="#999" />
          <Text style={styles.historyText}>{item.duration}</Text>
        </View>
        <View style={styles.historyRow}>
          <Ionicons name="trophy-outline" size={16} color="#FFD700" />
          <Text style={styles.historyText}>Score: {item.score}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.viewButton,
          {
            backgroundColor:
              item.status === "completed" ? "#4CAF50" : "#20434F",
          },
        ]}
      >
        <Text style={styles.viewButtonText}>
          {item.status === "completed" ? "View Certificate" : "Continue"}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu-outline" size={28} color="#20434F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Learning History</Text>
        <View style={{ width: 28 }} />
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Total Courses</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>2</Text>
          <Text style={styles.statLabel}>In Progress</Text>
        </View>
      </View>
      <FlatList
        data={historyData}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
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
  statsContainer: {
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
  statCard: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
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
  listContent: {
    padding: 20,
    paddingBottom: 20,
  },
  historyCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#20434F",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "500",
  },
  historyDetails: {
    marginTop: 8,
  },
  historyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 8,
  },
  historyText: {
    fontSize: 13,
    color: "#666",
  },
  viewButton: {
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  viewButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
});

export default LearningHistoryScreen;
