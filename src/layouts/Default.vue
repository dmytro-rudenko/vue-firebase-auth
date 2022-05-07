<template>
  <div>
    <app-header />
    <div class="main-box">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";

export default {
  components: {
    AppHeader,
  },
  setup() {},
};
</script>

<style lang="scss">
.main-box {
  display: flex;
}
</style>
