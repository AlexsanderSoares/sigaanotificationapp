import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import React from 'react';
import { View, TouchableOpacity, Alert, Text, ScrollView } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';

import Home from './pages/Home';
import Turmas from './pages/Turmas';
import Perfil from './pages/Perfil';
import LoginScreen from './pages/Login';
import Sobre from './pages/Sobre';
import FotoPerfil, {UserName} from './pages/components/fotoPerfil';

PushNotification.configure({
    onNotification: function(notification) {
      console.log("NOTIFICATION:", notification);
}});

const searchUser = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('@SigaaNotification:user'));
    
    return user.foto;
}

const logout = async (navigation) => {

    const keys = ['@SigaaNotification:user', '@SigaaNotification:turmas', 
                    '@SigaaNotification:login', '@SigaaNotification:login']

    AsyncStorage.multiRemove(keys, err => {
        if(!err){

            PushNotification.cancelAllLocalNotifications();
            navigation.navigate('Login');
            
        }else    
            Alert.alert('Erro', 'Não foi possível efetuar logout');
    });

}

const navOptions = (titulo) => ({navigation}) => ({
    title: titulo,
    headerTintColor: '#fff',
    headerTintStyle: {
      fontWeigth: 'bold',
    },
    headerStyle: {
        backgroundColor: '#404E82',
    },
    headerLeft: () => (
      <TouchableOpacity 
          onPress={() => navigation.openDrawer()}
          style={{width: 65}}
          
      >
        <View style={{flex: 1, alignContent: 'center', justifyContent: 'center',}}>
              <Icon
                name="bars"
                color="#fff"
                type='font-awesome'
              />
        </View>
      </TouchableOpacity>
    ),
    headerRight: (
        <TouchableOpacity 
            onPress={() => logout(navigation)}
            style={{width: 65}}
        >
            <View style={{flex: 1, alignContent: 'center', justifyContent: 'center',}}>
                <Icon
                    name="sign-out"
                    color="#fff"
                    type='font-awesome'
                    size={20}
                />
            </View>
        </TouchableOpacity>
    ),
});

class Hidden extends React.Component {
    render() {
      return null;
    }
  }

const HomeScreen = createStackNavigator({
    HomeScreen: {
        screen: Home, 
        navigationOptions: navOptions("Inicio"),
    }
});

const TurmasScreen = createStackNavigator({
    TurmasScreen: {
        screen: Turmas,
        navigationOptions: navOptions("Turmas"),
    }
});

const PerfilScreen = createStackNavigator({
    PerfilScreen: {
        screen: Perfil,
        navigationOptions: navOptions("Perfil"),
    }
});

const SobreScreen = createStackNavigator({
    SobreScreen: {
        screen: Sobre, 
        navigationOptions: navOptions("Sobre"),
    }
});

const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            title: "Inicio",
            drawerIcon: (
                <Icon 
                    type='font-awesome'
                    name='home'
                    size={20}
                />
            ),
        }
    },
    Turmas: {
        screen: TurmasScreen,
        navigationOptions: {
            title: "Turmas",
            drawerIcon: (
                <Icon 
                    type='font-awesome'
                    name='users'
                    size={20}
                />
            ),
        }
    },
    Perfil: {
        screen: PerfilScreen,
        navigationOptions: {
            title: "Perfil",
            drawerIcon: (
                <Icon 
                    type='font-awesome'
                    name='id-card'
                    size={20}
                />
            ),
        }
    },
    Sobre: {
        screen: SobreScreen,
        navigationOptions: {
            title: "Sobre",
            drawerIcon: (
                <Icon 
                    type='font-awesome'
                    name='info-circle'
                    size={20}
                />
            ),
        }
    },
}, {
    initialRouteName: 'Home',
    contentComponent: props => 
    <ScrollView>
        <View style={{width: "100%", backgroundColor: '#404E82', height: 220, alignItems: 'center', justifyContent: 'center'}}>
            <FotoPerfil/>
        </View>
        <DrawerItems {...props} />
    </ScrollView>
});

const AppNavigator = createStackNavigator({
    Home: {
        screen: DrawerNavigator,
        navigationOptions: {
            header: null,
        }
    },
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null,
        }
    },
}, {
    initialRouteName: "Login",
});

export default createAppContainer(AppNavigator);