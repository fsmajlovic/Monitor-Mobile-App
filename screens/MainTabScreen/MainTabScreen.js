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
import OptionScreen from '../ReportScreen/screens/OptionScreen';
import MachineScreen from '../ReportScreen/screens/MachineScreen';
import EditTask from '../TehnicianScreen/screens/EditTask';
import FileManager from '../AccessControlScreen/screens/FileManager'
import ImageUploadScreen from '../ReportScreen/screens/ImageUploadScreen';
import ImageBrowserScreen from '../ReportScreen/screens/ImageBrowserScreen';



const HomeStack = createStackNavigator();
//const ConsoleStack = createStackNavigator();
const ReportStack = createStackNavigator();
//const AccessControlStack = createStackNavigator();
const TehnicianStack = createStackNavigator();


const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#0D47A1"
      inactiveColor="lightgrey"
      barStyle={{backgroundColor: 'white'}}
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
            backgroundColor: '#0D47A1',
            shadowOpacity: 0,
            elevation: 0,
            },
            headerTintColor: 'white',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{
            title:'Home',
            }} />
            <HomeStack.Screen name="Console" component={ConsoleScreen} options={{

            }} />
            <HomeStack.Screen name="AccessControl" component={AccessControlScreen} options={{

            }} />
            <HomeStack.Screen name="Options" component={OptionScreen} options={{

            }} />
            <HomeStack.Screen name="Statistic" component={StatisticScreen} options={{

            }} />
            <HomeStack.Screen name="FileManager" component={FileManager} options={{
                  
            }} />
            
    </HomeStack.Navigator>
    );
  
    // const ConsoleStackScreen = ({navigation}) => (
    //   <ConsoleStack.Navigator screenOptions={{
    //           headerStyle: {
    //           backgroundColor: 'transparent',
    //           shadowOpacity: 0,
    //           elevation: 0,
    //           },
    //           headerTintColor: 'black',
    //           headerTitleStyle: {
    //           fontWeight: 'bold'
    //           }
    //       }}>
    //           <ConsoleStack.Screen name="Console" component={ConsoleScreen} options={{
  
    //           }} />
    //   </ConsoleStack.Navigator>
    //   );
  
      const ReportStackScreen = ({navigation}) => (
        <ReportStack.Navigator screenOptions={{ 
                headerStyle: {
                  backgroundColor: '#0D47A1',
                  shadowOpacity: 0,
                  elevation: 0,
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                fontWeight: 'bold',
                }
            }}>
              
                <ReportStack.Screen name="Report" component={ReportScreen} options={{}} />

                <ReportStack.Screen name="MachineScreen" component={MachineScreen} options={{}} />

                <ReportStack.Screen name="ImageUploadScreen" component={ImageUploadScreen} options={{}} />

                <ReportStack.Screen name="ImageBrowserScreen" component={ImageBrowserScreen} options={{
                  title: 'Selected 0 files',
                }} />
        </ReportStack.Navigator>
        );
  
        // const AccessControlStackScreen = ({navigation}) => (
        //   <AccessControlStack.Navigator screenOptions={{
        //           headerStyle: {
        //           backgroundColor: 'transparent',
        //           shadowOpacity: 0,
        //           elevation: 0,
        //           },
        //           headerTintColor: 'black',
        //           headerTitleStyle: {
        //           fontWeight: 'bold'
        //           }
        //       }}>
        //           <AccessControlStack.Screen name="AccessControl" component={AccessControlScreen} options={{
                    
        //           }} />
        //           <AccessControlStack.Screen name="FileManager" component={FileManager} options={{
                  
        //         }} />
        //   </AccessControlStack.Navigator>
        //   );
  
          const TehnicianStackScreen = ({navigation}) => (
            <TehnicianStack.Navigator screenOptions={{
                    headerStyle: {
                    backgroundColor: '#0D47A1',
                    shadowOpacity: 0,
                    elevation: 0,
                    },
                    headerTintColor: 'white',
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