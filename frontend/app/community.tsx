import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

export default function CommunityScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={22} color="yellow" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Community</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="search" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Forum & Threads Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity style={styles.toggleButton}>
          <Text style={styles.toggleText}>Forum</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton}>
          <Text style={styles.toggleText}>Threads</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Image Section */}
      <View style={styles.imageContainer}>
       
         
          <Image source={require('./bike.png')} style={styles.cardImage} />
        
        <View style={styles.imageOverlay}>
          <View>
            <Text style={styles.imageTitle}>Newest Bike</Text>
            <Text style={styles.imageTime}>● 15 Minutes</Text>
          </View>
          <TouchableOpacity>
            <FontAwesome name="star-o" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Forums Section */}
      <View style={styles.forumsContainer}>
        <Text style={styles.forumsTitle}>Forums</Text>

        {/* Forum Items */}
        {forumData.map((item, index) => (
          <View key={index} style={styles.forumItem}>
            <View>
              <Text style={styles.forumTitle}>{item.title}</Text>
              <Text style={styles.forumDesc}>{item.description}</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
              <Text style={styles.forumTime}>{item.time}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const forumData = [
  {
    title: "Adaptive AI tech",
    description: "Discussion on training methods",
    time: "Today 17:05",
  },
  {
    title: "Power management",
    description: "Efficient power management",
    time: "Today 17:05",
  },
  {
    title: "Route planning",
    description: "About different types of route planning",
    time: "Today 17:05",
  },
  {
    title: "Charge and tech",
    description:
      "Strategies for improving charging and joint mobility to reduce timing",
    time: "Today 17:05",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00ffcc",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 15,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
    gap: 15,
  },
  toggleButton: {
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 25,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  imageContainer: {
    paddingHorizontal: 15,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 15,
  },
  imageOverlay: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  imageTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  imageTime: {
    fontSize: 12,
    color: "lightgray",
  },
  forumsContainer: {
    padding: 15,
  },
  forumsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "yellow",
    marginBottom: 10,
  },
  forumItem: {
    backgroundColor: "#1c1c1e",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  forumTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  forumDesc: {
    fontSize: 12,
    color: "lightgray",
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#00ffcc",
  },
  forumTime: {
    fontSize: 12,
    color: "lightgray",
  },
  cardImage: {
    width: '100%',
    height: 175,
  },
});
