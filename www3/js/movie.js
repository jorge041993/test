/*var rectPath = new Rect(0,0,150,150)
.attr({
    fillColor: 'red',
    strokeColor: 'green',
    strokeWidth: 5,
    x: 150,
    y: 150
    
});

stage.addChild(rectPath);

rectPath.animate('2s', {

    rotation: Math.PI*2

},{
    easing: 'elasticInOut'
})*/

var rectPath = new Rect(10, 10, 100, 100)
.addTo(stage)
.attr(`fillColor`, `black`)
.animate(new KeyframeAnimation('3s',{
    '0%':{x:0, y:0},
    '50%':{x:300, y:0},
    '100%':{x:0, y:0},
}));
stage.addChild(rectPath);
rectPath.animate('3s', {
    rotation: Math.PI*2
},{
    easing: 'elasticInOut'
})

var rectPath = new Rect(10, 10, 100, 100)
.addTo(stage)
.attr(`fillColor`, `purple`)
.animate(new KeyframeAnimation('3s',{
    '0%':{x:0, y:0},
    '50%':{x:300, y:300},
    '100%':{x:0, y:0},
    
}));
stage.addChild(rectPath);
rectPath.animate('3s', {
    rotation: Math.PI*2
},{
    easing: 'elasticInOut'
})

var rectPath = new Rect(10,10,100,100)
.addTo(stage)
.attr(`fillColor`, `gray`)
.animate(new KeyframeAnimation('3s',{
    '0%':{x:300, y:300},
    '50%':{x:0, y:300},
    '100%':{x:300, y:300}
}));
stage.addChild(rectPath);
rectPath.animate('3s', {
    rotation: Math.PI*2
},{
    easing: 'elasticInOut'
})