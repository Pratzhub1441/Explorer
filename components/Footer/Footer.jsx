import { StyleSheet, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Fontisto';
import Icon2 from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
const navigation= useNavigation();

  return (
    <View style={styles.container}>
        <Pressable onPress={()=> {
            navigation.navigate("Home")
        }}>
      <Icon name="home" size={30} color="black" />
      </Pressable>
       <Pressable onPress={()=> {
            navigation.navigate("Maps")
        }}>
      <Icon name="map-o" size={22} color="black" />
      </Pressable>
       <Pressable onPress={()=> {
            navigation.navigate("Transfer")
        }}>
      <Icon1 name="arrow-swap" size={22} color="black" />
      </Pressable>
       <Pressable onPress={()=> {
            navigation.navigate("Settings")
        }}>
      <Icon2 name="settings" size={22} color="black" />
      </Pressable>
       <Pressable onPress={()=> {
            navigation.navigate("Profile")
        }}>
      <Icon name="home" size={30} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'black',
    borderTopLeftRadius: '15%',
    borderTopRightRadius: '15%',
  },
});

export default Footer;
