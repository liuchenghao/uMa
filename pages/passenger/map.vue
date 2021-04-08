<!-- <template>
  <view>
    <view class="page-body">
      <view class="page-contain">
        ddd
        <image class="location-marker" src="@/static/img/bkg_1.png" @click.stop="onclickLocation">
        </image>
        <cover-image class="location-marker" src="@/static/img/bkg_1.png" @click.stop="onclickLocation">
        </cover-image>
      </view>
      <view class="page-section page-section-gap">
        <map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers">
        </map>
      </view>
    </view>
  </view>
</template> -->
<template>
  <div class="starting-page">
    <div class="search-bar-wrapper">
      <search-bar ref="searchBar" :curCity="curCity" @chooseCity="chooseCity" @cancel="chooseCancel"></search-bar>
    </div>
    <map class="map-didi" id="map-didi" :latitude="latitude" :longitude="longitude" :markers="markers"
      @regionchange="regionChange" @begin="begin" @end="end" show-location>

      <cover-image class="location-marker" src="/static/img/location.png" @click.stop="onclickLocation">
      </cover-image>

      <cover-view class="center-marker">
        <cover-view class="text-center">最快{{minutes}}分钟接驾</cover-view>
        <cover-image class="inverted-triangle" src="/static/img/triangle-down.png"></cover-image>
        <cover-image class="img-center" src="/static/img/marker2.png"></cover-image>
      </cover-view>

      <cover-view class="address">
        <cover-image class="img-address" src="/static/img/address.png">
        </cover-image>
        <cover-view class="address-desc">
          <cover-view class="blur">{{startPlace}}</cover-view>
          <cover-view class="detail">{{startFormattedPlace}}</cover-view>
        </cover-view>
        <cover-view class="btn-address" @click.stop="setStartPlace">确定</cover-view>
      </cover-view>
    </map>
  </div>
</template>
<script>
  import SearchBar from '@/components/search-bar.vue';
  import {
    mapMutations,
    mapState
  } from 'vuex';
  export default {
    components: {
      SearchBar,
    },
    data() {
      return {
        id: 0, // 使用 marker点击事件 需要填写id
        title: 'map',
        latitude: 39.909,
        longitude: 116.39742,
        covers: [{
          latitude: 39.909,
          longitude: 116.39742,
          // iconPath: '../../../static/location.png'
        }, {
          latitude: 39.90,
          longitude: 116.39,
          // iconPath: '../../../static/location.png'
        }]
      }
    },
    methods: {
      chooseCity() {
        uni.navigateTo({
          url: '/pages/passenger/city'
        })
      },
      chooseCancel() {
        uni.navigateBack()
        this.clearData()
      },
      clearData() {},
      ...mapMutations({
        saveStartPlace: 'SET_START_PLACE',
        saveFormattedStartPlace: 'SET_FORMATTED_START_PLACE',
        saveCurCity: 'SET_CUR_CITY',
        saveStartPosition: 'SET_START_POSITION'
      })
    },
    computed: {
      ...mapState([
        'curNavIndex',
        'curCity',
        'startPlace',
        'startFormattedPlace',
        'startPosition'
      ])
    },
  }
</script>

<style>
  .page-contain {
    background: url(@/static/img/bkg_1.png);
  }
</style>
<style lang="less" scoped rel="stylesheet/less">
  @import '../../common/less/mixin1';

  .starting-page {
    width: 100%;
    height: 100vh;
    overflow: hidden;

    .search-bar-wrapper {
      width: 100%;
      height: 44px;
      .card-shadow(#e0e0e0)
    }

    /*.address-list-wrapper {*/
    /*position: fixed;*/
    /*top: 45px;*/
    /*left: 0;*/
    /*right: 0;*/
    /*height: 300px;*/
    /*width: 100%;*/
    /*z-index: 999;*/
    /*background-color: #fff;*/
    /*}*/
    .map-didi {
      width: 100%;
      height: calc(100% - 44px);

      .location-marker {
        position: fixed;
        left: 12px;
        bottom: 95px;
        width: 32px;
        height: 32px;
      }

      .center-marker {
        position: fixed;
        left: 50%;
        top: calc(50% - 47px);
        transform: translateX(-50%);
        width: 110px;
        height: 70px;
        text-align: center;

        .text-center {
          padding: 0 4px;
          position: relative;
          height: 25px;
          line-height: 25px;
          color: #f5f5f5;
          background-color: #616161;
          font-size: 12px;
          border-radius: 12px;
          box-sizing: border-box;
        }

        .inverted-triangle {
          position: absolute;
          left: 45px;
          top: 16px;
          width: 20px;
          height: 20px;
        }

        .img-center {
          display: inline-block;
          margin-top: 8px;
          width: 38px;
          height: 40px;
        }
      }

      .address {
        display: flex;
        align-items: center;
        position: absolute;
        bottom: 20px;
        left: 12px;
        right: 12px;
        height: 60px;
        box-sizing: border-box;
        overflow: hidden;
        background-color: #fff;

        .img-address {
          padding-left: 4px;
          flex: 0 0 40px;
          width: 40px;
          height: 40px;
        }

        .address-desc {
          margin-left: 5px;
          flex: 1;
          height: 40px;

          .blur {
            font-size: 14px;
            color: #333333;
            .no-wrap();
          }

          .detail {
            padding-top: 6px;
            .no-wrap();
            font-size: 12px;
            color: #c7c7c7;
          }
        }

        .btn-address {
          padding: 20px;
          letter-spacing: 4px;
          flex: 0 0 40px;
          text-align: center;
          font-size: 18px;
          color: #333;
        }
      }
    }
  }
</style>
