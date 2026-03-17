import stilusok from '@/styles/styles';
import { useFocusEffect, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { getSelectedTortenet } from '../state/app.state';

export default function DetailsScreen() {
  const router = useRouter();
  const tortenet = getSelectedTortenet();
  useFocusEffect(
    React.useCallback(() => {
      if(tortenet==null){
        router.navigate("/(tabs)/fooldal");
      }
    }, [tortenet,router])
  );
    if (!tortenet) {
    return null; 
  }

  return (
      <ScrollView style={{...stilusok.hatter}} contentContainerStyle={{ padding: 16 }}>
        <Card style={{backgroundColor:stilusok.tortenet.backgroundColor}}>
          <Card.Title titleStyle={stilusok.cim} title={tortenet.cim} />
          <Card.Content>
            <Text style={{color:stilusok.tortenet.color,...stilusok.marginY}}>{tortenet.tortenet}</Text>
            <Text style={{...stilusok.reszletek}}>Szerző: {tortenet.szerzo}</Text>
            <Text style={{...stilusok.reszletek,...stilusok.marginY}}>Keletkezett: {new Date(tortenet.keletkezes_datum).toLocaleDateString()}</Text>
            <Text style={{...stilusok.reszletek}}>Történés ideje: {new Date(tortenet.tortenet_datum_kezdet).toLocaleDateString()} - {new Date(tortenet.tortenet_datum_vege).toLocaleDateString()}</Text>
          </Card.Content>
          <Card.Actions style={{...stilusok.marginY}}>
            <Button 
              buttonColor={stilusok.primary.color} 
              textColor='white' 
              style={{...stilusok.primary}}
              onPress={() => router.back()}
            >
              Vissza
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
  );
}