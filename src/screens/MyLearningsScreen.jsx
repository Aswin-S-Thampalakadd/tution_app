import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextInput,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const MyLearningsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("In Progress");

  const tabs = ["In Progress", "Completed", "Saved", "Certificates"];

  const inProgressCourses = [
    {
      id: "1",
      title: "Mathematics",
      instructor: "Dr. Sarah Johnson",
      progress: 65,
      totalChapters: 12,
      completedChapters: 8,
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400",
      nextLesson: "Quadratic Equations",
      color: "#6C5CE7",
    },
    {
      id: "2",
      title: "Physics",
      instructor: "Prof. Michael Chen",
      progress: 40,
      totalChapters: 10,
      completedChapters: 4,
      image:
        "https://images.unsplash.com/photo-1530023367847-a683933f4172?w=400",
      nextLesson: "Newton's Laws",
      color: "#00B894",
    },
    {
      id: "3",
      title: "English Literature",
      instructor: "Ms. Emily Wilson",
      progress: 25,
      totalChapters: 8,
      completedChapters: 2,
      image:
        "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400",
      nextLesson: "Shakespeare Analysis",
      color: "#FF6B6B",
    },
  ];

  const completedCourses = [
    {
      id: "4",
      title: "Web Development",
      instructor: "Mr. James Lee",
      progress: 100,
      totalChapters: 16,
      completedChapters: 16,
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
      certificate: true,
      grade: "A+",
      color: "#6C5CE7",
    },
    {
      id: "5",
      title: "Chemistry",
      instructor: "Dr. Lisa Park",
      progress: 100,
      totalChapters: 14,
      completedChapters: 14,
      image:
        "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400",
      certificate: true,
      grade: "A",
      color: "#00B894",
    },
  ];

  const savedCourses = [
    {
      id: "6",
      title: "Data Science",
      instructor: "Prof. David Kim",
      rating: 4.8,
      students: "2.3k",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
      savedDate: "2 days ago",
    },
    {
      id: "7",
      title: "Art History",
      instructor: "Ms. Anna Martinez",
      rating: 4.6,
      students: "980",
      image:
        "https://images.unsplash.com/photo-1536924940847-227d4e5eb46a?w=400",
      savedDate: "1 week ago",
    },
  ];

  const certificates = [
    {
      id: "8",
      title: "Web Development",
      issuedDate: "Dec 15, 2025",
      grade: "A+",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
    },
    {
      id: "9",
      title: "Chemistry",
      issuedDate: "Nov 20, 2025",
      grade: "A",
      image:
        "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400",
    },
  ];

  const renderInProgressCourse = ({ item }) => (
    <TouchableOpacity
      style={styles.courseCard}
      onPress={() => navigation.navigate("CourseDetail", { course: item })}
    >
      <View style={styles.courseImageWrapper}>
        <Image source={{ uri: item.image }} style={styles.courseImage} />
        <View style={[styles.progressRing, { borderColor: item.color }]}>
          <Text style={styles.progressRingText}>{item.progress}%</Text>
        </View>
      </View>
      <View style={styles.courseContent}>
        <View style={styles.courseHeader}>
          <Text style={styles.courseTitle}>{item.title}</Text>
          <View style={[styles.chapterBadge, { backgroundColor: item.color }]}>
            <Text style={styles.chapterBadgeText}>
              {item.completedChapters}/{item.totalChapters}
            </Text>
          </View>
        </View>
        <Text style={styles.courseInstructor}>{item.instructor}</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${item.progress}%`, backgroundColor: item.color },
              ]}
            />
          </View>
        </View>
        <View style={styles.nextLessonContainer}>
          <Ionicons name="play-circle" size={18} color={item.color} />
          <Text style={styles.nextLessonText}>Next: {item.nextLesson}</Text>
        </View>
        <TouchableOpacity
          style={[styles.continueButton, { backgroundColor: item.color }]}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderCompletedCourse = ({ item }) => (
    <TouchableOpacity style={styles.courseCard}>
      <View style={styles.courseImageWrapper}>
        <Image source={{ uri: item.image }} style={styles.courseImage} />
        <View style={styles.completedBadge}>
          <Ionicons name="checkmark" size={16} color="#fff" />
        </View>
      </View>
      <View style={styles.courseContent}>
        <View style={styles.completedHeader}>
          <Text style={styles.courseTitle}>{item.title}</Text>
          <View style={styles.certificateBadge}>
            <Ionicons name="ribbon" size={14} color="#6C5CE7" />
            <Text style={styles.certificateBadgeText}>Certified</Text>
          </View>
        </View>
        <Text style={styles.courseInstructor}>{item.instructor}</Text>
        <View style={styles.completedInfo}>
          <View style={styles.infoItem}>
            <Ionicons name="checkmark-circle" size={18} color="#00B894" />
            <Text style={styles.infoText}>Completed</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Text style={styles.infoText}>Grade: {item.grade}</Text>
          </View>
        </View>
        <View style={styles.completedActions}>
          <TouchableOpacity style={styles.viewCertificateButton}>
            <Text style={styles.viewCertificateText}>View Certificate</Text>
            <Ionicons name="document-text-outline" size={18} color="#6C5CE7" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.reviewButton}>
            <Text style={styles.reviewButtonText}>Review</Text>
            <Ionicons name="star-outline" size={16} color="#FFD700" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSavedCourse = ({ item }) => (
    <TouchableOpacity style={styles.savedCourseCard}>
      <Image source={{ uri: item.image }} style={styles.savedCourseImage} />
      <View style={styles.savedCourseContent}>
        <Text style={styles.savedCourseTitle}>{item.title}</Text>
        <Text style={styles.savedCourseInstructor}>{item.instructor}</Text>
        <View style={styles.savedCourseMeta}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.savedCourseStudents}>
            <Ionicons name="people-outline" size={12} color="#999" />{" "}
            {item.students}
          </Text>
        </View>
        <View style={styles.savedFooter}>
          <Text style={styles.savedDate}>
            <Ionicons name="time-outline" size={12} color="#999" />{" "}
            {item.savedDate}
          </Text>
          <TouchableOpacity style={styles.enrollNowButton}>
            <Text style={styles.enrollNowText}>Enroll Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCertificate = ({ item }) => (
    <TouchableOpacity style={styles.certificateCard}>
      <Image source={{ uri: item.image }} style={styles.certificateImage} />
      <View style={styles.certificateContent}>
        <View style={styles.certificateHeader}>
          <Text style={styles.certificateTitle}>{item.title}</Text>
          <View style={styles.certificateGradeBadge}>
            <Text style={styles.certificateGradeBadgeText}>{item.grade}</Text>
          </View>
        </View>
        <Text style={styles.certificateDate}>
          <Ionicons name="calendar-outline" size={14} color="#999" /> Issued:{" "}
          {item.issuedDate}
        </Text>
        <TouchableOpacity style={styles.downloadButton}>
          <Ionicons name="download-outline" size={18} color="#6C5CE7" />
          <Text style={styles.downloadButtonText}>Download PDF</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "In Progress":
        return (
          <FlatList
            data={inProgressCourses}
            renderItem={renderInProgressCourse}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        );
      case "Completed":
        return (
          <FlatList
            data={completedCourses}
            renderItem={renderCompletedCourse}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        );
      case "Saved":
        return (
          <FlatList
            data={savedCourses}
            renderItem={renderSavedCourse}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        );
      case "Certificates":
        return (
          <FlatList
            data={certificates}
            renderItem={renderCertificate}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Learnings</Text>
          <Text style={styles.headerSubtitle}>Track your progress</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search-outline" size={24} color="#2D3436" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#2D3436" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>In Progress</Text>
          <View style={[styles.statIcon, { backgroundColor: "#6C5CE7" }]}>
            <Ionicons name="time-outline" size={12} color="#fff" />
          </View>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>2</Text>
          <Text style={styles.statLabel}>Completed</Text>
          <View style={[styles.statIcon, { backgroundColor: "#00B894" }]}>
            <Ionicons name="checkmark" size={12} color="#fff" />
          </View>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>4</Text>
          <Text style={styles.statLabel}>Certificates</Text>
          <View style={[styles.statIcon, { backgroundColor: "#FFD700" }]}>
            <Ionicons name="ribbon" size={12} color="#fff" />
          </View>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>8.5h</Text>
          <Text style={styles.statLabel}>Hours Spent</Text>
          <View style={[styles.statIcon, { backgroundColor: "#FF6B6B" }]}>
            <Ionicons name="clock-outline" size={12} color="#fff" />
          </View>
        </View>
      </View>

      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      {renderContent()}
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
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  searchButton: {
    padding: 8,
  },
  notificationButton: {
    position: "relative",
    padding: 8,
  },
  notificationDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B6B",
    borderWidth: 2,
    borderColor: "#fff",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 20,
    paddingVertical: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2D3436",
  },
  statLabel: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },
  statIcon: {
    position: "absolute",
    top: -8,
    right: 12,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#F1F2F6",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 4,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    position: "relative",
  },
  activeTab: {
    backgroundColor: "#6C5CE7",
  },
  tabText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#999",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "600",
  },
  tabIndicator: {
    position: "absolute",
    bottom: -8,
    width: 20,
    height: 3,
    backgroundColor: "#6C5CE7",
    borderRadius: 2,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 16,
  },
  courseCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  courseImageWrapper: {
    position: "relative",
  },
  courseImage: {
    width: "100%",
    height: 160,
  },
  progressRing: {
    position: "absolute",
    bottom: -20,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  progressRingText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2D3436",
  },
  courseContent: {
    padding: 16,
    paddingTop: 28,
  },
  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3436",
    flex: 1,
  },
  chapterBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  chapterBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  courseInstructor: {
    fontSize: 14,
    color: "#999",
    marginTop: 2,
    marginBottom: 10,
  },
  progressContainer: {
    marginVertical: 6,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#F1F2F6",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  nextLessonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 14,
    gap: 6,
  },
  nextLessonText: {
    fontSize: 13,
    color: "#666",
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 14,
    gap: 8,
  },
  continueButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  completedBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#00B894",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  completedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  certificateBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#6C5CE7",
  },
  certificateBadgeText: {
    color: "#6C5CE7",
    fontSize: 10,
    fontWeight: "600",
  },
  completedInfo: {
    flexDirection: "row",
    marginTop: 6,
    marginBottom: 14,
    gap: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: "#666",
  },
  completedActions: {
    flexDirection: "row",
    gap: 10,
  },
  viewCertificateButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#6C5CE7",
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  viewCertificateText: {
    color: "#6C5CE7",
    fontWeight: "600",
    fontSize: 13,
  },
  reviewButton: {
    flex: 0.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF8E1",
    paddingVertical: 10,
    borderRadius: 12,
    gap: 4,
  },
  reviewButtonText: {
    color: "#FFD700",
    fontWeight: "600",
    fontSize: 13,
  },
  savedCourseCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  savedCourseImage: {
    width: 120,
    height: 130,
  },
  savedCourseContent: {
    flex: 1,
    padding: 14,
    justifyContent: "space-between",
  },
  savedCourseTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2D3436",
  },
  savedCourseInstructor: {
    fontSize: 13,
    color: "#999",
    marginTop: 2,
  },
  savedCourseMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2D3436",
  },
  savedCourseStudents: {
    fontSize: 12,
    color: "#999",
    flexDirection: "row",
    alignItems: "center",
  },
  savedFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  savedDate: {
    fontSize: 11,
    color: "#999",
  },
  enrollNowButton: {
    backgroundColor: "#6C5CE7",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 10,
  },
  enrollNowText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  certificateCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  certificateImage: {
    width: 120,
    height: 120,
  },
  certificateContent: {
    flex: 1,
    padding: 14,
    justifyContent: "center",
  },
  certificateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  certificateTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2D3436",
    flex: 1,
  },
  certificateGradeBadge: {
    backgroundColor: "#FFD700",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  certificateGradeBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  certificateDate: {
    fontSize: 13,
    color: "#999",
    marginTop: 4,
    marginBottom: 8,
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#6C5CE7",
  },
  downloadButtonText: {
    fontSize: 13,
    color: "#6C5CE7",
    fontWeight: "600",
  },
});

export default MyLearningsScreen;
