<template>
  <div>
    <van-cell title="">
      <van-icon
        slot="right-icon"
        name="search"
        style="line-height: inherit;padding-right:5px"
        size = 25px
        title="点击搜索"
        @click="goSearchDevice"/>
    </van-cell>
    <div>
      <div id='myChart' class="lineStyle"></div>
      <van-cell class="cellDivision" title='设置'></van-cell>
      <van-row type='flex' align="center" justify="center">
        <van-col span='7'>
          <van-cell style="float: left" title='纵轴范围'></van-cell>
        </van-col>
        <van-col span='5' offset= '1'>
          <van-field class="setYField" v-model="yAxis.min" placeholder="最小值" @blur="drawLine"/>
        </van-col>
        <van-col span='5'>
          <van-field class="setYField" v-model="yAxis.max" placeholder="最大值" @blur="drawLine"/>
        </van-col>
        <van-col span='6' v-if='btnFlag'>
          <van-icon name='close' @click="closeBtn"/>
        </van-col>
        <van-col span='6' v-else>
          <van-icon name='replay' @click="resetBtn"/>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { Cell, Icon, Row, Col, Field } from 'vant'
import { mapGetters } from 'vuex'
export default {
  name: 'Search',
  components: {
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
    [Field.name]: Field
  },
  data () {
    return {
      xArray: [],
      queries: [],
      series: [],
      timeInterval: '',
      yAxis: {},
      isFirst: true,
      myChart: '',
      y: {},
      currentLegend: '',
      btnFlag: true
    }
  },
  computed: {
    ...mapGetters([
      'tags',
      'tagValues',
      'specification',
      'searchResult',
      'searchMemory'
    ])
  },
  mounted () {
    this.queries = this.searchMemory ? this.searchMemory.queries : []
    if (!this.searchResult) {
      this.$router.push({name: 'ToSearch'})
    }
    this.queries.forEach(data => {
      this.series.push({
        name: data.field,
        type: 'line',
        data: [],
        smooth: true
      })
      this.y[data.field] = {
        min: 200.0,
        max: -200.0
      }
    })
    if (this.specification) {
      this.specification.forEach(data => {
        if (data.variable === this.series[0].name) {
          this.currentLegend = this.series[0].name
          let specs = data.dataType.specs
          this.yAxis = {
            min: specs.min,
            max: specs.max,
            type: 'value',
            name: specs.unitName + '/' + specs.unit
          }
          return false
        }
      })
    }
    this.searchResult.forEach(data => {
      this.xArray.push(this.$options.filters['localTime'](data.time))
      this.series.forEach(element => {
        element['data'].push(data[element['name']])
        this.y[element['name']].max = this.y[element['name']].max > data[element['name']] ? this.y[element['name']].max : data[element['name']]
        this.y[element['name']].min = this.y[element['name']].min < data[element['name']] ? this.y[element['name']].min : data[element['name']]
      })
    })
    this.timeInterval = parseInt(this.xArray.length / 8)
    this.myChart = this.$echarts.init(document.getElementById('myChart'))
    this.drawLine()
  },
  methods: {
    goSearchDevice () {
      this.$router.push({name: 'ToSearch'})
    },
    drawLine () {
      let option = {
        legend: {
          selectedMode: 'single'
        },
        grid: {
          x2: 40,
          y: 80,
          y2: 130
        },
        dataZoom: [{
          orient: 'horizontal', // 水平显示
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          left: '9%',
          bottom: 2,
          start: 0
        }],
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          axisLabel: {
            interval: this.timeInterval,
            rotate: 50
          },
          data: this.xArray,
          name: '时间'
        },
        yAxis: this.yAxis,
        series: this.series
      }
      this.myChart.setOption(option)
      if (this.isFirst) {
        this.isFirst = false
        let that = this
        this.myChart.on('legendselectchanged', (params) => {
          that.currentLegend = params.name
          if (that.specification) {
            that.specification.forEach(data => {
              if (data.variable === params.name) {
                let specs = data.dataType.specs
                option.yAxis.min = specs.min
                option.yAxis.max = specs.max
                option.yAxis.name = specs.unitName + '/' + specs.unit
                that.myChart.setOption(option)
                return false
              }
            })
          }
        })
      }
    },
    closeBtn () {
      this.yAxis.min = Math.floor(this.y[this.currentLegend].min)
      this.yAxis.max = Math.ceil(this.y[this.currentLegend].max)
      this.btnFlag = false
      this.drawLine()
    },
    resetBtn () {
      this.specification.forEach(data => {
        if (data.variable === this.currentLegend) {
          this.yAxis.min = data.dataType.specs.min
          this.yAxis.max = data.dataType.specs.max
          return false
        }
      })
      this.btnFlag = true
      this.drawLine()
    }
  }
}
</script>

<style scoped>
.setBorder {
  border: 1px solid gray
}
.lineStyle {
  width:100%;
  height: 480px;
}
.cellDivision{
  text-align: left;
  color: rgba(69, 90, 100, 0.6);
  background-color: #f0f3f6;
}
</style>
