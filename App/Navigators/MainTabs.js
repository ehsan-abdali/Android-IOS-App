// import { createBottomTabNavigator } from 'react-navigation'
// // import NewsFeed from 'App/Containers/MainScreen/NewsFeed'
// import MainScreen from 'App/Containers/MainScreen/MainScreen'
// import Example from 'App/Containers/Example/ExampleScreen'


// const MainTabs = createBottomTabNavigator({
//   Feed: {
//     screen: MainScreen,
//     navigationOptions: {
//       tabBarLabel: 'Feed',
//     },
//   },
//   Search: {
//     screen: MainScreen,
//     navigationOptions: {
//       tabBarLabel: 'Search',
//     },
//   },
//   Discover: {
//     screen: MainScreen,
//     navigationOptions: {
//       tabBarLabel: 'Discover',
//     },
//   },
// });

// export default MainTabs;


import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import { NavigationContainer } from '@react-navigation/native';

import MainScreen from 'App/Containers/MainScreen/MainScreen'

import { View, Text, TouchableOpacity } from 'react-native';

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
          
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };


        
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}


const Tab = createBottomTabNavigator();


function MyTabs() {
  
  return (
    <NavigationContainer>
      <Tab.Navigator 
       tabBar={props => <MyTabBar {...props} />} 
       initialRouteName="NewsFeed"
       tabBarOptions={{
        activeTintColor: '#e91e63',
       }}
     >
      <Tab.Screen
        name="NewsFeed"
        component={MainScreen}
        options={{
          tabBarLabel: 'News Feed',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

        <Tab.Screen
          name="Profile"
          component={MainScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
              ),
            }}
        />
        <Tab.Screen
          name="TopTrenz"
          component={MainScreen}
          options={{
            tabBarLabel: 'Top Trenz',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="bell" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Performer"
          component={MainScreen}
          options={{
            tabBarLabel: 'Performer',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="bell" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}




export default MyTabs;