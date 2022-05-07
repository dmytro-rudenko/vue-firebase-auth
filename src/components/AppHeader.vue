<template>
  <header class="header">
    <div class="container">
      <div class="header-box">
        <router-link to="/">
          <!-- <img
            src="@/assets/img/logo.png"
            alt="Logo"
            class="logo-img"
          > -->
          <h4>Logo</h4>
        </router-link>
        <div class="header-buttons">
          <router-link class="header-link" to="/profile"> Профиль </router-link>
          <button class="logout-btn" @click.prevent="logout">Logout</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "@vue/reactivity";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const userId = computed(() => store.getters["self/userId"]);

    const logout = async () => {
      await store.dispatch("auth/logout");
      router.push({ name: "Auth" });
    };

    return {
      userId,
      logout,
    };
  },
};
</script>

<style lang="scss">
.header {
  position: fixed;
  background-color: rgba(221, 221, 221, 1);
  height: 60px;
  width: 100%;
  z-index: 9999;

  .container {
    height: 100%;
  }

  .header-buttons {
    display: flex;
  }

  .header-link,
  button {
    display: flex;
    align-items: center;
    height: 44px;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 3px;
    border-radius: 8px;
    padding: 0 13px;
    background-color: #fff;
    margin-left: 10px;
    border: none;
  }
}

.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.logo-img {
  width: 50px;
}
</style>
