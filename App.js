import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/config/firebase";
import { checkUserRole, signOutUser } from "./src/services/authService";
import * as SplashScreen from "expo-splash-screen";

import SignInScreen from "./src/screens/SignInScreen";
import StudentUpdateScreen from "./src/screens/StudentUpdateScreen";
import TeacherUpdateScreen from "./src/screens/TeacherUpdateScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import HomeScreen from "./src/screens/HomeScreen";
import CourseDetailScreen from "./src/screens/CourseDetailScreen";
import MyLearningsScreen from "./src/screens/MyLearningsScreen";
import ScheduleScreen from "./src/screens/ScheduleScreen";
import NotificationsScreen from "./src/screens/NotificationsScreen";
import SavedCoursesScreen from "./src/screens/SavedCoursesScreen";
import LearningHistoryScreen from "./src/screens/LearningHistoryScreen";
import AchievementsScreen from "./src/screens/AchievementsScreen";
import PaymentsScreen from "./src/screens/PaymentsScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import HelpSupportScreen from "./src/screens/HelpSupportScreen";
import AboutScreen from "./src/screens/AboutScreen";

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation, userData, onLogout }) {
  const menuItems = [
    { icon: "home-outline", label: "Home", screen: "HomeTabs" },
    {
      icon: "book-outline",
      label: "My Learnings",
      screen: "HomeTabs",
      params: { screen: "Learnings" },
    },
    {
      icon: "calendar-outline",
      label: "Schedule",
      screen: "HomeTabs",
      params: { screen: "Schedule" },
    },
    {
      icon: "person-outline",
      label: "Profile",
      screen: "HomeTabs",
      params: { screen: "Profile" },
    },
    { divider: true },
    {
      icon: "bookmark-outline",
      label: "Saved Courses",
      screen: "SavedCourses",
    },
    {
      icon: "time-outline",
      label: "Learning History",
      screen: "LearningHistory",
    },
    { icon: "trophy-outline", label: "Achievements", screen: "Achievements" },
    { icon: "card-outline", label: "Payments", screen: "Payments" },
    { icon: "settings-outline", label: "Settings", screen: "Settings" },
    {
      icon: "help-circle-outline",
      label: "Help & Support",
      screen: "HelpSupport",
    },
    { icon: "information-circle-outline", label: "About", screen: "About" },
  ];

  const navigateToScreen = (screen, params) => {
    navigation.closeDrawer();
    if (screen === "HomeTabs" && params) {
      navigation.navigate(screen, params);
    } else {
      navigation.navigate(screen);
    }
  };

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Image
          source={{
            uri: userData?.photoURL || "https://i.pravatar.cc/150?img=3",
          }}
          style={styles.drawerAvatar}
        />
        <Text style={styles.drawerName}>{userData?.displayName || "User"}</Text>
        <Text style={styles.drawerEmail}>{userData?.email || ""}</Text>
      </View>
      <View style={styles.drawerItems}>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.divider ? (
              <View style={styles.drawerDivider} />
            ) : (
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => navigateToScreen(item.screen, item.params)}
              >
                <Ionicons name={item.icon} size={22} color="#6C5CE7" />
                <Text style={styles.drawerItemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          </React.Fragment>
        ))}
      </View>
      <View style={styles.drawerFooter}>
        <TouchableOpacity style={styles.drawerItem} onPress={onLogout}>
          <Ionicons name="log-out-outline" size={22} color="#FF6B6B" />
          <Text style={[styles.drawerItemText, { color: "#FF6B6B" }]}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}

function LearningsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyLearnings" component={MyLearningsScreen} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
    </Stack.Navigator>
  );
}

function ScheduleStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Schedule" component={ScheduleScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#6C5CE7",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#fff",
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
        },
        tabBarIcon: ({ color, focused }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Learnings") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Schedule") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else {
            iconName = focused ? "person" : "person-outline";
          }
          return (
            <Ionicons name={iconName} size={focused ? 26 : 22} color={color} />
          );
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
          marginTop: 2,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="Learnings"
        component={LearningsStack}
        options={{ tabBarLabel: "Learnings" }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleStack}
        options={{ tabBarLabel: "Schedule" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{ tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
  );
}

function MainApp({ user, onLogout }) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent {...props} userData={user} onLogout={onLogout} />
      )}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: 280 },
        drawerActiveTintColor: "#6C5CE7",
        drawerInactiveTintColor: "#999",
      }}
    >
      <Drawer.Screen name="HomeTabs" component={MainTabs} />
      <Drawer.Screen name="SavedCourses" component={SavedCoursesScreen} />
      <Drawer.Screen name="LearningHistory" component={LearningHistoryScreen} />
      <Drawer.Screen name="Achievements" component={AchievementsScreen} />
      <Drawer.Screen name="Payments" component={PaymentsScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="HelpSupport" component={HelpSupportScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
}

function AuthNavigator() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const role = await checkUserRole(firebaseUser.uid);
          setUserRole(role);
        } catch (error) {
          console.error("Error checking user role:", error);
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOutUser();
      setUser(null);
      setUserRole(null);
    } catch (error) {
      Alert.alert("Error", "Failed to logout. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C5CE7" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="SignIn" component={SignInScreen} />
        ) : userRole === "student" ? (
          <Stack.Screen name="StudentUpdate" component={StudentUpdateScreen} />
        ) : userRole === "teacher" ? (
          <Stack.Screen name="TeacherUpdate" component={TeacherUpdateScreen} />
        ) : (
          <Stack.Screen name="MainApp">
            {() => <MainApp user={user} onLogout={handleLogout} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <AuthNavigator />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FE",
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  drawerHeader: {
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F2F6",
    alignItems: "center",
    backgroundColor: "#6C5CE7",
  },
  drawerAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#fff",
  },
  drawerName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  drawerEmail: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  drawerItems: {
    flex: 1,
    paddingTop: 10,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  drawerItemText: {
    fontSize: 15,
    color: "#2D3436",
    marginLeft: 15,
    fontWeight: "500",
  },
  drawerDivider: {
    height: 1,
    backgroundColor: "#F1F2F6",
    marginVertical: 5,
    marginHorizontal: 20,
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: "#F1F2F6",
    paddingVertical: 10,
  },
});
