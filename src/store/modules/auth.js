import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "@vueuse/firebase/useAuth";
import { UserService } from "@/services";
const { userKillListener } = new UserService();

export default {
  namespaced: true,

  state: () => {
    return {
      isAuthenticated: false,
    };
  },

  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
  },

  mutations: {
    updateIsAuthenticated: (state, isAuthenticated) => {
      state.isAuthenticated = isAuthenticated;
    },
  },

  actions: {
    setIsAuthenticated({ commit }) {
      const auth = getAuth();
      const { isAuthenticated } = useAuth(auth);

      commit("updateIsAuthenticated", isAuthenticated);

      return isAuthenticated;
    },
    async logout({ commit }) {
      const auth = getAuth();

      userKillListener();

      await signOut(auth);
      commit("updateIsAuthenticated", false);
      commit("user/updateUser", null, { root: true });
    },
  },
};
