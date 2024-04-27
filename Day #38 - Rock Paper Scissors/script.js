// Selecting DOM elements with class names
const userChoiceIcon = document.querySelector('.user-choice');
const computerChoiceIcon = document.querySelector('.computer-choice');
const resultText = document.querySelector('.result');

let userIcon, computerIcon;

// Function to initiate the game when the user makes a choice
const play = (userChoice, elem) => {
  // Adding animation classes to user and computer choice icons
  userChoiceIcon.classList.add('user-icon-animate');
  computerChoiceIcon.classList.add('computer-icon-animate');
  // Displaying a "Wait...." message
  resultText.innerHTML = 'Wait....'

  // Setting a timeout to simulate a delay (3 seconds) before getting the result
  setTimeout(() => {
    getResult(userChoice, elem);
  }, 3000);
}

// Function to determine the game result based on user and computer choices
const getResult = (userChoice, elem) => {
  // Removing animation classes from user and computer choice icons
  [userChoiceIcon, computerChoiceIcon].forEach(element =>
    element.classList.remove('user-icon-animate', 'computer-icon-animate'));


  // Generating a random choice for the computer: rock, paper, or scissor
  const randomChoices = ['rock', 'paper', 'scissor'];
  const computerChoice = randomChoices[Math.floor(Math.random() * randomChoices.length)];


  // Defining HTML icons for rock, paper, and scissor
  let rockIcon = '<i class="fa-regular fa-hand-back-fist"></i>';
  let paperIcon = '<i class="fa-regular fa-hand"></i>';
  let scissorIcon = '<i class="fa-regular fa-hand-scissors"></i>';

  // Mapping user and computer choices to their respective icons

  // userIcon = userChoice == 'rock' ? rockIcon : userChoice == 'paper' ? paperIcon : userChoice == 'scissor' ? scissorIcon : '';
  // computerIcon = computerChoice == 'rock' ? rockIcon : computerChoice == 'paper' ? paperIcon : computerChoice == 'scissor' ? scissorIcon : '';

  const iconMap = {
    'rock': rockIcon,
    'paper': paperIcon,
    'scissor': scissorIcon
  };

  userIcon = iconMap[userChoice] || '';
  computerIcon = iconMap[computerChoice] || '';


  // Updating the HTML content of user and computer choice icons
  userChoiceIcon.innerHTML = userIcon;
  computerChoiceIcon.innerHTML = computerIcon;

  // Define an object 'outcomes' to represent possible outcomes based on user and computer choices
  const outcomes = {
    rock: { rock: 'Draw', paper: 'Cpu', scissor: 'You' },
    paper: { rock: 'You', paper: 'Draw', scissor: 'Cpu' },
    scissor: { rock: 'Cpu', paper: 'You', scissor: 'Draw' }
  };

  // Access the outcome value based on userChoice and computerChoice from the 'outcomes' object
  const outcomeValue = outcomes[userChoice][computerChoice];

  // Display the result message in the HTML
  // If userChoice is equal to computerChoice, it's a draw; otherwise, display the winner
  resultText.innerHTML = userChoice === computerChoice ? 'Draw' : `${outcomeValue} Won!!`;
}
