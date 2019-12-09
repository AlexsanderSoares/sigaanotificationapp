import React, { Component } from 'react';

import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image, Alert, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';
import Loading from './components/loading';
import scheduleNotification from './funcoes/scheduleNotification';

export default class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            loading: false,
            usuario: "",
            senha: "",
        };
    }

    async componentDidMount(){

        const user = await JSON.parse(await AsyncStorage.getItem('@SigaaNotification:user'));
        const turmas = await JSON.parse(await AsyncStorage.getItem('@SigaaNotification:turmas'));
        
        if(user && turmas)
            this.props.navigation.navigate('Home');
    }

    login = async () => {

        try{

            this.setState({ loading: true });
            
            const response = await api.post('/api/buscarInformacoes/', {
                login: this.state.usuario,
                password: this.state.senha,
            });

            const { infoAluno, turmas } = response.data;

            if(infoAluno && turmas){
                await AsyncStorage.multiSet([
                    ['@SigaaNotification:user', JSON.stringify(infoAluno)],
                    ['@SigaaNotification:turmas', JSON.stringify(turmas)],
                    ['@SigaaNotification:login', this.state.usuario],
                    ['@SigaaNotification:password', this.state.senha]
                ]);
            }

            scheduleNotification(turmas);

            // Alert.alert("TESTE", JSON.stringify(turmas));

            this.setState({ loading: false });

            this.props.navigation.navigate('Home');

        }catch(err){

            this.setState({ loading: false });

            Alert.alert("Erro", "Não foi possível efetuar login");

        }

    }

    render() {
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
                <View style={styles.title_content}>
                    {/* <View style={{width: 50, height: 50}}> */}
                        <Image
                            source={require('./img/sigaa_notification_icon.png')}
                            style={{resizeMode: 'contain', width: 150, height: 150}}
                        />
                    {/* </View> */}
                    <Text style={styles.title}>
                        Sigaa Notification
                    </Text>
                </View>
                <TextInput
                    placeholder="Usuário"
                    onChangeText={usuario => this.setState({ usuario })}
                    value={this.state.usuario}
                    style={styles.input}
                    editable={!this.state.loading}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Senha"
                    onChangeText={senha => this.setState({ senha })}
                    value={this.state.senha}
                    style={styles.input}
                    secureTextEntry={true}
                    editable={!this.state.loading}
                />
                <TouchableOpacity
                    onPress={() => this.login()}
                    style={styles.button}
                >
                    <Text style={{fontWeight: "bold", color: "#fff",}}>Entrar</Text>
                </TouchableOpacity>

                { this.state.loading && <Loading/> }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: "center",
        alignItems: 'center',
    },
    input: {
        backgroundColor: '#ddd',
        padding: 10,
        width: 250,
        height: 45,
        marginTop: 5,
        borderRadius: 10,
    },
    button: {
        width: 250,
        alignItems: "center",
        padding: 10,
        backgroundColor: '#404E82',
        borderRadius: 10,
        marginTop: 10,
    },
    title_content: {
        margin: 10,
        alignItems: 'center',
    },  
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#404E82',
    },  
});
