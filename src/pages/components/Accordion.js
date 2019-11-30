import React, { Component } from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import ItemList from './ItemList';
import { Icon } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class Accordion extends Component {

    constructor(props){
        super(props);

        this.state = {
            atividades: props.atividades,
            expanded: false,
        };
    }

    toggleExpand = () => {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        return(
            <View>
                <TouchableOpacity style={styles.row} onPress={() => this.toggleExpand()}>
                    <Text style={styles.titulo}>{this.props.titulo}</Text>
                    <Icon 
                        name={this.state.expanded ? 'keyboard-arrow-up' :'keyboard-arrow-down' }
                        size={30}
                        color={Colors.DARKGRAY}
                    />
                </TouchableOpacity>
                <View style={styles.parentHr}/>
                {
                    this.state.expanded &&
                    <View style={styles.child}>
                        {this.state.atividades.map(atividade => (
                            <ItemList key={atividade.id} item={atividade}/>
                        ))}
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 56,
        paddingLeft: 25,
        paddingRight: 18,
        alignItems: 'center',
        backgroundColor: '#eee',
    },
    parentHr: {
        height: 1,
        color: Colors.WHITE,
        width: '100%',
    },
    child: {
        backgroundColor: Colors.LIGHT_GRAY,
        padding: 16,
    }
});
