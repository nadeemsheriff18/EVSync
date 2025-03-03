import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login & register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Only for registration
  const [secureText, setSecureText] = useState(true);
  const router = useRouter();

  // API URL (Change this to match your backend)
  const API_URL = "http://localhost:5000"; // Replace with your backend URL

  // Handle Authentication
  const handleAuth = async () => {
    if (!email || !password || (!isLogin && !name)) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }
  
    const endpoint = isLogin ? "/login" : "/register";
    const payload = isLogin ? { email, password } : { name, email, password };
  
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      if (response.ok) {
        if (isLogin) {
          const username = email.split("@")[0]; // Extract username before '@'
  
          // Store username & token in localStorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", username);
  
          Alert.alert("Success", `Login successful! Welcome, ${username}.`);
          router.push("/dashboard");
        } else {
          Alert.alert("Success", "Registration successful! Please log in.");
          setIsLogin(true); // Switch to Login tab after signup
        }
      } else {
        Alert.alert("Error", data.message || "Something went wrong.");
      }
    } catch (error) {
      Alert.alert("Error", "Network error. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EVsync</Text>
      <Text style={styles.subtitle}>Let's Travel Together</Text>

      {/* Toggle Login/Signup */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity onPress={() => setIsLogin(true)}>
          <Text style={[styles.toggleText, isLogin && styles.activeToggle]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsLogin(false)}>
          <Text style={[styles.toggleText, !isLogin && styles.activeToggle]}>Register</Text>
        </TouchableOpacity>
      </View>

      {/* Name Input (Only for Registration) */}
      {!isLogin && (
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#ccc" style={styles.icon} />
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>
      )}

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#ccc" style={styles.icon} />
        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#aaa"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#ccc" style={styles.icon} />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          style={styles.input}
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Ionicons name={secureText ? "eye-off-outline" : "eye-outline"} size={20} color="#aaa" />
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isLogin ? "Sign In" : "Register"}</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>

      {/* Forgot Password */}
      {isLogin && (
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00A99D",
  },
  subtitle: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  toggleText: {
    fontSize: 16,
    color: "#aaa",
    marginHorizontal: 15,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeToggle: {
    color: "#00A99D",
    borderBottomColor: "#00A99D",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#fff",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#00A99D",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  forgotText: {
    color: "#00A99D",
    marginTop: 10,
  },
});

export default LoginScreen;
