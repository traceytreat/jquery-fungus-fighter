$(document).ready(onReady);

// State Variables can be declared outside of the onReady
// Feel free to make this to what you want!
// Example:
// let fungusHP = 100;
let fungusHP = 100; // fungus HP value
let ourAP = 100; // our AP value
let regenInterval; // variable for regeneration time interval

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
    //subtract fungus HP based on attack HP damage
    fungusHP -= hpDamage;
    if (fungusHP <= 0){
        //cannot go below zero
        fungusHP = 0;
    }
    //subtract AP based on attack AP cost
    ourAP -= apCost;
    if (ourAP <= 0){
        //disables attack buttons
        $('.attack-btn').prop('disabled', true);
        //cannot go below zero
        ourAP = 0;
    }
    render();

    //check for hp 0 or ap 0
    //In the case of a draw, player wins
    if (fungusHP === 0){
        if (regenInterval){
            //stop regeneration if it is currently happening
            clearInterval(regenInterval);
        }
        //change fungus class to dead
        $('.freaky-fungus').removeClass('walk');
        $('.freaky-fungus').addClass('dead');
    } else if (ourAP === 0){
        //change fungus class to jump
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
    //render AP, show in DOM
    $('#ap-meter').attr("value", ourAP);
    $('.ap-text').html(`
        ${ourAP} AP
    `);

    //render HP, show in DOM
    $('#hp-meter').attr("value", fungusHP);
    $('.hp-text').html(`
        ${fungusHP} HP
    `);

}