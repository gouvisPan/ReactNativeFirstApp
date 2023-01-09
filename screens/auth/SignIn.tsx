import { StyleSheet, View, Button, TextInput, StatusBar } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { loginUser } from "../../store/actions/user-actions";
import Spinner from "../../helpers/Spinner";
import { Formik, FormikProps } from "formik";

interface MyFormValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const initialValues: MyFormValues = { email: "", password: "" };
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.user.isLoading);

  const onHandleLogin = (email: string, password: string) => {
    dispatch(loginUser({ email, password }));
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => onHandleLogin(values.email, values.password)}
      >
        {(props: FormikProps<MyFormValues>) => (
          <>
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
          </>
        )}
      </Formik>
      <StatusBar barStyle="light-content" />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loginContainer: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    elevation: 10,
  },
  textInput: {
    height: 40,
    width: "100%",
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
});
