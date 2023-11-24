import {configureStore} from '@reduxjs/toolkit'
import user from '../slices/user'
import course from '../slices/course'
import socket from '../slices/socket'

export const store = configureStore({
    reducer:{
        user,
        course,
        socket
    }
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>