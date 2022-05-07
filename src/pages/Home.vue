<template>
  <div class="home">
    <div id="tgme_background" class="tgme_background" />
  </div>
</template>

<script>
export default {
  components: {},
  setup() {
    return {};
  },
};
</script>

<style lang="scss">
.home {
  width: 100%;
  padding-top: 60px;
  min-height: 100vh;
  background: rgb(245, 238, 100);
  background: linear-gradient(
    90deg,
    rgba(245, 238, 100, 1) 0%,
    rgba(79, 172, 191, 1) 100%
  );

  .tgme_background {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: 0;
    opacity: 0.4;
    pointer-events: none;
    background: url(https://telegram.org/img/tgme/pattern.svg) 0 0 repeat;
  }
}
</style>
