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
import { loginUser } from "../../store/actions/auth-actions";
import { Formik, FormikProps } from "formik";
import { generalStyles } from "../../appStyles/appStyles";
import { uiActions } from "../../store/reducers/ui-slice";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import { authStyles } from "../../appStyles/authStyles";

interface MyFormValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const initialValues: MyFormValues = { email: "", password: "" };
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.user.isLoading);
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onHandleLogin = (email: string, password: string) => {
    dispatch(loginUser({ email, password }));
  };

  const handleToSignUp = () => {
    dispatch(uiActions.toggleAuth());
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={(values) => onHandleLogin(values.email, values.password)}
      >
        {(props: FormikProps<MyFormValues>) => (
          <>
            <Text style={authStyles.title}>Sign In</Text>
            <TextInput
              placeholder="Email Address"
              style={[generalStyles.textInput, styles.input]}
              onChangeText={props.handleChange("email")}
              onBlur={props.handleBlur("email")}
              value={props.values.email}
              keyboardType="email-address"
            />

            <TextInput
              placeholder="Password"
              style={[generalStyles.textInput, styles.input]}
              onChangeText={props.handleChange("password")}
              onBlur={props.handleBlur("password")}
              value={props.values.password}
              secureTextEntry
            />
            <TouchableOpacity
              style={authStyles.signCon}
              onPress={() => props.handleSubmit()}
            >
              <Text style={authStyles.signTxt}>Log In</Text>
            </TouchableOpacity>
            <View>
              <Text style={authStyles.questionTxt}>Not a User?</Text>
              <TouchableOpacity
                style={styles.signUpCon}
                onPress={() => handleToSignUp()}
              >
                <Text style={styles.signUpTxt}>Sign Up</Text>
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
    marginTop: 5,
    display: "flex",
    alignItems: "center",
  },

  input: {
    marginBottom: 12,
  },
  signUpCon: { alignSelf: "center" },
  signUpTxt: { fontSize: 18, textAlign: "center" },
});
