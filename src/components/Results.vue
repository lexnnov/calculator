<template>
  <div class="el-results">
    <div v-if="expressions.length > 0">
      <div :key="fractions.id" class="el-results__item" v-for="fractions in expressions">

        <div class="el-results__item-expression">
          <div
              :key="fraction.id"
              class="el-results__fraction"
              v-for="(fraction,index1) in fractions.fractions"
          >
            <fraction :data="fraction" disabled/>

            <span class="el-results__icon-plus" v-if="index1 != Object.keys(fractions.fractions).length - 1">
            <img src="../assets/plus.svg">
          </span>
          </div>

          <span class="el-results__icon-equal">
            <img src="../assets/equal.svg">
        </span>

          <fraction :data="fractions.result" disabled state="view"/>
        </div>


        <el-button @click="removeFractionFromSaved(fractions.id)" class="el-results__item-remove" dashed>
          Удалить
        </el-button>

      </div>
    </div>

    <div v-else>Тут будут расчеты</div>
  </div>
</template>

<script>
  import Fraction from "./Fraction";
  import ElButton from "../elements/ElButton";

  export default {
    name: "Results",
    components: {ElButton, Fraction},
    props: ['expressions', 'results'],
    methods: {
      removeFractionFromSaved(val) {
        this.$emit('removeExpression', val)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-results {

    &__item {
      display: flex;
      align-items: center
    }

    &__item-expression {
      display: flex;
      align-items: center;
    }

    &__icon-plus, &__icon-equal {
      margin: 10px;
    }

    &__item-remove {
      margin-left: auto;
    }

    &__fraction {
      display: flex;
      align-items: center
    }

  }
</style>