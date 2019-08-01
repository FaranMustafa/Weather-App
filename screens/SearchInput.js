import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';

export default class SearchInput extends React.Component {

  state = {
    text:"",
  }

  handleChangeText = text => {
    this.setState({text});
    console.log(this.state);
  };

  handleSubmitEditing = () => {
    const {onSubmit} = this.props;
    const {text} = this.state;

    if (!text) return;

    onSubmit(text);
    this.setState({text:''});
    
  }

  
  render() {
    const {placeholder} = this.props;
    const {text} = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          placeholder={placeholder}
          placeholderTextColor="blacks"
          underlineColorAndroid="transparent"
          style={styles.textInput}
          clearButtonMode="always"
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmitEditing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: '#D6EEEA',
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: 'grey',
  },
});
