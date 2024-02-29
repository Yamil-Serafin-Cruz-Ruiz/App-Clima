import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator, FlatList, Image, StyleSheet } from 'react-native';
import { estilos } from './Estilos';

const Clima = () => {
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetch('http://api.weatherapi.com/v1/forecast.json?key=5a492ff34efa492b91a172441211110&q=huejutla&days=3&aqi=no&alerts=no&lang=es')
      .then(res => res.json())
      .then(obj => {
        setData(obj);
        setLoad(true);
      })
      .catch(err => Alert.alert('Error inesperado: ' + err));
  }, []);

  const LoadingScreen = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={'darkblue'} />
        <Text style={styles.loadingText}>Cargando datos</Text>
      </View>
    );
  };

  const LoadedScreen = () => {
    return (
      <View>
        <Text style={styles.location}>{data.location.name}</Text>
        <Text style={styles.currentTemp}>{data.current.temp_c}°C</Text>
        <Text style={styles.weatherDescription}>{data.current.condition.text}  max {data.forecast.forecastday[0].day.maxtemp_c}° / min {data.forecast.forecastday[0].day.mintemp_c}°</Text>
        <FlatList
          data={data.forecast.forecastday}
          renderItem={({ item }) => <Card condicion={item.day.condition.text} max={item.day.maxtemp_c} min={item.day.mintemp_c} iko={item.day.condition.icon} />}
          keyExtractor={(item, index) => index.toString()}
        />
        <Text style={styles.widgetsTitle}>Widgets adicionales:</Text>
        <View style={styles.widgetsContainer}>
          {data.forecast.forecastday.map((day, index) => (
            <Widget key={index} day={day} />
          ))}
        </View>
      </View>
    );
  };

  const Card = ({ condicion, max, min, iko }) => {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>{condicion}</Text>
        <Text style={styles.cardText}>{max}°C</Text>
        <Text style={styles.cardText}>{min}°C</Text>
        <Image style={styles.weatherIcon} source={{ uri: 'https:' + iko }} />
      </View>
    );
  };

  const Widget = ({ day }) => {
    return (
      <View style={styles.widgetContainer}>
        <Text style={styles.widgetText}>Máx: {day.day.maxtemp_c}°C</Text>
        <Text style={styles.widgetText}>Min: {day.day.mintemp_c}°C</Text>
        <Text style={styles.widgetText}>Condición: {day.day.condition.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.ContainerClima}>
      <Text style={styles.title}>Clima</Text>
      {load ? <LoadedScreen /> : <LoadingScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    marginTop: 10,
  },
  location: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  currentTemp: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weatherDescription: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  cardContainer: {
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#eeeeee2e',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
  },
  weatherIcon: {
    width: 30,
    height: 30,
  },
  widgetsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  widgetsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 10,
    padding: 20,
  },
  widgetContainer: {
    borderWidth: 1,
    padding: 5,
    backgroundColor: '#eeeeee2e',
    justifyContent: 'center', 
    borderRadius: 10,
    alignItems: 'center',
  },
  widgetText: {
    fontSize: 16,
  },
  ContainerClima: {
    backgroundColor: '#ba84d3',
    flex: 1,
  },
});

export default Clima;
