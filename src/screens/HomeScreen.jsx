import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState("All");
  const popularCoursesRef = useRef(null);
  const tutorsRef = useRef(null);

  const categories = [
    { id: "1", name: "All", icon: "apps-outline" },
    { id: "2", name: "Math", icon: "calculator-outline" },
    { id: "3", name: "Science", icon: "flask-outline" },
    { id: "4", name: "English", icon: "book-outline" },
    { id: "5", name: "Coding", icon: "code-outline" },
  ];

  const popularCourses = [
    {
      id: "1",
      title: "Mathematics",
      instructor: "Dr. Sarah Johnson",
      rating: 4.8,
      students: "1.2k",
      duration: "12 weeks",
      price: "$49.99",
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400",
      color: "#FF6B6B",
    },
    {
      id: "2",
      title: "Physics",
      instructor: "Prof. Michael Chen",
      rating: 4.9,
      students: "850",
      duration: "10 weeks",
      price: "$39.99",
      image:
        "https://images.unsplash.com/photo-1530023367847-a683933f4172?w=400",
      color: "#4ECDC4",
    },
    {
      id: "3",
      title: "English Literature",
      instructor: "Ms. Emily Wilson",
      rating: 4.7,
      students: "2.1k",
      duration: "8 weeks",
      price: "$29.99",
      image:
        "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400",
      color: "#FFA07A",
    },
    {
      id: "4",
      title: "Web Development",
      instructor: "Mr. James Lee",
      rating: 4.9,
      students: "3.5k",
      duration: "16 weeks",
      price: "$79.99",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
      color: "#6C5CE7",
    },
  ];

  const topTutors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      subject: "Mathematics",
      rating: 4.8,
      students: 1240,
      image: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: "2",
      name: "Prof. Michael Chen",
      subject: "Physics",
      rating: 4.9,
      students: 980,
      image: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: "3",
      name: "Ms. Emily Wilson",
      subject: "English",
      rating: 4.7,
      students: 2100,
      image: "https://i.pravatar.cc/150?img=10",
    },
    {
      id: "4",
      name: "Mr. James Lee",
      subject: "Programming",
      rating: 4.9,
      students: 3200,
      image: "https://i.pravatar.cc/150?img=33",
    },
  ];

  const openDrawer = () => {
    const parent = navigation.getParent();
    if (parent) {
      parent.dispatch(DrawerActions.openDrawer());
    } else {
      navigation.dispatch(DrawerActions.openDrawer());
    }
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        activeCategory === item.name && styles.categoryActive,
      ]}
      onPress={() => setActiveCategory(item.name)}
    >
      <View style={styles.categoryIconWrapper}>
        <Ionicons
          name={item.icon}
          size={24}
          color={activeCategory === item.name ? "#fff" : "#636E72"}
        />
      </View>
      <Text
        style={[
          styles.categoryText,
          activeCategory === item.name && styles.categoryActiveText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderCourse = ({ item }) => (
    <TouchableOpacity
      style={styles.courseCard}
      onPress={() => navigation.navigate("CourseDetail", { course: item })}
    >
      <View style={styles.courseImageWrapper}>
        <Image source={{ uri: item.image }} style={styles.courseImage} />
        <View style={[styles.priceTag, { backgroundColor: item.color }]}>
          <Text style={styles.priceTagText}>{item.price}</Text>
        </View>
      </View>
      <View style={styles.courseContent}>
        <Text style={styles.courseTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.courseInstructor} numberOfLines={1}>
          {item.instructor}
        </Text>
        <View style={styles.courseFooter}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <View style={styles.courseStats}>
            <View style={styles.courseInfo}>
              <Ionicons name="people-outline" size={14} color="#999" />
              <Text style={styles.courseInfoText}>{item.students}</Text>
            </View>
            <View style={styles.courseInfo}>
              <Ionicons name="time-outline" size={14} color="#999" />
              <Text style={styles.courseInfoText}>{item.duration}</Text>
            </View>
          </View>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "65%" }]} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTutor = ({ item }) => (
    <TouchableOpacity style={styles.tutorCard}>
      <View style={styles.tutorImageWrapper}>
        <Image source={{ uri: item.image }} style={styles.tutorImage} />
        <View style={styles.tutorOnlineBadge} />
      </View>
      <Text style={styles.tutorName}>{item.name}</Text>
      <Text style={styles.tutorSubject}>{item.subject}</Text>
      <View style={styles.tutorRating}>
        <Ionicons name="star" size={16} color="#FFD700" />
        <Text style={styles.tutorRatingText}>{item.rating}</Text>
        <Text style={styles.tutorStudents}>({item.students})</Text>
      </View>
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Session</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
              <Ionicons name="menu-outline" size={28} color="#2D3436" />
            </TouchableOpacity>
            <View>
              <Text style={styles.greeting}>Hello, John 👋</Text>
              <Text style={styles.subGreeting}>Ready to learn today?</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate("Notifications")}
          >
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=3" }}
              style={styles.profileImage}
            />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <Ionicons name="search-outline" size={20} color="#999" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search courses..."
              placeholderTextColor="#999"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={22} color="#2D3436" />
          </TouchableOpacity>
        </View>

        <View style={styles.heroBanner}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Learn Anywhere,</Text>
            <Text style={styles.heroTitleHighlight}>Anytime</Text>
            <Text style={styles.heroSubtitle}>
              Access top courses from expert tutors around the world
            </Text>
            <TouchableOpacity style={styles.heroButton}>
              <Text style={styles.heroButtonText}>Explore Courses</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.heroImageWrapper}>
            <View style={styles.heroImagePlaceholder}>
              <Ionicons name="school-outline" size={60} color="#fff" />
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesList}
          contentContainerStyle={styles.categoriesContent}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Courses</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          ref={popularCoursesRef}
          horizontal
          data={popularCourses}
          renderItem={renderCourse}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          style={styles.popularList}
          contentContainerStyle={styles.popularContent}
          snapToInterval={width * 0.85 + 15}
          decelerationRate="fast"
          pagingEnabled={false}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Tutors</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          ref={tutorsRef}
          horizontal
          data={topTutors}
          renderItem={renderTutor}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          style={styles.tutorsList}
          contentContainerStyle={styles.tutorsContent}
        />

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    backgroundColor: "transparent",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F1F2F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2D3436",
    letterSpacing: -0.5,
  },
  subGreeting: {
    fontSize: 13,
    color: "#999",
    marginTop: 2,
    letterSpacing: -0.3,
  },
  profileButton: {
    position: "relative",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#6C5CE7",
  },
  notificationBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#FF6B6B",
    borderRadius: 12,
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  notificationText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 12,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  searchInput: {
    flex: 1,
    height: 52,
    fontSize: 15,
    color: "#2D3436",
    marginLeft: 10,
  },
  filterButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#6C5CE7",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#6C5CE7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  heroBanner: {
    flexDirection: "row",
    backgroundColor: "#6C5CE7",
    borderRadius: 24,
    padding: 20,
    marginBottom: 28,
    elevation: 8,
    shadowColor: "#6C5CE7",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  heroContent: {
    flex: 1.2,
    justifyContent: "center",
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    opacity: 0.9,
  },
  heroTitleHighlight: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 13,
    color: "#FFFFFF",
    opacity: 0.8,
    marginBottom: 14,
    lineHeight: 18,
  },
  heroButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: "flex-start",
    gap: 8,
  },
  heroButtonText: {
    color: "#6C5CE7",
    fontWeight: "700",
    fontSize: 14,
  },
  heroImageWrapper: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  heroImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2D3436",
    letterSpacing: -0.5,
  },
  seeAll: {
    fontSize: 14,
    color: "#6C5CE7",
    fontWeight: "600",
  },
  categoriesList: {
    flexGrow: 0,
    marginBottom: 28,
  },
  categoriesContent: {
    paddingRight: 20,
  },
  categoryCard: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 16,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  categoryActive: {
    backgroundColor: "#6C5CE7",
    borderColor: "#6C5CE7",
  },
  categoryIconWrapper: {
    marginRight: 8,
  },
  categoryActiveText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  categoryText: {
    color: "#636E72",
    fontWeight: "500",
    fontSize: 14,
  },
  popularList: {
    flexGrow: 0,
    marginBottom: 32,
  },
  popularContent: {
    paddingRight: 20,
  },
  courseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginRight: 15,
    width: width * 0.85,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  courseImageWrapper: {
    position: "relative",
  },
  courseImage: {
    width: "100%",
    height: 170,
  },
  priceTag: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "#FF6B6B",
  },
  priceTagText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },
  courseContent: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 14,
    color: "#999",
    marginBottom: 12,
  },
  courseFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2D3436",
    marginLeft: 4,
  },
  courseStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  courseInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  courseInfoText: {
    fontSize: 12,
    color: "#999",
    marginLeft: 4,
  },
  progressBar: {
    width: "100%",
    height: 4,
    backgroundColor: "#F1F2F6",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#6C5CE7",
    borderRadius: 2,
  },
  tutorsList: {
    flexGrow: 0,
    marginBottom: 10,
  },
  tutorsContent: {
    paddingRight: 20,
  },
  tutorCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginRight: 15,
    width: width * 0.52,
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  tutorImageWrapper: {
    position: "relative",
    marginBottom: 10,
  },
  tutorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#6C5CE7",
  },
  tutorOnlineBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#00B894",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  tutorName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2D3436",
    textAlign: "center",
    marginBottom: 2,
  },
  tutorSubject: {
    fontSize: 13,
    color: "#999",
    marginBottom: 8,
  },
  tutorRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tutorRatingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2D3436",
    marginLeft: 4,
  },
  tutorStudents: {
    fontSize: 12,
    color: "#999",
    marginLeft: 4,
  },
  bookButton: {
    backgroundColor: "#6C5CE7",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  bookButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  bottomSpacing: {
    height: 30,
  },
});

export default HomeScreen;
