import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { routePath } from "../config/pathConfig"

export const fetchAllRoute = createAsyncThunk("fetchAllRoute",async()=>{
    try{
    const response = await axios.get(`${routePath}/all`);
    return {
        statusCode : response.status,
        data : response.data
    }
}catch(error){
    console.log(error)
}
})

export const createRoute = createAsyncThunk("createRoute",async(route) =>{
    try{
    const response = await axios.post(`${routePath}/create`,route,{
        headers : {
            'Content-Type' : 'application/json'
        }
    })

    return {
        statusCode : response.status,
        data : response.data
    }
}catch(error){
    console.log(error)
}
})

const initialState ={
    routes : [],
    status : "idle",
    error : null
}

const routeSlice = createSlice({
    name : "routeSlice",
    initialState,
    reducers : {},
    extraReducers(builder){
        builder
        .addCase(fetchAllRoute.fulfilled,(state,action)=>{
            const response = action.payload
            if(response?.statusCode){
                const { statusCode,data } = response
                if(statusCode === 200){
                    state.status = "success"
                    state.routes = [...data]
                }
            }else{
                console.log("error occur in fetchAllRoute")
            }
        })
        .addCase(createRoute.fulfilled,(state,action)=>{
            const response = action.payload
            if(response?.statusCode){
                const { statusCode,data } = response
                if(statusCode === 201){
                    state.status = "success"
                    state.routes = [data,...state.routes]
                }
            }else{
                console.log("error occur in createRoute")
            }
        })
    }
})

export default routeSlice.reducer
export const getAllRoute = (state) => state.routes.routes
export const getStatus = (state) => state.routes.status
export const getError = (state) => state.routes.error

