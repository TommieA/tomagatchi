let timer;
let seconds = 0;
let minutes = 0;

class tomagotchi{
    constructor (name) {
        this.name = name;
        this.hunger = 0;
        this.sleepiness = 0;
        this.boredom = 0;
        this.age = 0;
        this.speed = 2000;
    };
};

const duck = new tomagotchi();
  
const secondsGoUp = () => {
    seconds++;
    $('.time').text(seconds)
    if(seconds % 4 === 0){
        duck.hunger++;
        $('#hunger').text(`Hunger: ${duck.hunger}`);
    }
    if(seconds % 6 === 0){
        duck.boredom++;
        $('#boredom').text(`Boredom: ${duck.boredom}`);
    }
    if(seconds % 8 === 0){
        duck.sleepiness++;
        $('#sleepiness').text(`Sleepiness: ${duck.sleepiness}`);
    }

    if(seconds % 10 === 0){
        duck.age++;
        $('#age').text(`Age: ${duck.age}`);
    }

    if(duck.hunger > 9){
        finish();
        alert(name + ' starved to death.');
    } 

    if(duck.boredom > 9){
        finish();
        alert(name + ' got bored to death.');
    }

    if(duck.sleepiness > 9){
        finish();
        alert(name + ' fell asleep and flew into a tree.');
    }

    if(duck.age > 9){
        finish();
        alert(name + ' died of old age.');
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

function finish(){
    $('#goose').css('opacity', 0);
    $('#goose').finish();
    clearInterval(timer);
}

function feed() {
    duck.hunger--;
    $('#hunger').text(`Hunger: ${duck.hunger}`);
};

function sleep(){
    duck.sleepiness--;
    $('#sleepiness').text(`Sleepiness: ${duck.sleepiness}`);
};

function dive(){
    duck.boredom--;
    return $('#goose').animate({
		'marginTop' : "+=30px" //moves down
		});
    $('#boredom').text(`Boredom: ${duck.boredom}`);
};

function stop(){
    $('#hunter').css('opacity', 1);
    finish();
    alert(name + ' was shot out of the sky!');
};

$('form').on('submit', function(e){
    e.preventDefault();
    start()});
$('#feed').on('click', function(){feed()});
$('#sleep').on('click', function(){sleep()});
$('#dive').on('click', function(){dive()});
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
