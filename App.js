import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Title, Footer, FooterTab, Text, Button, Icon, Left, Body, Right } from 'native-base';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
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

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
      <Container>
        <Content>
          <Text>
            This is Content Section
          </Text>
        </Content>

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
{/*         <Content>
          <Text>
            This is Content Section
          </Text>
        </Content> */}
        <Content>
          <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto%3Dcompress%26cs%3Dtinysrgb%26dpr%3D1%26w%3D500&imgrefurl=https://www.pexels.com/search/nature/&docid=ShwNVOdFBcmkxM&tbnid=8c_UAo3gH_220M:&vet=1&w=500&h=200&source=sh/x/im'}} />
                  <Body>
                    <Text>NativeBase</Text>
                    <Text note>GeekyAnts</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={{uri: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto%3Dcompress%26cs%3Dtinysrgb%26dpr%3D1%26w%3D500&imgrefurl=https://www.pexels.com/search/nature/&docid=ShwNVOdFBcmkxM&tbnid=8c_UAo3gH_220M:&vet=1&w=500&h=200&source=sh/x/im'}} style={{height: 200, width: null, flex: 1}}/>
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent>
                    <Icon active name="thumbs-up" />
                    <Text>12 Likes</Text>
                  </Button>
                </Left>
                <Body>
                  <Button transparent>
                    <Icon active name="chatbubbles" />
                    <Text>4 Comments</Text>
                  </Button>
                </Body>
                <Right>
                  <Text>11h ago</Text>
                </Right>
              </CardItem>
            </Card>          
        </Content>        
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}