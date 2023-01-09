import { StyleSheet, View, Button, TextInput, StatusBar, SafeAreaView,Text } from "react-native";
import React ,{useLayoutEffect} from "react";
import { Formik, FormikProps } from "formik";
import { useAppDispatch , useAppSelector } from "../../hooks/hooks";
import { useNavigation } from "@react-navigation/native";
import { createUser } from "../../store/actions/user-actions";
import Spinner from "../../helpers/Spinner";

interface MyFormValues {
  email: string;
  password: string;
}

const SignUp = () => {
  const initialValues: MyFormValues = { email: "", password: "" };
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.user.isLoading);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);


  const onHandleSignUp = (email: string , password: string) => {
    dispatch(createUser({name: "fff" ,email , password}))
  }

  return (
    <SafeAreaView style={styles.container}>
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onHandleSignUp(values.email, values.password)}
    >
      {(props: FormikProps<MyFormValues>) => (
        <View style={styles.loginContainer}>
          <View style={styles.headerContainer}>
          <Text style={styles.textHeader}>Sign up</Text>
          <Text style={styles.textUnderlying}>Please, fill in your credentials to sign up</Text>
          </View>
          <TextInput
            placeholder="Email Address"
            style={styles.textInput}
            onChangeText={props.handleChange("email")}
            onBlur={props.handleBlur("email")}
            value={props.values.email}
            keyboardType="email-address"
          />

          <TextInput
            placeholder="Password"
            style={styles.textInput}
            onChangeText={props.handleChange("password")}
            onBlur={props.handleBlur("password")}
            value={props.values.password}
            secureTextEntry
          />
          <Button onPress={() => props.handleSubmit()} title="Submit" />
          {isLoading && <Spinner />}
        </View>
      )}
    </Formik>
    <StatusBar barStyle="light-content" />
  </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loginContainer: {
    marginTop: 40,
    marginHorizontal: 30,
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    elevation: 10,
  },
  headerContainer:{
    alignItems: "center",
  },
  textHeader: {
    fontSize: 26
  },
  textUnderlying: {
    fontSize: 12
    
  },
  textInput: {
    height: 40,
    width: "100%",
    margin: 10,
    backgroundColor: "white",
    paddingHorizontal: 15,
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
});