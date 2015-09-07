//create objects
var clicks = 0;
var evols = 0;

var love = 25;
var discipline = 25;
var health = 25;
var education = 25;
var happiness = 25;
var food = 25;

var stress = 25;
var money = 25;
var hours_worked = 0;

//Global variable we will use for control
var current_round = 1;
var current_round_text = ["Early Morning", "Morning", "Breakfast", "Depart", "Afternoon", "Afternoon Break", "dinner", "Evening", "Late Evening", "Night"];
//var current_round_buttonNames = [["Wake Child", "Leave Alone"],[]];

var round_images = ["image/00_egg1.png", "image/01_egg2.png", "image/02_egg3.png", "image/03_egg4.png", "image/04_dragon1.png", "image/05_dragon2.png", "image/06_dragon3.png", "image/07_dragon4.png", "image/08_dragon5.png", "image/09_dragon6.png", "image/10_dragon7.png" ];
var round_names = ["It's an egg", "Hey the egg is responding to your clicks I think it looks a little different", "The egg is shaking a bit and the number of spots totally changed", "Wow it's still an egg", "Wow your egg hatched into a dragon wow", "Look the dragon is evolving", "It evolved again wow", "Dragon is getting fat", "Even fatter dragon", "It's a hydra now lol so many heads", "Rawr it's so badass it's the most badass best hydra ever"];
var timeOfDay = ["7:00am", "7:30am", "7:00am", "8:30am", "3:00pm", "4:00pm", "6:00pm", "7:00pm", "8:00pm"];
var total_rounds = round_names.length;

var nextEvoVal = 10;
var clicksElapsed = 0;

document.ontouchmove = function(e) {e.preventDefault()};

$(document).ready(function(){

	animationClick("#dragonPic", 'bounce');

});

function animationClick(element, animation){
  element = $(element);
  element.click(
    function() {
      element.removeClass('animated ' + animation);
      //wait for animation to finish before removing classes
      window.setTimeout( function(){
          element.addClass('animated ' + animation);
      }, 10);
    }
  );
};

function nextPic() 
{
	clicks ++;
	clicksElapsed ++;
	if (clicksElapsed >= nextEvoVal){
		evols ++;
		nextEvoVal *= 1.2;
		clicksElapsed = 0;
	}
	$('#clicks').text(clicks);
	$('#desc').text(round_names[evols]);
	$('#evols').text(evols);
	$('#nextClicks').text(nextEvoVal);

		$('#mainImage').attr('src', round_images[evols]);

}

// round 1 - early morning
function wakeChild() 
{
	if(discipline <= 25){
		showRound("Round2U");
		$('.roundContent').text('Your child refuses to get up. "Go away!" He shouts at you. What action should you take?');

	}
	else{
		showRound("Round2");
		$('.roundContent').text('"Good morning" your child greets you. You walk your child to the kitchen and contemplate breakfast. What should you feed your child?');
	}
}

function leaveAlone()
{
	decrease("Love", 5);
	decrease("Happiness", 5);
 	increase("Money", 5);
 	$('#Round3 .button1').attr('disabled','disabled');
 	console.log("This is the button that is being selected: ");
 	showRound("Round3");
 	$('.roundContent').text("You leave your child to walk to school today. Right now you have to go to work.");

}

//round 2 - morning
function snacks()
{
	decrease("Money", 2);
	increase("Food", 2);
 	increase("Happiness", 2);
 	showRound("Round3");
 	$('.roundContent').text("You can't afford much more than a few pieces of toast for your child. Your child eats in silence. Where do you go once breakfast is done?");
}

function bowlOfCereal()
{
	decrease("Money", 5);
	increase("Food", 10);
 	increase("Happiness", 5);
 	showRound("Round3");
 	$('.roundContent').text("You prepared fruits and cereal for your child. Your child eats in silence. Where do you go once breakfast is done?");
}

