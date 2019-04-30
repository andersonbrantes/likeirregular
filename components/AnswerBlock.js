import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button } from "native-base";

import { MatchBlock } from "../components/MatchBlock";


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 400,
    borderRadius: 25,
    borderColor: "rgba(0, 0, 0, 0.1)",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "stretch"
  }, 
  verbText: {
    textAlign: "center",
    color: "#F3F7F9",
    fontSize: 25,
    textTransform: "uppercase",
    fontWeight: "bold"    
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
    top: -26,
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center"
  },
  block1: { 
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"column",
    paddingTop: 40                
  },
  checkBtn: {
    position: "absolute",
    bottom: -22,
    left: 125,
    borderRadius: 25,
    //borderBottomLeftRadius: 25    
  }  
});

export class AnswerBlock extends Component {
  constructor (props) {
    super(props);

    this.state = {
      sentText: "",
      activeVerbTense: ""
    };    
  }

  componentWillMount() {
    this.getVerb();
  }

  componentDidMount() {
    this.hiddenItem();
  }  

  getVerb() {   
    if (this.props.activeVerbs.length === 0) {
      return false;
    }

    const selectedItem = this.props.activeVerbs.splice(Math.floor(Math.random()*this.props.activeVerbs.length), 1)[0];

    this.props.updateActiveVerb(selectedItem);
  }

  hiddenItem() {
    const item          = this.props.activeVerb;
    const verbTense     = ["infinitive", "simplePast", "pastParticiple"];
    const selectedTense = verbTense.splice(Math.floor(Math.random()*verbTense.length), 1)[0];
    const selectedItem  = [ selectedTense, item[selectedTense]];

    this.setState({
      activeVerbTense: selectedItem[0]
    });      
    //return selectedItem;
  }

  updateSentText(text) {
    this.setState({
      sentText: text
    });
  }

  updateActiveVerbTense(tense) {
    this.setState({
      activeVerbTense: tense
    });
  }

  matchedVerb() {
    const activeVerb = this.props.activeVerb;

    const sentText   = this.state.sentText.toUpperCase();
    const targetVerb = activeVerb[this.state.activeVerbTense].toUpperCase();
    const result     = sentText === targetVerb;
console.warn(sentText);
console.warn(this.state.activeVerbTense);

    this.props.updateResult(result);

    return result;
  }

  render() {
    const activeVerb = this.props.activeVerb;
    const activeVerbTense = this.state.activeVerbTense;  

    return (
      <View style={ styles.container }>   
        {                    
          this.props.remainingVerbs === 0 ?
          
          <Text >The End</Text> :

          <View style={ styles.block1 }>
            {
              Object.keys(activeVerb).map( (key) => {
                const hiddenVerb = key === activeVerbTense;    

                return (                                                      
                  hiddenVerb ?
                  ( 
                    <MatchBlock
                      key={key}
                      targetKey={ key }
                      updateSentText={ (text) => this.updateSentText(text) }
                    />
                  ) :
                  ( 
                    <View key={key} style={styles.resultBlock}>
                      <Button bordered disabled style={styles.resultKey}><Text>{ key }</Text></Button>
                      <Text style={styles.resultText}>{ activeVerb[key] }</Text>
                    </View>
                  )                                                                                        
                );
              })
            }
          </View>
        }

        <Button
          onPress={() => this.matchedVerb() }
          primary
          style={ styles.checkBtn }
        >
          <Text> Tap to Check </Text>
        </Button>        
      </View>
    );
  }
}
