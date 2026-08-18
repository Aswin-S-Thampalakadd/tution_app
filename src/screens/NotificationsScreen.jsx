import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const NotificationsScreen = () => {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Unread", "Important"];

  const notifications = [
    {
      id: "1",
      title: "New Course Available",
      message: "Web Development Bootcamp is now available. Enroll today!",
      time: "2 min ago",
      type: "course",
      read: false,
      important: true,
      icon: "school-outline",
      color: "#6C5CE7",
    },
    {
      id: "2",
      title: "Class Reminder",
      message: "Your Mathematics class starts in 30 minutes. Be ready!",
      time: "15 min ago",
      type: "reminder",
      read: false,
      important: false,
      icon: "time-outline",
      color: "#FF6B6B",
    },
    {
      id: "3",
      title: "New Message from Tutor",
      message: "Dr. Sarah Johnson sent you a message about your progress.",
      time: "1 hour ago",
      type: "message",
      read: true,
      important: false,
      icon: "chatbubble-outline",
      color: "#00B894",
    },
    {
      id: "4",
      title: "Certificate Awarded",
      message: "Congratulations! You've earned a certificate in Physics.",
      time: "2 hours ago",
      type: "achievement",
      read: true,
      important: true,
      icon: "ribbon-outline",
      color: "#FFD93D",
    },
    {
      id: "5",
      title: "Payment Successful",
      message: "Your payment of $49.99 for Mathematics course was successful.",
      time: "1 day ago",
      type: "payment",
      read: true,
      important: false,
      icon: "card-outline",
      color: "#4ECDC4",
    },
    {
      id: "6",
      title: "New Course Recommendation",
      message: "Based on your interest, we recommend Data Science course.",
      time: "2 days ago",
      type: "recommendation",
      read: true,
      important: false,
      icon: "bulb-outline",
      color: "#FFA07A",
    },
    {
      id: "7",
      title: "Assignment Reminder",
      message: "Don't forget to submit your assignment in Chemistry class.",
      time: "3 days ago",
      type: "reminder",
      read: true,
      important: false,
      icon: "alert-circle-outline",
      color: "#FF6B6B",
    },
  ];

  const getFilteredNotifications = () => {
    if (activeFilter === "All") return notifications;
    if (activeFilter === "Unread") return notifications.filter((n) => !n.read);
    if (activeFilter === "Important")
      return notifications.filter((n) => n.important);
    return notifications;
  };

  const getTimeAgo = (time) => {
    return time;
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationCard, !item.read && styles.unreadCard]}
      onPress={() => console.log("Notification pressed:", item.id)}
    >
      <View
        style={[styles.iconWrapper, { backgroundColor: item.color + "20" }]}
      >
        <Ionicons name={item.icon} size={24} color={item.color} />
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text
            style={[styles.notificationTitle, !item.read && styles.unreadTitle]}
          >
            {item.title}
          </Text>
          {item.important && (
            <View style={styles.importantBadge}>
              <Text style={styles.importantBadgeText}>Important</Text>
            </View>
          )}
        </View>
        <Text style={styles.notificationMessage} numberOfLines={2}>
          {item.message}
        </Text>
        <View style={styles.notificationFooter}>
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={12} color="#999" />
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
          {!item.read && <View style={styles.unreadDot} />}
        </View>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Ionicons name="ellipsis-vertical" size={18} color="#999" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.markAllButton}>
          <Text style={styles.markAllText}>Mark All Read</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilter === filter && styles.filterActive,
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
            {activeFilter === filter && <View style={styles.filterDot} />}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          {getFilteredNotifications().filter((n) => !n.read).length} unread
        </Text>
        <Text style={styles.countTotal}>
          {getFilteredNotifications().length} total
        </Text>
      </View>

      <FlatList
        data={getFilteredNotifications()}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-off-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No notifications</Text>
            <Text style={styles.emptySubtext}>
              You're all caught up! Check back later.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2D3436",
    letterSpacing: -0.5,
  },
  markAllButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#6C5CE720",
    borderRadius: 8,
  },
  markAllText: {
    fontSize: 12,
    color: "#6C5CE7",
    fontWeight: "600",
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F8F9FA",
    alignItems: "center",
    position: "relative",
  },
  filterActive: {
    backgroundColor: "#6C5CE7",
  },
  filterText: {
    fontSize: 13,
    color: "#999",
    fontWeight: "500",
  },
  filterTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  filterDot: {
    position: "absolute",
    bottom: -2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FFFFFF",
  },
  countContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  countText: {
    fontSize: 13,
    color: "#FF6B6B",
    fontWeight: "600",
  },
  countTotal: {
    fontSize: 13,
    color: "#999",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  notificationCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  unreadCard: {
    backgroundColor: "#F8F9FA",
    borderColor: "#6C5CE7",
    borderWidth: 1,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2D3436",
    flex: 1,
  },
  unreadTitle: {
    color: "#2D3436",
    fontWeight: "700",
  },
  importantBadge: {
    backgroundColor: "#FF6B6B20",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  importantBadgeText: {
    fontSize: 9,
    color: "#FF6B6B",
    fontWeight: "600",
  },
  notificationMessage: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    marginBottom: 6,
  },
  notificationFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timeText: {
    fontSize: 11,
    color: "#999",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#6C5CE7",
  },
  moreButton: {
    padding: 4,
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D3436",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
  },
});

export default NotificationsScreen;
