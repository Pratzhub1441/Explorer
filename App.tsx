
import { StyleSheet, View } from 'react-native';
import Footer from './components/Footer/Footer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home/Home';
import Maps from './screens/Maps/Maps';
import Transfer from './screens/Transfer/Transfer';
import Settings from './screens/Settings/Settings';
import Profile from './screens/Profile/Profile';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <View style={styles.container}>
         <NavigationContainer>
       <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Maps" component={Maps} />
      <Stack.Screen name="Transfer" component={Transfer} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
    </NavigationContainer>
      <View style={styles.footer}>
      <Footer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
    backgroundColor: 'black',
    position: 'relative',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: "100%",
  },
});

export default App;
