import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const juegosSlice = createSlice({
    name: "juegos",
    initialState,
    reducers: {
        cargaInicialJuegos: (state, action) => {
            return action.payload;
        },
        agregarJuegoRedux: (state, action) => {
            state.push(action.payload);
        },
        eliminarJuegoRedux: (state, action) => {
            const id = action.payload;
            const index = state.findIndex((juego) => juego._id === id || juego.id === id);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
        actualizarJuegoRedux: (state, action) => {
            const { id, datos } = action.payload;
            const index = state.findIndex((juego) => juego._id === id || juego.id === id);
            if (index !== -1) {
                state[index] = { ...state[index], ...datos };
            }
        },
    },
});

export const { cargaInicialJuegos, agregarJuegoRedux, eliminarJuegoRedux, actualizarJuegoRedux } = juegosSlice.actions;
export default juegosSlice.reducer;