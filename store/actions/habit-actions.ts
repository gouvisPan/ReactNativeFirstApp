import * as api from "../../api/HabitCrudService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Habit } from "../../model/Habit";

import { RootState } from "../reducers";
import { habitActions } from "../reducers/habitSlice";
import { AddFormValues } from "../../model/interfaces/AddFormValues";
import { renewWeek } from "../../helpers/renewWeek";
import { uiActions } from "../reducers/ui-slice";

export const setHabitList = createAsyncThunk(
  "habits/set",
  async (habits: Habit[], thunkApi) => {
    try {
      await api.setHabits(habits);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const removeHabit = createAsyncThunk(
  "habits/remove",
  async (id: string, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const habits: Habit[] = state.habits.habitList!;
    let newHabits: Habit[];

    thunkApi.dispatch(uiActions.decreaseIndex());
    newHabits = habits.filter((h) => h.id !== id);

    try {
      await api.setHabits(newHabits);
      thunkApi.dispatch(uiActions.setIsListEmpty(newHabits.length === 0));
      thunkApi.dispatch(habitActions.updateHabitList(newHabits));
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addHabit = createAsyncThunk(
  "habits/add",
  async (values: AddFormValues, thunkApi) => {
    const state = thunkApi.getState() as RootState;

    const habits: Habit[] = state.habits.habitList!;

    let newHabits: Habit[] = habits ? [...habits] : [];

    const newHabit: Habit = {
      id: Math.random().toString(),
      name: values.name,
      desiredPerc: values.desiredPerc,
      totalDays: 0,
      totalChecks: 0,
      weeklyState: [false, false, false, false, false, false, false],
    };
    newHabits.push(newHabit);

    thunkApi.dispatch(habitActions.updateHabitList(newHabits));
    thunkApi.dispatch(uiActions.setCurrentIndex(newHabits.length - 1));
    thunkApi.dispatch(uiActions.setIsListEmpty(false));
    try {
      await api.setHabits(newHabits);
      return newHabits;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const renewWeeklyState = createAsyncThunk(
  "habits/renew",
  async (_: void, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const habits: Habit[] = state.habits.habitList!;
    const renewedHabitList = renewWeek(habits!);

    try {
      await api.setHabits(renewedHabitList);
      return renewedHabitList;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const updateHabitList = createAsyncThunk(
  "habits/update",
  async (_: void, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const habits: Habit[] = state.habits.habitList!;
    try {
      await api.setHabits(habits);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchHabitList = createAsyncThunk(
  "habits/fetch",
  async (_: void, thunkApi) => {
    try {
      const response = await api.fetchHabits();
      console.log(response);
      if (response) {
        thunkApi.dispatch(
          uiActions.setIsListEmpty(response.habits.length === 0)
        );
        return response!.habits;
      }

      return undefined;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
