import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { busPath } from "../config/pathConfig"

export const fetchAllBus = createAsyncThunk("fetchAllBus",async(data)=>{
    try{
    const response = await axios.get(`${busPath}/all`,
    {
        headers: {
          "Content-Type": "application/json",
          "Authorization":data.token
        },
      })
    return {
        statusCode : response.status,
        data : response.data
    }
    }catch(error){
        console.log(error)
    }
})

export const createBus = createAsyncThunk("createBus",async(data)=>{
    try{
    const response = await axios.post(`${busPath}/create`,data.bus,{
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : data.token
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

const initialState = {
    buses : [],
    status : "idle",
    error : null
}

const busSlice = createSlice({
    name : "busSlice",
    initialState,
    reducers : {},
    extraReducers(builder){
        builder
        .addCase(fetchAllBus.fulfilled,(state,action) => {
            const response = action.payload
            if(response?.statusCode){
                const { statusCode,data } = response
                if(statusCode === 200){
                    state.status = "success"
                    state.buses = [...data]
                }
            }else{
                console.log("error occur in fetchAllBus")
            }
        })
        .addCase(createBus.fulfilled,(state,action) => {
            const response = action.payload
            if(response?.statusCode){
                const { statusCode,data } = response
                if(statusCode === 201){
                    state.status = "success"
                    state.buses = [data,...state.buses]
                }
            }else{
                console.log("error occur in createBus")
            }
        })
    }
})

export default busSlice.reducer
export const getAllBus= (state) => state.buses.buses