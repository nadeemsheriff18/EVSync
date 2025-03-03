import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Icons for email & password fields

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.container}>
      {/* {/<Image source={require("../assets/logo.png")} style={styles.logo} />/} */}
      <Text style={styles.title}>EVsync</Text>
      <Text style={styles.subtitle}>Let's Travel Together</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Ionicons
          name="mail-outline"
          size={20}
          color="#ccc"
          style={styles.icon}
        />
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
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#ccc"
          style={styles.icon}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          style={styles.input}
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Ionicons
            name={secureText ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#aaa"
          />
        </TouchableOpacity>
      </View>

      {/* Sign In Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/Exhaust")}
      >
        <Text style={styles.buttonText}>Sign In</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Links */}
      <View style={styles.bottomLinks}>
        <Text style={styles.text}>Don't Have An Account? </Text>
        <TouchableOpacity>
          <Text style={styles.linkText}>Signup</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotText}>Forget Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111", // Dark background
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00A99D", // Teal
  },
  subtitle: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 20,
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
  bottomLinks: {
    flexDirection: "row",
    marginTop: 20,
  },
  text: {
    color: "#aaa",
  },
  linkText: {
    color: "#00A99D",
    fontWeight: "bold",
  },
  forgotText: {
    color: "#00A99D",
    marginTop: 10,
  },
});

export default LoginScreen;
