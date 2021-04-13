<template>
  <div class="well-map">
    <div class="selected-info">
      <div>
        <span class="label">经度：</span>
        <span>{{selfSelectedValue.location.lng}}</span>
      </div>
      <div>
        <span class="label">纬度：</span>
        <span>{{selfSelectedValue.location.lat}}</span>
      </div>
      <div>
        <span class="label">地址：</span>
        <span>{{selfSelectedValue.address}}</span>
      </div>
    </div>
    <div class="search-row" v-clickoutside="handleBlur">
      <div class="input-wrap">
        <input type="text" v-model="searchKey" @input="handleSearch()" @click="handleFoucus" placeholder="请输入要搜索的地址"/>
        <button type="button" @click="handleSearch()">搜索</button>
      </div>

      <ul v-show="showAddressList && addressList.length">
        <li v-for="(item,index) in addressList" :key="index" @click.stop="handleSelect(item)">
          <span class="title">{{item.title}}</span>
          <span class="other-info">{{item.address}}</span>
        </li>
      </ul>
    </div>
    <div id="well-container" class="well-map-container"></div>

  </div>
</template>

<script>
  /**
   * 使用：<well-map :selectedValue="selectedValue" @selected-change="mapSelectedChange"></well-map>
   * 参数：
   * 1. selectedValue：可不传、可传null、支持异步数据。若传入，格式如下：
   * {
   *       location: {
   *         lat: null,
   *         lng: null,
   *       },
   *       address: null,
   *       province: null,
   *       city: null,
   *       district: null
   *     }
   * 函数：
   * 1. selected-change：当选中的点发生变化时，触发
   * **/
  import axios from 'axios';
  export default {
    props: {
      selectedValue: {
        type: Object,
        required: false
      }
    },
    data() {
      return {
        timeout: null, //搜索防抖

        selfSelectedValue: {
          location: {
            lat: null,
            lng: null,
          },
          address: null,
          province: null,
          city: null,
          district: null
        },
        searchKey: '',//搜索Key
        addressList: [],//搜索结果
        mapKey: 'JDKBZ-****',//腾讯地图mapKey，需到https://lbs.qq.com/上申请
        map: null,
        markerLayer: null,
        showAddressList: false
      };
    },
    mounted() {

      //初始化地图
      this.initMap();
    },
    watch: {
      selectedValue: {
        handler(newValue, oldName) {
          let value = newValue || {};
          let _newLoca = value.location || {};
          let _oldLoca = this.selfSelectedValue.location || {};
          let mergeResult = {
            location: {
              lat: _newLoca.lat,
              lng: _newLoca.lng,
            },
            address: value.address,
            province: value.province,
            city: value.city,
            district: value.district,
          };
          //判断经纬度是否发生变化，如果变化，则需要重新画点
          if (_oldLoca.lat !== _newLoca.lat || _oldLoca.lng !== _newLoca.lng) {
            if (this.map && this.markerLayer) {
              //1. 地图如果渲染完了，则把画点画上去
              //2. 如果没有渲染完，也无需担心，在init会根据selfSelectedValue的最新值绘制
              this._drawPoint(_newLoca.lat, _newLoca.lng, true);
            }
          }
          this.selfSelectedValue = mergeResult;
        },
        immediate: true
      }
    },
    directives: {

      /**
       * 封装指令，监听点击非目标元素之外的dom
       * ***/
      clickoutside: {
        bind(el, binding, vnode) {
          function documentHandler(e) {

            console.log('documentHandler');
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (el.contains(e.target)) {
              console.log('el.contains(e.target)');
              return false;
            }
            // 判断指令中是否绑定了函数
            if (binding.expression) {
              // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
              binding.value(e);
            }
          }

          // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
          el.__vueClickOutside__ = documentHandler;
          document.addEventListener('click', documentHandler);
        },
        update() {
        },
        unbind(el, binding) {
          // 解除事件监听
          document.removeEventListener('click', el.__vueClickOutside__);
          delete el.__vueClickOutside__;
        }
      }
    },
    methods: {
      /**
       * 初始化地图
       * **/
      initMap() {
        //初始化地图
        this.map = new TMap.Map('well-container', {
          rotation: 20, //设置地图旋转角度
          pitch: 0, //设置俯仰角度（0~45）
          zoom: 16, //设置地图缩放级别
        });

        //初始化marker图层
        this.markerLayer = new TMap.MultiMarker({
          id: 'marker-layer',
          map: this.map
        });

        //监听点击事件添加marker
        this.map.on('click', this._clickMap);

        //初始化点（在_drawPoint中，做了经纬度是否存在的判断）
        let location = this.selfSelectedValue.location || {};
        this._drawPoint(location.lat, location.lng, true);

      },

      /**
       * 搜索框聚焦
       * **/
      handleFoucus(e) {
        console.log('handleFoucus');
        this.showAddressList = true;

      },
      /**
       * 搜索框失焦
       * **/
      handleBlur() {
        console.log('handleBlur');
        this.showAddressList = false;
      },
      /**
       * 搜索框内容发生变化
       * timeout是为了防抖
       * **/
      handleSearch() {
        this.showAddressList = true;

        console.log('handleSearch');
        clearTimeout(this.timeout);

        if (!this.searchKey) {
          this.addressList = [];
        } else {
          this.timeout = setTimeout(() => {

            this.$jsonp("https://apis.map.qq.com/ws/place/v1/suggestion", {
              key: this.mapKey,
              keyword: this.searchKey,
              output: "jsonp"
            }).then(res => {
              if(!res){
                return;
              }
              if (!res.data) {
                this.$message.error(res.message);
                return;
              }
              this.addressList = (res && res.data) || [];
            }).catch(err => {
              this.$message.error(err);

            });
          }, 300);
        }

      },

      /**
       * 选中搜索列表中的某一项，row格式如下：
       * {
       *   "id":"1594670327289385140",
       *   "title":"人才好娃幼儿园",
       *   "address":"辽宁省铁岭市银州区三眼井巷1",
       *   "category":"教育学校:幼儿园",
       *   "type":0,
       *   "location":{
       *       "lat":42.292420809,
       *       "lng":123.857382405
       *   },
       *   "adcode":211202,
       *   "province":"辽宁省",
       *   "city":"铁岭市",
       *   "district":"银州区"
       * }* **/
      handleSelect(row) {

        console.log(JSON.stringify(row));

        this.searchKey = row.title;
        //searchKey发生变化了，需触发搜索
        this.handleSearch();

        let value = {
          location: row.location,
          address: row.address,
          province: row.province,
          city: row.city,
          district: row.district
        };

        this.selfSelectedValue = value;
        this._notifyParent(value);
        //selectedValue发生变化了，需重新绘制点
        this._drawPoint(row.location.lat, row.location.lng, true);

        //选中之后需触发失去焦点
        this.handleBlur();

      },

      /**
       * 根据经纬度在地图上标注
       * @param lat 纬度
       * @param lng 经度
       * @param isUpdateCenter 是否更新地图中心点，有以下三种情况：
       * 1. 外部传入的点信息发生变化时，需更新中心点
       * 2. 选中搜索列表的某一项时，需更新中心点
       * 3. 点击地图标记点时，不需要更新中心点
       * **/
      _drawPoint(lat, lng, isUpdateCenter) {

        //先清空点
        this.markerLayer.setGeometries([]);
        if (!lat || !lng) {
          return;
        }
        //更新地图中心位置
        if (isUpdateCenter) {
          this.map.setCenter(
            new TMap.LatLng(lat, lng)
          );
        }
        this.markerLayer.add({
          position: new TMap.LatLng(lat, lng)
        });
      },
      /**
       * 通知父组件，标记的点发生了变化
       * **/
      _notifyParent(value) {
        // this.$emit('update:value', selectedValue);
        // this.$emit('update:selectedValue', selectedValue);
        this.$emit('selected-change', value);
      },

      /**
       * 点击地图
       * 1. 根据经纬度画点
       * 2, 根据经纬度逆向查询到地址详细信息
       * 3. 通知父组件
       * **/
      _clickMap(evt) {
        console.log('点击地图：', evt);
        this._drawPoint(evt.latLng.lat, evt.latLng.lng, false);

        let locationParam = evt.latLng.lat + ',' + evt.latLng.lng;
        this.$jsonp("https://apis.map.qq.com/ws/geocoder/v1", {
          key: this.mapKey,
          location: locationParam,
          get_poi: 0,
          output: "jsonp"
        }).then(res => {
          console.log('【' + locationParam + '】逆地址解析结果：', res);
          let result = res && res.result;
          if (!result) {
            this.$message.error(res.message);
            return;
          }
          let ad_info = result.ad_info || {};

          let value = {
            location: result.location,
            address: result.address,
            province: ad_info.province,
            city: ad_info.city,
            district: ad_info.district
          };
          this.selfSelectedValue = value;

          this._notifyParent(value);

        }).catch(err => {
          this.$message.error(err);
        });
      },

    }
  };
