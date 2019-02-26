import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

import { verbs } from './data/VerbsData';

const activeVerbs = verbs;

export class AnswerBlock extends Component {
    constructor (props) {
        super(props);

        this.state = {
            activeVerb: this._getVerb()
        }
    }

    _getVerb() {
        const selectedItem = activeVerbs.splice(Math.floor(Math.random()*activeVerbs.length), 1)[0];

        return selectedItem
    }

    _hiddenItem() {
        const item = this.state.activeVerb;

        const verbTense = ['infinitive', 'simplePast', 'pastParticiple'];
        const selectedTense = verbTense.splice(Math.floor(Math.random()*verbTense.length), 1)[0];

        const selectedItem = [ selectedTense, item[selectedTense]];

        return selectedItem;
    }

    render() {
        const item = this.state.activeVerb;

        return (
            <View>
                {
                    <Text>{ this._hiddenItem() }</Text>
                }
                
                { 
                    <Text>{item.infinitive} / {item.simplePast} / {item.pastParticiple}</Text>
                }

{/*                 {
                    this.state.activeVerbs.map( (v, i) => {
                        return <View key={i}>
                            <Text>{v.infinitive} / {v.simplePast} / {v.pastParticiple}</Text>
                        </View>
                    })
                } */}
            </View>
        )
    }
}