import { StyleSheet } from "react-native";

const stroke={
    stroke:"black",
    strokeWidth:1,
}
const megye={
    fill:"white",
    ...stroke
}
const pont_stilus={
    cursor:"pointer",
    fill:"red",
    ...stroke
}
const stilusok=StyleSheet.create({
    megye:{
        fontSize:14,
        userSelect:"none"
    },
    hatter:{
        backgroundColor:"#CCE2FF",
        height:"100%",
        width:"100%"
    },
    primary:{
        color:"#0d6efd",
        borderColor:"blue"
    },
    cim:{
        color:"rgba(255, 255, 255, 0.9)",
        fontWeight:"bold"
    },
    tortenet:{
        color:"rgba(255, 255, 255, 0.9)",
        backgroundColor:"rgba(61, 137, 207, 0.75)"
    },
    kereso:{
        backgroundColor:"rgba(144, 144, 151, 0.66)",
        color:"white"
    },
    nincs:{
        fontSize:20,
        textAlign:"center",
        textAlignVertical:"center",
        color:"white"
    },
    marginY:{
        marginBottom:15,
        marginTop:15
    },
    reszletek:{
        color:"white",
        fontWeight:"bold"
    }
});

export default stilusok;
export { megye, pont_stilus };

