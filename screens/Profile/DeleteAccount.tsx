import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { deleteUser } from "../../store/actions/auth-actions";
import { colorGreyWhite } from "../../appStyles/appStyles";

const DeleteAccount = () => {
  const dispatch = useAppDispatch();

  const deleteClickHandler = () => {
    dispatch(deleteUser());
  };

  return (
    <View style={s.deleteCon}>
      <TouchableOpacity
        style={s.deleteBtnCon}
        onPress={() => deleteClickHandler()}
      >
        <Text style={s.deleteBtnTxt}>Delete Acount</Text>
      </TouchableOpacity>
      <Text style={s.smallText}>Deleting your account is permanent!</Text>
    </View>
  );
};

export default DeleteAccount;

const s = StyleSheet.create({
  deleteCon: {
    display: "flex",
    width: "80%",
    padding: 2,
    alignSelf: "center",
    marginTop: 100,
  },
  smallText: {
    marginTop: 4,
    fontSize: 12,
    textAlign: "center",
  },
  deleteBtnCon: {
    backgroundColor: "#a52a2a",
    width: "100%",
    display: "flex",

    alignItems: "center",
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  deleteBtnTxt: { color: colorGreyWhite },
});
