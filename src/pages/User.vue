<template>
  <div class="user">
    <pre>{{ user }}</pre>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, onMounted } from "vue";

export default {
  name: "User",
  components: {},
  setup() {
    const store = useStore();
    const route = useRoute();

    const user = computed(() => store.getters["user/user"]);
    const selfId = computed(() => store.getters["self/userId"]);

    onMounted(async () => {
      await store.dispatch("user/getUserById", route.params.id);
    });

    return {
      user,
      selfId,
    };
  },
};
</script>

<style lang="scss">
.user {
  background-color: #fff;
  width: calc(100%);
  min-height: 100vh;
  padding: 75px 15px 15px 15px;
}
</style>
