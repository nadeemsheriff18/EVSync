import React, { useState } from "react";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

// Sample Data
const exhaustSounds = [
  {
    id: "1",
    name: "NeonScream",
    date: "June 09",
    type: "Use",
    duration: "Use",
  },
  {
    id: "2",
    name: "TripleRoar",
    date: "June 09",
    type: "Duration",
    duration: "25 Mins",
  },
  {
    id: "3",
    name: "TwinBolt",
    date: "June 09",
    type: "Duration",
    duration: "25 Mins",
  },
  {
    id: "4",
    name: "Inline 4 Akro",
    date: "June 09",
    type: "Duration",
    duration: "25 Mins",
  },
];

// Home Screen Component
const HomeScreen = () => {
  const [currentExhaust, setCurrentExhaust] = useState(exhaustSounds[0]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.profileText}>My Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={{ borderRadius: 10, overflow: "hidden" }}>
        <LinearGradient
          colors={["rgb(0, 60, 60)", "rgba(0, 194, 194, 0.9)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.titleContainer}
        >
          <Text style={styles.title}>Choose Your Exhaust</Text>
          <Image
            source={require("../assets/images/exhaust.png")}
            style={styles.image}
          />
        </LinearGradient>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>In Use</Text>
        {/* <TouchableOpacity>
          <Text style={styles.filterText}>Filter ▼</Text>
        </TouchableOpacity> */}
      </View>
      {/* Currently Selected Exhaust */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.soundName}>{currentExhaust.name}</Text>
        </View>
        <TouchableOpacity style={styles.durationButton}>
          <Text style={styles.durationText}>In Use</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
          <Text style={styles.tabText}>Popular</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabTextInactive}>Browse</Text>
        </TouchableOpacity>
      </View>
      {/* Exhaust List */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>All Time</Text>
        <TouchableOpacity>
          <Text style={styles.filterText}>Filter ▼</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={exhaustSounds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.soundName}>{item.name}</Text>
            </View>
            <TouchableOpacity
              style={styles.durationButton}
              onPress={() => setCurrentExhaust(item)}
            >
              <Text style={styles.durationText}>Use</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Text style={styles.navText}>Home</Text>
        <Text style={styles.navText}>Favorites</Text>
        <Text style={styles.navText}>Map</Text>
        <Text style={styles.navText}>Settings</Text>
      </View>
    </View>
  );
};

// Main App Component
const App = () => {
  return <HomeScreen />;
};

export default App;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingTop: 40, // Keeps safe area spacing at the top
  },
  image: {
    width: 150, // Adjust as needed
    height: 150, // Adjust as needed
    resizeMode: "cover",
    maxHeight: 80,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20, // Added margin
  },
  profileText: {
    fontSize: 18,
    color: "#00C2C2",
    fontWeight: "bold",
  },
  titleContainer: {
    backgroundColor: "#00C2C2", // Fill-up color
    paddingVertical: 30,
    paddingHorizontal: 15, // Adds horizontal padding for spacing
    marginVertical: 20, // Adds space above and below the text
    flexDirection: "row", // Aligns items in a row
    justifyContent: "space-between", // Moves title left and image right
    alignItems: "center", // Keeps both items aligned properly
    borderRadius: 1, // Optional rounded edges
  },
  tabContainer: { flexDirection: "row", marginTop: 15 },
  tabButton: { flex: 1, padding: 10, borderRadius: 10, alignItems: "center" },
  activeTab: { backgroundColor: "#00C2C2" },
  tabText: { color: "#fff", fontWeight: "bold" },
  tabTextInactive: { color: "#bbb" },
  title: {
    fontSize: 28,
    maxWidth: 250,
    paddingLeft: 30,
    color: "#fff",
    fontWeight: "bold",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginHorizontal: 30, // Added margin
  },
  filterText: {
    color: "#bbb",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#222",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 20, // Added margin
  },
  cardContent: {
    flex: 1,
  },
  soundName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    color: "#bbb",
  },
  durationButton: {
    backgroundColor: "#00C2C2",
    padding: 8,
    borderRadius: 20,
  },
  durationText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#222",
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navText: {
    color: "#fff",
    fontSize: 14,
  },
});
