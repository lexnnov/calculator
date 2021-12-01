<template>
  <button class="el-button" :class="{'el-button--dashed': dashed}" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: "ElButton",
    props: {
      dashed: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-button {
    display: block;
    background: #FF962B;
    border-radius: 5px;
    border: navajowhite;
    padding: 13px 20px;
    color: white;
    cursor: pointer;
    width: content-box;
    font-size: 16px;

    &:hover {
      background: #F88D20;
    }

    &:active {
      background: #ED7D0B;
    }

    &:disabled {
      background: #EEECEB;
      color: #B5B3B1;
      cursor: default;
    }
  }

  .el-button--dashed {
    background: #FFFFFF;
    border: 1px dashed #CBC9C9;
    border-radius: 5px;
    padding: 13px 20px;
    color: #383129;
    cursor: pointer;

    &:hover {
      background: #F2F2F2;
    }

    &:active {
      background: #E0DEDE;
    }

    &:disabled {
      background: #EEECEB;
      color: #B5B3B1;
      cursor: default;
    }
  }

</style>