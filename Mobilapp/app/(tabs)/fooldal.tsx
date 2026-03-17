import AllasBeallitas from '@/services/allas.service';
import useTortenetek, { refreshAllTortenet } from '@/services/tortenet.service';
import { selectTortenet } from '@/state/app.state';
import stilusok from '@/styles/styles';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import * as React from 'react';
import { ScrollView } from 'react-native';
import { Button, Card, Searchbar, Text } from 'react-native-paper';
export default function FooldalScreen() { 
    const [keresendo,Kereses]=React.useState("");
    const tortenetek=useTortenetek().filter(i=>
        i.cim.trim().toLocaleLowerCase().includes(keresendo.trim().toLocaleLowerCase()) ||
        i.tortenet.trim().toLocaleLowerCase().includes(keresendo.trim().toLocaleLowerCase()) ||
        i.telepulesek.trim().toLocaleLowerCase().includes(keresendo.trim().toLocaleLowerCase())
    );
    useFocusEffect(
        React.useCallback(() => {
            AllasBeallitas("mindkettő");
            refreshAllTortenet();
        }, [])
    );
    if(tortenetek.length==0){
        return (
            <ScrollView style={{...stilusok.hatter}} contentContainerStyle={{ padding: 16,gap:10 }}>
                <Searchbar 
                    style={{...stilusok.kereso}} 
                    placeholderTextColor={stilusok.kereso.color} 
                    iconColor={stilusok.kereso.color}
                    placeholder="Keresés cím, település vagy tartalom alapján..." 
                    value={keresendo}
                    onChangeText={Kereses}
                />
                <Text style={{...stilusok.nincs}}>Nincs találat!</Text>
            </ScrollView>
        )
    }
    return (
        <ScrollView style={{...stilusok.hatter}} contentContainerStyle={{padding:10,gap:10}}>
            <Searchbar style={{...stilusok.kereso}} placeholderTextColor={stilusok.kereso.color} iconColor={stilusok.kereso.color}
                placeholder="Keresés cím, tartalom vagy település alapján..." 
                value={keresendo}
                onChangeText={Kereses}
            />
            {tortenetek.map(tortenet=>(
                <Card style={{backgroundColor:stilusok.tortenet.backgroundColor}} key={tortenet.id}>
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
                            }}>Részletek</Button>
                    </Card.Actions>
                </Card>
            ))}
        </ScrollView>
    );
}