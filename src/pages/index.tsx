import { Cam } from "@/components/Camera";
import { StyleSheet, Text, View } from "react-native";

export default function Page(){
    return (
        <View style={styles.container}>
            <Cam/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: 50,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });