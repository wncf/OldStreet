<template>
    <div class="user">
        <div class="header">
            <div class="userinfo">
                <div class="active"></div>
                <p>{{uname}}</p>
            </div>
        </div>
        <div class="container">
            <van-cell-group inset style="margin-bottom:10px;box-shadow:rgb(0 0 0 / 10%) 1px 1px 10px 3px">
                <van-cell title="我的订单" value="查看全部订单" />
                <div class="content">
                    <van-row type="flex" justify="space-around">
                        <van-col span="6">
                            <div class="item"></div>
                            <span>待付款</span>
                        </van-col>
                        <van-col span="6">
                            <div class="item"></div>
                            <span>待发货</span>
                        </van-col>
                        <van-col span="6">
                            <div class="item"></div>
                            <span>待收获</span>
                        </van-col>
                        <van-col span="6">
                            <div class="item"></div>
                            <span>已完成</span>
                        </van-col>
                    </van-row>
                </div>
            </van-cell-group>

            <van-cell-group inset style="box-shadow:rgb(0 0 0 / 10%) 1px 1px 10px 3px">
                <van-cell title="会员中心" is-link />
                <van-cell title="积分商城" is-link />
                <van-cell title="收获地址" is-link />
                <van-cell title="我要反馈" is-link />
                <van-cell title="我的收藏" is-link />
            </van-cell-group>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            uname:"老街用户",
            uactive:"/"
        }
    },
}
</script>
<style>
    .user .header{
        width: 100%;
        height: 200px;
        background-image: url("/image/user/user_box.png");
        background-size:contain;
        background-repeat: no-repeat;
    }
    .user .userinfo{
        text-align: center;
        padding-top: 40px;
    }
    .user .userinfo .active{
        margin: 0 auto;
        height: 60px;
        width: 60px;
        border-radius: 50%;
        background: white;
    }
    .user .userinfo p{
        font-size: 14px;
        color: #fff;
    }
    .user{
        background-color: #f5f5f5;
    }
    .user .container{
        padding-bottom: 20px;
        overflow: hidden;
        margin: -50px 10px;
    }
    .container .van-col:nth-child(1) .item{
        background-image: url("/image/user/待付款.png");
    }
    .container .van-col:nth-child(2) .item{
        background-image: url("/image/user/待发货.png");
    }
    .container .van-col:nth-child(3) .item{
        background-image: url("/image/user/待收货.png");
    }
    .container .van-col:nth-child(4) .item{
        background-image: url("/image/user/已完成.png");
    }
    .container .item{
        margin: 0 auto;
        height: 60px;
        width: 60px;
        border-radius: 50%;
        background: #f5f5f5;
        margin-bottom: 6px;

        background-size: 24px;
        background-position: center;
        background-repeat: no-repeat;
    }
    .container .content{
        padding: 20px 0;
        text-align: center;
    }
    .container .content span{
        font-size: 12px;
    }
</style>