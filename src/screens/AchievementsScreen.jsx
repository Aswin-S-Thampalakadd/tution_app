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

const AchievementsScreen = ({ navigation }) => {
  const achievements = [
    {
      id: "1",
      title: "Math Master",
      description: "Completed all math courses with 90%+ score",
      icon: "calculator",
      color: "#4CAF50",
      earned: true,
    },
    {
      id: "2",
      title: "Science Whiz",
      description: "Completed all science courses",
      icon: "flask",
      color: "#2196F3",
      earned: true,
    },
    {
      id: "3",
      title: "Fast Learner",
      description: "Completed 5 courses in under 3 months",
      icon: "flash",
      color: "#FF9800",
      earned: true,
    },
    {
      id: "4",
      title: "Perfect Score",
      description: "Got 100% on any course",
      icon: "star",
      color: "#FFD700",
      earned: false,
    },
    {
      id: "5",
      title: "Dedicated Student",
      description: "Studied 50+ hours",
      icon: "time",
      color: "#9C27B0",
      earned: false,
    },
    {
      id: "6",
      title: "Team Player",
      description: "Participated in 10+ group studies",
      icon: "people",
      color: "#F44336",
      earned: false,
    },
  ];

  const renderAchievement = ({ item }) => (
    <TouchableOpacity
      style={[styles.achievementCard, !item.earned && styles.achievementLocked]}
    >
      <View
        style={[
          styles.achievementIcon,
          { backgroundColor: item.earned ? item.color : "#e0e0e0" },
        ]}
      >
        <Ionicons
          name={item.icon}
          size={28}
          color={item.earned ? "#fff" : "#999"}
        />
      </View>
      <View style={styles.achievementContent}>
        <Text style={styles.achievementTitle}>{item.title}</Text>
        <Text style={styles.achievementDescription}>{item.description}</Text>
      </View>
      {item.earned ? (
        <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
      ) : (
        <Ionicons name="lock-closed" size={20} color="#ccc" />
      )}
    </TouchableOpacity>
  );

  const totalEarned = achievements.filter((a) => a.earned).length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu-outline" size={28} color="#20434F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Achievements</Text>
        <View style={{ width: 28 }} />
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>
            {totalEarned}/{achievements.length} Earned
          </Text>
          <Text style={styles.progressPercent}>
            {Math.round((totalEarned / achievements.length) * 100)}%
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${(totalEarned / achievements.length) * 100}%`,
              },
            ]}
          />
        </View>
      </View>
      <FlatList
        data={achievements}
        renderItem={renderAchievement}
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
  progressContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 14,
    color: "#20434F",
    fontWeight: "500",
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#20434F",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#20434F",
    borderRadius: 3,
  },
  listContent: {
    padding: 20,
    paddingBottom: 20,
  },
  achievementCard: {
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
  achievementLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#20434F",
  },
  achievementDescription: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
});

export default AchievementsScreen;
