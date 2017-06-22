import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Title, Text, Button, Left, Right, Body, Icon, Input} from 'native-base';
import ListComponent from './ListComponent';

class App extends Component {

    constructor(){
        super();

        this.state = {
            nuevo: '',
            lista: [
                {
                    id: 1,
                    name: 'pollo',
                    done: false
                },
                {
                    id: 2,
                    name: 'sopa',
                    done: false
                },
                {
                    id: 3,
                    name: 'ropa',
                    done: false
                }
            ]
        }
    }

    changeDone = (item) => {
        console.log(item);
        this.state.lista = this.state.lista.filter(i => i !== item);
        this.state.lista.push(item);
        this.setState({lista: this.state.lista});
    }

    agregarItem = () => {
        let nuevo = this.state.nuevo;
       nuevo = {id:nuevo,name:nuevo,done:false};
        firebase.database().ref('items').push(nuevo);
        this.state.lista.push(nuevo);
        this.setState({lista: this.state.lista});
        console.log(nuevo);
    }
    
    render(){
        return(
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
                    <Right/>
                </Header>
                <Content>
                    <Input
                        value={this.state.nuevo}
                        placeholder="Que otra cosa necesitas"
                        onChangeText={nuevo=>this.setState({nuevo})}
                     /> 
                    <View style={styles.container}>
                        <ListComponent
                        lista={this.state.lista} 
                        changeDone={this.changeDone} />
                    </View>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full onPress={this.agregarItem}>
                            <Text>Agregar</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default App;

const firebaseConfig = {
     apiKey: "AIzaSyCRXyAazBjrVJfeGNGg3Q7a6w7nfK3sa50",
    authDomain: "chat-itp-7b47f.firebaseapp.com",
    databaseURL: "https://chat-itp-7b47f.firebaseio.com",
    projectId: "chat-itp-7b47f",
    storageBucket: "chat-itp-7b47f.appspot.com",
    messagingSenderId: "635225120338",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