function skipBreakfast()
{
	decrease("Happiness", 5);
	decrease("Food", 5);
	increase("Stress", 5);
 	showRound("Round3");
 	$('.roundContent').text("It doesn't looks like you can afford breakfast today. Maybe you can leave early and get some more work done. Where do you go?");
}

//round 2U - morning undisciplined
function disciplineChild2U()
{
	increase("Discipline",10);
 	decrease("Love", 5);
 	showRound("Round2");
 	$('.roundContent').text('You scold your child and pull your child up. You walk to the kitchen to contemplate breakfast. Your child joins you shortly.');
}

function wakeChild2U()
{
	decrease("Happiness", 5);
 	showRound("Round2");
 	$('.roundContent').text('You try again to wake your child up. Your child reluctantly gets up for breakfast.');
}

function leaveAlone2U()
{
	decrease("Love", 10);
	decrease("Happiness", 10);
 	increase("Money", 5);
 	$('#Round3 .button1').attr('disabled','disabled');
 	showRound("Round3");
 	$('.roundContent').text("You don't have time for your child's tantrums. You leave your child to walk to school today. Right now you have to go to work.");
}

//round 3 - leaving home
function driveChild()
{
	increase("Happiness",6);
	increase("Education", 15);
	increase("Love", 5);
	increase("Stress", 5);
	decrease("Money", 5);
 	showRound("Round4");
 	$('.roundContent').text('You decide to drive your child to school today. You can be late to work and spend a little more on gas. After your usual part-time hours, your alarm reminds you to pick your child up from school.');
}

function driveToWork()
{
	$('#Round3 .button1').removeAttr("disabled");
	decrease("Love", 5);
	decrease("Happiness", 3);
	increase("Money", 5);
	increase("Stress", 10);
 	showRound("Round4");
 	$('.roundContent').text("You leave your child to walk to school today. You drive to your part-time job. After your usual hours, your alarm reminds you to pick your child up from school.");
}

//round 4 - afternoon
function pickUpChild()
{
	increase("Happiness",6);
	increase("Love", 5);
	increase("Stress", 5);
	decrease("Money", 5);
 	decrease("Food", 5);
 	showRound("Round5");
 	$('.roundContent').text("You leave work early to pick up your child from school. Your child is pleasantly surprised.");
}

function workLonger()
{
	decrease("Love", 5);
	decrease("Happiness", 3);
	increase("Stress", 20);
	increase("Money", 10);
 	decrease("Food", 5);
 	showRound("Round5");
 	$('.roundContent').text("You need all the work you can manage in order to pay the bills. After work, you see your child has walked home.");
}

//round 5 - late afternoon
function playWithChild()
{
	increase("Happiness", 10);
	increase("Love", 10);
 	showRound("Round6");
 	$('.roundContent').text("You pick up some of your child's airplanes and pretend they're flying into space. Your child laughs.");
}

function doChores()
{
	decrease("Stress",10);
	decrease("Love", 5);
 	showRound("Round6");
 	$('.roundContent').text("You need to de-stress after a long day at work. You ask your child to help clean the house a bit.");
}
function askToStudy()
{
	increase("Education",10);
	decrease("Happiness", 2);
 	showRound("Round6");
 	$('.roundContent').text("Your child needs better grades. Better ask your child to study.");
}

function disciplineChild()
{
	decrease("Love", 10);
	increase("Discipline", 20);
 	showRound("Round6");
 	$('.roundContent').text("You notice your child has been causing trouble at school. Your child is more likely to listen with discipline.");
}

//round 6 - dinner
function instant()
{
	decrease("Money", 2);
	increase("Happiness", 3);
	increase("Food", 5);
 	showRound("Round7");
 	$('.roundContent').text("You and your child have some instant noodles. It is almost time for bed.");
}
function servePasta()
{
	decrease("Money", 10);
	increase("Happiness", 10);
	increase("Food", 15);
 	showRound("Round7");
 	$('.roundContent').text("You and your child enjoy some pasta. It is almost time for bed.");
}

function skipDinner()
{
	decrease("Happiness", 6);
	decrease("Food", 5);
 	showRound("Round7");
 	$('.roundContent').text("You look in the pantry. There's not enough food for today. It's almost time for bed.");
}

