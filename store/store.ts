import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {useDispatch, useSelector} from "react-redux";
import expenseSlice from "./slices/expense";

const rootReducer = combineReducers({
    expenseSlice
})

export const setupStore = () => {
    return configureStore( {
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),

    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()