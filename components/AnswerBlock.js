import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input } from "native-base";

import { MatchBlock } from "../components/MatchBlock";

export class AnswerBlock extends Component {
  constructor (props) {
    super(props);
  }

  hiddenItem() {
    const item          = this.props.activeVerb;
    const verbTense     = ["infinitive", "simplePast", "pastParticiple"];
    const selectedTense = verbTense.splice(Math.floor(Math.random()*verbTense.length), 1)[0];
    const selectedItem  = [ selectedTense, item[selectedTense]];

    return selectedItem;
  }

  render() {
    const activeVerb = this.props.activeVerb;
    const activeVerbTense = this.hiddenItem()[0];

    return (
      <View style={{marginTop: 30}}>    
        {          
          this.props.remainingVerbs === 0 ?
          
          <Text >The End</Text> :

          Object.keys(activeVerb).map( (key) => {
            const hiddenVerb = key === activeVerbTense;

            return (                            
              <View key={key}>
              {
                hiddenVerb ?
                ( 
                  <MatchBlock
                    target={ activeVerb[key] }
                    hitOrMiss={ (r) => this.props.hitOrMiss(r) }
                  />
                ) :
                ( <Text style={styles.showVerb} >{ activeVerb[key].toUpperCase() }</Text> )
              }                                                                
              </View>
            );
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  showVerb: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#999",
    margin: 10,
    padding: 10,
    fontSize: 25,
    textTransform: "uppercase"
  }
});
