<template>
  <div class="el-page">
    <el-page-item>
      <template v-slot:title> Калькулятор:</template>

      <calculator
          :fractions="fractions"
          :results="results"
          @addFraction="addFraction"
          @removeFraction="removeFraction"
          @saveFractions="saveFractions"
          @updateFraction="update"
      />
    </el-page-item>

    <el-page-item class="el-page__item">
      <template v-slot:title> Расчеты:</template>

      <results
          :expressions="expressions"
          @removeExpression="removeExpression"
      />
    </el-page-item>

  </div>
</template>

<script>
  import {decimalToFraction} from "./helpers/helpers";
  import ElPageItem from "./elements/ElPageItem";
  import Calculator from "./components/Calculator";
  import Results from "./components/Results";

  export default {
    name: 'App',
    data() {
      return {
        expressions: [],
        fractions: [
          {
            id: new Date(),
            numerator: '',
            denominator: ''
          },
          {
            id: new Date(),
            numerator: '',
            denominator: ''
          },
        ]
      }
    },
    components: {
      Results,
      Calculator,
      ElPageItem,
    },
    computed: {

      results() {
        let summ = this.fractions.reduce(function (total, fraction) {
          if (fraction.denominator == 0) {
            return total;
          }
          return total + (fraction.numerator / fraction.denominator)
        }, 0).toFixed(2) * 1;
        return {
          numerator: decimalToFraction(summ).top,
          denominator: decimalToFraction(summ).bottom,
          dec: decimalToFraction(summ).left
        }
      }
    },
    methods: {
      addFraction() {
        if (this.fractions.length >= 5) {
          return
        }
        this.fractions = [...this.fractions, {id: new Date(), numerator: '', denominator: ''}]
      },
      saveFractions() {
        this.expressions = [...this.expressions, {
          id: new Date(),
          fractions: [...this.fractions],
          result: {...this.results}
        }]

        localStorage.expressions = JSON.stringify(this.expressions);
      },
      removeFraction(val) {
        this.fractions = this.fractions.filter(el => {
          return el.id != val
        })
      },
      removeExpression(val) {
        this.expressions = this.expressions.filter(el => {
          return el.id != val
        })

        localStorage.expressions = JSON.stringify(this.expressions)
      },
      update(val) {
        this.fractions = this.fractions.map(el => {
          if (el.id == val.id) {
            el = {...el, ...val}
          }
          return el
        })
      }
    },
    mounted() {
      this.expressions = localStorage.expressions != null ? JSON.parse(localStorage.expressions) : []
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap');

  * {
    box-sizing: border-box;
  }

  #app {
    padding: 50px;
  }

  .el-page {

    &__item {
      margin-top: 20px;
    }
  }
</style>
