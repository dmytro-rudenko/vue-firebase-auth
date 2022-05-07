import { getAuth } from "firebase/auth";
import { useAuth } from "@vueuse/firebase/useAuth";
import { UserModel } from "../models";
import { UserService } from "@/services";
import { serverTimestamp } from "firebase/firestore";

const { createUser, getUserById, userListener, updateLastActivityTime } =
  new UserService();

export default {
  namespaced: true,

  state: () => {
    return {
      user: new UserModel(),
    };
  },

  getters: {
    user: (state) => state.user,
    userId: (state) => state.user?.uid,
    isLoad: (state) => Boolean(state.user?.uid),
  },

  mutations: {
    updateUser: (state, user) => {
      state.user = user;
    },
  },

  actions: {
    async createUser({ commit }, data) {
      console.log(data, "cru data");
      const { id } = await createUser({
        ...data,
        lastActiveAt: serverTimestamp(),
      });

      userListener(id, commit);
    },
    getFirebaseUser() {
      const auth = getAuth();
      const { user } = useAuth(auth);

      return user;
    },
    getUserById(noop, id) {
      const user = getUserById(id);

      return user;
    },
    async setUser({ commit }) {
      const auth = getAuth();

      if (auth._currentUser) {
        const user = await getUserById(auth._currentUser.uid);

        if (!user) return;

        const userData = new UserModel(user);

        commit("updateUser", userData);
        await userListener(auth._currentUser.uid, commit);

        return userData;
      }
    },

    async updateLastActivityTime(noop, userId) {
      await updateLastActivityTime(userId);
    },
  },
};