//round 7 - late afternoon
function playWithChildEvening()
{
	increase("Happiness", 10);
	increase("Love", 10);
 	showRound("Round8");
 	$('.roundContent').text("Your child quietly plays with his toy trucks. You sit beside your child and join in.");
}

function doChoresEvening()
{
	decrease("Stress",10);
	decrease("Love", 10);
 	showRound("Round8");
 	$('.roundContent').text("You've been working a lot and need to de-stress. You ask your child to clean the dishes.");
}
function askToStudyEvening()
{
	increase("Education",10);
	decrease("Happiness", 5);
 	showRound("Round8");
 	$('.roundContent').text("Your child needs better grades. Better ask your child to study.");
}

function disciplineEvening()
{
	decrease("Love", 10);
	increase("Discipline", 20);
 	showRound("Round8");
 	$('.roundContent').text("Your child has been misbehaving lately. You scold your child and hide some toys.");
}

//round 8 - night
function tuckIn()
{
	increase("Love", 10);
 	decrease("Food", 10);
 	showRound("Round1");
 	$('.roundContent').text('"Good night" you tell your child. Tomorrow is another day.');
}

function askToStudyNight()
{
	increase("Education",10);
	decrease("Happiness", 5);
 	decrease("Food", 10);
 	showRound("Round1");
 	$('.roundContent').text("Your child needs better grades. Better ask your child to study.");
}
function leaveAloneNight()
{
	decrease("Love", 10);
	decrease("Happiness", 10);
 	increase("Money", 10);
  	decrease("Food", 10);
 	showRound("Round1");
 	$('.roundContent').text("You retire for the night, unsure of what your child may be doing. Tomorrow is going to be a long day.");
}

/////////////////////////////////////////////////////////


function showRound(r)
{

	for (var i = 0 ; i < total_rounds; i++)
	{
		$('#' + round_names[i]).hide();
	}

	//round text
	
	$(".roundContent").hide();
	$(".roundContent").fadeIn(1000);

	$('#' + r).show();
	var a = round_names.indexOf(r);
	console.log(timeOfDay[a]);
	$('.roundText').text(timeOfDay[a]);
	$('.main_image').attr('src', 'image/'+ r +'.png');


	// logic for figuring out endings
	if (discipline >= 100 && happiness < 20){
		$('#ending3').modal('show');
	}

	if (love <= 0){
		$('#ending1').modal('show');
	}
	if (food <= 0){
		$('#ending2').modal('show');
	}

	//

}
//Logic Functions here
// function logic1()
// {
// 	console.log("     first button clicked"); // wake child
// 	if(current_round == 1){

// 		$('#Round1').hide();
// 		$('#Round2').show();

// 		// $('#button1').text("Bowl of cereal");
// 		// $('#button2').text("Skip");
// 	}
// 	else if(current_round == 2){ // bowl of cereal
// 		increase("Food",10);
// 		increase("Happiness", 5);

// 		$('#Round2').hide();
// 		$('#Round3').show();
// 	}
// 	else if(current_round == 3){ // drive child to school
// 		increase("Happiness",10);
// 		increase("Education", 15);
// 		increase("Love", 5);
// 		increase("Stress", 5);
// 		$('#Round3').hide();
// 		$('#Round4').show();
// 	}
// 	else if(current_round == 4){ // pick up child
// 		increase("Happiness",10);
// 		increase("Love", 5);
// 		increase("Stress", 5);
// 		$('#Round4').hide();
// 		$('#Round5').show();
// 	}
// 	else if(current_round == 5){ // play with child
// 		increase("Happiness", 10);
// 		increase("Love", 10);
// 		$('#Round5').hide();
// 		$('#Round6').show();
// 	}
	
//  	current_round++;
//  	$('.roundText').text("Round " + current_round);
// }

