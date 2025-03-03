import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "./Navbar";
// Expanded predefined questions and responses
const hardcodedResponses: { [key: string]: string } = {
  "when is my fom assignment due":
    "Your Fundamentals of Management assignment is due on 15.2.2025 (Saturday).",
  "where is my next class":
    "Your next class starts at 12:30 in room number A110, Compiler Design Techniques.",
  "what are my pending assignments":
    "You have 2 pending assignments:\n- 'Database Management Systems' due on 6.3.2025\n- 'Software Engineering' due on 12.3.2025",
  "how do i check my attendance":
    "Your current attendance:\n- Cloud Computing: 85%\n- Software Engineering: 78%\n- Mathematics: 92%\nMinimum required: 75%.",
  "who is my academic advisor":
    "Your academic advisor is Dr. Anil Sharma. You can reach him at anil.sharma@campus.com or visit Room 206, Block C.",
  "where is the library":
    "The library is in Block A, Ground Floor. Timings: 9 AM - 8 PM (Monday-Saturday), Closed on Sundays.",
  "how do i report a lost item":
    "Lost items can be reported at the Security Office in Block A.",
  "what events are happening this week":
    "Upcoming events:\n- Hackathon 2025 → March 8, 2025, at 9 AM (Auditorium)\n- Cultural Fest → March 9, 2025, at 6 PM (Open Ground).",
  "how do i check my class schedule":
    "You can check your full class schedule on the CampusEase app under 'My Timetable'.",
  "where is the cafeteria":
    "The cafeteria is located in Block B, Ground Floor. Open from 8 AM to 10 PM.",
  "how do i reset my campus portal password":
    "You can reset your password on the Campus Portal login page. Click 'Forgot Password' and follow the steps.",
  "when is the next holiday":
    "Your next holiday is on March 21st, 2025, for Holi Festival.",
  "where can i take printouts":
    "You can print documents at the Print & Copy Center in Block C, First Floor.",
  "how do i apply for a leave":
    "You can apply for leave through the CampusEase app under 'Leave Application'.",
  "what are the library rules":
    "Library Rules:\n- Silence must be maintained.\n- No food or drinks allowed.\n- Borrowed books must be returned within 14 days.",
  "where can i check my exam results":
    "Your exam results can be checked on the Campus Portal under 'Exam Results' section.",
  "what time does the bus leave":
    "The next campus bus leaves at 4:30 PM from the main gate.",
  "how do i pay my tuition fees":
    "You can pay your tuition fees online through the Campus Portal under 'Payments' section.",
  "how do i contact campus security":
    "Campus security can be reached at +91-9876543210 or visit the Security Office in Block A.",
};

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "When is my FOM assignment due?", sender: "user" },
    {
      text: hardcodedResponses["when is my fom assignment due"],
      sender: "bot",
    },
    { text: "Thank you! Where is my next class?", sender: "user" },
    { text: hardcodedResponses["where is my next class"], sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (inputText.trim() === "") return;

    const newMessage = { text: inputText, sender: "user" };
    setMessages([...messages, newMessage]);

    const normalizedInput = inputText.toLowerCase().trim();

    const response = Object.keys(hardcodedResponses).find((key) =>
      normalizedInput.includes(key)
    );

    setTimeout(() => {
      if (response) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: hardcodedResponses[response], sender: "bot" },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "I'm not sure about that. Please check the CampusEase portal for more details.",
            sender: "bot",
          },
        ]);
      }
    }, 1000);

    setInputText("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CampusAI</Text>
      <ScrollView style={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              msg.sender === "user" ? styles.userBubble : styles.botBubble,
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write your question to AI chatbot here"
          placeholderTextColor="#999"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10,
  },
  header: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  chatContainer: {
    flex: 1,
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#333",
  },
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#009688",
  },
  messageText: {
    color: "white",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#333",
    marginBottom: 50,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#333",
    color: "white",
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#6200ea",
    padding: 10,
    borderRadius: 50,
  },
});

export default Chatbot;
