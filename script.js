$(document).ready(onReady);

// State Variables can be declared outside of the onReady
// Feel free to make this to what you want!
// Example:
// let fungusHP = 100;
let fungusHP = 100;
let ourAP = 100;
let regenInterval;

function onReady() {
    
    // Make sure you check the index.html file! 
    // There are lots of buttons and things ready for you to hook into here!
    
    
    // 🧠 Remember
    // - Handle events that ->
    // - Updates state which is ->
    // - Rendered to the DOM
    $('.attack-btn').on('click', attack);

}
function updatePoints(apCost, hpDamage){
    //update HP and AP
    fungusHP -= hpDamage;
    if (fungusHP <= 0){
        fungusHP = 0;
    }
    ourAP -= apCost;
    if (ourAP <= 0){
        ourAP = 0;
    }
    render();

    //check for hp 0 or ap 0
    if (fungusHP === 0){
        if (regenInterval){
            //stop regeneration if it is happening
            clearInterval(regenInterval);
        }
        $('.freaky-fungus').removeClass('walk');
        $('.freaky-fungus').addClass('dead');
    } else if (ourAP === 0){
        $('.freaky-fungus').removeClass('walk');
        $('.freaky-fungus').addClass('jump');
    }

    if (fungusHP < 50 && fungusHP > 0){
        //set regeneration
        regenInterval = setInterval(regenHP, 1000);
    }

}

function attack() {
    //get attack name from class name
    let attackName = this.className.slice(11, this.className.length);

    //update points accordingly
    if (attackName === 'arcane-sceptre'){
        updatePoints(12,14);
    } else if (attackName === 'entangle'){
        updatePoints(23,9);
    } else if (attackName === 'dragon-blade'){
        updatePoints(38,47);
    } else { //star-fire
        updatePoints(33,25);
    }

}

function regenHP(){
    //regenerate hp if less than 50 and greater than 0
    if (fungusHP >= 50 || fungusHP === 0){
        clearInterval(regenInterval);
    } else {
        fungusHP++;
        render();
    }
}

function render() {
    //render AP
    $('#ap-meter').attr("value", ourAP);
    $('.ap-text').html(`
        ${ourAP} AP
    `);

    //render HP
    $('#hp-meter').attr("value", fungusHP);
    $('.hp-text').html(`
        ${fungusHP} HP
    `);

}