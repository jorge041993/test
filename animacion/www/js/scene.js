let numStars = 7;
let width = 500;
let height = 500;

let stars = (function(star){
    let stars = [];
    for(let i=0; i<numStars; i++){
        let h = i * 360 / numStars;
        stars[i] = star.clone().attr({
            fillColor: 'hsl('+ h +', 100%, 50%)',
            x: width/2, 
            y: height/2
        });
    }
    return stars;
})(new star(width/2, height/2, 1, 5));

stage.length(14);

let i=0;
stage.on(0, function(){
    let star = stars[i];

    star.attr({
        scaleX: 1,
        scaleY: 1,
        opacity: 1
    }).addTo(stage).animate(14 * numstars, {
        scaleX: width * 3,
        scaleY: height * 3,
        opacity: 0
    }, {isTimeLineBound: false});

    i = (i + 1)% numStars;
    stage.removeChild(star[i]);
})