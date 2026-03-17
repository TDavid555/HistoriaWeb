import AllasBeallitas from '@/services/allas.service';
import { getAllTortenetByTelepules, useTortenetekByTelepules } from '@/services/tortenet.service';
import { getSelectedTelepules, selectTortenet } from '@/state/app.state';
import stilusok from '@/styles/styles';
import { Stack, useFocusEffect, useRouter } from 'expo-router';
import * as React from "react";
import { ScrollView } from 'react-native';
import { Button, Card, PaperProvider, Searchbar, Text } from 'react-native-paper';
export default function DetailsScreen() {
  const router = useRouter();
  const telepules=getSelectedTelepules();
  const [keresendo,Kereses]=React.useState("");
  const tortenetek=useTortenetekByTelepules().filter(i=>
      i.cim.trim().toLocaleLowerCase().includes(keresendo.trim().toLocaleLowerCase()) ||
      i.tortenet.trim().toLocaleLowerCase().includes(keresendo.trim().toLocaleLowerCase())
  );
  useFocusEffect(
    React.useCallback(() => {
      if(!telepules){
        router.push("/(tabs)/terkep")
      }
      AllasBeallitas("mindkettő");
      getAllTortenetByTelepules(telepules);
    }, [])
  );
  if(tortenetek.length==0){
    return (
      <PaperProvider>
        <Stack.Screen 
          options={{ 
            title:""+telepules 
          }} 
        />
        <ScrollView style={{...stilusok.hatter}} contentContainerStyle={{ padding: 16,gap:10 }}>
          <Searchbar 
            style={{...stilusok.kereso}} 
            placeholderTextColor={stilusok.kereso.color} 
            iconColor={stilusok.kereso.color}
            placeholder="Keresés cím vagy tartalom alapján..." 
            value={keresendo}
            onChangeText={Kereses}
          />
          <Text style={{...stilusok.nincs}}>Nincs találat!</Text>
        </ScrollView>
      </PaperProvider>
    )
  }
  return (
    <PaperProvider>
      <Stack.Screen 
        options={{ 
          title:""+telepules 
        }} 
      />
      <ScrollView style={stilusok.hatter} contentContainerStyle={{ padding: 16,gap:10 }}>
        <Searchbar 
          style={{...stilusok.kereso}} 
          placeholderTextColor={stilusok.kereso.color} 
          iconColor={stilusok.kereso.color}
          placeholder="Keresés cím vagy tartalom alapján..." 
          value={keresendo}
          onChangeText={Kereses}
        />
        {tortenetek.map((tortenet,index)=>(
          <Card style={{backgroundColor:stilusok.tortenet.backgroundColor}} key={index}>
            <Card.Title titleStyle={stilusok.cim} title={tortenet.cim}></Card.Title>
            <Card.Content>
              <Text style={{color:stilusok.tortenet.color}}>{tortenet.tortenet.trim().split(" ").splice(0,20).join(" ")}...</Text>
            </Card.Content>
            <Card.Actions>
              <Button 
                buttonColor={stilusok.primary.color} 
                textColor='white' 
                style={{...stilusok.primary}} 
                onPress={()=>{
                  selectTortenet(tortenet);
                  router.navigate("/details")
                }}
              >Részletek</Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </PaperProvider>
  );
}