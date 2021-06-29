<template>
  <view class="page-container">
    <view class="page-container-header">
      <view class="nav-wrapper">
        <!-- <view class="nav-me" @click.stop="navigateToLogin">
          <cover-image src="@/static/img/nav-me.png" alt=""></cover-image>
        </view> -->
        <scroll-view class="nav" scroll-x="true" scroll-with-animation="true">
          <view v-for="(item,index) in navData" :key="item.id" class="nav-item" :class="{active:index==curNavIndex}"
            @click.stop="switchNav(item.id)">
            {{item.name}}
          </view>
        </scroll-view>
      </view>
    </view>
    <view class="page-container-bodyer">
      <view class="block1">
        <swiper class="swiper-bodyer" :disable-touch="true" :current="curNavIndex" @change="switchTab">
          <swiper-item class="swiper-item">
            <scroll-view class="swiper-scroll" scroll-y="true" scroll-with-animation="true" @scrolltolower="scrollList">
              <uni-list>
                <uni-list-item>
                  <uni-card slot="body" title="订单类型: 接机(经济型)" extra="115" isFull isShadow @click="clickCard">
                    <uni-list :border="false">
                      <uni-list-item title="05月31日 22:55" :extra-icon="{color:'#0800de' ,type: 'paperclip'}" show-extra-icon>
                      </uni-list-item>
                      <uni-list-item title="首都国际机场T3航站楼" :extra-icon="{color:'#3cbca3' ,type: 'location-filled'}" show-extra-icon>
                      </uni-list-item>
                      <uni-list-item title="昌平区南环里西区(南环路北)" :extra-icon="{color:'#fc9153' ,type: 'location-filled'}" show-extra-icon>
                      </uni-list-item>
                      <uni-list-item title="查看详情" class="uma-order-info">
                      </uni-list-item>
                    
                    </uni-list>
                  </uni-card>

                </uni-list-item>
                <uni-list-item title="地址管理" :extra-icon="{color:'#5fcda2' ,type: 'home'}" link show-extra-icon>
                </uni-list-item>
                <uni-list-item title="我的收藏" :extra-icon="{color:'#54b4ef' ,type: 'heart'}" link show-extra-icon>
                </uni-list-item>

              </uni-list>
            </scroll-view>
          </swiper-item>
          <swiper-item class="swiper-item" catchtouchmove="true">
            <uni-card>
              <div class="card" :class="{'noWhite':isShowCost}">
                <div v-if="isLoading" class="loading-wrapper">
                  <loading-sprinner></loading-sprinner>
                </div>
                <div class="card-time">
                  <span class="circle-blue"></span>
                  <span class="card-time-input">
                    <input type="text" v-model="city" placeholder="请输入预约航班班次" />
                  </span>
                </div>
                <div class="card-start">
                  <span class="circle-green"></span>
                  <span class="card-address" @click.stop="navigateToStarting">{{startFormattedPlace}}</span>
                </div>
                <div class="card-destination">
                  <span class="circle-orange"></span>
                  <span class="card-input-destination" @click.stop="navigateToDestination">{{destination}}</span>
                </div>
              </div>
              <button v-if="!isShowCost" @click.stop="showCost" class="btn-call-car">
                预约
              </button>
              <div v-if="isShowCost" class="cost">
                <div class="cost-header">
                  <div class="header-item" v-for="item in chooseArr" :key="item.id">
                    <img width="15" height="15" :src="item.url" alt="">
                    <span>{{item.name}}</span>
                  </div>
                </div>
                <div class="cost-footer">
                  <div class="carpooling" :class="{active:index==curCostIndex}" v-for="(item,index) in carCostArr"
                    :key="item.id" @click.stop="chooseCost(item)">
                    <span class="carpooling-name">{{item.name}}</span>
                    <img :src="item.imgUrl">
                    <span class="carpooling-cost">预计 {{item.cost}} 元</span>
                  </div>
                </div>
              </div>
              <button v-if="isShowCost" @click.stop="confirmCost" class="btn-confirm">确认
              </button>
            </uni-card>
          </swiper-item>
          <swiper-item class="swiper-item" catchtouchmove="true">
            <uni-card>
              <div class="card" :class="{'noWhite':isShowCost}">
                <div v-if="isLoading" class="loading-wrapper">
                  <loading-sprinner></loading-sprinner>
                </div>
                <div class="card-time">
                  <span class="circle-blue"></span>
                  <span class="card-time-input">
                    <input type="text" v-model="city" placeholder="请输入预约列车车次" />
                  </span>
                </div>
                <div class="card-start">
                  <span class="circle-green"></span>
                  <span class="card-address" @click.stop="navigateToStarting">{{startFormattedPlace}}</span>
                </div>
                <div class="card-destination">
                  <span class="circle-orange"></span>
                  <span class="card-input-destination" @click.stop="navigateToDestination">{{destination}}</span>
                </div>
              </div>
              <button v-if="!isShowCost" @click.stop="showCost" class="btn-call-car">
                预约
              </button>
              <div v-if="isShowCost" class="cost">
                <div class="cost-header">
                  <div class="header-item" v-for="item in chooseArr" :key="item.id">
                    <img width="15" height="15" :src="item.url" alt="">
                    <span>{{item.name}}</span>
                  </div>
                </div>
                <div class="cost-footer">
                  <div class="carpooling" :class="{active:index==curCostIndex}" v-for="(item,index) in carCostArr"
                    :key="item.id" @click.stop="chooseCost(item)">
                    <span class="carpooling-name">{{item.name}}</span>
                    <img :src="item.imgUrl">
                    <span class="carpooling-cost">预计 {{item.cost}} 元</span>
                  </div>
                </div>
              </div>
              <button v-if="isShowCost" @click.stop="confirmCost" class="btn-confirm">确认
              </button>
            </uni-card>
          </swiper-item>

        </swiper>
      </view>
    </view>
    <view class="goods-carts">
      <uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @buttonClick="buttonClick" />
    </view>
    <uni-drawer :visible.sync="isShowUser">
      <uma-my></uma-my>
    </uni-drawer>
  </view>
