import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, Title, Footer, FooterTab, Text, Button, Icon, Left, Body, Right } from 'native-base';

import { TipsBlock } from './components/TipsBlock';
import { MainProgress } from './components/MainProgress';
import { AnswerBlock } from './components/AnswerBlock';
import { HitVerbs } from './components/HitVerbs';
import { LostVerbs } from './components/LostVerbs';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      lostVerbs: 0,
      hitVerbs: 0
    };
  }

  componentWillMount() {
    this.loadFonts();
  }
  
  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ isReady: true });
  }

  hitOrMiss(result) {
    if (result == true) {
      this.setState({ hitVerbs: this.state.hitVerbs + 1 });
    } else {
      this.setState({ lostVerbs: this.state.lostVerbs + 1 });
    }
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        
        <Content style={{ padding: 10 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} >
            <LostVerbs lost={ this.state.lostVerbs } />            

            <MainProgress />

            <HitVerbs hit={ this.state.hitVerbs } />
          </View>
          
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection:'row' }}>
            <Button primary><Text> Primary </Text></Button>
          </View>

          <AnswerBlock hitOrMiss={ (r) => this.hitOrMiss(r) } />
          {/* <TipsBlock /> */}
        </Content>    

        <Footer>
          <FooterTab>
            <Button full>
              <Text>LikeIrregular</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}