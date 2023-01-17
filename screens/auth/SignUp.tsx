import {
  StyleSheet,
  View,
  Button,
  TextInput,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Formik, FormikProps } from "formik";
import { colorPrimary, generalStyles } from "../../appStyles/appStyles";
import { Link } from "@react-navigation/native";
import { uiActions } from "../../store/reducers/ui-slice";
import { signUpUser } from "../../store/actions/auth-actions";
import { SafeAreaView } from "react-native-safe-area-context";
import { authStyles } from "../../appStyles/authStyles";
import { auth } from "../../config/firebase";

interface MyFormValues {
  name: string;
  email: string;
  password: string;
}

const SignIn = () => {
  const initialValues: MyFormValues = { name: "", email: "", password: "" };
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.user.isLoading);

  const signUpHandler = (name: string, email: string, password: string) => {
    dispatch(
      signUpUser({
        email,
        name,
        password,
      })
    );
  };

  const handleToSignIn = () => {
    dispatch(uiActions.toggleAuth());
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) =>
          signUpHandler(values.name, values.email, values.password)
        }
      >
        {(props: FormikProps<MyFormValues>) => (
          <>
            <Text style={authStyles.title}>Sign Up</Text>

            <TextInput
              placeholder="Name"
              style={generalStyles.textInput}
              onChangeText={props.handleChange("name")}
              onBlur={props.handleBlur("name")}
              value={props.values.name}
            />

            <TextInput
              placeholder="Email Address"
              style={generalStyles.textInput}
              onChangeText={props.handleChange("email")}
              onBlur={props.handleBlur("email")}
              value={props.values.email}
              keyboardType="email-address"
            />

            <TextInput
              placeholder="Password"
              style={generalStyles.textInput}
              onChangeText={props.handleChange("password")}
              onBlur={props.handleBlur("password")}
              value={props.values.password}
              secureTextEntry
            />

            <TouchableOpacity
              style={authStyles.signCon}
              onPress={() => props.handleSubmit()}
            >
              <Text style={authStyles.signTxt}>Sign Up</Text>
            </TouchableOpacity>
            <View>
              <Text style={authStyles.questionTxt}>Not a User?</Text>
              <TouchableOpacity
                style={styles.signInCon}
                onPress={() => handleToSignIn()}
              >
                <Text style={styles.signInTxt}>Sign In</Text>
              </TouchableOpacity>
            </View>
            {isLoading && <Text>Loading...</Text>}
          </>
        )}
      </Formik>
      <StatusBar barStyle="light-content" />
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  loginContainer: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    elevation: 10,
  },
  signInCon: { alignSelf: "center" },
  signInTxt: { fontSize: 18, textAlign: "center" },
});
