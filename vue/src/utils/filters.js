import Vue from "vue";

Vue.filter("striplongstr", function (value) {
    if (value && typeof (value) === 'string') {
        return value.substr(0, 4).padEnd(6, '.')
    }
    return value
})

Vue.filter("fallbackEmptyable",function(value){
    if(!value || value.length===0){
        return "没有任何值哦~"
    }
    return value
})