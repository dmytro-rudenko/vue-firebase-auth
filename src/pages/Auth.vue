<template>
  <div class="auth-buttons-container">
    <button class="google-login-button" @click="signIn">
      Увійти за допомогою
      <img
        class="google-img"
        src="https://www.google.com.ua/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png"
        alt=""
      />
    </button>
  </div>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const isAuthenticated = computed({
      get: () => store.getters["auth/isAuthenticated"],
    });

    watch(isAuthenticated, (val) => {
      if (val) return router.push({ name: "Home" });
    });

    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const signIn = () => {
      signInWithPopup(auth, provider)
        .then(async (res) => {
          const firebaseUser = res.user;
          const userId = firebaseUser.uid;
          const user = await store.dispatch("self/getUserById", userId);

          if (!user) await store.dispatch("self/createUser", firebaseUser);

          await store.dispatch("auth/setIsAuthenticated").catch(console.log);
          await store.dispatch("self/setUser");

          router.push({ name: "Home" });
        })
        .catch((error) => {
          console.log(error);
          GoogleAuthProvider.credentialFromError(error);
        });
    };

    return { signIn };
  },
};
</script>

<style lang="scss">
.auth-buttons-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.google-login-button {
  display: flex;
  align-items: center;
  height: 44px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 5px;
  border-radius: 8px;
  padding: 0 13px;
  border: none;
  background-color: #fff;
}

.google-img {
  width: 100px;
  margin-top: 4px;
  margin-left: 10px;
}
</style>