</template>

<script type="text/ecmascript-6">
  import LoadingSprinner from '@/components/loading-sprinner.vue';
  import umaMy from '@/components/sysm/uma-my.vue';
  import {
    mapState,
    mapMutations,
    mapActions
  } from 'vuex';
  import {
    getRandomNum
  } from '@/common/utils/tools.js';
  const cost = getRandomNum(10, 25);
  //微信小程序无法进行Dom操作 所以无法动态拿到元素宽度
  //这里进行模拟宽度 两个字宽度+2*margin 也就是 32+10*2 = 52
  const NAV_SMALL_WIDTH = 52;
  //这里模拟宽度 三个字宽度+2*margin 也就是 48+10*2 = 68
  const NAV_BIG_WIDTH = 68;

  export default {
    /* onReady() {
      // console.info(e4line, 1, new StepDetector().oriValues, "===11=onAccelerometerChange===", uni
        // .onAccelerometerChange);
      let stepDetector = new StepDetector();
      uni.onAccelerometerChange((res) => {
        // console.info(res,"=======11====++++==========");
        let values = [res.x, res.y, res.z];
        stepDetector.calcSensorData(values);
      });
    }, */
    components: {
      LoadingSprinner,
      umaMy,
      // e4line
    },
    data() {
      return {
        city: '',
        isLoading: true,
        isShowCost: false,
        navScrollLeft: 0,
        navData: [],
        imgUrls: [],
        waitingTimes: [],
        chooseArr: [],
        car: '快车',
        isShowUser: false,
        carCostArr: [{
            id: 0,
            name: '经济',
            imgUrl: '/static/img/costCart.png',
            cost: 0.01
          },
          {
            id: 1,
            name: '舒适',
            imgUrl: '/static/img/costCart.png',
            cost: 0.01
          },
          {
            id: 2,
            name: '商务',
            imgUrl: '/static/img/goodCart.png',
            cost: 0.01
          },
          {
            id: 3,
            name: '豪华',
            imgUrl: '/static/img/goodCart.png',
            cost: 0.01
          }
        ],
        curCostIndex: 0,
        curNavIndex: 0,
        buttonGroup: [{
            text: '订单',
            backgroundColor: '#ffa200',
            color: '#fff'
          },
          {
            text: '抢单',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '我',
            backgroundColor: '#ff0000',
            color: '#fff'
          }
        ],
        options: []
        // swipers: ['出租车后续完善', '顺风车后续完善', '公交后续完善', '代驾后续完善', '自驾租车后续完善', '二手车后续完善']
      };
    },
    created() {
      this.getInitData();
      //    维护一个nav各项navScrollLeft的长度数组
      this.navOffsetArr = [
        0,
        0,
        NAV_SMALL_WIDTH,
        NAV_SMALL_WIDTH * 2,
        NAV_SMALL_WIDTH * 2 + NAV_BIG_WIDTH,
        NAV_SMALL_WIDTH * 2 + NAV_BIG_WIDTH * 2,
        NAV_SMALL_WIDTH * 3 + NAV_BIG_WIDTH * 2,
        NAV_SMALL_WIDTH * 4 + NAV_BIG_WIDTH * 2
      ];
    },
    methods: {
      changePicker(val) {
        // this.isShowCost = val;
      },
      async getInitData() {

        const res = await this.getIndexInfo(); //request('/comments')
        //        console.log('res', res)
        this.imgUrls = res.data.imgUrls;
        this.navData = [{
            "id": "0",
            "name": "待服务",
            "url": "/static/img/car/cart1.png"
          },
          {
            "id": "1",
            "name": "已完成",
            "url": "/static/img/car/cart2.png"
          },
          {
            "id": "2",
            "name": "未完成",
            "url": "/static/img/car/cart3.png"
          },
          {
            "id": "3",
            "name": "已取消",
            "url": "/static/img/car/cart3.png"
          }
        ]; //res.data.navData;
        this.chooseArr = res.data.cost;
        //setTimeout延时 为了看到loading的效果
        setTimeout(() => {
          const arr = res.data.waitingTimes;
          const index = Math.floor(Math.random() * arr.length);
          this.waitingTimes = arr[index];
          this.isLoading = false;
        }, 800);
        this.resetInitAddress();
      },
      resetInitAddress() {
        /* this.saveStartPosition([]);
        this.saveStartPlace([]);
        this.saveFormattedStartPlace('');
        this.saveCurCity('');
        this.saveEndPosition([]);
        this.saveDestination(''); */
        uni.getLocation({
          type: 'gcj02',
          success: (res) => {
            /* reverseGeocoder(qqmapsdk, res).then(res => {
              this.saveStartPlace(res.result.address);
              this.saveFormattedStartPlace(res.result.formatted_addresses.recommend);
              this.saveCurCity(res.result.address_component.city);
            }); */
            this.$map.reverseGeocoder({
              location: {
                latitude: res.latitude,
                longitude: res.longitude,
              },
              success: (res) => {
                this.saveStartPlace(res.result.address);
                this.saveFormattedStartPlace(res.result.formatted_addresses.recommend);
                this.saveCurCity(res.result.address_component.city);
              },
              fail: (res) => {}
            });
            this.saveStartPosition([res.latitude, res.longitude]);
          }
        });
      },
      switchNav(index) {
        this.curNavIndex = index;
        // this.saveCurNavIndex(index);
        // console.info(this.curNavIndex, index);
      },
      switchTab(e) {
        // console.info("=======11====++++==========", e.mp.detail);
        // this.saveCurNavIndex(e.mp.detail.current);
        // this.resetInitAddress();
      },
      navigateToLogin() {
        // this.isShowUser = true;
        // console.info("=====isShowUser======", this.isShowUser);
        //如果没有用户信息就跳转到登陆页
        /* if (!this.$store.state.phone) {
          uni.navigateTo({
            url: '/pages/sysm/login'
          });
        } else {
          uni.showToast({
            title: '已成功登录!',
            icon: 'success'
          });
        } */
      },
      navigateToCars() {
        // uni.navigateTo({
        //   url: '/pages/passenger/cars'
        //   // url: '/pages/test/charts'
        // });
      },
      navigateToStarting() {
        // uni.navigateTo({
        //   url: '/pages/passenger/map'
        // });
      },
      navigateToDestination() {
        // uni.navigateTo({
        //   url: '/pages/passenger/dist'
        // });
      },
      showCost() {
        /* if (this.destination == '你要去哪儿' || this.destination == null) {
          uni.showToast({
            title: '请先选择目的地!',
            icon: 'none'
          });
          return;
        }
        this.isShowCost = true; */
      },
      chooseCost(item) {
        // this.curCostIndex = item.id;
      },
      confirmCost() {
        /* this.saveCost(this.carCostArr[this.curCostIndex].cost);
        uni.navigateTo({
          url: "/pages/passenger/wait",
          success: () => {
            this.isShowCost = false;
          }
        }); */
      },
      buttonClick(e) {
        console.log(e);
        // this.options[2].info++;
      },
      scrollList() {
        console.info(arguments, "==========");
      },
      ...mapActions("passenger/index", {
        // saveCurNavIndex: 'SET_CUR_NAV_INDEX',
        saveStartPlace: 'SET_START_PLACE',
        saveFormattedStartPlace: 'SET_FORMATTED_START_PLACE',
        saveCurCity: 'SET_CUR_CITY',
        saveStartPosition: 'SET_START_POSITION',
        saveCost: 'SET_COST',
        getIndexInfo: 'GET_INDEX_INFO',
        saveDestination: 'SET_DESTINATION',
        saveEndPosition: 'SET_END_POSITION'
      })
    },
    computed: {
      ...mapState("passenger/index", [
        'startFormattedPlace',
        'destination',
        // 'curNavIndex'
      ])
    },
    watch: {
      //利用watch 更好的模拟navScrollLeft
      curNavIndex(newIndex) {
        this.navScrollLeft = this.navOffsetArr[newIndex];
        // this.car = this.navData[newIndex].name;
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import '@/common/less/mixin1';
  @import "@/common/less/variable";

  .page-container {
    height: 100%;
    display: flex;
    flex-direction: column;

    .page-container-header {
      height: 54px;
    }

    .page-container-bodyer {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;

      .block1 {
        flex: 1;

        .swiper-bodyer {
          height: 100%;
        }
      }
      .swiper-scroll {
        height: 100%;
        overflow: hidden auto;
      }
      /deep/ .uni-card__header-extra-text{
        flex: none;
      }
      .uni-card--full{
        border-radius: 5px;
      }
      .uma-order-info{
       /deep/ .uni-list-item__content-title{
          text-align: right;
          color: #fc9153;
        }
      }
    }

    .page-container-footer {
      .block1 {
        height: 80px;
      }

      .block2 {
        height: 72px;
      }

      // height: 172px;
    }
  }

  .page-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
    background-color: @page-bg-color;

    

    .nav-wrapper {
      display: flex;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 54px;
      width: 100%;
      background: #ffffff;

      .nav-me,
      .nav-all {
        flex: 0 0 48px;
        width: 48px;
        height: 36px;

        img {
          width: 48px;
          height: 36px;
        }
      }

      .nav-me {
        border-right: 1px solid @border-color-light;
      }

      .nav {
        flex: 1;
        margin: 0 25px;
        height: 54px;
        line-height: 54px;
        overflow: hidden;
        white-space: nowrap;
        font-size: 0;

        .nav-item {
          margin: 0 10px;
          display: inline-block;
          font-size: 16px;

          &:first-child {
            margin-left: 0;
          }

          &:last-child {
            margin-right: 0;
          }

          &.active {
            color: #fc975c;
          }
        }
      }
    }

    .card {
      position: relative;
      padding: 5px 16px 0 16px;
      background-color: #fff;
      border-radius: 5px;

      &.noWhite {
        background-color: @page-bg-color;
      }

      .loading-wrapper {
        position: absolute;
        top: 0;
        left: 50%;
        width: 21px;
        transform: translateX(-50%);
      }

      /* .card-time {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: rgba(0, 0, 0, .7)
      } */
      .card-time,
      .card-start,
      .card-destination {
        display: flex;
        align-items: center;
        height: 60px;
        width: 100%;

        .circle-blue {
          flex: 0 0 10px;
          .circle(#0800de)
        }

        .circle-green {
          flex: 0 0 10px;
          .circle(#3cbca3)
        }

        .circle-orange {
          flex: 0 0 10px;
          .circle(#fc9153);
        }

        /deep/.card-time-input {
          padding-right: 8px;
          // flex: 1;
          display: flex;
          margin-left: 20px;
          height: 60px;
          align-items: center;
          width: 100%;
          // line-height: 60px;
          font-size: 16px;
          .border-1px(#f5f5f5);
          .no-wrap();

          .uni-datetime-picker-time {
            .uni-datetime-picker-text {
              font-size: 16px;
              color: #000;
            }
          }
        }

        .card-address,
        .card-input-destination {
          padding-right: 8px;
          flex: 1;
          display: inline-block;
          margin-left: 20px;
          height: 60px;
          width: 100%;
          line-height: 60px;
          font-size: 16px;
          .no-wrap();
          .right-arrow();
        }

        .card-address {
          .border-1px(#f5f5f5)
        }
      }
    }
  }
</style>
