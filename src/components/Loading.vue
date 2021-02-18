<template>
    <div class="loading">
        <div>
            <i></i>
            <i></i>
            <i></i>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .loading{
        display: flex;
        justify-content: center;
        align-items:center;
        height: 20vh;
        
        div{
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            i{
                display: inline-block;
                width: 6px;
                height: 30px;
                background-color: red;
                transform-origin: center bottom;
                animation: loading .5s linear 0s infinite alternate-reverse ;
                &:first-of-type{
                    animation-delay: -0.2s;//延迟时间  负数直接跳过 就是快了0.2s
                }
                &:last-of-type{
                    animation-delay: -0.6s;//延迟时间  负数直接跳过 就是快了0.4s
                }
            }
        }
    }
    @keyframes loading{
        from{
            transform: scaleY(0.2);
        }
        to{
            transform: scaleY(1);
        }
    }
</style>