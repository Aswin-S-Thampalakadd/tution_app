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
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const CourseDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { course } = route.params;
  const [activeTab, setActiveTab] = useState("Overview");
  const [isEnrolled, setIsEnrolled] = useState(false);

  const chapters = [
    {
      id: "1",
      title: "Introduction to Algebra",
      duration: "45 min",
      completed: false,
      locked: false,
    },
    {
      id: "2",
      title: "Linear Equations",
      duration: "60 min",
      completed: false,
      locked: false,
    },
    {
      id: "3",
      title: "Quadratic Equations",
      duration: "50 min",
      completed: false,
      locked: false,
    },
    {
      id: "4",
      title: "Polynomials",
      duration: "55 min",
      completed: false,
      locked: true,
    },
    {
      id: "5",
      title: "Trigonometry Basics",
      duration: "70 min",
      completed: false,
      locked: true,
    },
    {
      id: "6",
      title: "Geometry Fundamentals",
      duration: "65 min",
      completed: false,
      locked: true,
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

  const similarCourses = [
    {
      id: "1",
      title: "Advanced Calculus",
      instructor: "Prof. Michael Chen",
      rating: 4.9,
      price: "$59.99",
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400",
    },
    {
      id: "2",
      title: "Statistics & Probability",
      instructor: "Dr. Emily Watson",
      rating: 4.7,
      price: "$44.99",
      image:
        "https://images.unsplash.com/photo-1530023367847-a683933f4172?w=400",
    },
  ];

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

  const renderChapter = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.chapterItem, item.completed && styles.chapterCompleted]}
      disabled={item.locked}
    >
      <View style={styles.chapterLeft}>
        <View style={styles.chapterNumber}>
          <Text style={styles.chapterNumberText}>{index + 1}</Text>
        </View>
        <View style={styles.chapterContent}>
          <Text style={styles.chapterTitle}>{item.title}</Text>
          <View style={styles.chapterMeta}>
            <Ionicons name="time-outline" size={14} color="#999" />
            <Text style={styles.chapterDuration}>{item.duration}</Text>
          </View>
        </View>
      </View>
      {item.locked ? (
        <Ionicons name="lock-closed" size={20} color="#999" />
      ) : item.completed ? (
        <Ionicons name="checkmark-circle" size={24} color="#00B894" />
      ) : (
        <Ionicons name="play-circle" size={24} color="#6C5CE7" />
      )}
    </TouchableOpacity>
  );

  const OverviewTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Ionicons name="time-outline" size={24} color="#6C5CE7" />
          <Text style={styles.statValue}>{course.duration}</Text>
          <Text style={styles.statLabel}>Duration</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="people-outline" size={24} color="#6C5CE7" />
          <Text style={styles.statValue}>{course.students}</Text>
          <Text style={styles.statLabel}>Students</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="book-outline" size={24} color="#6C5CE7" />
          <Text style={styles.statValue}>{chapters.length}</Text>
          <Text style={styles.statLabel}>Chapters</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="star-outline" size={24} color="#6C5CE7" />
          <Text style={styles.statValue}>{course.rating}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>About This Course</Text>
        <Text style={styles.description}>
          This comprehensive {course.title} course covers all fundamental
          concepts with practical examples and interactive exercises. Perfect
          for students looking to build a strong foundation in{" "}
          {course.title.toLowerCase()}.
        </Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>What You'll Learn</Text>
        {chapters.slice(0, 4).map((chapter) => (
          <View key={chapter.id} style={styles.learningItem}>
            <View style={styles.learningCheck}>
              <Ionicons name="checkmark" size={16} color="#fff" />
            </View>
            <Text style={styles.learningText}>{chapter.title}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All Chapters →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const ChaptersTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionCard}>
        <View style={styles.progressHeader}>
          <View>
            <Text style={styles.sectionTitle}>Course Progress</Text>
            <Text style={styles.progressSubtext}>
              0 of {chapters.length} completed
            </Text>
          </View>
          <Text style={styles.progressPercent}>0%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "0%" }]} />
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>All Chapters</Text>
        <FlatList
          data={chapters}
          renderItem={renderChapter}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>
    </View>
  );

  const TutorTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.tutorProfileCard}>
        <Image source={{ uri: tutor.image }} style={styles.tutorProfileImage} />
        <View style={styles.tutorProfileInfo}>
          <Text style={styles.tutorProfileName}>{tutor.name}</Text>
          <Text style={styles.tutorProfileSubject}>{tutor.subject}</Text>
          <View style={styles.tutorProfileRating}>
            {renderStars(tutor.rating)}
            <Text style={styles.tutorProfileRatingText}>{tutor.rating}</Text>
          </View>
        </View>
      </View>

      <View style={styles.tutorStatsRow}>
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

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>About the Tutor</Text>
        <Text style={styles.description}>{tutor.bio}</Text>
        <TouchableOpacity style={styles.messageButton}>
          <Ionicons name="chatbubble-outline" size={20} color="#6C5CE7" />
          <Text style={styles.messageButtonText}>Message Tutor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const ReviewsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.ratingSummary}>
        <View style={styles.ratingLeft}>
          <Text style={styles.ratingBig}>{course.rating}</Text>
          <View style={styles.ratingStarsBig}>
            {renderStars(course.rating)}
          </View>
          <Text style={styles.ratingCount}>
            Based on {course.students} reviews
          </Text>
        </View>
        <View style={styles.ratingRight}>
          <View style={styles.ratingBarItem}>
            <Text style={styles.ratingBarLabel}>5</Text>
            <View style={styles.ratingBarTrack}>
              <View style={[styles.ratingBarFill, { width: "80%" }]} />
            </View>
          </View>
          <View style={styles.ratingBarItem}>
            <Text style={styles.ratingBarLabel}>4</Text>
            <View style={styles.ratingBarTrack}>
              <View style={[styles.ratingBarFill, { width: "60%" }]} />
            </View>
          </View>
          <View style={styles.ratingBarItem}>
            <Text style={styles.ratingBarLabel}>3</Text>
            <View style={styles.ratingBarTrack}>
              <View style={[styles.ratingBarFill, { width: "30%" }]} />
            </View>
          </View>
          <View style={styles.ratingBarItem}>
            <Text style={styles.ratingBarLabel}>2</Text>
            <View style={styles.ratingBarTrack}>
              <View style={[styles.ratingBarFill, { width: "10%" }]} />
            </View>
          </View>
          <View style={styles.ratingBarItem}>
            <Text style={styles.ratingBarLabel}>1</Text>
            <View style={styles.ratingBarTrack}>
              <View style={[styles.ratingBarFill, { width: "5%" }]} />
            </View>
          </View>
        </View>
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
      <StatusBar barStyle="light-content" backgroundColor="#6C5CE7" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: course.image }} style={styles.mainImage} />
          <View style={styles.imageOverlay}>
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
          <View style={styles.priceBadge}>
            <Text style={styles.priceBadgeText}>{course.price}</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.titleSection}>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <View style={styles.instructorRow}>
              <Text style={styles.courseSubtitle}>{course.instructor}</Text>
              <View style={styles.ratingPill}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingPillText}>{course.rating}</Text>
              </View>
            </View>
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

          <View style={styles.similarSection}>
            <Text style={styles.sectionTitle}>You Might Also Like</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {similarCourses.map((item) => (
                <TouchableOpacity key={item.id} style={styles.similarCard}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.similarImage}
                  />
                  <View style={styles.similarContent}>
                    <Text style={styles.similarTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.similarInstructor} numberOfLines={1}>
                      {item.instructor}
                    </Text>
                    <View style={styles.similarFooter}>
                      <View style={styles.similarRating}>
                        <Ionicons name="star" size={12} color="#FFD700" />
                        <Text style={styles.similarRatingText}>
                          {item.rating}
                        </Text>
                      </View>
                      <Text style={styles.similarPrice}>{item.price}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.bottomBarLeft}>
          <Text style={styles.bottomBarPrice}>{course.price}</Text>
          <Text style={styles.bottomBarSubtext}>One-time payment</Text>
        </View>
        <TouchableOpacity
          style={[styles.enrollButton, isEnrolled && styles.enrolledButton]}
          onPress={() => setIsEnrolled(!isEnrolled)}
        >
          <Text style={styles.enrollButtonText}>
            {isEnrolled ? "Continue Learning" : "Enroll Now"}
          </Text>
          <Ionicons
            name={isEnrolled ? "arrow-forward" : "play-circle"}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
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
    height: 280,
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 40,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  bookmarkButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  priceBadge: {
    position: "absolute",
    bottom: -20,
    right: 20,
    backgroundColor: "#6C5CE7",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    elevation: 6,
    shadowColor: "#6C5CE7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  priceBadgeText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  titleSection: {
    marginBottom: 20,
  },
  courseTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  instructorRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  courseSubtitle: {
    fontSize: 15,
    color: "#999",
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8E1",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingPillText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2D3436",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 4,
    marginBottom: 20,
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
  },
  activeTab: {
    backgroundColor: "#6C5CE7",
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
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3436",
    marginTop: 6,
  },
  statLabel: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: 15,
    color: "#666",
    lineHeight: 24,
  },
  learningItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  learningCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#6C5CE7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  learningText: {
    fontSize: 14,
    color: "#444",
    flex: 1,
  },
  viewAllButton: {
    marginTop: 4,
    alignSelf: "flex-start",
  },
  viewAllText: {
    color: "#6C5CE7",
    fontWeight: "600",
    fontSize: 14,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  progressSubtext: {
    fontSize: 13,
    color: "#999",
    marginTop: 2,
  },
  progressPercent: {
    fontSize: 22,
    fontWeight: "700",
    color: "#6C5CE7",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#F1F2F6",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#6C5CE7",
    borderRadius: 4,
  },
  chapterItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F2F6",
  },
  chapterCompleted: {
    opacity: 0.7,
  },
  chapterLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  chapterNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F1F2F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  chapterNumberText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6C5CE7",
  },
  chapterContent: {
    flex: 1,
  },
  chapterTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#2D3436",
    marginBottom: 3,
  },
  chapterMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  chapterDuration: {
    fontSize: 12,
    color: "#999",
    marginLeft: 4,
  },
  tutorProfileCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  tutorProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    borderWidth: 3,
    borderColor: "#6C5CE7",
  },
  tutorProfileInfo: {
    flex: 1,
  },
  tutorProfileName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2D3436",
  },
  tutorProfileSubject: {
    fontSize: 14,
    color: "#999",
    marginVertical: 4,
  },
  tutorProfileRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  tutorProfileRatingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2D3436",
    marginLeft: 6,
  },
  tutorStatsRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  tutorStatItem: {
    flex: 1,
    alignItems: "center",
  },
  tutorStatNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3436",
  },
  tutorStatLabel: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  tutorStatDivider: {
    width: 1,
    backgroundColor: "#F1F2F6",
  },
  messageButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F9FA",
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: "#6C5CE7",
  },
  messageButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6C5CE7",
  },
  ratingSummary: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  ratingLeft: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ratingBig: {
    fontSize: 48,
    fontWeight: "700",
    color: "#2D3436",
  },
  ratingStarsBig: {
    flexDirection: "row",
    marginVertical: 6,
  },
  ratingCount: {
    fontSize: 13,
    color: "#999",
  },
  ratingRight: {
    flex: 1,
    justifyContent: "center",
    gap: 4,
  },
  ratingBarItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ratingBarLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#999",
    width: 16,
  },
  ratingBarTrack: {
    flex: 1,
    height: 6,
    backgroundColor: "#F1F2F6",
    borderRadius: 3,
    overflow: "hidden",
  },
  ratingBarFill: {
    height: "100%",
    backgroundColor: "#6C5CE7",
    borderRadius: 3,
  },
  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewerImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2D3436",
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
    color: "#666",
    lineHeight: 22,
    paddingLeft: 4,
  },
  writeReviewButton: {
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#6C5CE7",
    marginBottom: 20,
  },
  writeReviewText: {
    color: "#6C5CE7",
    fontWeight: "600",
    fontSize: 15,
  },
  similarSection: {
    marginBottom: 20,
  },
  similarCard: {
    width: 180,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginRight: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  similarImage: {
    width: "100%",
    height: 100,
  },
  similarContent: {
    padding: 12,
  },
  similarTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2D3436",
    marginBottom: 2,
  },
  similarInstructor: {
    fontSize: 12,
    color: "#999",
    marginBottom: 6,
  },
  similarFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  similarRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  similarRatingText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#2D3436",
  },
  similarPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6C5CE7",
  },
  bottomBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#F1F2F6",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomBarLeft: {
    flex: 1,
  },
  bottomBarPrice: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2D3436",
  },
  bottomBarSubtext: {
    fontSize: 12,
    color: "#999",
  },
  enrollButton: {
    flexDirection: "row",
    backgroundColor: "#6C5CE7",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    gap: 8,
    elevation: 4,
    shadowColor: "#6C5CE7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  enrolledButton: {
    backgroundColor: "#00B894",
    shadowColor: "#00B894",
  },
  enrollButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomSpacing: {
    height: 20,
  },
});

export default CourseDetailScreen;