</script>

<style lang="less" scoped>
  .well-map {
    /*position: relative;*/

    line-height: normal;

    .search-row {
      position: relative;
      /*line-height: normal;*/

      width: 100%;
      margin: 12px 0 4px 0;
      /*left: 20px;*/
      /*top: 20px;*/
      z-index: 99009;

      .input-wrap {
        height: 32px;
        line-height: 32px;
        display: flex;

        > input {
          box-sizing: border-box;
          margin: 0;

          position: relative;
          width: 100%;
          height: 100%;
          padding: 4px 11px;
          color: rgba(0, 0, 0, 0.65);
          font-size: 14px;
          background-color: #fff;
          /*background-image: none;*/
          border: 1px solid #d9d9d9;
          border-radius: 4px 0 0 4px;
          transition: all 0.3s;
          border-right: none;

          &:hover {
            border-color: #40a9ff;
            border-right-width: 1px !important;
          }

          &:focus {
            border-color: #40a9ff;
            border-right-width: 1px !important;
            outline: 0;
            box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
          }
        }

        > button {

          padding: 0 15px;
          border-radius: 0 4px 4px 0;
          color: #fff;
          background: #1890ff;
          border-color: #1890ff;
          box-shadow: none;
          border: none;
          width: 82px;
          height: 100%;
          cursor: pointer;

          &:hover, &:focus {
            color: #fff;
            background: #40a9ff;
            border-color: #40a9ff;
            outline: none;
          }

          &:active {
            color: #fff;
            background: #096dd9;
            border-color: #096dd9;
            outline: none;
          }
        }
      }

      > ul {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(252, 250, 250, 0.918);
        border: 1px solid #f1f1f1;
        font-size: 13px;
        color: #5a5a5a;
        max-height: 280px;
        overflow-y: auto;
        list-style: none;
        padding: 0;
        margin: 0;

        > li {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          width: 100%;
          border-bottom: 1px solid #f1f1f1;
          padding: 10px;
          margin: 0;
          cursor: pointer;

          &:hover {
            background: #eff6fd;
          }

          .title {
            display: block;
            line-height: normal;
            margin-bottom: 4px;

          }

          .other-info {
            font-size: 12px;
            color: #b9b9b9;
            display: block;
            line-height: normal;
          }
        }
      }
    }

    .well-map-container {
      width: 100%;
      height: 300px;
    }

    .selected-info {
      background: #ecf5ff;
      padding: 10px 14px;
      color: #565656;
      font-size: 13px;

      > div {
        margin-bottom: 4px;

        .label {
          color: #757575;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }


</style>