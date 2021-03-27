import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';


import HomeScreen from '../HomeScreen/HomeScreen';
import ConsoleScreen from '../ConsoleScreen/ConsoleScreen';
import ReportScreen from '../ReportScreen/ReportScreen';
import AccessControlScreen from '../AccessControlScreen/AccessControlScreen';
import TehnicianScreen from '../TehnicianScreen/TehnicianScreen';
import AddTask from '../TehnicianScreen/screens/AddTask';
import Schedule from '../TehnicianScreen/screens/Schedule';
import StatisticScreen from '../ReportScreen/screens/StatisticScreen';
import { Button } from 'react-native';
import OptionScreen from '../ReportScreen/screens/OptionScreen';
import EditTask from '../TehnicianScreen/screens/EditTask';


const HomeStack = createStackNavigator();
const ConsoleStack = createStackNavigator();
const ReportStack = createStackNavigator();
const AccessControlStack = createStackNavigator();
const TehnicianStack = createStackNavigator();


const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#E50914"
      inactiveColor="#cbbfa8"
      barStyle={{backgroundColor: '#3D3D3D'}}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#E50914',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
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
                  backgroundColor: '#3D3D3D',
                  shadowOpacity: 0,
                  elevation: 0,
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                fontWeight: 'bold',
                }
            }}>
              
                <ReportStack.Screen name="Report" component={ReportScreen} options={{
                  headerRight: () => (
                    <Button
                      onPress={() => navigation.navigate("Statistic")}
                      title="Statistic >"
                      color="#121212"
                      fontWeight="bold"
                    />
                  ),
                }} />
                <ReportStack.Screen name="Options" component={OptionScreen} options={{

                }} />
                <ReportStack.Screen name="Statistic" component={StatisticScreen} options={{

                }} />
                <ReportStack.Screen name="Console" component={ConsoleScreen} options={{

                }} />
                <ReportStack.Screen name="AccessControl" component={AccessControlScreen} options={{

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
                     <TehnicianStack.Screen name = "AddTask" component={AddTask} options={{
                      
                    }} />
                    <TehnicianStack.Screen name = "Schedule" component={Schedule} options={{
                    
                    }} />
                    <TehnicianStack.Screen name = "EditTask" component={EditTask} options={{
                    
                  }} />
            </TehnicianStack.Navigator>
            );