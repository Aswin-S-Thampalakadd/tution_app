import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const CourseDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { course } = route.params;
  const [activeTab, setActiveTab] = useState("Overview");

  const chapters = [
    {
      id: "1",
      title: "Introduction to Algebra",
      duration: "45 min",
      completed: false,
    },
    {
      id: "2",
      title: "Linear Equations",
      duration: "60 min",
      completed: false,
    },
    {
      id: "3",
      title: "Quadratic Equations",
      duration: "50 min",
      completed: false,
    },
    { id: "4", title: "Polynomials", duration: "55 min", completed: false },
    {
      id: "5",
      title: "Trigonometry Basics",
      duration: "70 min",
      completed: false,
    },
    {
      id: "6",
      title: "Geometry Fundamentals",
      duration: "65 min",
      completed: false,
    },
  ];

  const reviews = [
    {
      id: "1",
      name: "Emma Thompson",
      rating: 5,
      comment:
        "Excellent course! The instructor explains concepts very clearly.",
      date: "2 days ago",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: "2",
      name: "David Miller",
      rating: 4,
      comment: "Great content, but could use more practice problems.",
      date: "1 week ago",
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: "3",
      name: "Sophia Lee",
      rating: 5,
      comment: "Loved the interactive sessions and quizzes!",
      date: "2 weeks ago",
      image: "https://i.pravatar.cc/150?img=4",
    },
  ];

  const tutor = {
    name: "Dr. Sarah Johnson",
    subject: "Mathematics",
    rating: 4.8,
    students: 1240,
    courses: 8,
    experience: "12 years",
    image: "https://i.pravatar.cc/150?img=5",
    bio: "PhD in Mathematics from Stanford University. Passionate about making math fun and accessible for all students.",
  };

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={16}
          color={i <= rating ? "#FFD700" : "#ddd"}
        />
      );
    }
    return stars;
  };

  const OverviewTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={20} color="#20434F" />
            <Text style={styles.infoLabel}>Duration</Text>
            <Text style={styles.infoValue}>{course.duration}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="people-outline" size={20} color="#20434F" />
            <Text style={styles.infoLabel}>Students</Text>
            <Text style={styles.infoValue}>{course.students}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="book-outline" size={20} color="#20434F" />
            <Text style={styles.infoLabel}>Chapters</Text>
            <Text style={styles.infoValue}>{chapters.length}</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Course Description</Text>
        <Text style={styles.description}>
          This comprehensive {course.title} course covers all fundamental
          concepts with practical examples and interactive exercises. Perfect
          for students looking to build a strong foundation in{" "}
          {course.title.toLowerCase()}.
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>What You'll Learn</Text>
        {chapters.slice(0, 4).map((chapter) => (
          <View key={chapter.id} style={styles.learningItem}>
            <Ionicons name="checkmark-circle" size={20} color="#20434F" />
            <Text style={styles.learningText}>{chapter.title}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All Chapters</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const ChaptersTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.sectionTitle}>Course Chapters</Text>
          <Text style={styles.progressText}>0/{chapters.length} Completed</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "0%" }]} />
        </View>
        {chapters.map((chapter, index) => (
          <TouchableOpacity key={chapter.id} style={styles.chapterItem}>
            <View style={styles.chapterNumber}>
              <Text style={styles.chapterNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.chapterContent}>
              <Text style={styles.chapterTitle}>{chapter.title}</Text>
              <View style={styles.chapterMeta}>
                <Ionicons name="time-outline" size={14} color="#999" />
                <Text style={styles.chapterDuration}>{chapter.duration}</Text>
                <View style={styles.chapterStatus}>
                  <Text style={styles.chapterStatusText}>Not Started</Text>
                </View>
              </View>
            </View>
            <Ionicons name="play-circle-outline" size={24} color="#20434F" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const TutorTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.tutorCard}>
        <Image source={{ uri: tutor.image }} style={styles.tutorProfileImage} />
        <Text style={styles.tutorProfileName}>{tutor.name}</Text>
        <Text style={styles.tutorProfileSubject}>{tutor.subject}</Text>
        <View style={styles.tutorProfileRating}>
          {renderStars(tutor.rating)}
          <Text style={styles.tutorProfileRatingText}>{tutor.rating}</Text>
        </View>
      </View>

      <View style={styles.tutorStats}>
        <View style={styles.tutorStatItem}>
          <Text style={styles.tutorStatNumber}>{tutor.students}+</Text>
          <Text style={styles.tutorStatLabel}>Students</Text>
        </View>
        <View style={styles.tutorStatDivider} />
        <View style={styles.tutorStatItem}>
          <Text style={styles.tutorStatNumber}>{tutor.courses}</Text>
          <Text style={styles.tutorStatLabel}>Courses</Text>
        </View>
        <View style={styles.tutorStatDivider} />
        <View style={styles.tutorStatItem}>
          <Text style={styles.tutorStatNumber}>{tutor.experience}</Text>
          <Text style={styles.tutorStatLabel}>Experience</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>About the Tutor</Text>
        <Text style={styles.description}>{tutor.bio}</Text>
      </View>
    </View>
  );

  const ReviewsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.ratingSummary}>
        <Text style={styles.ratingBig}>{course.rating}</Text>
        <View style={styles.ratingStarsBig}>{renderStars(course.rating)}</View>
        <Text style={styles.ratingCount}>
          Based on {course.students} reviews
        </Text>
      </View>

      {reviews.map((review) => (
        <View key={review.id} style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Image
              source={{ uri: review.image }}
              style={styles.reviewerImage}
            />
            <View style={styles.reviewerInfo}>
              <Text style={styles.reviewerName}>{review.name}</Text>
              <View style={styles.reviewerRating}>
                {renderStars(review.rating)}
              </View>
            </View>
            <Text style={styles.reviewDate}>{review.date}</Text>
          </View>
          <Text style={styles.reviewComment}>{review.comment}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.writeReviewButton}>
        <Text style={styles.writeReviewText}>Write a Review</Text>
      </TouchableOpacity>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return <OverviewTab />;
      case "Chapters":
        return <ChaptersTab />;
      case "Tutor":
        return <TutorTab />;
      case "Reviews":
        return <ReviewsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: course.image }} style={styles.mainImage} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookmarkButton}>
            <Ionicons name="bookmark-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.titleSection}>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseSubtitle}>{course.instructor}</Text>
          </View>

          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-social-outline" size={20} color="#20434F" />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="download-outline" size={20} color="#20434F" />
              <Text style={styles.actionText}>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="heart-outline" size={20} color="#20434F" />
              <Text style={styles.actionText}>Save</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tabContainer}>
            {["Overview", "Chapters", "Tutor", "Reviews"].map((tab) => (
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
              </TouchableOpacity>
            ))}
          </View>

          {renderTabContent()}

          <TouchableOpacity style={styles.enrollButton}>
            <Text style={styles.enrollButtonText}>
              Enroll Now - {course.price}
            </Text>
          </TouchableOpacity>

          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 250,
  },
  mainImage: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  bookmarkButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleSection: {
    marginBottom: 20,
  },
  courseTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#20434F",
    marginBottom: 6,
  },
  courseSubtitle: {
    fontSize: 16,
    color: "#666",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 25,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  actionButton: {
    alignItems: "center",
  },
  actionText: {
    fontSize: 12,
    color: "#20434F",
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
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
    fontSize: 13,
    fontWeight: "500",
    color: "#999",
  },
  activeTabText: {
    color: "#fff",
  },
  tabContent: {
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  infoItem: {
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#20434F",
    marginTop: 2,
  },
  sectionContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#20434F",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  learningItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  learningText: {
    fontSize: 14,
    color: "#444",
    marginLeft: 10,
  },
  viewAllButton: {
    marginTop: 8,
    alignSelf: "center",
  },
  viewAllText: {
    color: "#20434F",
    fontWeight: "600",
    fontSize: 14,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: "#999",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    marginBottom: 16,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#20434F",
    borderRadius: 3,
  },
  chapterItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  chapterNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#F0F4F8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  chapterNumberText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#20434F",
  },
  chapterContent: {
    flex: 1,
  },
  chapterTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#20434F",
    marginBottom: 4,
  },
  chapterMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  chapterDuration: {
    fontSize: 12,
    color: "#999",
    marginLeft: 4,
    marginRight: 12,
  },
  chapterStatus: {
    backgroundColor: "#FFF3E0",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  chapterStatusText: {
    fontSize: 10,
    color: "#FF9800",
    fontWeight: "500",
  },
  tutorCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tutorProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  tutorProfileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#20434F",
  },
  tutorProfileSubject: {
    fontSize: 14,
    color: "#999",
    marginBottom: 6,
  },
  tutorProfileRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  tutorProfileRatingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#20434F",
    marginLeft: 6,
  },
  tutorStats: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tutorStatItem: {
    flex: 1,
    alignItems: "center",
  },
  tutorStatNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#20434F",
  },
  tutorStatLabel: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  tutorStatDivider: {
    width: 1,
    backgroundColor: "#e0e0e0",
  },
  ratingSummary: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  ratingBig: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#20434F",
  },
  ratingStarsBig: {
    flexDirection: "row",
    marginVertical: 8,
  },
  ratingCount: {
    fontSize: 14,
    color: "#999",
  },
  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#20434F",
  },
  reviewerRating: {
    flexDirection: "row",
    marginTop: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: "#999",
  },
  reviewComment: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  writeReviewButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#20434F",
    marginBottom: 20,
  },
  writeReviewText: {
    color: "#20434F",
    fontWeight: "600",
    fontSize: 14,
  },
  enrollButton: {
    backgroundColor: "#20434F",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#20434F",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  enrollButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomSpacing: {
    height: 20,
  },
});

export default CourseDetailScreen;
