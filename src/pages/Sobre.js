import React, { Component } from 'react';

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

export default class pages extends Component {
  render() {
    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.fildset}>
                    <View style={styles.title}>
                        <Text style={{fontWeight: 'bold'}}>Sobre o aplicativo</Text>
                    </View>
                    <View style={styles.info}>
                        <View style={styles.label_content}>
                            <View>
                                <Text style={{marginBottom: 10}}>Sigaa Notification é um aplicativo integrado ao sistema web Sigaa voltado para os alunos de EAD da UFPI.
                                    O objetivo do aplicativo é notificar os alunos sobre os prazos de entrega 
                                    das atividades e trabalhos.</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[styles.fildset, {marginTop: 20,}]}>
                    <View style={styles.title}>
                        <Text style={{fontWeight: 'bold'}}>Desenvolvedor</Text>
                    </View>
                    <View style={styles.info}>
                        <View style={styles.label_content}>
                            <View>
                                <View style={styles.item}>
                                    <View style={styles.icon}>
                                        <Icon
                                            name="user"
                                            type="font-awesome"
                                            size={20}
                                        />
                                    </View>
                                    <View style={styles.dados}>
                                        <Text style={{marginLeft: 30}}>Alexsander Soares</Text>
                                    </View>
                                </View>
                                <View style={styles.item}>
                                    <View style={styles.icon}>
                                        <Icon
                                            name="github"
                                            type="font-awesome"
                                            size={20}
                                        />
                                    </View>
                                    <View style={styles.dados}>
                                        <Text style={{marginLeft: 30}}>@AlexsanderSoares</Text>
                                    </View>
                                </View>
                                <View style={styles.item}>
                                    <View style={styles.icon}>
                                        <Icon
                                            name="instagram"
                                            type="font-awesome"
                                            size={20}
                                        />
                                    </View>
                                    <View style={styles.dados}>
                                        <Text style={{marginLeft: 30}}>@alexsanderssoares</Text>
                                    </View>
                                </View>
                                <View style={styles.item}>
                                    <View style={styles.icon}>
                                        <Icon
                                            name="facebook"
                                            type="font-awesome"
                                            size={20}
                                        />
                                    </View>
                                    <View style={styles.dados}>
                                        <Text style={{marginLeft: 30}}>alexsander.soares.948</Text>
                                    </View>
                                </View>
                                <View style={styles.item}>
                                    <View style={styles.icon}>
                                        <Icon
                                            name="linkedin"
                                            type="font-awesome"
                                            size={20}
                                        />
                                    </View>
                                    <View style={styles.dados}>
                                        <Text style={{marginLeft: 30}}>linkedin.com/in/alexsandersoaresdasilva</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    fildset: {
        backgroundColor: '#eee',
        minWidth: 330,
        borderRadius: 10,
    },
    title: {
        backgroundColor: '#ccc',
        padding: 15,
    },
    label_content: {     
        flexWrap: 'wrap',
        padding: 15,
    },
    item: {
        flexDirection: 'row',
        width: 300,
        marginTop: 3,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    dados: {
        padding: 10,
        alignItems: 'flex-start',
        width: 250,
    }, 
    icon: {
        padding: 10,
        width: 40,
    },  
  });