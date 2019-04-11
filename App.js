import React, { Component } from "react";
import { View, ImageBackground, KeyboardAvoidingView, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Container, Header, Content, Title, Footer, FooterTab, Text, Button, Icon, Left, Body, Right } from "native-base";


import { TipsBlock } from "./components/TipsBlock";
import { MainProgress } from "./components/MainProgress";
import { AnswerBlock } from "./components/AnswerBlock";
import { HitVerbs } from "./components/HitVerbs";
import { LostVerbs } from "./components/LostVerbs";

import { verbs } from "./data/VerbsData";

import Modal from "react-native-modal";

const styles = StyleSheet.create({
  scoreContainer: {
    paddingBottom: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    flexDirection: "row"
  },
  nextBtnBlock: { 
    marginTop: -65,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"row" 
  },
  tipsBlockContainer: {
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: -21 
  },
  tipsText: {
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20
  },

  modalContent: {
    backgroundColor: "red"
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  scrollableModal: {
    height: 300,
  },
  scrollableModalContent1: {
    height: 200,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollableModalContent2: {
    height: 200,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
  }
});

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      activeVerbs: verbs,
      activeVerb: "",
      isReady: false,
      lostVerbs: 0,
      hitVerbs: 0,
      isModalVisible: false,
      visibleModal: null,
      lastGuess: null
    };
  }

  handleOnScroll = (event) => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };

  handleScrollTo = (p) => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo(p);
    }
  };

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

  updateActiveVerb(verb) {
    this.setState({
      activeVerb: verb
    });    
  }

  updateVerbs(verbsArray) {
    this.setState({
      activeVerbs: verbsArray
    });
  }

  updateResult(result) {
    this.setState({
      lastGuess: result
    });    
    
    this.setState({ visibleModal: null });    
  }

  hitOrMiss() {
    if (this.state.lastGuess === true) {
    //if (result == true) {
      this.setState({ hitVerbs: this.state.hitVerbs + 1 });
    } else {
      this.setState({ lostVerbs: this.state.lostVerbs + 1 });
    }
  }

  showModal() { 
    this.setState({ visibleModal: true });
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
          <ImageBackground source={require("./assets/england-04.jpg")} style={{width: "100%", paddingTop: 20}}>
            <View style={ styles.scoreContainer } >
              <LostVerbs lost={ this.state.lostVerbs } />

              <MainProgress remainingVerbs={ this.state.activeVerbs.length } />

              <HitVerbs hit={ this.state.hitVerbs } />
            </View>
            
            <View style={ styles.nextBtnBlock }>
              <Button onPress={() => this.showModal() } rounded primary>
                <Text> NEXT ONE </Text>
              </Button>
            </View>
          </ImageBackground>          

          <KeyboardAvoidingView behavior="padding" enabled>
            <View style={ styles.tipsBlockContainer }>
              <Text style={ styles.tipsText }>
                Espaço destinado para as dicas sobre os tempos verbais. Dicas sobre como as 3 formas irão se formar.
              </Text>

              <Modal
                isVisible={this.state.visibleModal === true}
                backdropColor={"black"}
                backdropOpacity={0.7}
                animationIn={"zoomInUp"}
                animationOut={"zoomOutDown"}
                animationInTiming={1000}
                animationOutTiming={1000}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={1000}
                onModalHide={ () => this.hitOrMiss() }
              >
                <View style={styles.modalContent}>
                  <AnswerBlock
                    activeVerbs={ this.state.activeVerbs }
                    activeVerb={ this.state.activeVerb }
                    updateActiveVerb={ (v) => this.updateActiveVerb(v) }
                    updateVerbs={ (v) => this.updateVerbs(v)}
                    updateResult={ (r) => this.updateResult(r) }
                    remainingVerbs={ this.state.activeVerbs.length }
                  />          
                </View>
              </Modal>
              
              {/* <AnswerBlock
                activeVerbs={ this.state.activeVerbs }
                activeVerb={ this.state.activeVerb }
                updateActiveVerb={ (v) => this.updateActiveVerb(v) }
                updateVerbs={ (v) => this.updateVerbs(v)}
                hitOrMiss={ (r) => this.hitOrMiss(r) }
                remainingVerbs={ this.state.activeVerbs.length }
              /> */}

              {/* <TipsBlock /> */}
            </View>
          </KeyboardAvoidingView>
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
