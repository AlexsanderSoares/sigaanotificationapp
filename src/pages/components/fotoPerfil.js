import React, { Component } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation';

// import { Container } from './styles';

class FotoPerfil extends Component {

    constructor(props){
        super(props);

        this.state = {
            user: {},
        };
    }

    async componentDidMount(){
        const user = JSON.parse(await AsyncStorage.getItem('@SigaaNotification:user'));

        this.setState({ user });
    }

    render() {
        return(
            <View style={{alignItems: 'center', justifyContent: 'center',padding: 10,}}>
                <Avatar
                    size="xlarge"
                    rounded
                    icon={{name: 'user', type: 'font-awesome'}}
                    source={
                        {uri: 'data:image/png;base64,' + this.state.user.foto}
                    }
                    avatarStyle={{borderWidth: 3, borderColor: '#fff', borderRadius: 100,}}
                />
                {/* <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate("Perfil")}
                    style={
                        {
                            width: "100%", 
                            padding: 10, marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }
                    }
                > */}
                    <Text style={{fontWeight: 'bold', fontSize: 14, color: '#fff', marginTop: 10}}>{this.state.user.nome}</Text>
                {/* </TouchableOpacity> */}
            </View>
        );
    }
}

export default withNavigation(FotoPerfil);
