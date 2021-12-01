<template>
    <div class="el-calculator">
      <div class="el-calculator__expression">
        <div :key="fraction.id" class="el-calculator__fraction" v-for="(fraction,index) in fractions">
          <fraction :data="fraction" :removable="isFractionsRemovable" @remove="removeFraction" @update="update"/>

          <span class="el-calculator__plus-icon" v-if="index != Object.keys(fractions).length - 1">
            <img src="../assets/plus.svg">
          </span>

        </div>

        <span class="el-calculator__equal-icon" >
          <img src="../assets/equal.svg">
        </span>

        <fraction :data="results" :removable="false" disabled state="view"/>
      </div>

      <div>
        <el-button class="el-calculator__add-fraction" @click="addFraction" dashed>Добавить дробь</el-button>
        <el-button class="el-calculator__save-fraction" @click="saveFractions">Сохранить расчеты</el-button>
      </div>
    </div>
</template>

<script>
  import Fraction from "./Fraction";
  import ElButton from "../elements/ElButton";

  export default {
    name: "Calculator",
    components: {ElButton, Fraction},
    props:['fractions', 'results'],
    computed: {
      isFractionsRemovable() {
        return this.fractions.length > 2
      },
    },
    methods: {
      addFraction() {
        this.$emit('addFraction')
      },
      saveFractions() {
        this.$emit('saveFractions')
      },
      removeFraction(fractionId) {
        this.$emit('removeFraction', fractionId)
      },
      update(fraction) {
        this.$emit('updateFraction', fraction)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-calculator {

    &__expression {
      display: flex;
      align-items: center
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