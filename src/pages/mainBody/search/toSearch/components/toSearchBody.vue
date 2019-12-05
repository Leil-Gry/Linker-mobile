<template>
  <!-- <div style="background-color: #EDEDED"> -->
  <div style="height:2000px">
    <van-cell class="cellDivision" title='设备'></van-cell>
    <van-cell v-if=!device class="cellText" title="暂未选择任何设备，点击选择" @click="goDevice" align="left">
      <van-icon
        slot="right-icon"
        name="more-o"
        class="cellRightIcon"
      />
    </van-cell>
    <!-- <van-cell v-else class="cellText" :title="deviceName" :label="deviceDescription" @click="goDevice"> -->
    <van-row v-else>
      <van-col span="18">
        <van-cell class="cellText" :title="device.name" :label="device.desc" @click="goDevice">
        </van-cell>
      </van-col>
      <van-col span="6">
        <van-icon
          name="cross"
          class="removeIcon"
          @click="removeDevice"
        />
      </van-col>
    </van-row>
    <!-- </van-cell> -->
    <van-cell class="cellDivision" title='时间'></van-cell>
    <van-row style="margin-top: 10px">
      <van-col span="6" offset="2">
        <van-button class="timecBtn" size='small' @click="setTime('day')">今天</van-button>
      </van-col>
      <van-col span="6" offset="1">
        <van-button class="timecBtn" size='small' @click="setTime('week')">近7天</van-button>
      </van-col>
      <van-col span="6" offset="1">
        <van-button class="timecBtn" size='small' @click="setTime('month')">近30天</van-button>
      </van-col>
    </van-row>
    <van-cell-group style="margin-top:10px">
      <van-field
        v-model="startTime"
        clearable
        label="开始时间"
        placeholder="点击选择时间"
        readonly="readonly"
        left-icon='clock-o'
        @click="startTimePop = true"
      />
      <van-field
        v-model="endTime"
        label="结束时间"
        readonly="readonly"
        placeholder="点击选择时间"
        left-icon='clock-o'
        @click="endTimePop = true"
      />
    </van-cell-group>
    <van-popup v-model="startTimePop" label="开始时间" position="bottom" :overlay="true">
      <van-datetime-picker
        v-model="startCurrectTime"
        @cancel="startTimePop = false"
        @confirm="startTimeConfirm"
      />
    </van-popup>
    <van-popup v-model="endTimePop" label="离开时间" position="bottom" :overlay="true">
      <van-datetime-picker
        v-model="endCurrectTime"
        @cancel="endTimePop = false"
        @confirm="endTimeConfirm"
      />
    </van-popup>
    <van-cell class="cellDivision" title='标签'></van-cell>
    <van-row v-for="data in tagsArray" :key="data.index" type='flex' align="center" justify="center">
      <van-col span='21'>
      <van-cell class="cellText" :title="data.tag" :label="data.value"></van-cell>
      </van-col>
      <van-col span='3'>
        <van-icon
          name="clear"
          class="cellRightIcon"
          @click='delTagChoose(data.tag)'
        />
      </van-col>
    </van-row>
    <van-popup v-model="showTagsPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns='tagsColumns'
        @cancel="showTagsPicker = false"
        @confirm="onTagsConfirm"
        @change="onTagsChange"
      />
    </van-popup>
    <van-button
      class="addBtn"
      icon="plus"
      size='small'
      @click="tagsBtnClick">
    </van-button>
    <van-cell class="cellDivision" title='变量'></van-cell>
    <van-row v-for="data in queries" :key="data.index" type='flex' align="center" justify="center">
      <van-col span='21'>
      <van-cell class="cellText" :title="data.field" :label="data.name"></van-cell>
      </van-col>
      <van-col span='3'>
        <van-icon
          name="clear"
          class="cellRightIcon"
          @click='delVariableChoose(data.field, data.name)'
        />
      </van-col>
    </van-row>
    <van-popup v-model="showVariablePicker" position="bottom" :style="{ height: '40%' }">
      <van-row>
        <van-col span='5'>
        <van-cell
          style="color: #1989FA"
          title="关闭"
          align="left"
          @click="showVariablePicker = false"
        />
        </van-col>
        <van-col span='5' offset='14'>
        <van-cell
          style="color: #1989FA"
          title="全选"
          align="right"
          @click="chooseAllBtnClick"
        />
        </van-col>
      </van-row>
      <van-cell
        v-for="data in specificationList"
        :key="data.index"
        :title="data.variable"
        :value="data.name"
        type="flex"
        align="left"
        @click="onVariableConfirm(data.variable)"
      />
    </van-popup>
    <van-row>
      <van-button
        class="addBtn"
        icon="plus"
        size='small'
        @click="variableBtnClick">
      </van-button>
    </van-row>
    <van-button
      class="submitBtn"
      round
      icon="search"
      text='搜索'
      type="info"
      @click="submit">
    </van-button>
  </div>
</template>

