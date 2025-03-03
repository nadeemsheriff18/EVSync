import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import Navbar from "./Navbar";

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Navbar Section */}
      <View style={styles.navbar}>
        <Text style={styles.profileText}>My Profile</Text>
        <View style={styles.navIcons}>
          <TouchableOpacity>
            <Ionicons
              name="search"
              size={24}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="notifications-outline"
              size={28}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Section */}
      <View style={styles.profileCard}>
        <View>
          <Text style={styles.userName}>Nithish</Text>
          <Text style={styles.userAge}>Age: 28</Text>
          <Text style={styles.userStats}>7500 Km Traveled | 73% Charge</Text>
        </View>
      </View>

      {/* Exhaust Sound - No Gradient */}
      <TouchableOpacity
        style={[styles.card, styles.purpleCard]}
        onPress={() => router.push("/exhaust")}
      >
        <Text style={styles.cardTitle}>Exhaust Sound</Text>
        <Text style={styles.cardSubTitle}>Current</Text>
        <TouchableOpacity style={styles.exhaust}>
          <Text style={styles.cardHighlight}>NeonScream</Text>
        </TouchableOpacity>
        <Ionicons
          name="arrow-forward"
          size={24}
          color="white"
          style={styles.cardIcon}
        />
      </TouchableOpacity>

      {/* Other cards wrapped in LinearGradient */}
      <LinearGradient
        colors={["#003C3C", "#00C2C2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientCard}
      >
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/trips")}
        >
          <Text style={styles.cardTitle}>My Trips</Text>
          <Image source={require("./mytrips.png")} style={styles.cardImage} />
        </TouchableOpacity>
      </LinearGradient>

      <LinearGradient
        colors={["#003C3C", "#00C2C2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientCard}
      >
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/chatbot")}
        >
          <Text style={styles.cardTitle}>Personalized ChatBot</Text>
          <Image source={require("./chat.png")} style={styles.cardImage} />
          <Ionicons
            name="arrow-forward"
            size={24}
            color="white"
            style={styles.cardIcon}
          />
        </TouchableOpacity>
      </LinearGradient>

      <LinearGradient
        colors={["#003C3C", "#00C2C2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientCard}
      >
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/community")}
        >
          <Text style={styles.cardTitle}>Rider's Community</Text>
          <Image
            source={require("../assets/images/community.jpg")}
            style={styles.cardImage}
          />
          <Ionicons
            name="arrow-forward"
            size={24}
            color="white"
            style={styles.cardIcon}
          />
        </TouchableOpacity>
      </LinearGradient>

      <LinearGradient
        colors={["#003C3C", "#00C2C2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientCard}
      >
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/heartrate")}
        >
          <Text style={styles.cardTitle}>Health Monitor</Text>
          <Image
            source={require("../assets/images/vital.jpg")}
            style={styles.cardImage}
          />
          <Ionicons
            name="arrow-forward"
            size={24}
            color="white"
            style={styles.cardIcon}
          />
        </TouchableOpacity>
      </LinearGradient>

      <LinearGradient
        colors={["#003C3C", "#00C2C2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientCard}
      >
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/p2p")}
        >
          <Text style={styles.cardTitle}>Battery Sharing</Text>
          <Image
            source={require("../assets/images/battery.jpg")}
            style={styles.cardImage}
          />
          <Ionicons
            name="arrow-forward"
            size={24}
            color="white"
            style={styles.cardIcon}
          />
        </TouchableOpacity>
      </LinearGradient>
      <Navbar />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  exhaust: {
    backgroundColor: "#1E2A38",
    padding: 4,
    borderRadius: 10,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  profileText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  cardImage: {
    width: "100%",
    height: 175,
  },
  navIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 15,
  },
  profileCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1E2A38",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  purpleCard: {
    backgroundColor: "#8E24AA",
  },
  userAge: {
    fontSize: 16,
    color: "lightgray",
  },
  userStats: {
    fontSize: 14,
    color: "lightgreen",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
  },
  card: {
    backgroundColor: "transparent", // Since gradient is applied to parent, this is now transparent
    borderRadius: 10,
    padding: 15,
    gap: 10,
    marginBottom: 15,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  gradientCard: {
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden", // Ensures the gradient doesn't leak out
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    alignSelf: "flex-start",
  },
  cardSubTitle: {
    fontSize: 18,
    color: "lightgray",
    fontWeight: "600",
  },
  cardHighlight: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  cardIcon: {
    marginLeft: "auto",
  },
});
