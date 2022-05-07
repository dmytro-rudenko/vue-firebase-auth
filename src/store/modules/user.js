import { UserService } from "@/services";
import { UserModel } from "../models";

const { getUserById } = new UserService();

export default {
  namespaced: true,

  state: () => {
    return {
      user: new UserModel(),
    };
  },

  getters: {
    user: (state) => state.user,
  },
  mutations: {
    setUser: (state, user) => {
      state.user = new UserModel(user);
    },
  },
  actions: {
    async getUserById({ commit }, id) {
      const user = await getUserById(id);

      commit("setUser", user);

      return new UserModel(user);
    },
  },
};
