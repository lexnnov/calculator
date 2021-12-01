<template>
  <div class="el-page">
    <el-page-item>
      <template v-slot:title> Калькулятор:</template>

      <calculator
          :fractions="fractions"
          :isIncorrectExpression="isIncorrectExpression"
          :resultExpression="resultExpression"
          @addFraction="addFraction"
          @removeFraction="removeFraction"
          @saveExpression="saveExpression"
          @updateFraction="updateFraction"
      />
    </el-page-item>

    <el-page-item class="el-page__item">
      <template v-slot:title> Расчеты:</template>

      <results
          :expressions="expressions"
          :isIncorrectExpression="isIncorrectExpression"
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
      isIncorrectExpression() {
        return this.fractions.some(el => !Number(el.denominator) || !Number(el.numerator))
      },
      resultExpression() {
        const summ = this.fractions.reduce(function (total, fraction) {
          if (!fraction.denominator) {
            return total;
          }
          return total + (Number(fraction.numerator) / Number(fraction.denominator))
        }, 0).toFixed(2);

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
      updateFraction(val) {
        this.fractions = this.fractions.map(el => {
          if (el.id == val.id) {
            el = {...el, ...val}
          }
          return el
        })
      },
      removeFraction(fractionId) {
        this.fractions = this.fractions.filter(fraction => {
          return fraction.id != fractionId
        })
      },

      saveExpression() {
        this.expressions = [...this.expressions, {
          id: new Date(),
          fractions: [...this.fractions],
          result: this.isIncorrectExpression ? null : {...this.resultExpression}
        }]

        localStorage.expressions = JSON.stringify(this.expressions);
      },
      removeExpression(expressionId) {
        this.expressions = this.expressions.filter(expression => {
          return expression.id != expressionId
        })

        localStorage.expressions = JSON.stringify(this.expressions)
      }
    },
    mounted() {
      this.expressions = localStorage.expressions != null ? JSON.parse(localStorage.expressions) : []
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;600&display=swap');

  * {
    box-sizing: border-box;
    font-family: 'Open Sans';
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
