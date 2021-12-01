<template>
  <input
      :maxlength="2"
      :placeholder="placeholder"
      @keypress="onlyNumber"
      class="el-input"
      type="text"
      @input="handleInput"
      :value="value"
      :disabled="disabled"
  >
</template>

<script>
  export default {
    name: "ElInput",
    props: {
      placeholder: {
        type: String,
        default: ''
      },
      value: {
        type: [Number, String],
        default: 0
      },
      disabled: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    methods: {
      handleInput (e) {
        this.$emit('update', e.target.value)
      },
      onlyNumber($event) {
        let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if (keyCode < 48 || keyCode > 57) {
          $event.preventDefault();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-input {
    background: #FFFFFF;
    border: 1px solid #CBC9C9;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 13px;
    outline: none;
    text-align: center;
    font-size: 16px;

    &:hover {
      border: 1px solid #9D9C9C;
    }

    &:active {
      border: 1px solid #383129;
    }

    &:disabled {
      border: none;
    }
  }

</style>