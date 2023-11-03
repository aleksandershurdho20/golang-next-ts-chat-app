import {configureStore} from '@reduxjs/toolkit'
import user from '../slices/user'
import course from '../slices/course'

export const store = configureStore({
    reducer:{
        user,
        course
    }
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>