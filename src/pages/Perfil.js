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
                    <View style={styles.header}>
                        
                    </View>
                    <View style={styles.foto}>
                        <FotoPerfil/>
                    </View>
                    <View style={styles.fieldset}>
                        <View style={styles.fieldset_content}>
                            <View style={styles.nome_content}>
                                <Text style={styles.nome}>
                                    {this.state.user.nome}
                                </Text>
                            </View>
                            {/* <View style={styles.title}>
                                <Text style={{fontSize: 15, fontWeight: 'bold', color: '#000'}}>Dados do usuário</Text>
                            </View> */}
                            {/* <View style={styles.info}>
                                <View style={styles.label_content}>
                                    <Text style={styles.label}>Nome:</Text>
                                    <View style={styles.dados}>
                                        <Text>{this.state.user.nome}</Text>
                                    </View>
                                </View>
                            </View> */}
                            <View style={styles.row}>
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
                            </View>
                            <View style={styles.row}>
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
                            </View>
                            <View style={styles.row}>
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
                            </View>
                            <View style={styles.row}>
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
                            </View>
                            <View style={styles.row}>
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
    },
    fieldset: {
        padding: 50,
    },
    fieldset_content: {
        flex: 1,
        padding: 30,
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
    },
    label_content: { 
        padding: 10,
        flexWrap: 'wrap',
        // backgroundColor: '#eee',
        marginBottom: 2,
        marginLeft: 2,
        width: 180,
        minHeight: 110,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    label: {
        fontWeight: 'bold',
        padding: 5,

    },
    // info: {
    //     borderBottomColor: '#000',
    //     borderBottomWidth: StyleSheet.hairlineWidth,
    // },
    dados: {
        padding: 5,
    },
    header: {
        backgroundColor: '#404E82', 
        height: 160,
        width: '100%',
    },
    foto: {
        position: 'absolute',
        marginTop: 70,
        marginBottom: 20,
        borderRadius: 150,
    },
    nome_content: {
        alignItems: 'center',
        padding: 5,
        margin: 30,
        marginBottom: 10,
        marginTop: 0,
        borderBottomColor: '#ccc',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    nome: {
        fontSize: 15,
        color: '#000',
        fontWeight: 'bold',
    }
  });
