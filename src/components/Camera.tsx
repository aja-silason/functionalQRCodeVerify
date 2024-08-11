import { CameraView, CameraType, useCameraPermissions } from "expo-camera"
import { useEffect, useState } from "react"
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"


enum STATE {
    "motorist", 
    "vehicle",
    "manually",
    "auth"
}



export const Cam = () => {
    const [permission, requestPermission] = useCameraPermissions();

    const [scan, setScan] = useState<string | null>(null);
    const [motorist, setMotorist] = useState<string>()
    const [vehicle, setVehicle] = useState<string>()

    const [flag, setFlag] = useState<string | STATE>(STATE.motorist)
        
    const handleBarcodeScannerMotorist = async ({data}: any) => {
        try {
            if(!scan){
                setScan(data);
                console.log(data);
    
                if(data === "220560"){
                        return Alert.alert("Aviso", "Motorista autorizado",
                            [{
                            text: "Transporte",
                            onPress: () => getMotorist(data)
                        }]
                    );
                }
                Alert.alert("Aviso", `Motorista não autorizado`, [
                    {
                        text: "Tentar novamente",
                        onPress: () => tryAgain()
                    },
                    {
                        text: "Manualmente",
                        onPress: () => manually()
                    }
                ]);   
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleBarcodeScannerVehicle = async ({data}: any) => {
        try {
            if(!scan){
                setScan(data);
                console.log(data);
    
                if(data === "220560"){
                    return Alert.alert("Aviso", "Veiculo autorizado",
                        [
                            {
                                text: "Gerar Autorização",
                                onPress: () => getVehicle(data)
                            }
                        ]
                    );
                }
                Alert.alert("Aviso", `Veiculo não autorizado`, [
                    {
                        text: "Tentar novamente",
                        onPress: () => tryAgain()
                    },
                    {
                        text: "Manualmente",
                        onPress: () => manually()
                    }
                ]);   
            }
        } catch (error) {
            console.log(error)
        }
    }

    const tryAgain = () => {
        setScan(null);
    }

    const getMotorist = (data: any) => {
        setMotorist(data);
        setScan(null);
        setFlag(STATE.vehicle)
        console.log("dados do motorista ", motorist)
    }

    const getVehicle = (data: any) => {
        setVehicle(data);
        setScan(null);
        setFlag(STATE.auth)
        console.log("dados do veiculo ", vehicle)
    }

    const manually = () => {
        setScan(null);
        setFlag(STATE.manually)
    }

    const handleSubmitDataAuth = async () => {
        try {
            const payload = {
                motorist: motorist,
                vehicle: vehicle,
                time: new Date()
            }
            console.log("Payload", payload);
        } catch (error) {
            console.log(error);
        }

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
            {
                flag === STATE.motorist ? (
                    <CameraView facing="back" style={style.cam} barcodeScannerSettings={{barcodeTypes: ["qr"]}} onBarcodeScanned={handleBarcodeScannerMotorist}>
                        <View>
                            <Text>See this thing - Motorista</Text>
                        </View>
                    </CameraView>
                ) : flag === STATE.vehicle ? (
                    <CameraView facing="back" style={style.cam} barcodeScannerSettings={{barcodeTypes: ["qr"]}} onBarcodeScanned={handleBarcodeScannerVehicle}>
                        <View>
                            <Text>See this thing - Veiculo</Text>
                        </View>
                    </CameraView>
                ) : flag === STATE.manually ? (
                    <View style={style.viewAuth}>
                        <Text>Manually</Text>
                        <View style={style.inputManualy}>
                            <TextInput style={style.input} value={motorist} onChangeText={setMotorist} keyboardType="decimal-pad" placeholder="Número do Motorista"/>
                            <TextInput style={style.input} value={vehicle} onChangeText={setVehicle} keyboardType="decimal-pad" placeholder="Numero do Veiculo"/>
                        </View>
                        
                        <View style={style.viewBtnManualy}>
                            <Button onPress={()=> setFlag(STATE.motorist)} title="Scannear"/>
                            <Button onPress={()=> setFlag(STATE.auth)} title="Verificar"/>
                        </View>
                        <Text> --------------------------------- </Text>
                        <Text style={style.text}>Motorista: {motorist}</Text>
                        <Text style={style.text}>Carro: {vehicle}</Text>
                                                
                    </View>
                ) : (
                    <View style={style.viewAuth}>
                        <Text style={style.text}>Motorista: {motorist}</Text>
                        <Text style={style.text}>Veiculo: {vehicle}</Text>
                        <TouchableOpacity  onPress={handleSubmitDataAuth} >
                            <Text>Submeter conteudo</Text>
                        </TouchableOpacity>
                        <TextInput style={style.input} keyboardType="decimal-pad"/>
                    </View>
                )
            }
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
    },
    viewAuth: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    text: {
        color: "#000"
    },
    input: {
        borderWidth: 1,
        width: '70%',
        padding: 8,
        fontSize: 14
    },
    inputManualy: {
        alignItems: "center",
        width: 500,
        gap: 10
    },
    viewBtnManualy: {
        display: "flex",
        flexDirection: "row",
        gap: 100,
        marginVertical: 10,
        justifyContent: "space-between"
    }
})