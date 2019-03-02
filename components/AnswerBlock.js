import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Input } from 'native-base';

import { verbs } from './data/VerbsData';

import { MatchBlock } from '../components/MatchBlock';

const activeVerbs = verbs;

export class AnswerBlock extends Component {
  constructor (props) {
    super(props);

    this.state = {
      activeVerb: this.getVerb()
    }
  }

  getVerb() {
    const selectedItem = activeVerbs.splice(Math.floor(Math.random()*activeVerbs.length), 1)[0];

    return selectedItem
  }

  hiddenItem() {
    const item          = this.state.activeVerb;
    const verbTense     = ['infinitive', 'simplePast', 'pastParticiple'];
    const selectedTense = verbTense.splice(Math.floor(Math.random()*verbTense.length), 1)[0];
    const selectedItem  = [ selectedTense, item[selectedTense]];

    return selectedItem;
  }

  render() {
    const activeVerb = this.state.activeVerb;
    const activeVerbTense = this.hiddenItem()[0];

    return (
      <View>
        {
          <Text>{ this.hiddenItem() }</Text>
        }                

        {
          Object.keys(activeVerb).map( (key) => {
            const hiddenVerb = key === activeVerbTense

            return (                            
              <View key={key}>
              {
                hiddenVerb ?
                ( <MatchBlock target={ activeVerb[key] } hitOrMiss={ (r) => this.props.hitOrMiss(r) } /> ) :
                ( <Text>{ activeVerb[key] }</Text> )
              }                                                                
              </View>
            )
          })
        }
      </View>
    )
  }
}
