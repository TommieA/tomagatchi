let timer;
let seconds = 0;
let minutes = 0;
let msg = "";

class tomagotchi{
    constructor (name) {
        this.name = name;
        this.hunger = 0;
        this.sleepiness = 0;
        this.boredom = 0;
        this.age = 0;
        this.speed = 700;
    };
};

const duck = new tomagotchi();
  
const secondsGoUp = () => {
    seconds++;
    $('.time').text(seconds)
    if(seconds % 5 === 0){
        duck.hunger++;
        duck.speed +=50;
        $('#hunger').text(`Hunger: ${duck.hunger}`);
    }
    if(seconds % 10 === 0){
        duck.boredom++;
        $('#boredom').text(`Boredom: ${duck.boredom}`);
    }
    if(seconds % 15 === 0){
        duck.sleepiness++;
        $('#sleepiness').text(`Sleepiness: ${duck.sleepiness}`);
    }
    if(seconds % 30 === 0){
        duck.age++;
        $('#age').text(`Age: ${duck.age}`);
    }
    if(duck.hunger > 10){
        $('#goose').finish();
        clearInterval(timer);
        alert(name + ' starved to death');
    } 

    if(duck.boredom > 10){
        clearInterval(timer);
        $('#goose').finish();
        alert(name + ' got bored to death');
    }

    if(duck.sleepiness > 10){
        clearInterval(timer);
        $('#goose').finish();
        alert(name + ' fell asleep and flew into a tree');
    }

    if(duck.age > 10){
        clearInterval(timer);
        $('#goose').finish();
        msg = (name + ' died of old age');
        alert(msg)
    }
}

function start() {
    timer = setInterval(function(){
             secondsGoUp()
        } ,1000);
    name = $('#input-name').val(); 
    console.log(name);
    animateDiv();
};

function feed() {
    duck.speed -= 50;
    duck.hunger--;
    $('#hunger').text(`Hunger: ${duck.hunger}`);
};

function sleep(){
    duck.speed += 50; 
    duck.sleepiness--;
    $('#sleepiness').text(`Sleepiness: ${duck.sleepiness}`);
};

function loop(){
    duck.boredom--;
    $('#boredom').text(`Boredom: ${duck.boredom}`);
};

function stop(){
    clearInterval(timer);
    $('#hunter').css('opacity', 1);
    $('#goose').animate({down: 300});
    $('#goose').finish();
};

$('form').on('submit', function(e){
    e.preventDefault();
    start()});
$('#feed').on('click', function(){feed()});
$('#sleep').on('click', function(){sleep()});
$('#loop').on('click', function(){loop()});
$('#stop').on('click', function(){stop()});

//animateDiv();    

function makeNewPosition(){
    
    const h = $(window).height() - 50;
    const w = $(window).width() - 50;
    
    const nh = Math.floor(Math.random() * h);
    const nw = Math.floor(Math.random() * w);
    
    return [nh,nw];       
};

function animateDiv() {
    const newq = makeNewPosition();
    return $('#goose').animate({ top: newq[0], left: newq[1] }, duck.speed, function(){
    animateDiv();        
    });  
}
