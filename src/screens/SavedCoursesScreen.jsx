import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const SavedCoursesScreen = ({ navigation }) => {
  const savedCourses = [
    {
      id: "1",
      title: "Data Science",
      instructor: "Prof. David Kim",
      rating: 4.8,
      students: "2.3k",
      price: "$59.99",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
      savedDate: "2 days ago",
    },
    {
      id: "2",
      title: "Art History",
      instructor: "Ms. Anna Martinez",
      rating: 4.6,
      students: "980",
      price: "$39.99",
      image:
        "https://images.unsplash.com/photo-1536924940847-227d4e5eb46a?w=400",
      savedDate: "1 week ago",
    },
    {
      id: "3",
      title: "Machine Learning",
      instructor: "Dr. Robert Kim",
      rating: 4.9,
      students: "3.1k",
      price: "$79.99",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400",
      savedDate: "2 weeks ago",
    },
  ];

  const renderSavedCourse = ({ item }) => (
    <TouchableOpacity style={styles.courseCard}>
      <Image source={{ uri: item.image }} style={styles.courseImage} />
      <View style={styles.courseContent}>
        <View style={styles.courseHeader}>
          <Text style={styles.courseTitle}>{item.title}</Text>
          <TouchableOpacity>
            <Ionicons name="bookmark" size={22} color="#20434F" />
          </TouchableOpacity>
        </View>
        <Text style={styles.courseInstructor}>{item.instructor}</Text>
        <View style={styles.courseMeta}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.courseStudents}>{item.students} students</Text>
        </View>
        <View style={styles.courseFooter}>
          <Text style={styles.coursePrice}>{item.price}</Text>
          <Text style={styles.savedDate}>Saved {item.savedDate}</Text>
        </View>
        <TouchableOpacity style={styles.enrollButton}>
          <Text style={styles.enrollButtonText}>Enroll Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu-outline" size={28} color="#20434F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Courses</Text>
        <View style={{ width: 28 }} />
      </View>
      <FlatList
        data={savedCourses}
        renderItem={renderSavedCourse}
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
  listContent: {
    padding: 20,
    paddingBottom: 20,
  },
  courseCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  courseImage: {
    width: "100%",
    height: 150,
  },
  courseContent: {
    padding: 15,
  },
  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#20434F",
    flex: 1,
  },
  courseInstructor: {
    fontSize: 14,
    color: "#999",
    marginTop: 2,
  },
  courseMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
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
    color: "#20434F",
  },
  courseStudents: {
    fontSize: 12,
    color: "#999",
  },
  courseFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  coursePrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#20434F",
  },
  savedDate: {
    fontSize: 12,
    color: "#bbb",
  },
  enrollButton: {
    backgroundColor: "#20434F",
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  enrollButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default SavedCoursesScreen;
