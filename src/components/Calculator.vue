<template>
    <div class="el-calculator">
      <div class="el-calculator__expression">
        <div :key="fraction.id" class="el-calculator__fraction" v-for="(fraction,index) in fractions">
          <fraction :data="fraction" :removable="isFractionsRemovable" @removeFraction="removeFraction" @updateFraction="updateFraction"/>

          <span class="el-calculator__plus-icon" v-if="index != Object.keys(fractions).length - 1">
            <img src="../assets/plus.svg">
          </span>

        </div>

        <span class="el-calculator__equal-icon" >
          <img src="../assets/equal.svg">
        </span>
        <div v-if="isIncorrectExpression">?</div>
        <fraction v-else :data="resultExpression" :removable="false"  state="view" disabled/>
      </div>

      <div>
        <el-button class="el-calculator__add-fraction" @click="addFraction" :disabled="isAddButtonDisable" dashed>Добавить дробь</el-button>
        <el-button class="el-calculator__save-fraction" @click="saveExpression">Сохранить расчеты</el-button>
      </div>
    </div>
</template>

<script>
  import Fraction from "./Fraction";
  import ElButton from "../elements/ElButton";

  export default {
    name: "Calculator",
    components: {ElButton, Fraction},
    props: {
      fractions: {
        type: Array,
        default() {
          return []
        }
      },
      isIncorrectExpression: {
        type: Boolean,
        default: false
      },
      resultExpression: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      isAddButtonDisable() {
        return this.fractions.length >= 5
      },
      isFractionsRemovable() {
        return this.fractions.length > 2
      },
    },
    methods: {
      addFraction() {
        this.$emit('addFraction')
      },
      removeFraction(fractionId) {
        this.$emit('removeFraction', fractionId)
      },
      updateFraction(fraction) {
        this.$emit('updateFraction', fraction)
      },
      saveExpression() {
        this.$emit('saveExpression')
      }
    }
  }
</script>

<style lang="scss">
  .el-calculator {

    &__expression {
      display: flex;
      align-items: center;
    }

    &__plus-icon, &__equal-icon {
      margin: 10px;
    }

    &__save-fraction, &__add-fraction {
      margin-top: 20px;
    }

    &__fraction {
      display: flex;
      align-items: center
    }
  }

</style>