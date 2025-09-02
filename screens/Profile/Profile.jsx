import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

const Profile = () => {
    const navigation= useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
       <Image
  source={{ uri: "https://www.w3schools.com/howto/img_avatar.png" }}
  style={styles.avatar}
/>

      </View>
      <Text style={styles.name}>Admin</Text>
      <Text style={styles.email}>demo@gmail.com</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Membership</Text>
        <Text style={styles.value}>Gold</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Joined</Text>
        <Text style={styles.value}>Aug 2025</Text>
      </View>
        <TouchableOpacity style={styles.logout} onPress={()=> {
            navigation.navigate("Login");
        }}>
        <Text style={styles.logoutValue}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 32,
    backgroundColor: "#f7fafd",
    flex: 1,
  },
  avatarContainer: {
    borderWidth: 2,
    borderColor: "#3bb7d6",
    borderRadius: 60,
    padding: 4,
    marginBottom: 18,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#eaeaea",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#232946",
    marginBottom: 6,
  },
  email: {
    fontSize: 15,
    color: "#535f7e",
    marginBottom: 18,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    width: "90%",
    alignItems: "center",
    marginVertical: 6,
    shadowColor: "#3bb7d6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    fontSize: 13,
    color: "#7A869A",
  },
  value: {
    fontSize: 15,
    color: "#232946",
    fontWeight: "500",
    marginTop: 3,
  },
  logout: {
   width: Dimensions.get("window").width*0.75,
    backgroundColor: "red",
    marginTop: 10,
    borderRadius: 10,
    padding: 14,
    textAlign: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: '#232946',
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 9,
  },
  logoutValue: {
    color: "white",
    fontWeight: 500,
  }
});
