<template>
  <div class="el-fraction">
    <div class="el-fraction__remove">
      <div @click="removeFraction" v-if="removable">
        <img src="../assets/remove.svg">
      </div>
    </div>

    <div class="el-fraction__body">
      <div class="el-fraction__left" v-if="this.data.dec > 0">
        {{this.data.dec}}
      </div>
      <div class="el-fraction__right" v-if="isShowFraction">
        <el-input :disabled="disabled" :value="numerator" @update="updateDenominator" placeholder="00"></el-input>
        <hr class="el-fraction__delimiter">
        <el-input :disabled="disabled" :value="denominator" @update="updateDivider" placeholder="00"></el-input>
      </div>
      <div v-else>
        ?
      </div>
    </div>
  </div>
</template>

<script>
  import ElInput from "../elements/ElInput";

  export default {
    name: "fraction",
    components: {ElInput},
    props: {
      data: {
        type: Object,
        default() {
          return {
            id: 0,
            numerator: 0,
            denominator: 0,
            dec: 0
          }
        }
      },
      removable: {
        type: Boolean,
        default() {
          return false;
        }
      },
      disabled: {
        type: Boolean,
        default() {
          return false;
        }
      },
      state: {
        type: String,
        default() {
          return 'edit';
        }
      }
    },
    computed: {
      isShowFraction() {
        return (this.state == 'view' && this.denominator > 1) || this.state == 'edit'
      },
      numerator() {
        return this.data.numerator
      },
      denominator() {
        return this.data.denominator
      }
    },
    methods: {
      updateDenominator(val) {
        this.$emit('update', {id: this.data.id, numerator: val})
      },
      updateDivider(val) {
        this.$emit('update', {id: this.data.id, denominator: val})
      },
      removeFraction() {
        this.$emit('remove', this.data.id)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-fraction {
    display: flex;
    width: 60px;
    flex-direction: column;
    position: relative;

    &__body {
      display: flex;
      align-items: center
    }

    &__left {
      margin-right: 10px
    }

    &__right {
      display: flex;
      flex-direction: column;
      width: 60px
    }

    &__remove {
      margin-left: auto;
      height: 20px;
      cursor: pointer;
      position: absolute;
      right: 0;
      top: -20px;
    }

    &__delimiter {
      width: 100%;
    }
  }

</style>