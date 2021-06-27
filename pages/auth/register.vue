<template>
  <view class="">
    <uni-section title="身份证" type="line"></uni-section>
    <view>
    	<uni-card :is-shadow="true" mode="style" extra=" " thumbnail="./static/img/card-1.png" @click="clickCard">
        <view class="icon-background">
          <view class="icon-style">
            <uni-icons type="camera" color="#ffffff" size="25"></uni-icons>
            <view class="">
              上传身份证人面像
            </view>
          </view>
        </view>
    	</uni-card>
    </view>
    <uni-section title="驾驶证" type="line"></uni-section>
    <view>
    	<uni-card :is-shadow="true" mode="style" extra=" " thumbnail="./static/img/card-2.png" @click="clickCard">
        <view class="icon-background">
          <view class="icon-style">
            <uni-icons type="camera" color="#ffffff" size="25"></uni-icons>
            <view class="">
              上传驾驶证正面
            </view>
          </view>
        </view>
    	</uni-card>
    </view>
    <uni-section title="行驶证正页" type="line"></uni-section>
    <view>
    	<uni-card :is-shadow="true" mode="style" extra=" " thumbnail="./static/img/card-3.png" @click="clickCard">
        <view class="icon-background">
          <view class="icon-style">
            <uni-icons type="camera" color="#ffffff" size="25"></uni-icons>
            <view class="">
              上传行驶证正本正面
            </view>
          </view>
        </view>
    	</uni-card>
    </view>
    <uni-section title="行驶证车辆页" type="line"></uni-section>
    <view>
    	<uni-card :is-shadow="true" mode="style" extra=" " thumbnail="./static/img/card-4.png" @click="clickCard">
        <view class="icon-background">
          <view class="icon-style">
            <uni-icons type="camera" color="#ffffff" size="25"></uni-icons>
            <view class="">
              上传行驶证正本反面
            </view>
          </view>
        </view>
    	</uni-card>
    </view>
    <button
      class="btn-next"
      @click.stop="next"
      :style="{backgroundColor:btnBackgroundColor}"
      :disabled="nextBtnDisabled">
      提交
    </button>
  </view>
</template>

<script type="text/ecmascript-6">
  import { mapMutations } from 'vuex';

  export default{
    data(){
      return {
        phone: '',
        nextBtnDisabled: false,
        btnBackgroundColor: '#bcbcbc'
      };
    },
    methods: {
      clearPhoneNum(){
        this.phone = '';
      },
      changePhoneNum(e){
        console.log(e.mp.detail.value);
        let phoneNum = e.mp.detail.value;
        phoneNum = phoneNum.replace(/\s+|[^\d]+/g, '');
        let result = [];
        for (let i = 0; i < phoneNum.length; i++) {
          if (i === 3 || i === 7) {
            result.push(' ');
          }
          result.push(phoneNum.charAt(i));
        }
        this.phone = result.join('');
      },
      next(){
        uni.showToast({
          title: '注册成功!',
          icon: 'success',
          success: setTimeout(() => {
            let userInfo = {};
            let hasLogin = true;
            let isDriver = true;
            this.setLoginInfo({
              userInfo,
              hasLogin,
              isDriver
            });
            uni.redirectTo({
              url: '/pages/index'
            });
            this.clearPhoneNum();
          }, 500)
        });
      },
      checkPhoneNum(){
        return /^1[34578]\d{9}$/.test(this.phone.replace(/\s+/g, ''));
      },
      ...mapMutations("passenger/index", {
        savePhone: 'SET_PHONE'
      }),
      ...mapMutations({
        setLoginInfo: 'SET_LOGIN_INFO'
      })
    },
    watch: {
      phone(newVal){
        this.nextBtnDisabled = newVal.length !== 13;
      },
      nextBtnDisabled(newVal){
        if (!newVal) {
          this.btnBackgroundColor = '#4a4c5b';
        }
      }
    }
  };
</script>

<style lang="less" scoped rel="stylesheet/less">
  .icon-background{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000;
    opacity: 0.4;
    .icon-style{
      position: absolute;
      left: 50%;
      top: 50%;
      opacity: 1.4;
      transform: translate(-50%, -50%);
      text-align: center;
      color: #FFFFFF;
    }
  }
  /deep/.uni-card__content--pd{
    padding: 0px;
  }
  /deep/.uni-card__thumbnailimage{
    height: 180px;
    
    uni-image{
      height: 180px;
    }
  }
  .login-page {
    padding: 0 16px;
    header {
      margin-top: 60px;
      height: 40px;
      line-height: 40px;
      text-indent: 2px;
      text-align: center;
      color: #000;
      font-size: 20px;
    }
    .login-content {
      margin-top: 10px;
      position: relative;
      height: 60px;
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #eeeff0;
      box-shadow: 0 0 1px #e5e6e7;
      .input-login {
        margin-left: 20px;
        display: inline-block;
        width: calc(100% - 20px - 18px - 20px);
        height: 60px;
      }
      img {
        position: absolute;
        top: 21px;
        right: 20px;
        display: inline-block;
        width: 18px;
        height: 18px;
      }
    }
    .btn-next {
      margin-top: 20px;
      color: #fff;
    }
  }
</style>
