import React, { Component } from 'react';

import { View, Text, StyleSheet, FlatList, RefreshControl, Alert, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';

import ItemList from './components/ItemList';
import api from '../services/api';
import scheduleNotification from './funcoes/scheduleNotification';

export default class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      loading: false,
      atividades: [
      ],
    };
  }

  // CONVERTE DATA DE "DD/MM/YYYY" para "YYYY-MM-DD"
  convertDate = (date) => {
        const dateSplit = date.split('/');

        return new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);;
  }

  async componentDidMount(){

      // BUSCA TURMAS ARMAZENADAS
      const turmas = JSON.parse(await AsyncStorage.getItem('@SigaaNotification:turmas'));

      if(turmas){
          this.listAtividades(turmas);
      }
      
  }

  // PEGA TODAS AS ATIVIDADES DAS TURMAS, ORDENA E ADICIONA AO STATE
  listAtividades = (turmas) => {

        const todasAtividades = [];

        turmas.map(turma => {
            turma.atividades.map(atividade => {
                atividade.turma = turma.turma;
                todasAtividades.push(atividade);
            });
        });

        const hoje = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

        const ordAtividades = todasAtividades.sort(
                (a, b) => this.convertDate(a.periodo.fim[0]) - this.convertDate(b.periodo.fim[0])); 

        const ordAtividadesFim = ordAtividades.sort((a, b) => {
                return this.convertDate(a.periodo.fim[0]) < hoje;
        }); 

        const ordAtividadesIguais = ordAtividadesFim.sort((a, b) => {
              return this.convertDate(a.periodo.fim[0]).getTime() === hoje.getTime() ? -1 : 0;
        }); 
  

        this.setState({ atividades: ordAtividadesIguais });

  }

  updateInfo = async () => {
    
    try{

            this.setState({ loading: true });

            const login = await AsyncStorage.getItem('@SigaaNotification:login');
            const password = await AsyncStorage.getItem('@SigaaNotification:password');

            const response = await api.post('/api/buscarInformacoes/', {
                    login,
                    password,
            });

            const { infoAluno, turmas } = response.data;

            if(infoAluno && turmas){

                await AsyncStorage.multiSet([
                                            ['@SigaaNotification:user', JSON.stringify(infoAluno)],
                                            ['@SigaaNotification:turmas', JSON.stringify(turmas)]
                                        ]);

                
                PushNotification.cancelAllLocalNotifications();

                scheduleNotification(turmas);
                
                this.listAtividades(turmas);

                this.setState({ loading: false });

            }else{

                Alert.alert("Erro", "Não foi possível atualizar as informações");

            }

    }catch(err){

        this.setState({ loading: false });
        Alert.alert("Erro", "Não foi possível atualizar as informações");

    }

  }

  // VERIFICA SE A DATA DE ENCERRAMENTO DO TRABALHO JÁ PASSOU
  validDate = (dataFim) => {

      const fim = this.convertDate(dataFim);
      const data = new Date();
      const hoje = new Date(data.getFullYear(), data.getMonth(), data.getDate());

      return fim > hoje ? 1 : fim.getTime() === hoje.getTime() ? 2 : 0;

  }

  // RETORNA O INDICE DO ITEM NO ARRAY COMO STRING
  keyExtractor = (item, index) => index.toString();

  // RENDERIZA O ITEM DA LISTA
  renderItem = ({ item }) => (
      <ItemList item={item}/>
  );

  refresh = () => {
      this.setState({ loading: true });
      this.setState({ loading: false });
  }

  render() {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#404E82" barStyle="light-content" />
            <FlatList
                data={this.state.atividades}
                extraData={this.state}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                refreshControl={
                  <RefreshControl
                      refreshing={this.state.loading}
                      onRefresh={this.updateInfo}
                  />
                }
                ListEmptyComponent={
                      <Text style={{color: '#999', fontSize: 16, }}>Nenhuma atividade encontrada</Text>
                }
                contentContainerStyle={this.state.atividades.length === 0 ? styles.emptyComponent : {}}
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  emptyComponent: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  }
});