<script>
import { Cell, CellGroup, Row, Col, Button, Icon, Picker, Popup, Field, DatetimePicker, Notify } from 'vant'
export default {
  name: 'ToSearchBody',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [DatetimePicker.name]: DatetimePicker,
    [Notify.name]: Notify
  },
  data () {
    return {
      device: JSON.parse(localStorage.getItem('device')),
      searchMemory: {},
      start: '',
      end: '',
      startCurrectTime: '',
      endCurrectTime: '',
      startTime: '',
      endTime: '',

      startTimePop: false,
      endTimePop: false,
      showTagsPicker: false,
      showVariablePicker: false,

      specification: [],
      specificationList: [],
      queries: [],
      tagsArray: [],
      tagsColumns: [
        {
          values: [],
          className: 'tag'
        },
        {
          values: [],
          className: 'value'
        }
      ]
    }
  },
  mounted () {
    this.getTags()
    this.getVariable()

    let date = new Date()
    this.startCurrectTime = date
    this.endCurrectTime = date
    this.searchMemory = JSON.parse(localStorage.getItem('searchMemory'))
    if (this.searchMemory) {
      this.startTime = this.searchMemory.start ? this.searchMemory.start : ''
      this.endTime = this.searchMemory.end ? this.searchMemory.end : ''
      this.queries = this.searchMemory.queries ? this.searchMemory.queries : []
      this.tagsArray = this.searchMemory.tagsArray ? this.searchMemory.tagsArray : []
    }
  },
  methods: {
    removeDevice () {
      this.device = ''
      localStorage.removeItem('device')
    },
    goDevice () {
      this.save()
      this.$router.push('/device')
    },
    // time choose
    localTimeToUTC (localTime) {
      // let date = new Date(localTime)
      // let y = date.getUTCFullYear()
      // let m = date.getUTCMonth()
      // let d = date.getUTCDate()
      // let h = date.getUTCHours()
      // let M = date.getUTCMinutes()
      // let s = date.getUTCSeconds()
      // return Date.UTC(y, m, d, h, M, s)
      return this.format(new Date(new Date(localTime).getTime() - 8 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm:ss')
    },
    UTCToLocalTime (localTime) {
      return this.format(new Date(new Date(localTime).getTime() + 8 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm:ss')
    },
    format (date, fmt) {
      var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'H+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
      return fmt
    },
    setTime (str) {
      var date = new Date()
      switch (str) {
        case 'day':
          this.startTime = this.format(date, 'yyyy-MM-dd 00:00:00')
          break
        case 'week':
          this.startTime = this.format(new Date(date.getTime() - 168 * 60 * 60 * 1000), 'yyyy-MM-dd 00:00:00')
          break
        case 'month':
          this.startTime = this.format(new Date(date.getTime() - 720 * 60 * 60 * 1000), 'yyyy-MM-dd 00:00:00')
          break
        default:
          this.startTime = this.format(date, 'yyyy-MM-dd 00:00:00')
          break
      }
      this.endTime = this.format(date, 'yyyy-MM-dd HH:mm:ss')
    },
    startTimeConfirm (time) {
      this.startTime = this.format(time, 'yyyy-MM-dd HH:mm:ss')
      this.startTimePop = false
    },
    endTimeConfirm (time) {
      this.endTime = this.format(time, 'yyyy-MM-dd HH:mm:ss')
      this.endTimePop = false
    },
    // tags
    getTags () {
      this.$http.get('/product/5c39ee9611b780012c8c30aa/tags?size=20')
        .then((result) => {
          let tagList = result.data
          this.tagsArray = this.tagsArray ? this.tagsArray : []
          this.tagsArray.forEach(data => {
            for (let index = 0; index < tagList.length; index++) {
              if (data.tag === tagList[index]) {
                tagList.splice(index, 1)
              }
            }
          })
          this.tagsColumns[0].values = tagList
          this.$http.get('/product/5c39ee9611b780012c8c30aa/tag/' +
            this.tagsColumns[0].values[0] + '/values?size=20')
            .then((result) => {
              this.tagsColumns[1].values = result.data
            }).catch((err) => {
              console.log(err)
            })
        }).catch((err) => {
          console.log(err)
        })
    },
    tagsBtnClick () {
      if (this.tagsColumns[0].values.length === 0) {
        Notify({type: 'warning', message: '无可用标签'})
      } else {
        this.showTagsPicker = true
      }
    },
    onTagsChange (picker, values, index) {
      if (index === 0) {
        this.$http.get('/product/5c39ee9611b780012c8c30aa/tag/' +
          values[0] + '/values?size=20')
          .then((result) => {
            picker.setColumnValues(1, result.data)
          }).catch((err) => {
            console.log(err)
          })
      }
    },
    onTagsConfirm (tags) {
      console.log(tags)
      let flag = false
      // for (let index = 0; index < this.tagsColumns[0].values.length; index++) {
      //   if (this.tagsColumns[0].values[index] === tags[0]) {
      //     this.tagsColumns[0].values.splice(index, 1)
      //     break
      //   }
      // }
      for (let index = 0; index < this.tagsArray.length; index++) {
        if (this.tagsArray[index].tag === tags[0]) {
          flag = true
          break
        }
      }
      if (flag) {
        Notify({type: 'warning', message: '重复的标签'})
      } else {
        this.tagsArray = this.tagsArray ? this.tagsArray : []
        this.tagsArray.push({
          tag: tags[0],
          value: tags[1]
        })
      }
      this.showTagsPicker = false
    },
    delTagChoose (tag) {
      for (let index = 0; index < this.tagsArray.length; index++) {
        if (this.tagsArray[index].tag === tag) {
          this.tagsArray.splice(index, 1)
          // this.tagsColumns[0].values.push(tag)
          break
        }
      }
    },
    // Variable
    getVariable () {
      this.$http.get('/product/5c39ee9611b780012c8c30aa')
        .then((result) => {
          this.specification = result.data.specification
          localStorage.setItem('specification', JSON.stringify(this.specification))
          result.data.specification.forEach(dataI => {
            let flag = false
            if (this.queries !== null) {
              this.queries.forEach(dataJ => {
                if (dataI.variable === dataJ.field) {
                  flag = true
                  return false
                }
              })
            }
            if (flag) return false
            this.specificationList.push({
              variable: dataI.variable,
              name: dataI.name
            })
          })
        }).catch((err) => {
          console.log(err)
        })
    },
    variableBtnClick () {
      if (this.specificationList.length === 0) {
        Notify({type: 'warning', message: '无可用变量'})
      } else {
        this.showVariablePicker = true
      }
    },
    onVariableConfirm (variable) {
      for (let index = 0; index < this.specificationList.length; index++) {
        if (this.specificationList[index].variable === variable) {
          this.specificationList.splice(index, 1)
          break
        }
      }
      for (let index = 0; index < this.specification.length; index++) {
        if (this.specification[index].variable === variable) {
          this.queries.push({
            field: this.specification[index].variable,
            name: this.specification[index].name
          })
          break
        }
      }
      this.showVariablePicker = false
    },
    delVariableChoose (variable, name) {
      for (let index = 0; index < this.queries.length; index++) {
        if (this.queries[index].field === variable) {
          this.queries.splice(index, 1)
          this.specificationList.push({
            variable: variable,
            name: name
          })
          break
        }
      }
    },
    chooseAllBtnClick () {
      this.queries = []
      for (let index = 0; index < this.specification.length; index++) {
        this.queries.push({
          field: this.specification[index].variable,
          name: this.specification[index].name
        })
      }
      this.specificationList = []
      this.showVariablePicker = false
    },

    submit () {
      console.log(this.device, this.startTime)
      if (!this.device) {
        Notify({type: 'warning', message: '设备不可为空'})
        return false
      }
      if (this.queries.length === 0) {
        Notify({type: 'warning', message: '变量不可为空'})
        return false
      }
      let tags = {}
      tags['device'] = this.device.key
      this.tagsArray.forEach(element => {
        tags[element.tag] = element.value
      })
      if (!this.startTime || !this.endTime) {
        this.setTime('day')
      }
      this.save()
      this.queries.forEach(data => {
        delete data.name
      })
      this.searchKey = {
        start: this.localTimeToUTC(this.startTime),
        end: this.localTimeToUTC(this.endTime),
        queries: this.queries,
        tags: tags
      }
      this.$http.post('/product/5c39ee9611b780012c8c30aa/query', this.searchKey)
        .then((result) => {
          localStorage.setItem('queryData', JSON.stringify(result.data))
          if (result.data.length > 0) {
            this.$router.push('/search')
          } else {
            Notify({type: 'warning', message: '查询结果为空'})
          }
        }).catch((err) => {
          console.log(err)
        })
    },

    save () {
      let searchMemory = localStorage.getItem('searchMemory') ? JSON.parse(localStorage.getItem('searchMemory')) : {}
      searchMemory['start'] = this.startTime
      searchMemory['end'] = this.endTime
      searchMemory['queries'] = this.queries
      searchMemory['tagsArray'] = this.tagsArray
      localStorage.setItem('searchMemory', JSON.stringify(searchMemory))
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.removeIcon {
  float:right;
  line-height:60px;
  margin-right:10px;
  font-size:20px
}
.docker {
  height:90px;
  background-color:#0088A8;
  text-align: center;
}

.deviceName {
  color: white;
  font-family:'微软雅黑';
  font-size:18px;
  line-height: 45px;
}

.addIcon {
  color: white;
  font-size:20px;
  line-height:70px;
}

.addBtn{
  float: right;
  margin-top:10px;
  margin-bottom:10px;
  margin-right:10px;
}

.submitBtn{
  margin-top:10px;
}

.delBtn{
  line-height: 50px;
}

.searchBtn{
  width: 100%;
}

.cellDivision{
  text-align: left;
  color: rgba(69, 90, 100, 0.6);
  background-color: #f0f3f6;
}
.panelCSS{
  background-color: gray;
}
.cellRightIcon{
  line-height: inherit;
  margin: auto;
  font-size: 20px;
}
.cellText{
  text-align: left;
}
.timecBtn{
  width:100%;
  border-style:solid;
  border-width:2px;
}
</style>
