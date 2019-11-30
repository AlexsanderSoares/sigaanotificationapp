import React, { Component } from 'react';

import { View, StyleSheet, ScrollView, Text, Alert } from 'react-native';
import Accordion from './components/Accordion';
import AsyncStorage from '@react-native-community/async-storage';

// import { Container } from './styles';

export default class Turmas extends Component {

  constructor(props){
    super(props);

    this.state = {
      turmas: [],
    };

  }

  async componentDidMount(){
      const turmas = JSON.parse(await AsyncStorage.getItem('@SigaaNotification:turmas'));

      if(turmas)
        this.setState({ turmas });
  }

  renderAcordians = () => {
      return this.state.turmas.map(turma => (
        <Accordion
            key={turma.id}
            titulo={turma.turma}
            atividades={turma.atividades}
        />
      ));
  }

  render() {
    return(
        <View style={styles.container}>
          {this.state.turmas.length && this.state.turmas.length > 0 ? 
            <ScrollView style={styles.container}>
                {this.renderAcordians()} 
            </ScrollView>
            :
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{color: '#999', fontSize: 16, }}>Nenhuma turma encontrada</Text>
            </View>
        }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
});
