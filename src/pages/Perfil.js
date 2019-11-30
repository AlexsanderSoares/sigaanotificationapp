import React, { Component } from 'react';

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import FotoPerfil from './components/fotoPerfil';

// import { Container } from './styles';

export default class Perfil extends Component {

    constructor(props){
        super(props);
    
        this.state = {
            user: {
                foto: "",
                nome: "",
                turno: "",
                matricula: "",
                curso: "",
                nivel: "",
                status: "",
                email: "",
                entrada: "",
                polo: "",
                tutor: "",
                ira: ""
            },
        };
    }

    async componentDidMount(){
        const user = JSON.parse(await AsyncStorage.getItem("@SigaaNotification:user"));

        if(user)
            this.setState({ user });
    }
    
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.foto}>
                        <FotoPerfil/>
                    </View>
                    <View style={styles.fildset}>
                        <View style={styles.title}>
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: '#000'}}>Dados do usuário</Text>
                        </View>
                        {/* <View style={styles.info}>
                            <View style={styles.label_content}>
                                <Text style={styles.label}>Nome:</Text>
                                <View style={styles.dados}>
                                    <Text>{this.state.user.nome}</Text>
                                </View>
                            </View>
                        </View> */}
                        <View style={styles.info}>
                            <View style={styles.label_content}>
                                <Text style={styles.label}>Matrícula:</Text>
                                <View style={styles.dados}>
                                    <Text>{this.state.user.matricula}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.info}>
                            <View style={styles.label_content}>
                                <Text style={styles.label}>Email:</Text>
                                <View style={styles.dados}>
                                    <Text>{this.state.user.email}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.info}>
                            <View style={styles.label_content}>
                                <Text style={styles.label}>Polo:</Text>
                                <View style={styles.dados}>
                                    <Text>{this.state.user.polo}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.info}>
                            <View style={styles.label_content}>
                                <Text style={styles.label}>Curso:</Text>
                                <View style={styles.dados}>
                                    <Text>{this.state.user.curso}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.info}>
                            <View style={styles.label_content}>
                                <Text style={styles.label}>Nível:</Text>
                                <View style={styles.dados}>
                                    <Text>{this.state.user.nivel}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.info}>
                            <View style={styles.label_content}>
                                <Text style={styles.label}>Turno:</Text>
                                <View style={styles.dados}>
                                    <Text>{this.state.user.turno}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.info}>
                            <View style={styles.label_content}>
                                <Text style={styles.label}>Status:</Text>
                                <View style={styles.dados}>
                                    <Text>{this.state.user.status}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.info}>
                            <View style={styles.label_content}>
                                <Text style={styles.label}>Entrada:</Text>
                                <View style={styles.dados}>
                                    <Text>{this.state.user.entrada}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.info}>
                            <View style={styles.label_content}>
                                <Text style={styles.label}>Tutor:</Text>
                                <View style={styles.dados}>
                                    <Text>{this.state.user.tutor}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.info}>
                            <View style={styles.label_content}>
                                <Text style={styles.label}>IRA:</Text>
                                <View style={styles.dados}>
                                    <Text>{this.state.user.ira}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 15,
    },
    fildset: {
        backgroundColor: '#eee',
        minWidth: 330,
    },
    title: {
        backgroundColor: '#ccc',
        padding: 15,
    },
    label_content: {
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#aaa',
        flexWrap: 'wrap',
    },
    label: {
        fontWeight: 'bold',
        padding: 5
    },
    dados: {
        padding: 5,
    },
    foto: {
        margin: 20,
        marginBottom: 3,
        backgroundColor: '#404E82', 
        minWidth: 330,
        padding: 20,
        alignItems: 'center',
    },
  });
