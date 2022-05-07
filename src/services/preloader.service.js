import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const usePreloader = () => {
  const auth = getAuth();
  const loading = ref(true);
  const store = useStore();
  const router = useRouter();
  const route = useRoute();

  onAuthStateChanged(auth, async () => {
    await store.dispatch("auth/setIsAuthenticated").catch(console.log);
    await store.dispatch("self/setUser");

    const isAuthenticated = store.getters["auth/isAuthenticated"];

    if (!isAuthenticated && route.name !== "Auth") {
      router.push({ name: "Auth" });
    }

    setTimeout(() => {
      loading.value = false;
    }, 1000);
  });

  return {
    loading,
  };
};
