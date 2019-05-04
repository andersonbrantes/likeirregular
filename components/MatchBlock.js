import React, { Component } from "react";
import { View, StyleSheet, TextInput } from "react-native";

import { Text, Input, Button } from "native-base";

const styles = StyleSheet.create({
  guessVerb: {
    margin: 10,
    padding: 10,
    textAlign: "center",
    height: 80,
    color: "#f2f2f2",
    fontSize: 30,
    textDecorationLine: 'underline',
    textDecorationColor: 'red',
    textDecorationStyle: 'solid',
    fontWeight: 'bold'
  },
  resultBlock: {
    width: 300,
    height: 40,
    marginTop: 20,
    marginBottom: 15,
    paddingTop: 20,
    borderTopColor: '#DDD',
    borderTopWidth: 1
  },  
  resultText: {
    fontSize: 20,
    textAlign: 'center',
    position: 'absolute',
    top: -28,
    right: 0
  },
  resultKey: {
    width: 150,
    height: 50,
    position: 'absolute',
    left: 0,
    top: -26,
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center"
  }  
});

export class MatchBlock extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.nameInput.focus();
  }

  render() {
    return (
      <View style={ styles.matchContainer } >

        <View key={this.props.targetKey} style={styles.resultBlock}>
          <Button bordered disabled style={styles.resultKey}><Text>{ this.props.targetKey }</Text></Button>

          <TextInput
            ref={(input) => { this.nameInput = input; }} 
            onChangeText={ (text) => this.props.updateSentText(text) }
            style={styles.resultText}
            underlineColorAndroid="transparent"
            spellCheck={false}
            autoCorrect={false}
            autoCapitalize="characters"
          />          
        </View>
      </View>
    );
  }
}
