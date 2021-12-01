<template>
  <div class="el-page-item">
    <div class="el-page-item__title">
      <slot name="title"></slot>
    </div>
    <div class="el-page-item__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ElPageItem"
  }
</script>

<style lang="scss">
  .el-page-item {

    &__title {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 600;
      color: #353535;
      font-size: 33px;
    }

    &__content {
      margin-top: 10px;
      padding: 46px 30px;
      display: flex;
      flex-direction: column;
      border: 1px solid #F2F2F2;
      border-radius: 8px;
      box-shadow: 0px 1px 8px rgba(64, 42, 22, 0.03);
    }
  }
</style>