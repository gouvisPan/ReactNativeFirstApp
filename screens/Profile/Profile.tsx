import {
  View,
  Text,
  SafeAreaView,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";

import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { logoutUser } from "../../store/actions/auth-actions";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import User from "../../model/User";
import { createUser } from "../../store/actions/user-actions";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  colorGreyDark,
  colorGreyWhite,
  colorPrimary,
  colorPrimaryLight,
  generalStyles,
} from "../../appStyles/appStyles";
import { Formik, FormikProps } from "formik";

interface MyFormValues {
  name: string;
  motivation: string;
}

const Profile = () => {
  const navigation = useNavigation();
  const { data: user } = useAppSelector((state) => state.user);
  const [selectedAvatar, setSelectedAvatar] = useState<number>(user!.avatar);
  const dispatch = useAppDispatch();

  const validate = Yup.object({
    name: Yup.string().max(24, "Name must be under 24 characters"),
    slogan: Yup.string(),
  });

  const onSubmit = (name: string, motivation: string) => {
    const newUser: User = { ...user! };
    newUser.name = name;
    newUser.motivation = motivation;
    newUser.avatar = selectedAvatar;

    console.log(newUser);
    dispatch(createUser(newUser));
  };

  const handleAvatarClick = (num: number) => {
    setSelectedAvatar(num);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onSignOutPressHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <SafeAreaView style={s.profileCon}>
      <View style={s.titleCon}>
        <Text style={s.title}>Edit your personal info</Text>
      </View>
      <View style={s.profileMain}>
        <Formik
          initialValues={{
            name: user!.name,
            motivation: user!.motivation,
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            onSubmit(values.name, values.motivation);
          }}
        >
          {(props: FormikProps<MyFormValues>) => (
            <>
              <TouchableOpacity style={s.avatarsCon}>
                <TouchableOpacity
                  onPress={() => handleAvatarClick(1)}
                  style={selectedAvatar === 1 ? s.active : {}}
                >
                  <Image
                    source={require("../../assets/avatars/male1.png")}
                    style={s.img}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleAvatarClick(2)}
                  style={selectedAvatar === 2 ? s.active : {}}
                >
                  <Image
                    source={require("../../assets/avatars/female1.png")}
                    style={s.img}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleAvatarClick(3)}
                  style={selectedAvatar === 3 ? s.active : {}}
                >
                  <Image
                    source={require("../../assets/avatars/male2.png")}
                    style={s.img}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleAvatarClick(4)}
                  style={selectedAvatar === 4 ? s.active : {}}
                >
                  <Image
                    source={require("../../assets/avatars/female2.png")}
                    style={s.img}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
              <Text style={s.label}>Name</Text>
              <TextInput
                placeholder={user!.name || "Insert your name"}
                style={[generalStyles.textInput, s.input]}
                onChangeText={props.handleChange("name")}
                onBlur={props.handleBlur("name")}
                value={props.values.name}
              />
              <Text style={s.label}>Motivational quote</Text>
              <TextInput
                placeholder={
                  user!.motivation || "Insert your motivation quote here!"
                }
                style={[generalStyles.textInput, s.input]}
                onChangeText={props.handleChange("motivation")}
                onBlur={props.handleBlur("motivation")}
                value={props.values.motivation}
              />
              <TouchableOpacity
                style={s.saveBtnCon}
                onPress={() => props.handleSubmit()}
              >
                <Text style={s.saveBtnTxt}>Save</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>

      <TouchableOpacity
        style={s.signOut}
        onPress={() => onSignOutPressHandler()}
      >
        <Ionicons name="log-out-outline" size={25} color={colorGreyWhite} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;

const s = StyleSheet.create({
  profileCon: {
    height: "100%",
  },
  profileMain: {},
  signOut: {
    position: "absolute",
    padding: 6,
    borderRadius: 60,
    bottom: 20,
    right: 10,
    backgroundColor: colorPrimary,
  },
  avatarsCon: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 15,
  },
  label: {
    marginTop: 4,
    paddingLeft: 4,
    width: "80%",
    alignSelf: "center",
  },

  input: {
    width: "80%",
    alignSelf: "center",
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginHorizontal: 5,
    padding: 5,
    backgroundColor: colorPrimary,
  },
  active: {
    shadowColor: colorGreyDark,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  titleCon: {
    marginTop: 15,
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
  },
  saveBtnCon: {
    marginTop: 15,
    backgroundColor: colorPrimary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "20%",
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  saveBtnTxt: {
    fontSize: 18,
    color: colorGreyWhite,
  },
});
