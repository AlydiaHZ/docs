<template>
    <div class="title">
        <span>内容</span>
    </div>
</template>

<style lang="scss" scoped>
.title {
    color: #333;
    line-height: 2;

    span {
        background: linear-gradient(to right,
                #f06, #f79) no-repeat right bottom;
        background-size: 0 2px;
        transition: background-size 0.3s;

        &:hover {
            background-position-x: left;
            background-size: 100% 2px;
        }
    }
}
</style>