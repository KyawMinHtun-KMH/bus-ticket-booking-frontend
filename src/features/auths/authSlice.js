import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { emailPath, userPath } from "../config/pathConfig";
import axios from "axios";

const SIGNIN_URL = `${userPath}/signin`;
const SIGNUP_URL = `${userPath}/signup`;

export const mailConfirm = createAsyncThunk('mailConfirm',async (ConfirmEmailRequest) => {
  try {
    const response = await axios.post(`${emailPath}/code/confirm`, ConfirmEmailRequest, {
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
})

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
    // if(error.response.status === 400){
    //   console.log(error.response.data.username)
    // }
    return {
      statusCode : error.response.status,
      data : error.response.data.username
    }

  }
});

const initialState = {
  loginStatus: false,
  user: {},
  token : "",
  roles: [],
  error : "",
  code: "",
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
    },
    addUser : (state , action) => {
      const userData = action.payload
      state.user = userData
    },
    cleanCode : (state) => {
      state.code = ""
    }
  },
  extraReducers(builder) {
    builder
    .addCase(mailConfirm.fulfilled, (state, action) => {
      const response = action.payload;
      
      if (response?.statusCode) {
        const { statusCode, data } = response;
        if (statusCode === 200) {
          state.code = data
        }
      } else {
        console.log("error occur in mailConfirm!");
      }
    })

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
        console.log(response.statusCode)
        if (response?.statusCode) {
          const { statusCode, data } = response;
          console.log("ha ha")
          if (statusCode === 200) {
            state.loginStatus = data.success ? true : false;
            state.user = data.user;
            state.roles = data.roles;
            state.token = data.token;
            state.error = "";
            console.log(data.user);
            console.log(data.roles);
            console.log(data.success);
          } else {
            console.log(data);
            state.error = data
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
export const getError = (state) =>state.auths.error
export const getCode = (state) => state.auths.code;
export const { logout,addUser,cleanCode } = authSlice.actions
