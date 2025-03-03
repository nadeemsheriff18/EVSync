import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE = "http://localhost:5000";

const PeerToPeerCharging = () => {
  const [supply, setSupply] = useState("");
  const [cost, setCost] = useState("");
  
  const [batteryLevel, setBatteryLevel] = useState(13); // Mock battery level (73%)

  type Request = {
    _id: string;
    username: string;
    supply: number;
    cost: number;
  };
  
  const [requests, setRequests] = useState<Request[]>([]);
  
  useEffect(() => {
    fetchRequests();
  }, []);

  const sendRequest = async () => {
    if (!supply || !cost) {
      Alert.alert("Error", "Please enter both supply and cost.");
      return;
    }

    const storedUsername = await AsyncStorage.getItem("username");
    const requestData = { username: storedUsername, supply: Number(supply), cost: Number(cost) };

    try {
      const response = await fetch(`${API_BASE}/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Request sent successfully!");
        setSupply("");
        setCost("");
        fetchRequests();
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await fetch(`${API_BASE}/requests`);
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Battery Status */}
      <View style={styles.batteryContainer}>
        <Text style={styles.batteryPercentage}>{batteryLevel}%</Text>
        <Text style={styles.batteryDuration}>Lasts 3 Hrs 27 Mins</Text>
      </View>

      {/* Peer-to-Peer Charging */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Peer To Peer Charging</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={supply}
            onChangeText={setSupply}
            keyboardType="numeric"
            placeholder="Enter supply (W)"
            placeholderTextColor="#ccc"
          />
          <TextInput
            style={styles.input}
            value={cost}
            onChangeText={setCost}
            keyboardType="numeric"
            placeholder="Enter cost (₹)"
            placeholderTextColor="#ccc"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={sendRequest}>
          <Text style={styles.buttonText}>Request</Text>
        </TouchableOpacity>
      </View>

      {/* Available Requests */}
      <Text style={styles.requestsTitle}>Available Requests</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.requestCard}>
            <Text style={styles.requestText}>
              <Text style={styles.bold}>{item.username}</Text> is requesting
            </Text>
            <Text style={styles.requestDetails}>{item.supply} W for ₹{item.cost}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  batteryContainer: {
    backgroundColor: "#1e1e1e",
    padding: 25,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  batteryPercentage: {
    color: "#00bfa5",
    fontSize: 50,
    fontWeight: "bold",
  },
  batteryDuration: {
    color: "#aaa",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: 8,
    padding: 12,
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#00bfa5",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  requestsTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  requestCard: {
    backgroundColor: "#1e1e1e",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  requestText: {
    color: "#ccc",
    fontSize: 14,
  },
  requestDetails: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
    color: "#FF6600",
  },
});

export default PeerToPeerCharging;