// function logic2()
// {
// 	console.log("     second button clicked"); // leave alone
// 	if(current_round == 1){
// 		decrease("Love", 10);
// 		increase("Money", 40);
// 		$('#Round1').hide();
// 		$('#Round2').show();
// 	}
// 	else if(current_round == 2){ // skip
// 		decrease("Love", 10);
// 		$('#button1').text("Drive child to school");
// 		$('#button2').text("Drive to work");
// 	}
// 	else if(current_round == 3){ // drive to work
// 		decrease("Love", 10);
// 		$('#button1').text("Pick up child");
// 		$('#button2').text("Work longer");
// 	}
// 	else if(current_round == 4){ // work longer
// 		decrease("Love", 10);
// 		increase("Stress", 20);
// 		increase("Money", 40);
// 		$('#button1').text("Play with child");
// 		$('#button2').text("Ask child to help with chores");
// 	}
// 	else if(current_round == 5){ // ask to help with chores
// 		decrease("Stress",10);
// 		decrease("Happiness", 5);
// 		$('#button1').text("Serve pasta");
// 		$('#button2').text("Skip");
// 	}
	
//  	//roundActions();
//  	current_round++;
//  	$('.roundText').text("Round " + current_round);
// }

function increase(m, n)
{
	var value = 0;

	if (m == "Education")
	{
		value = education;
	}
	else if (m == "Happiness")
	{
		value = happiness;
	}
	else if (m == "Love")
	{
		value = love;
	}
	else if (m == "Food")
	{
		value = food;
	}
	else if (m == "Discipline")
	{
		value = discipline;
	}
	else if (m == "Money")
	{
		value = money;
	}
	else if (m == "Stress")
	{
		value = stress;
	}

	// keeping track of below 0 or above 100
	keepInBounds();

	value += n;
	$("#" + m).text(m + ": " + value);
	console.log(m + " + " + n + " = " + value);
	$("#" + m+"Bar").attr('style', 'width: ' + value + '%');
	console.log(m + "Bar" + " value = " + value);

	if (m == "Education")
	{
		education = value;
	}
	else if (m == "Happiness")
	{
		happiness = value;
	}
	else if (m == "Love")
	{
		love = value;
	}
	else if (m == "Food")
	{
		food = value;
	}
	else if (m == "Discipline")
	{
		discipline = value;
	}
	else if (m == "Money")
	{
		money = value;
		$("#" + m).text( m + ": " + "$" + value);
	}
	else if (m == "Stress")
	{
		stress = value;
	}

}

function decrease(m, n)
{
	var value = 0;
	if (m == "Education")
	{
		value = education;
	}
	else if (m == "Happiness")
	{
		value = happiness;
	}
	else if (m == "Love")
	{
		value = love;
	}
	else if (m == "Food")
	{
		value = food;
	}
	else if (m == "Discipline")
	{
		value = discipline;
	}
	else if (m == "Money")
	{
		value = money;
	}
	else if (m == "Stress")
	{
		value = stress;
	}

	// keeping track of below 0 or above 100
	keepInBounds();

	value -= n;
	$("#" + m).text(m + ": " + value);
	console.log(m + " - " + n + " = " + value);
	$("#" + m+"Bar").attr('style', 'width: ' + value + '%');
	console.log(m + "Bar" + " value = " + value);

	if (m == "Education")
	{
		education = value;
	}
	else if (m == "Happiness")
	{
		happiness = value;
	}
	else if (m == "Love")
	{
		love = value;
	}
	else if (m == "Food")
	{
		food = value;
	}
	else if (m == "Discipline")
	{
		discipline = value;
	}
	else if (m == "Money")
	{
		money = value;
		$("#" + m).text( m + ": " + "$" + value);
	}
	else if (m == "Stress")
	{
		stress = value;
	}
}

