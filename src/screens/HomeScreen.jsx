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
} from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  useNavigation,
  DrawerActions,
  CommonActions,
} from "@react-navigation/native";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState("All");
  const popularCoursesRef = useRef(null);
  const tutorsRef = useRef(null);

  const categories = [
    { id: "1", name: "All", icon: "grid-outline" },
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
    // Get the parent navigator (drawer) and open it
    const parent = navigation.getParent();
    if (parent) {
      parent.dispatch(DrawerActions.openDrawer());
    } else {
      // Fallback: try to dispatch directly
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
      <Ionicons
        name={item.icon}
        size={24}
        color={activeCategory === item.name ? "#fff" : "#20434F"}
      />
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
      <Image source={{ uri: item.image }} style={styles.courseImage} />
      <View style={styles.courseContent}>
        <View style={styles.courseHeader}>
          <Text style={styles.courseTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.courseInstructor} numberOfLines={1}>
          {item.instructor}
        </Text>
        <View style={styles.courseFooter}>
          <View style={styles.courseInfo}>
            <Ionicons name="time-outline" size={14} color="#999" />
            <Text style={styles.courseInfoText}>{item.duration}</Text>
          </View>
          <View style={styles.courseInfo}>
            <Ionicons name="people-outline" size={14} color="#999" />
            <Text style={styles.courseInfoText}>{item.students}</Text>
          </View>
          <Text style={styles.coursePrice}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTutor = ({ item }) => (
    <TouchableOpacity style={styles.tutorCard}>
      <Image source={{ uri: item.image }} style={styles.tutorImage} />
      <Text style={styles.tutorName}>{item.name}</Text>
      <Text style={styles.tutorSubject}>{item.subject}</Text>
      <View style={styles.tutorRating}>
        <Ionicons name="star" size={16} color="#FFD700" />
        <Text style={styles.tutorRatingText}>{item.rating}</Text>
        <Text style={styles.tutorStudents}>({item.students} students)</Text>
      </View>
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={openDrawer}>
            <Ionicons name="menu-outline" size={28} color="#20434F" />
          </TouchableOpacity>
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.greeting}>Hi, John 👋</Text>
            <Text style={styles.subGreeting}>Let's start learning</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.profileButton}>
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
        <Ionicons name="search-outline" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for courses..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color="#20434F" />
        </TouchableOpacity>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#20434F",
  },
  subGreeting: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
  },
  profileButton: {
    position: "relative",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FF6B6B",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  notificationText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 25,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#20434F",
    marginLeft: 10,
  },
  filterButton: {
    padding: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#20434F",
  },
  seeAll: {
    fontSize: 14,
    color: "#20434F",
    fontWeight: "500",
  },
  categoriesList: {
    flexGrow: 0,
    marginBottom: 25,
  },
  categoriesContent: {
    paddingRight: 20,
  },
  categoryCard: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  categoryActive: {
    backgroundColor: "#20434F",
  },
  categoryActiveText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
  categoryText: {
    color: "#20434F",
    fontWeight: "600",
    marginLeft: 8,
  },
  popularList: {
    flexGrow: 0,
    marginBottom: 30,
  },
  popularContent: {
    paddingRight: 20,
  },
  courseCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginRight: 15,
    width: width * 0.85,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  courseImage: {
    width: "100%",
    height: 160,
  },
  courseContent: {
    padding: 15,
  },
  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#20434F",
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8E1",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#20434F",
    marginLeft: 3,
  },
  courseInstructor: {
    fontSize: 14,
    color: "#999",
    marginBottom: 10,
  },
  courseFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  coursePrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#20434F",
  },
  tutorsList: {
    flexGrow: 0,
    marginBottom: 10,
  },
  tutorsContent: {
    paddingRight: 20,
  },
  tutorCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    width: width * 0.55,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  tutorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  tutorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#20434F",
    textAlign: "center",
  },
  tutorSubject: {
    fontSize: 13,
    color: "#999",
    marginTop: 2,
    marginBottom: 6,
  },
  tutorRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  tutorRatingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#20434F",
    marginLeft: 4,
  },
  tutorStudents: {
    fontSize: 12,
    color: "#999",
    marginLeft: 4,
  },
  bookButton: {
    backgroundColor: "#20434F",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  bookButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default HomeScreen;
