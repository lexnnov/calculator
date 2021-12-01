<template>
  <div class="el-fraction">
    <div class="el-fraction__remove">
      <div @click="removeFraction" v-if="removable">
        <img src="../assets/remove.svg">
      </div>
    </div>

    <div class="el-fraction__body">

      <div class="el-fraction__left" v-if="isShowDec">
        {{this.data.dec}}
      </div>

      <div class="el-fraction__right" v-if="isShowFraction">
        <el-input :disabled="disabled" :value="numerator" @update="updateNumerator" placeholder="00"></el-input>
        <hr class="el-fraction__delimiter">
        <el-input :disabled="disabled" :value="denominator" @update="updateDenominator" placeholder="00"></el-input>
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
            dec: 0,
            numerator: 0,
            denominator: 0,
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
      isShowDec() {
        return this.data.dec > 0
      },
      isShowFraction() {
        return (this.state === 'view' && this.denominator > 1) || this.state === 'edit'
      },
      numerator() {
        return this.data.numerator
      },
      denominator() {
        return this.data.denominator
      }
    },
    methods: {
      updateNumerator(val) {
        this.$emit('updateFraction', {id: this.data.id, numerator: val})
      },
      updateDenominator(val) {
        this.$emit('updateFraction', {id: this.data.id, denominator: val})
      },
      removeFraction() {
        this.$emit('removeFraction', this.data.id)
      }
    }
  }
</script>

<style lang="scss">
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
      top: -25px;
    }

    &__delimiter {
      width: 100%;
    }
  }

</style>