function keepInBounds()
{
	if(education < 0){
		education = 0;
		console.log("under 0");
	}
	else if(education > 100){
		education = 100;
	}
	if(happiness < 0){
		happiness = 0;
	}
	else if(happiness > 100){
		happiness = 100;
	}
	if(love < 0){
		love = 0;
		console.log("under 0");
	}
	else if(love > 100){
		love = 100;
		console.log("over 100");
	}
	if(food < 0){
		food = 0;
	}
	else if(food > 100){
		food = 100;
	}
	if(discipline < 0){
		discipline = 0;
	}
	else if(discipline > 100){
		discipline = 100;
	}
	if(stress < 0){
		stress = 0;
	}
	else if(stress > 100){
		stress = 100;
	}
}

//this function is ran after each round
function roundActions()
{

	current_round++;
 	console.log(current_round);

 	if(current_round == 2)
 	{
 		$('#button1').text("Game Over");
		$('#button2').hide();
 	}
}


function tally()
{	

	var count = 0;
	var endCount = 0;

	if (you.is_happy[total_rounds-1])
	{
		endCount++;
	}


	for (var i = 0; i < total_rounds; i++) 
	{
		if (you.is_happy[i])
			{
				count++;
		    }
	}


	//code to decide if good ending or bad ending here
	if(count > 12 && endCount > 2){
		var main_image = 'image/good_ending.png';

		$('.you_image').attr('src', 'image/you-happy.png');
		$('.samuel_image').attr('src', 'image/samuel-happy.png');
		$('.christy_image').attr('src', 'image/christy-happy.png');
		$('.devon_image').attr('src', 'image/devon-happy.png');
		$('.alex_image').attr('src', 'image/alex-happy.png');
		$('.milena_image').attr('src', 'image/milena-happy.png');
	}
	else if(count >= 15 && endCount >= 4){
		var main_image = 'image/best_ending.png';

		$('.you_image').attr('src', 'image/you-happy.png');
		$('.samuel_image').attr('src', 'image/samuel-happy.png');
		$('.christy_image').attr('src', 'image/christy-happy.png');
		$('.devon_image').attr('src', 'image/devon-happy.png');
		$('.alex_image').attr('src', 'image/alex-happy.png');
		$('.milena_image').attr('src', 'image/milena-happy.png');
	}
	else if(count >= 6 && endCount <= 1){
		var main_image = 'image/bad_ending.png';

		$('.you_image').attr('src', 'image/you-sad.png');
		$('.samuel_image').attr('src', 'image/samuel-sad.png');
		$('.christy_image').attr('src', 'image/christy-sad.png');
		$('.devon_image').attr('src', 'image/devon-sad.png');
		$('.alex_image').attr('src', 'image/alex-sad.png');
		$('.milena_image').attr('src', 'image/milena-sad.png');
	}
	else {
		var main_image = 'image/worst_ending.png';

		$('.you_image').attr('src', 'image/you-sad.png');
		$('.samuel_image').attr('src', 'image/samuel-sad.png');
		$('.christy_image').attr('src', 'image/christy-sad.png');
		$('.devon_image').attr('src', 'image/devon-sad.png');
		$('.alex_image').attr('src', 'image/alex-sad.png');
		$('.milena_image').attr('src', 'image/milena-sad.png');
	}
	//var main_image = (count > 12 && (endCount > 2))  ? 'image/good_ending.jpg' : 'image/bad_ending.jpg'; //first is for true, second is for false
	$('.main_image').attr('src', main_image);


	//console.log("final count is:" + count);
	//console.log("number of happy people at last round:" + endCount);
	setTimeout("alert(\"Page will Reload in 10 Seconds\")", 2000);
	setTimeout("location.reload(true)",8000);
	
  
}

//None of this is currently working
$('.btn-success').click(function(){
	console.log("first button clicked");


	$('#button1').text("Button1");

	if (current_round >= total_rounds){
		$('#button1').text("Game Over");
		$('#button2').hide();
	}
	
	if (current_round == 1) 
		{
			logic();
		}
	else if (current_round == 2)
		{
			logic();
		}

		current_round++;
		console.log("current round is: " + current_round);
});

function restartGame()
{
	setTimeout("location.reload(true)",500);
}

// $('#button2').click(function(){
// 		{
// 			console.log("second button clicked");
// 			logic();
// 		}
// });

