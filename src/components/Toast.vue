<template>
  <div class="toast">{{message}}</div>
</template>

<script>
export default {
  props: ["message"],
};
</script>

<style lang='scss' scoped>
.toast {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 0.1rem;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.35);
  border-radius: 0.05rem;
  color: #fff;
}
</style>