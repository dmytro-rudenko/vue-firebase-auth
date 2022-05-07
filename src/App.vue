<template>
  <div>
    <component :is="layout" v-if="!loading">
      <router-view />
    </component>
    <div v-if="loading" class="loader">
      <img class="loader-image" src="@/assets/img/loader.gif" alt="" />
    </div>
  </div>
</template>

<script>
import Auth from "@/layouts/Auth.vue";
import Default from "@/layouts/Default.vue";
import { usePreloader } from "./services/preloader.service";

export default {
  components: {
    Auth,
    Default,
  },
  setup() {
    const { loading } = usePreloader();

    return {
      loading,
    };
  },
  computed: {
    layout() {
      return this.$route.meta.layout || "default";
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap");

:root {
  --mainColor: #ff114e;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Open Sans", sans-serif;
}

a:hover,
button:hover {
  cursor: pointer;
  filter: brightness(95%);
}

a:active,
button:active {
  transform: scale(0.98);
  filter: brightness(90%);
}

body {
  background-color: rgb(248, 247, 247);
}

.loader {
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 99999;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.loader-image {
  width: 100px;
}

.container {
  padding: 0 15px;
}

a {
  text-decoration: none;
  color: #000;
}
li {
  list-style: none;
}
</style>
