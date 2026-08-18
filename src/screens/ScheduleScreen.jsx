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
  const [viewType, setViewType] = useState("day");

  const dates = ["Today", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const scheduleData = [
    {
      id: "1",
      title: "Mathematics",
      tutor: "Dr. Sarah Johnson",
      time: "9:00 AM - 10:30 AM",
      type: "Live Class",
      status: "upcoming",
      color: "#6C5CE7",
      icon: "calculator-outline",
    },
    {
      id: "2",
      title: "Physics",
      tutor: "Prof. Michael Chen",
      time: "11:00 AM - 12:30 PM",
      type: "Live Class",
      status: "upcoming",
      color: "#00B894",
      icon: "flask-outline",
    },
    {
      id: "3",
      title: "English Literature",
      tutor: "Ms. Emily Wilson",
      time: "2:00 PM - 3:30 PM",
      type: "Group Study",
      status: "upcoming",
      color: "#FF6B6B",
      icon: "book-outline",
    },
    {
      id: "4",
      title: "Chemistry",
      tutor: "Dr. Lisa Park",
      time: "4:00 PM - 5:30 PM",
      type: "Live Class",
      status: "completed",
      color: "#FFD93D",
      icon: "flask-outline",
    },
    {
      id: "5",
      title: "Web Development",
      tutor: "Mr. James Lee",
      time: "6:00 PM - 7:30 PM",
      type: "Live Class",
      status: "upcoming",
      color: "#6C5CE7",
      icon: "code-outline",
    },
  ];

  const renderScheduleItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.scheduleCard, { borderLeftColor: item.color }]}
    >
      <View style={styles.scheduleHeader}>
        <View style={styles.scheduleTitleContainer}>
          <View
            style={[styles.iconWrapper, { backgroundColor: item.color + "20" }]}
          >
            <Ionicons name={item.icon} size={20} color={item.color} />
          </View>
          <View>
            <Text style={styles.scheduleTitle}>{item.title}</Text>
            <Text style={styles.tutorName}>{item.tutor}</Text>
          </View>
        </View>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                item.status === "upcoming" ? "#E8F8F5" : "#F5F5F5",
            },
          ]}
        >
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor:
                  item.status === "upcoming" ? "#00B894" : "#999",
              },
            ]}
          />
          <Text
            style={[
              styles.statusText,
              { color: item.status === "upcoming" ? "#00B894" : "#999" },
            ]}
          >
            {item.status === "upcoming" ? "Upcoming" : "Completed"}
          </Text>
        </View>
      </View>

      <View style={styles.scheduleDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={16} color="#6C5CE7" />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="videocam-outline" size={16} color="#6C5CE7" />
          <Text style={styles.detailText}>{item.type}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.joinButton, { backgroundColor: item.color }]}
      >
        <Text style={styles.joinButtonText}>Join Class</Text>
        <Ionicons name="arrow-forward" size={18} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderTimeSlot = ({ item }) => (
    <View style={styles.timeSlotItem}>
      <View style={styles.timeSlotLeft}>
        <Text style={styles.timeSlotHour}>9:00</Text>
        <View style={styles.timeSlotLine} />
      </View>
      <View style={styles.timeSlotContent}>
        {item && (
          <View style={[styles.timeSlotCard, { borderLeftColor: item.color }]}>
            <Text style={styles.timeSlotTitle}>{item.title}</Text>
            <Text style={styles.timeSlotTutor}>{item.tutor}</Text>
          </View>
        )}
      </View>
    </View>
  );

  const timeSlots = [
    { id: "1", time: "9:00 AM", course: scheduleData[0] },
    { id: "2", time: "10:00 AM", course: null },
    { id: "3", time: "11:00 AM", course: scheduleData[1] },
    { id: "4", time: "12:00 PM", course: null },
    { id: "5", time: "1:00 PM", course: null },
    { id: "6", time: "2:00 PM", course: scheduleData[2] },
    { id: "7", time: "3:00 PM", course: null },
    { id: "8", time: "4:00 PM", course: scheduleData[3] },
    { id: "9", time: "5:00 PM", course: null },
    { id: "10", time: "6:00 PM", course: scheduleData[4] },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Schedule</Text>
          <Text style={styles.headerSubtitle}>Manage your classes</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.viewToggle}>
            <Ionicons
              name={viewType === "day" ? "grid-outline" : "calendar-outline"}
              size={22}
              color="#6C5CE7"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={22} color="#2D3436" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.datesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
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
              {selectedDate === date && <View style={styles.dateIndicator} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <View style={[styles.summaryIcon, { backgroundColor: "#6C5CE720" }]}>
            <Ionicons name="calendar-outline" size={18} color="#6C5CE7" />
          </View>
          <View>
            <Text style={styles.summaryNumber}>3</Text>
            <Text style={styles.summaryLabel}>Today's Classes</Text>
          </View>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <View style={[styles.summaryIcon, { backgroundColor: "#00B89420" }]}>
            <Ionicons name="time-outline" size={18} color="#00B894" />
          </View>
          <View>
            <Text style={styles.summaryNumber}>2</Text>
            <Text style={styles.summaryLabel}>Upcoming</Text>
          </View>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <View style={[styles.summaryIcon, { backgroundColor: "#FFD93D20" }]}>
            <Ionicons name="checkmark-outline" size={18} color="#FFD93D" />
          </View>
          <View>
            <Text style={styles.summaryNumber}>1</Text>
            <Text style={styles.summaryLabel}>Completed</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Your Classes</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
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
    paddingBottom: 16,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2D3436",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#999",
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  viewToggle: {
    padding: 8,
    backgroundColor: "#F1F2F6",
    borderRadius: 10,
  },
  filterButton: {
    padding: 8,
    backgroundColor: "#F1F2F6",
    borderRadius: 10,
  },
  datesContainer: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F2F6",
  },
  datesContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  dateCard: {
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    minWidth: 60,
  },
  dateCardActive: {
    backgroundColor: "#6C5CE7",
  },
  dateDay: {
    fontSize: 14,
    color: "#999",
    fontWeight: "500",
  },
  dateDayActive: {
    color: "#fff",
    fontWeight: "600",
  },
  dateIndicator: {
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
    marginTop: 16,
    borderRadius: 16,
    paddingVertical: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  summaryItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  summaryIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3436",
    lineHeight: 22,
  },
  summaryLabel: {
    fontSize: 11,
    color: "#999",
  },
  summaryDivider: {
    width: 1,
    backgroundColor: "#F1F2F6",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3436",
  },
  seeAllText: {
    fontSize: 14,
    color: "#6C5CE7",
    fontWeight: "600",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  scheduleCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderLeftWidth: 4,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  scheduleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  scheduleTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2D3436",
  },
  tutorName: {
    fontSize: 13,
    color: "#999",
    marginTop: 1,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "500",
  },
  scheduleDetails: {
    flexDirection: "row",
    marginTop: 10,
    gap: 16,
    paddingLeft: 4,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    color: "#666",
  },
  joinButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 12,
    gap: 8,
  },
  joinButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  timeSlotItem: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  timeSlotLeft: {
    width: 60,
    alignItems: "center",
  },
  timeSlotHour: {
    fontSize: 12,
    color: "#999",
    fontWeight: "500",
  },
  timeSlotLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#F1F2F6",
    marginTop: 4,
  },
  timeSlotContent: {
    flex: 1,
    paddingLeft: 12,
  },
  timeSlotCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 3,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  timeSlotTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2D3436",
  },
  timeSlotTutor: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
});

export default ScheduleScreen;
