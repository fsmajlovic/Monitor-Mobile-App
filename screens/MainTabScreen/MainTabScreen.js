import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';


import HomeScreen from '../HomeScreen/HomeScreen';
import ConsoleScreen from '../ConsoleScreen/ConsoleScreen';
import ReportScreen from '../ReportScreen/ReportScreen';
import AccessControlScreen from '../AccessControlScreen/AccessControlScreen';
import TehnicianScreen from '../TehnicianScreen/TehnicianScreen';


const HomeStack = createStackNavigator();
const ConsoleStack = createStackNavigator();
const ReportStack = createStackNavigator();
const AccessControlStack = createStackNavigator();
const TehnicianStack = createStackNavigator();


const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Console"
        component={ConsoleStackScreen}
        options={{
          tabBarLabel: 'Console',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-laptop" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportStackScreen}
        options={{
          tabBarLabel: 'Report',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-book" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="AccessControl"
        component={AccessControlStackScreen}
        options={{
          tabBarLabel: 'Control',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="aperture" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Tehnician"
        component={TehnicianStackScreen}
        options={{
          tabBarLabel: 'Tech',
          tabBarColor: '#e06d1b',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

export default MainTabScreen;










const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: 'transparent',
            shadowOpacity: 0,
            elevation: 0,
            },
            headerTintColor: 'black',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{
            title:'Home',
            }} />
    </HomeStack.Navigator>
    );
  
    const ConsoleStackScreen = ({navigation}) => (
      <ConsoleStack.Navigator screenOptions={{
              headerStyle: {
              backgroundColor: 'transparent',
              shadowOpacity: 0,
              elevation: 0,
              },
              headerTintColor: 'black',
              headerTitleStyle: {
              fontWeight: 'bold'
              }
          }}>
              <ConsoleStack.Screen name="Console" component={ConsoleScreen} options={{
  
              }} />
      </ConsoleStack.Navigator>
      );
  
      const ReportStackScreen = ({navigation}) => (
        <ReportStack.Navigator screenOptions={{
                headerStyle: {
                backgroundColor: 'transparent',
                shadowOpacity: 0,
                elevation: 0,
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                fontWeight: 'bold'
                }
            }}>
                <ReportStack.Screen name="Report" component={ReportScreen} options={{
  
                }} />
        </ReportStack.Navigator>
        );
  
        const AccessControlStackScreen = ({navigation}) => (
          <AccessControlStack.Navigator screenOptions={{
                  headerStyle: {
                  backgroundColor: 'transparent',
                  shadowOpacity: 0,
                  elevation: 0,
                  },
                  headerTintColor: 'black',
                  headerTitleStyle: {
                  fontWeight: 'bold'
                  }
              }}>
                  <AccessControlStack.Screen name="AccessControl" component={AccessControlScreen} options={{
                    
                  }} />
          </AccessControlStack.Navigator>
          );
  
          const TehnicianStackScreen = ({navigation}) => (
            <TehnicianStack.Navigator screenOptions={{
                    headerStyle: {
                    backgroundColor: 'transparent',
                    shadowOpacity: 0,
                    elevation: 0,
                    },
                    headerTintColor: 'black',
                    headerTitleStyle: {
                    fontWeight: 'bold'
                    }
                }}>
                    <TehnicianStack.Screen name="Tehnician" component={TehnicianScreen} options={{
                      
                    }} />
            </TehnicianStack.Navigator>
            );