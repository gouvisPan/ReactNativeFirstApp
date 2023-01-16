import {
  StyleSheet,
  View,
  Button,
  TextInput,
  StatusBar,
  Text,
} from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Formik, FormikProps } from "formik";
import { colorPrimary, generalStyles } from "../../appStyles/appStyles";
import { Link } from "@react-navigation/native";
import { uiActions } from "../../store/reducers/ui-slice";
import { signUpUser } from "../../store/actions/auth-actions";
import { SafeAreaView } from "react-native-safe-area-context";

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
            <Text>Sign Up</Text>

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
            <Button onPress={() => props.handleSubmit()} title="Sign Up" />
            <View>
              <Text>Not a User?</Text>
              <Button onPress={() => handleToSignIn()} title="Sign In" />
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
    backgroundColor: colorPrimary,
  },
  loginContainer: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    elevation: 10,
  },
});
