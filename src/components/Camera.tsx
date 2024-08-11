import { CameraView, CameraType, useCameraPermissions } from "expo-camera"
import { useState } from "react"
import { Alert, Button, StyleSheet, Text, View } from "react-native"




export const Cam = () => {
    const [permission, requestPermission] = useCameraPermissions();

    const handleBarcodeScanner = ({data}: any) => {
        console.log(data);
        if(data == 220560){
            return Alert.alert("Aviso", "Motorista autorizado");
        }
        Alert.alert("Aviso", "Motorista não autorizado");
        
    }

    if(!permission){
        return <View/>
    }
    if(!permission.granted){
        return (
            <View>
                <Text>Precisa ceder permissáo a camera</Text>
                <Button onPress={requestPermission} title="Pedir permissao"/>
            </View>
        )
    }

    
    return (
        <View style={style.constainer}>
            <CameraView facing="front" style={style.cam} barcodeScannerSettings={{barcodeTypes: ["qr"]}} onBarcodeScanned={handleBarcodeScanner}>
                <View>
                    <Text>See this thing</Text>
                </View>
            </CameraView>
            <Text style={style.message}>See this thing</Text>
        </View>
    )
}

const style = StyleSheet.create({
    constainer:{
        flex: 1,
        flexDirection: "column",
        width: 500,
        justifyContent: "center",
        alignContent: "center",
        textAlign: "center"
    },
    cam: {
        flex: 1,
        width: 500,
        alignContent: "center",
        justifyContent: "center"
    },
    message: {
        textAlign: "center",
        backgroundColor: "#ccc",
    }
})



// import React, { useState, useRef } from "react";
// import { Linking, Text, TouchableOpacity, View } from "react-native";
// import { RNCamera } from "react-native-camera";
// import QRCodeScanner from "react-native-qrcode-scanner";

// const App = () => {
//   const QRCodeRef = useRef<QRCodeScanner | any>(null);
//   const [link, setLink] = useState<string | any>("");

//   const handleLink = () => {
//     Linking.openURL(link).catch(() => {
//       console.log("Ouve um erro");
//     })

//     QRCodeRef.current!.reactivate();
//   }
//   return(
//     <QRCodeScanner
//       ref={QRCodeRef}
//       onRead={({data}) => setLink(data)}
//       flashMode={RNCamera.Constants.FlashMode.off}
//       topContent={
//         <View>
//           <Text>Conteudo Scanneado{link}</Text>
//         </View>
//       }
//       bottomContent={
//         <View>
//           <TouchableOpacity style={{padding: 12, backgroundColor: "#ccc"}} onPress={handleLink}>
//             <Text style={{color: "#fff"}}>Ir</Text>
//           </TouchableOpacity>
//         </View>
//       }
//     />
//   )
// }