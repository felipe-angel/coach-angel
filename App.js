//app.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeScreen            from './screens/HomeScreen';
import ProgramSelectScreen   from './screens/ProgramSelectScreen';
import ProgramDetailScreen   from './screens/ProgramDetailScreen';
import ChatScreen            from './screens/ChatScreen';
import PlannerScreen         from './screens/PlannerScreen';
import MacroCalculatorScreen from './screens/MacroCalculatorScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Coach App' }}
        />
        <Stack.Screen
          name="Programs"
          component={ProgramSelectScreen}
          options={{ title: 'Programs' }}
        />
        <Stack.Screen
          name="ProgramDetail"
          component={ProgramDetailScreen}
          options={({ route }) => ({ title: route.params?.program?.title || 'Program' })}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{ title: 'Chat with Coach' }}
        />
        <Stack.Screen 
          name="Planner" 
          component={PlannerScreen} 
          options={{ title: 'Workout Planner' }}
        />
        <Stack.Screen
          name="Macros"
          component={MacroCalculatorScreen}
          options={{ title: 'Macros & Calories' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
