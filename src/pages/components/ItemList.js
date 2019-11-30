import React, { Component } from 'react';
import { Text } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';

const validDate = (dataFim) => {

    const dateFimSplit = dataFim.split("/");
    
    const fim = new Date(dateFimSplit[2], dateFimSplit[1] - 1, dateFimSplit[0]);
    const data = new Date();
    const hoje = new Date(data.getFullYear(), data.getMonth(), data.getDate());

    return fim > hoje ? 1 : fim.getTime() === hoje.getTime() ? 2 : 0;
}

const titulo = (item) => (
          <Text style={
            validDate(item.periodo.fim[0]) === 1 ? {color: '#0c0'} 
          : validDate(item.periodo.fim[0]) === 2 ? { color: '#cc0' } : {color: '#f00'}
          }>
            
              {item.turma ? <Text style={{fontWeight: 'bold'}}>{item.turma}: </Text> : ""}
              {item.titulo}

          </Text>
);

const ItemList = ({item}) => (
    <ListItem
    title={titulo(item)}
    subtitle={
      item.periodo.inicio[0] + " às " + item.periodo.inicio[1] 
      + " - " + item.periodo.fim[0] + " às " + item.periodo.fim[1]}
      bottomDivider
      titleStyle={
            validDate(item.periodo.fim[0]) === 1 ? {color: '#0c0'} 
          : validDate(item.periodo.fim[0]) === 2 ? { color: '#cc0' } : {color: '#f00'}}
    />
);

export default ItemList;