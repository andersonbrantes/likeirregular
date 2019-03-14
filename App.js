import React, { Component } from "react";
import { View, ImageBackground } from "react-native";
import { Container, Header, Content, Title, Footer, FooterTab, Text, Button, Icon, Left, Body, Right } from "native-base";

import { TipsBlock } from "./components/TipsBlock";
import { MainProgress } from "./components/MainProgress";
import { AnswerBlock } from "./components/AnswerBlock";
import { HitVerbs } from "./components/HitVerbs";
import { LostVerbs } from "./components/LostVerbs";

import { verbs } from "./data/VerbsData";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      activeVerbs: verbs,
      activeVerb: "",
      isReady: false,
      lostVerbs: 0,
      hitVerbs: 0
    };
  }

  componentWillMount() {
    this.loadFonts();
    this.getVerb();
  }
  
  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ isReady: true });
  }

  getVerb() {   
    if (this.state.activeVerbs.length === 0) {
      return false;
    }

    const selectedItem = this.state.activeVerbs.splice(Math.floor(Math.random()*this.state.activeVerbs.length), 1)[0];

    this.setState({
      activeVerb: selectedItem
    });
  }

  updateVerbs(verbsArray) {
    this.setState({
      activeVerbs: verbsArray
    });
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
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="menu" />
            </Button>            
          </Right>
        </Header>
        
        <Content>          
          
          <ImageBackground source={require("./assets/england-04.jpg")} style={{width: "100%"}}>
            <View style={{ paddingBottom: 50, flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row" }} >
              <LostVerbs lost={ this.state.lostVerbs } />            

              <MainProgress remainingVerbs={ this.state.activeVerbs.length } />

              <HitVerbs hit={ this.state.hitVerbs } />
            </View>
            
            <View style={{ marginTop: -65, flex: 1, justifyContent: "center", alignItems: "center", flexDirection:"row" }}>
              <Button onPress={() => this.getVerb() } rounded primary><Text> NEXT ONE </Text></Button>
            </View>
          </ImageBackground>          

          <View style={{ backgroundColor: "#fff", borderTopRightRadius: 25, borderTopLeftRadius: 25, marginTop: -21 }}>
            <Text style={{paddingTop: 30, paddingLeft: 10, paddingRight: 10, paddingBottom: 20}}>Espaço destinado para as dicas sobre os tempos verbais. Dicas sobre como as 3 formas irão se formar.</Text>
            <AnswerBlock
              activeVerbs={ this.state.activeVerbs }
              activeVerb={ this.state.activeVerb }
              updateVerbs={ (v) => this.updateVerbs(v)}
              hitOrMiss={ (r) => this.hitOrMiss(r) }
              remainingVerbs={ this.state.activeVerbs.length }
            />
            {/* <TipsBlock /> */}
          </View>
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
