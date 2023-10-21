import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userPath } from "../config/pathConfig";
import axios from "axios";

const SIGNIN_URL = `${userPath}/signin`;
const SIGNUP_URL = `${userPath}/signup`;

export const signin = createAsyncThunk("signin", async (loginRequest) => {
  try {
    const response = await axios.post(SIGNIN_URL, loginRequest, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      statusCode: response.status,
      data: response.data,
    };
  } catch (error) {
    console.error(error);
  }
});
export const signup = createAsyncThunk("signup", async (user) => {
  try {
    const response = await axios.post(SIGNUP_URL, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      statusCode: response.status,
      data: response.data,
    };
  } catch (error) {
    console.error(error);
  }
});

const initialState = {
  loginStatus: false,
  user: {
  },
  token : "",
  roles: [],
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout : (state) => {
       state.loginStatus = false
       state.user = {}
       state.token = ""
       state.roles = []
    }
  },
  extraReducers(builder) {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        const response = action.payload;

        if (response?.statusCode) {
          const { statusCode, data } = response;
          if (statusCode === 200) {
            state.loginStatus = data.success ? true : false;
            state.user = data.user;
            state.token = data.token;
            state.roles = data.roles;
          } else {
            console.log("login failed due to server");
          }
        } else {
          console.log("login failed!");
        }
      })

      .addCase(signup.fulfilled, (state, action) => {
        const response = action.payload;

        if (response?.statusCode) {
          const { statusCode, data } = response;
          if (statusCode === 200) {
            state.loginStatus = data.success ? true : false;
            state.user = data.user;
            state.roles = data.roles;
            state.token = data.token;
            console.log(data.user);
            console.log(data.roles);
            console.log(data.success);
          } else {
            console.log("login failed due to server");
          }
        } else {
          console.log("login failed!");
        }
      });
  },
});

export default authSlice.reducer;
export const getLoginStatus = (state) => state.auths.loginStatus;
export const getUser = (state) => state.auths.user;
export const getRoles = (state) => state.auths.roles;
export const getToken = (state) => state.auths.token;
export const { logout } = authSlice.actions