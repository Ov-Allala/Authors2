import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Autors_Screen from './screens/Autors_Screen';
import Posts_Screen from './screens/Posts_Screen';
const Stack = createStackNavigator();
class App extends React.Component {
  
  render()
   {
    return (
     
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="🔳"
              component={Autors_Screen}
            />
            <Stack.Screen
              name="🔲"
              component={Posts_Screen}
              options={({ route }) => ({ autorId: route.params.autorId},{autorName:route.params.autorName})}
            />
          </Stack.Navigator>
        </NavigationContainer>
     
    );
  }
}
export default App;