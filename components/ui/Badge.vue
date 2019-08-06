<template>
  <span :class="variant" class="badge"><slot></slot></span>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.badge {
  align-self: center;
  background: rgba(14,30,37,.05);
  border-radius: 3px;
  color: #2d3b41;
  display: inline-block;
  flex: 0 0 auto;
  font-size: 11px;
  font-weight: 700;
  line-height: 16px;
  margin-left: 8px;
  padding: 2px 4px;
  position: relative;
  text-transform: uppercase;
  top: -1px;
  vertical-align: baseline;
  white-space: nowrap;
}

.badge.success {
  background-color: rgba(0,173,159,.06);
  color: #00ad9e;
}

.badge.error {
  background-color: rgba(250,56,69,.06);
  color: #f93845;
}

.badge.in-progress {
  background-color: rgba(219,168,0,.06);
  color: #dba800;
}
</style>