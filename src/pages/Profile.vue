<template>
  <div class="profile">
    <pre>{{ user }}</pre>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "Profile",
  components: {},
  setup() {
    const store = useStore();

    const user = computed(() => store.getters["self/user"]);

    return {
      user,
    };
  },
};
</script>

<style lang="scss">
.profile {
  background-color: #fff;
  width: calc(100%);
  min-height: 100vh;
  padding: 75px 15px 15px 15px;
}
</style>
