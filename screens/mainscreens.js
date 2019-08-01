import React, {Component} from 'react';
import {
    ActivityIndicator,
    StyleSheet,
     Text,
      View,
      KeyboardAvoidingView,
    } from 'react-native';
    import { fetchLocationId, fetchWeather } from '../utils/api';
    import SearchInput from './SearchInput';

    import { identifier } from '@babel/types';

//import console = require('console');
console.disableYellowBox = true;
export default class mainscreens extends Component {
    state = {
        loading: false,
        error: false,
        location: '',
        temperature: 0,
        weather: '',
        
    };

    componentDidMount(){
        this.handleUpdateLocation('Karachi');
    }

    

    handleUpdateLocation = async city => {
        if (!city) return;

        this.setState({ loading: true , location: city }, async () => {
            try {
                const locationId = await fetchLocationId(city);
                const { location, weather, temperature } = await fetchWeather(locationId);
             
                this.setState({
                    loading: false,
                    error: false,
                    location,
                    weather,
                    temperature

                });
            } catch(e) {
                this.setState({
                    loading:false,
                    error: true,
                });
            }
        });
    };
    render(){
        const {loading, error, location, weather, temperature} = this.state;
        console.log("location: ",location);
        console.log("loading: ",loading);
        console.log("error: ",error);

        return (
            <View style={styles.container}>
            <ActivityIndicator animating={loading} color="white" size="large" />

            {!loading && (
              <View>
                {error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                    Could not load weather, please try a different city.
                  </Text>
                )}

                {!error && (
                  <View >
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {location}
                    </Text>
                    <Text style={[styles.smallText, styles.textStyle]}>
                      {weather}
                    </Text>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {`${Math.round(temperature)}°`}
                    </Text>
                  </View>
                )}

                <SearchInput
                  placeholder="Search any city"
                  onSubmit={this.handleUpdateLocation}
                />
                    </View>
                )}

            </View>
        );
    }


}


const styles = StyleSheet.create({

container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#46C4AF',
    paddingHorizontal: 20,
 },
 textStyle: {
    textAlign: 'center',
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },

})