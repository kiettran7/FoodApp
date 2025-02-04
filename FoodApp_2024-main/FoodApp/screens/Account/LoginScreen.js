import { Image, View , Text, TouchableOpacity, TextInput, Alert} from "react-native";
import React, { useContext, useState } from "react";
import themeColors from "../../theme/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MyDispatchContext } from "../../configs/Contexts";
import { userActions } from "../../configs/redux/reducers/InfoReducer";
import { useDispatch } from "react-redux";
import { UserApi } from "../../configs/APis/UserApi";

export default function LoginScreen() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState({});
    
    
    const dispatch1 = useContext(MyDispatchContext);

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    
    // const updateSate = (field, value) => {
    //     setUser(current => {
    //         return {...current, [field]: value}
    //     });
    // }

    const onLoginPressed = () => {
        dispatch(userActions.login(userName, password)).then(async (data) => {
          console.log("Login success, status code ", data);
    
          const res = await UserApi.getUser(data)
          if (res.data.is_first_login == true)
            navigation.navigate('ChangePasswordScreen')
        }).catch((error) => {
          Alert.alert('Login failed', 'Username or password is incorrect')
        })
      }


    return (
        <View className="flex-1 bg-white" style={ themeColors.bg}>
            <SafeAreaView className="flex">
                <View className="flex-row justify-start">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
                        <ArrowLeftIcon size="20" color="black" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center">
                    <Image style={{width: 200, height: 200}} source={require("../../assets/images/login.png")}/>
                </View>
            </SafeAreaView>
            <View className="flex-1 bg-white px-11 pt-2" style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                <View className="form space-y-2">
                    <Text className="text-gray-700 ml-4">UserName</Text>
                    <TextInput className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3" placeholder="Enter Email" onChangeText={t => setUserName(t)}/>
                    <Text className="text-gray-700 ml-4">Password</Text>
                    <TextInput className="p-4 bg-gray-100 text-gray-700 rounded-2xl" secureTextEntry placeholder="Enter Password" onChangeText={t => setPassword(t)}/>
                    <TouchableOpacity className="flex items-end mb-5">
                        <Text className="text-gray-700">Forgot Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="py-3 bg-yellow-400 rounded-xl" loading={loading} onPress={onLoginPressed}>
                        <Text className="font-xl font-bold text-center text-gray-700">Login</Text>
                    </TouchableOpacity>
                </View>
                <Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>
                <View className="flex-row justify-center space-x-12">
                    <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                        <Image className="w-10 h-10" source={require("../../assets/icons/google.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                        <Image className="w-10 h-10" source={require("../../assets/icons/apple.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                        <Image className="w-10 h-10" source={require("../../assets/icons/facebook.png")}/>
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center mt-7">
                        <Text className="text-gray-500 font-semibold">Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                            <Text className="font-semibold text-yellow-400">Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                
            </View>
        </View>
    )
}