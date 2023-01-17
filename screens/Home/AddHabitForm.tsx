import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { AddFormValues } from "../../model/interfaces/AddFormValues";
import { addHabit } from "../../store/actions/habit-actions";
import {
  colorGreyBlack,
  colorGreyWhite,
  colorPrimary,
  colorPrimaryC,
  colorPrimaryCD,
  generalStyles,
} from "../../appStyles/appStyles";

const AddHabitForm = () => {
  const dispatch = useAppDispatch();

  const validate = Yup.object({
    name: Yup.string()
      .required("Name is required!")
      .max(20, "Describe your hobie in less than 20 characters!"),
    desiredPerc: Yup.string().min(0).max(100),
  });
  const initialValues: AddFormValues = {
    name: "",
    desiredPerc: 100,
  };

  const onSubmitHandler = (values: AddFormValues) => {
    dispatch(addHabit(values));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={(values, { resetForm }) => {
        onSubmitHandler(values);
        resetForm();
      }}
    >
      {(props: FormikProps<AddFormValues>) => (
        <>
          <View style={s.container}>
            <View style={s.top}>
              <Text style={s.title}>Form a new Habit!</Text>
              <TouchableOpacity
                style={s.addBtn}
                onPress={() => props.handleSubmit()}
              >
                <Text style={s.addBtnTxt}>Add</Text>
              </TouchableOpacity>
            </View>
            <View style={s.inputs}>
              <TextInput
                placeholder="Habit name"
                style={[generalStyles.textInput, s.textInput, s.name]}
                onChangeText={props.handleChange("name")}
                onBlur={props.handleBlur("name")}
                value={props.values.name}
              />

              <TextInput
                placeholder="Goal"
                style={[generalStyles.textInput, s.textInput, s.goal]}
                onChangeText={props.handleChange("desiredPerc")}
                onBlur={props.handleBlur("desiredPerc")}
                value={props.values.desiredPerc.toString()}
              />
            </View>
          </View>
        </>
      )}
    </Formik>
  );
};

export default AddHabitForm;

const s = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: colorGreyWhite,
    height: "35%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 50,
  },
  top: {
    display: "flex",
    flexDirection: "row",
  },
  title: {
    width: "50%",
    alignSelf: "center",
    textAlign: "left",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 22,
    color: colorGreyBlack,
    marginRight: 30,
    letterSpacing: 0.8,
  },
  inputs: {
    display: "flex",
    flexDirection: "row",
  },
  textInput: {
    alignSelf: "center",
  },
  name: {
    width: "50%",
  },
  goal: {
    width: "25%",
  },
  addBtn: {
    marginVertical: 10,
    display: "flex",
    width: "25%",
    backgroundColor: colorPrimary,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addBtnTxt: {
    textAlign: "center",
    fontSize: 18,
    color: colorGreyWhite,
  },
});
