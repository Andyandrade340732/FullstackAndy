import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usuario: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      const { usuario, token } = action.payload;
      state.usuario = usuario;
      state.token = token;
    },
    logoutRedux: (state) => {
      state.usuario = null;
      state.token = null;
    },
    actualizarPlanRedux: (state) => {
      if (state.usuario) {
        state.usuario.plan = "premium";
      }
    },
  },
});

export const { loginRedux, logoutRedux, actualizarPlanRedux } = authSlice.actions;
export default authSlice.reducer;