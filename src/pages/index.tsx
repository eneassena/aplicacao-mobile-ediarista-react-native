import React from 'react';
import { Text, View } from 'react-native';
import Button from 'ui/components/Inputs/Button/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import {RootStackParamList} from 'ui/routes/Router';
 
type NavigationProp = StackNavigationProp<RootStackParamList, 'Index'>;

interface IndexProps {
    navigation: NavigationProp
}

const Index: React.FC<IndexProps> = ({navigation}) => {
    return ( 
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Button mode={'contained'} 
            onPress={() => {navigation.navigate('EncontrarDiarista')}}>
                Encontrar Diarista
            </Button>
        </View>
    );
};


export default Index;
