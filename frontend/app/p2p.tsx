import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // To store JWT token
import Navbar from "./Navbar";

const API_URL = "http://localhost:5000"; // Ensure this is your actual backend URL

interface Request {
  _id: string;
  userId: { name: string };
  supply: number;
  cost: number;
}

export default function BatteryScreen() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [supply, setSupply] = useState(""); // Now input field is editable
  const [cost, setCost] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  // Fetch requests except the current user's
  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${API_URL}/requests`);
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const sendRequest = async () => {
    if (!supply || !cost) {
      Alert.alert("Error", "Please enter both supply and cost.");
      return;
    }

    try {
      await axios.post(`${API_URL}/request`, {
        userId: "65ca1f1d9b3e3a2f0c4e4bcd", // Use an existing MongoDB Rider _id
        supply: parseInt(supply),
        cost: parseInt(cost),
      });

      Alert.alert("Success", "Charging request sent successfully!");
      setSupply("");
      setCost("");
      fetchRequests(); // Refresh requests
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={22} color="yellow" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Battery</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="search" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Battery Percentage */}
      <View style={styles.batteryCard}>
        <Text style={styles.batteryPercentage}>73%</Text>
        <Text style={styles.batteryTime}>Lasts 3 Hrs 27 Mins</Text>
        <TouchableOpacity style={styles.analyticsButton}>
          <Text style={styles.analyticsText}>Analytics</Text>
          <FontAwesome name="angle-right" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Peer to Peer Charging Section */}
      <View style={styles.p2pContainer}>
        <Text style={styles.p2pTitle}>Peer To Peer Charging</Text>
        <View style={styles.p2pInputContainer}>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Supply (W)</Text>
            <TextInput
              style={styles.inputField}
              value={supply}
              onChangeText={setSupply} // Now users can input supply
              keyboardType="numeric"
              placeholder="Enter supply"
              placeholderTextColor="lightgray"
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Cost (₹)</Text>
            <TextInput
              style={styles.inputField}
              value={cost}
              onChangeText={setCost} // Now users can input cost
              keyboardType="numeric"
              placeholder="Enter cost"
              placeholderTextColor="lightgray"
            />
          </View>
        </View>
        <TouchableOpacity style={styles.requestButton} onPress={sendRequest}>
          <Text style={styles.requestButtonText}>Request</Text>
          <FontAwesome name="angle-right" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Requests List */}
      <Text style={styles.requestListTitle}>Available Requests</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.requestItem}>
            <Text style={styles.requestText}>
              {item.userId?.name || "Unknown"} offers {item.supply}W for ₹
              {item.cost}
            </Text>
          </View>
        )}
      />
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 15 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#00ffcc" },
  headerIcons: { flexDirection: "row", gap: 15 },
  batteryCard: {
    backgroundColor: "#004d40",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  batteryPercentage: { fontSize: 40, fontWeight: "bold", color: "white" },
  batteryTime: { fontSize: 14, color: "lightgray", marginTop: 5 },
  analyticsButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "flex-end",
  },
  analyticsText: { fontSize: 14, color: "white", marginRight: 5 },
  p2pContainer: {
    backgroundColor: "#008080",
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
  },
  p2pTitle: { fontSize: 18, fontWeight: "bold", color: "white" },
  p2pInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  inputBox: {
    backgroundColor: "#2c2c2e",
    borderRadius: 10,
    padding: 10,
    width: "48%",
  },
  inputLabel: { fontSize: 12, color: "lightgray" },
  inputField: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingVertical: 5,
  },
  requestButton: {
    backgroundColor: "#b33c00",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  requestButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  requestListTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
  },
  requestItem: {
    backgroundColor: "#2c2c2e",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  requestText: { fontSize: 14, color: "white" },
});
