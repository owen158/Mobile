/**
 * Created by Administrator on 2017/3/10.
 */
Function.prototype.method = function (name,fn) {
    this.prototype[name] = fn;
    return this;
};

var obile =function (a,url) {
    this.a = a.c;
    this.url = url;
}
obile.method("stop",function () {
    console.log(this.a)
});


var b = new obile({c:"tex"},"123")
