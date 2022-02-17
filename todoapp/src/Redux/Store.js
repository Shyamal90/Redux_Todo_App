import { createStore } from "redux";
import { todoReducer } from "./Reducers";

export const store = createStore(todoReducer);