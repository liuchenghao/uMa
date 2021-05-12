<template>
  <div class="cars-page">
    <div class="car" v-for="item in cars" :key="item.id" @click.stop="chooseCar(item)">
      <img :src="item.url" alt="">
      <span>{{item.name}}</span>
    </div>
    <qiun-data-charts type="line" :chartData="chartData" :animation="false"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    request
  } from '../../api/request';
  import {
    mapMutations
  } from 'vuex';
  import StepDetector from '@/common/utils/StepDetector';
  import { throttle } from '@/common/utils/tools';

  export default {
    onReady() {
      let stepDetector = new StepDetector();
      let cThrottle = throttle(1000);
      let calcFunc = (res) => {
        let {
          x,
          y,
          z
        } = res;
        let {
          series
        } = this.chartData;
        let tempSeries = [];
        let values = [x, y, z];
        for (let i = 0; i < 3; i++) {
          let value = values[i];
          let serie = series[i];
          let {
            name,
            data
          } = serie;
          let tempData = data.concat(value);
          let len = tempData.length;
          // data.push(value);
          len > 6 && tempData.shift();
          tempSeries[i] = {
            name,
            data: tempData,
            "type": "curve",
          };
        }
        cThrottle(() => {
          this.chartData = {
            series: tempSeries
          };
        });
        // console.info(this.chartData, "=++++==========");
        // console.info(series[0].data, "=======11===", series[1].data, "=++++==========", series[2].data);
        stepDetector.calcSensorData(values);
      };
      uni.onAccelerometerChange(calcFunc);
    },
    data() {
      return {
        cars: [],
        chartData: {
          // "categories": ["2012", "2013", "2014", "2015", "2016", "2017"],
          "series": [{
            "name": "X",
            "data": []
          }, {
            "name": "Y",
            "data": [],
            "lineType": "dash",
            "dashLength": 10
          }, {
            "name": "Z",
            "data": []
          }]
        }
      };
    },
    mounted() {
      // this.getInitData();
    },
    methods: {
      async getInitData() {
        const res = await request('/comments');
        this.cars = res.data.navData;
      },
      chooseCar(item) {
        this.setNavIndex(item.id);
        console.log(this.$store.state.curNavIndex);
        uni.navigateBack();
      },
      ...mapMutations("passenger/index", {
        setNavIndex: 'SET_CUR_NAV_INDEX'
      })
    }
  };
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../../common/less/variable';

  .cars-page {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    overflow: hidden;

    .car {
      flex: 0 1 auto;
      width: 33.33333333%;
      height: 105px;
      border-right: 1px solid @border-color-deep;
      border-bottom: 1px solid @border-color-deep;
      box-sizing: border-box;

      img {
        display: block;
        margin: 34px auto 0;
        width: 35px;
        height: 15px;
      }

      span {
        margin-top: 15px;
        display: block;
        text-align: center;
        text-indent: 2px;
        font-size: 14px;
      }
    }
  }
</style>
