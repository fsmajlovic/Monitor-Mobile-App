import React, {useState,useEffect} from 'react'
import { StyleSheet, ScrollView } from 'react-native';
import ListView from './components/ListView';
import StatisticsView from './components/StatisticsView';
import {AuthContext} from '../../contexts/authContext';

const dataSet = [
  {
    key: '1',
    title: 'Mašina 1',
    description: 'Aktivna prije 3 minuta',
    image_url: 'https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ'
  },
  {
    key: '2',
    title: 'Mašina 1',
    description: 'Aktivna prije 10 minuta',
    image_url: 'https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ'
  },
  {
    key: '3',
    title: 'Mašina 1',
    description: 'Aktivna prije 35 minuta',
    image_url: 'https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ'
  },
  {
    key: '4',
    title: 'Mašina 4',
    description: 'Aktivna prije 43 minuta',
    image_url: 'https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ'
  },
  {
    key: '5',
    title: 'Mašina 5',
    description: 'Aktivna prije 4 dana',
    image_url: 'https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ'
  },
  {
    key: '6',
    title: 'Mašina 6',
    description: 'Aktivna prije 23 minuta',
    image_url: 'https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ'
  },
  {
    key: '7',
    title: 'Mašina 7',
    description: 'Aktivna prije 26 minuta',
    image_url: 'https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ'
  },
  {
    key: '8',
    title: 'Mašina 8',
    description: 'Aktivna prije 7 minuta',
    image_url: 'https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ'
  },
  {
    key: '9',
    title: 'Mašina 9',
    description: 'Aktivna prije 9 minuta',
    image_url: 'https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ'
  },
  {
    key: '10',
    title: 'Mašina 10',
    description: 'Aktivna prije 9 minuta',
    image_url: 'https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ'
  },
  {
    key: '11',
    title: 'Mašina 11',
    description: 'Aktivna prije 9 minuta',
    image_url: 'https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ'
  }
]

let data=[];


export default function ReportScreen({navigation}) {
  const [state,setState]=useState(-1);
  const {getSavedToken} = React.useContext(AuthContext);

  useEffect(()=>{
    async function getData(getSavedToken){
      let token = await getSavedToken();
      let body=[];
      fetch("https://si-2021.167.99.244.168.nip.io/api/device/AllDevices", {
        method: 'GET',
        headers: {"Authorization" : "Bearer "+ token},
      }).then((response) => {
            return response.json();
        }).then((responseJson) => {
            body=responseJson.data;
            data=body;
            setState(0);
          }).catch((error) => {
                console.error(error);
          });
    }
    getData(getSavedToken);
  });
  return(
      <ScrollView horizontal={true}>
        <ListView
            itemList={dataSet}
        />
        <StatisticsView dataSet={data}/>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFF',
    elevation: 2,
  }
});
