import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const ScheduleScreen = () => {
  const [selectedDate, setSelectedDate] = useState("Today");

  const dates = ["Today", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const scheduleData = [
    {
      id: "1",
      title: "Mathematics",
      tutor: "Dr. Sarah Johnson",
      time: "9:00 AM - 10:30 AM",
      type: "Live Class",
      status: "upcoming",
      color: "#20434F",
      icon: "calculator",
    },
    {
      id: "2",
      title: "Physics",
      tutor: "Prof. Michael Chen",
      time: "11:00 AM - 12:30 PM",
      type: "Live Class",
      status: "upcoming",
      color: "#4CAF50",
      icon: "flask",
    },
    {
      id: "3",
      title: "English Literature",
      tutor: "Ms. Emily Wilson",
      time: "2:00 PM - 3:30 PM",
      type: "Group Study",
      status: "upcoming",
      color: "#FF9800",
      icon: "book",
    },
    {
      id: "4",
      title: "Chemistry",
      tutor: "Dr. Lisa Park",
      time: "4:00 PM - 5:30 PM",
      type: "Live Class",
      status: "completed",
      color: "#9C27B0",
      icon: "flask",
    },
    {
      id: "5",
      title: "Web Development",
      tutor: "Mr. James Lee",
      time: "6:00 PM - 7:30 PM",
      type: "Live Class",
      status: "upcoming",
      color: "#F44336",
      icon: "code",
    },
  ];

  const renderScheduleItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.scheduleCard, { borderLeftColor: item.color }]}
    >
      <View style={styles.scheduleHeader}>
        <View style={styles.scheduleTitleContainer}>
          <Ionicons name={item.icon} size={20} color={item.color} />
          <Text style={styles.scheduleTitle}>{item.title}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                item.status === "upcoming" ? "#E8F5E9" : "#F5F5F5",
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: item.status === "upcoming" ? "#4CAF50" : "#999" },
            ]}
          >
            {item.status === "upcoming" ? "Upcoming" : "Completed"}
          </Text>
        </View>
      </View>

      <Text style={styles.tutorName}>{item.tutor}</Text>

      <View style={styles.scheduleTime}>
        <Ionicons name="time-outline" size={16} color="#999" />
        <Text style={styles.timeText}>{item.time}</Text>
      </View>

      <View style={styles.scheduleType}>
        <Ionicons name="videocam-outline" size={16} color="#999" />
        <Text style={styles.typeText}>{item.type}</Text>
      </View>

      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinButtonText}>Join Class</Text>
        <Ionicons name="arrow-forward" size={16} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Schedule</Text>
          <Text style={styles.headerSubtitle}>Today's classes</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={24} color="#20434F" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.datesContainer}
        contentContainerStyle={styles.datesContent}
      >
        {dates.map((date, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dateCard,
              selectedDate === date && styles.dateCardActive,
            ]}
            onPress={() => setSelectedDate(date)}
          >
            <Text
              style={[
                styles.dateDay,
                selectedDate === date && styles.dateDayActive,
              ]}
            >
              {date === "Today" ? "Today" : date.substring(0, 3)}
            </Text>
            {selectedDate === date && <View style={styles.dateDot} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>3</Text>
          <Text style={styles.summaryLabel}>Today's Classes</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>2</Text>
          <Text style={styles.summaryLabel}>Upcoming</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>1</Text>
          <Text style={styles.summaryLabel}>Completed</Text>
        </View>
      </View>

      <FlatList
        data={scheduleData}
        renderItem={renderScheduleItem}
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#20434F",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#999",
    marginTop: 2,
  },
  filterButton: {
    padding: 8,
  },
  datesContainer: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  datesContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  dateCard: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  dateCardActive: {
    backgroundColor: "#20434F",
  },
  dateDay: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  dateDayActive: {
    color: "#fff",
  },
  dateDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#fff",
    marginTop: 4,
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
  summaryNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#20434F",
  },
  summaryLabel: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: "#e0e0e0",
  },
  listContent: {
    padding: 20,
    paddingBottom: 20,
  },
  scheduleCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  scheduleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scheduleTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  scheduleTitle: {
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
  tutorName: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    marginLeft: 28,
  },
  scheduleTime: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginLeft: 28,
    gap: 6,
  },
  timeText: {
    fontSize: 13,
    color: "#999",
  },
  scheduleType: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginLeft: 28,
    gap: 6,
  },
  typeText: {
    fontSize: 13,
    color: "#999",
  },
  joinButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#20434F",
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 12,
    gap: 8,
  },
  joinButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default ScheduleScreen;
