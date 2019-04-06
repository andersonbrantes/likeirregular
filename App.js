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
    // backgroundColor: "#000000",
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
    backgroundColor: "red",
    // height: 300,
    // //padding: 22,
    // //justifyContent: "center",
    // //alignItems: "center",
    // borderRadius: 4,
    // borderColor: "rgba(0, 0, 0, 0.1)"  
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
      visibleModal: null
    };
  }

  renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  handleOnScroll = event => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };

  handleScrollTo = p => {
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

  hitOrMiss(result) {
    if (result == true) {
      this.setState({ hitVerbs: this.state.hitVerbs + 1 });
    } else {
      this.setState({ lostVerbs: this.state.lostVerbs + 1 });
    }
  }

  toggleModal() { 
    this.setState({ isModalVisible: !this.state.isModalVisible });
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
            {/* <View>
              <Text style={{fontSize: 30, color: '#fff', padding: 20, textAlign: 'center'}}>LikeIrregular</Text>
            </View> */}

            <View style={ styles.scoreContainer } >
              <LostVerbs lost={ this.state.lostVerbs } />

              <MainProgress remainingVerbs={ this.state.activeVerbs.length } />

              <HitVerbs hit={ this.state.hitVerbs } />
            </View>
            
            <View style={ styles.nextBtnBlock }>
              <Button onPress={() => this.toggleModal() } rounded primary>
                <Text> NEXT ONE </Text>
              </Button>
            </View>
          </ImageBackground>          

          <KeyboardAvoidingView behavior="padding" enabled>
            <View style={ styles.tipsBlockContainer }>
              <Text style={ styles.tipsText }>
                Espaço destinado para as dicas sobre os tempos verbais. Dicas sobre como as 3 formas irão se formar.
              </Text>

              {this.renderButton("Fancy modal!", () =>
                this.setState({ visibleModal: 4 }),
              )}
              <Modal
                isVisible={this.state.visibleModal === 4}
                backdropColor={'black'}
                backdropOpacity={0.7}
                animationIn={'zoomInUp'}
                animationOut={'zoomOutDown'}
                animationInTiming={1000}
                animationOutTiming={1000}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={1000}
              >
                <View style={styles.modalContent}>
                  <AnswerBlock
                    activeVerbs={ this.state.activeVerbs }
                    activeVerb={ this.state.activeVerb }
                    updateActiveVerb={ (v) => this.updateActiveVerb(v) }
                    updateVerbs={ (v) => this.updateVerbs(v)}
                    hitOrMiss={ (r) => this.hitOrMiss(r) }
                    remainingVerbs={ this.state.activeVerbs.length }
                  />          

                  {this.renderButton("Close", () => this.setState({ visibleModal: null }))}
                </View>
              </Modal>
              
                    <AnswerBlock
                      activeVerbs={ this.state.activeVerbs }
                      activeVerb={ this.state.activeVerb }
                      updateActiveVerb={ (v) => this.updateActiveVerb(v) }
                      updateVerbs={ (v) => this.updateVerbs(v)}
                      hitOrMiss={ (r) => this.hitOrMiss(r) }
                      remainingVerbs={ this.state.activeVerbs.length }
                    />

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
