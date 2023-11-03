import {createSlice,PayloadAction,createAsyncThunk} from '@reduxjs/toolkit'
import type {RootState} from '../store/index'
import { get } from '../../utils/api'

type User ={
    id:number,
    CreatedAt:string,
    UpdatedAt:string,
    DeletedAt: string | null
    email: string
}


type InitalState = {
    user:User | undefined,
    isAuthenticated:boolean,
    isLoading:boolean
}


const initialState: InitalState = {
    user:undefined,
    isAuthenticated:false,
    isLoading:false
}

export const getUser = createAsyncThunk(
    "users/getUser",
    async() => {
       const {result} = await get<{result:User}>("user")
       return result
    }
  )

const user = createSlice({
    name:"user",
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(getUser.pending,(state) =>{
            state.isAuthenticated = false;
            state.isLoading = true
        }),
        builder.addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = true
          }),
          builder.addCase(getUser.rejected, (state) => {
            state.isLoading = true;
            state.user = undefined
            state.isAuthenticated = false
          });
    },
    reducers:{}
})

export const UserSelector = (state:RootState) => state.user
export default user.reducer