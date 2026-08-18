import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import ProfileScreen from "./src/screens/ProfileScreen";
import HomeScreen from "./src/screens/HomeScreen";
import CourseDetailScreen from "./src/screens/CourseDetailScreen";
import MyLearningsScreen from "./src/screens/MyLearningsScreen";
import ScheduleScreen from "./src/screens/ScheduleScreen";

import SavedCoursesScreen from "./src/screens/SavedCoursesScreen";
import LearningHistoryScreen from "./src/screens/LearningHistoryScreen";
import AchievementsScreen from "./src/screens/AchievementsScreen";
import PaymentsScreen from "./src/screens/PaymentsScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import HelpSupportScreen from "./src/screens/HelpSupportScreen";
import AboutScreen from "./src/screens/AboutScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
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
          source={{ uri: "https://i.pravatar.cc/150?img=3" }}
          style={styles.drawerAvatar}
        />
        <Text style={styles.drawerName}>John Doe</Text>
        <Text style={styles.drawerEmail}>john.doe@email.com</Text>
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
                <Ionicons name={item.icon} size={22} color="#20434F" />
                <Text style={styles.drawerItemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          </React.Fragment>
        ))}
      </View>
      <View style={styles.drawerFooter}>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => alert("Logout")}
        >
          <Ionicons name="log-out-outline" size={22} color="#F44336" />
          <Text style={[styles.drawerItemText, { color: "#F44336" }]}>
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
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#20434F",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#fff",
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
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
            <Ionicons name={iconName} size={focused ? 26 : 20} color={color} />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
        }}
      />

      <Tab.Screen
        name="Learnings"
        component={LearningsStack}
        options={{
          tabBarLabel: "Learnings",
        }}
      />

      <Tab.Screen
        name="Schedule"
        component={ScheduleStack}
        options={{
          tabBarLabel: "Schedule",
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
              headerShown: false,
              drawerStyle: {
                width: 280,
              },
            }}
          >
            <Drawer.Screen name="HomeTabs" component={MainTabs} />
            <Drawer.Screen name="SavedCourses" component={SavedCoursesScreen} />
            <Drawer.Screen
              name="LearningHistory"
              component={LearningHistoryScreen}
            />
            <Drawer.Screen name="Achievements" component={AchievementsScreen} />
            <Drawer.Screen name="Payments" component={PaymentsScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
            <Drawer.Screen name="HelpSupport" component={HelpSupportScreen} />
            <Drawer.Screen name="About" component={AboutScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  drawerHeader: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    alignItems: "center",
  },
  drawerAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  drawerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#20434F",
  },
  drawerEmail: {
    fontSize: 13,
    color: "#999",
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
    color: "#20434F",
    marginLeft: 15,
  },
  drawerDivider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 5,
    marginHorizontal: 20,
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingVertical: 10,
  },
});
