// Arrays of random words and names for story generation
const characters = [
    "Bob the Banana", "Princess Giggles", "Captain Mustache", "Dr. Pickle",
    "Fluffy McFlufferson", "Sir Wigglebottom", "Ninja Noodle", "Queen Squeaky",
    "Professor Bubbles", "Disco Dave", "Rainbow Rita", "Silly Sally",
    "Magic Mike the Mouse", "Crazy Cat Carl", "Dancing Diana"
];

const places = [
    "the enchanted bathroom", "a giant's sock drawer", "the moon's kitchen",
    "a underwater circus", "the world's smallest elevator", "a cloud made of cotton candy",
    "the inside of a magic lamp", "a dinosaur's belly", "the land of lost socks",
    "a treehouse in the clouds", "the bottom of a cereal bowl", "a dragon's sneeze",
    "the secret lair of vegetables", "a tornado made of glitter", "the kingdom of backwards"
];

const objects = [
    "a dancing rubber duck", "a singing toothbrush", "a magical sock",
    "a flying pizza slice", "a talking banana", "a rainbow-colored umbrella",
    "a gigantic marshmallow", "a whispering teacup", "a bouncing bowling ball",
    "a glowing pickle", "a tap-dancing shoe", "a floating sandwich",
    "a laughing lamp", "a musical spoon", "a time-traveling hat"
];

const actions = [
    "started doing the chicken dance", "began singing opera very loudly",
    "decided to paint everything purple", "challenged a squirrel to a dance-off",
    "built a fort out of pancakes", "tried to teach fish how to fly",
    "organized a parade for invisible people", "invented a new type of silly walk",
    "started a band with talking vegetables", "decided to wear shoes on their hands",
    "began collecting clouds in jars", "tried to high-five the wind",
    "started a conversation with their shadow", "decided to hop everywhere on one foot",
    "began making friendship bracelets for trees"
];

const adjectives = [
    "absolutely ridiculous", "wonderfully weird", "fantastically funny",
    "surprisingly sparkly", "incredibly bouncy", "mysteriously magical",
    "delightfully dizzy", "perfectly peculiar", "amazingly awkward",
    "brilliantly bizarre", "completely crazy", "totally twisted",
    "marvelously messy", "spectacularly silly", "udderly ridiculous"
];

const endings = [
    "And everyone lived happily and weirdly ever after!",
    "The end... or is it just the beginning of more silliness?",
    "And that's how Tuesday became the silliest day of the week!",
    "From that day forward, nothing was ever quite the same (and that was perfectly fine)!",
    "And they all learned that being silly is the best superpower of all!",
    "The moral of the story: always expect the unexpected!",
    "And somewhere, a rubber duck is still laughing about this story!",
    "They lived goofily ever after, with extra sprinkles on top!"
];

// Story templates with keyword integration
const storyTemplates = [
    "Once upon a time, {character} was walking through {place} when they found {object}. Suddenly, they encountered something related to {keyword}! This made them {action}, and it was {adjective}. {ending}",
    
    "In a world where everything was possible, {character} decided to visit {place}. While exploring, they discovered {object} that reminded them of {keyword}. Without warning, they {action}, which made everything {adjective}! {ending}",
    
    "Last Tuesday, {character} woke up in {place} thinking about {keyword}. They immediately noticed {object} floating nearby. Being naturally curious, {character} {action}, causing the most {adjective} chain reaction anyone had ever seen! {ending}",
    
    "Deep in {place}, {character} was having a perfectly normal day until they found something connected to {keyword}. Along with {object}, things got {adjective} when {character} {action}. {ending}",
    
    "It was a {adjective} morning when {character} stumbled into {place} while searching for anything related to {keyword}. They found {object} and in a moment of pure inspiration, they {action}! {ending}",

    "The legend says that {character} once visited {place} with only thoughts of {keyword} in their mind. When they discovered {object}, they immediately {action}, creating the most {adjective} adventure ever! {ending}",

    "In the magical land of {place}, {character} was known for their obsession with {keyword}. One day, while playing with {object}, they {action}, and everything became wonderfully {adjective}! {ending}"
];

// Function to get random element from array
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Function to process keyword for story integration
function processKeyword(keyword) {
    if (!keyword || keyword.trim() === '') {
        return 'something mysterious';
    }
    
    // Clean the keyword
    keyword = keyword.trim().toLowerCase();
    
    // Add some variations to make it more interesting
    const variations = [
        keyword,
        `magical ${keyword}`,
        `super ${keyword}`,
        `dancing ${keyword}`,
        `flying ${keyword}`,
        `giant ${keyword}`,
        `tiny ${keyword}`,
        `rainbow ${keyword}`,
        `singing ${keyword}`,
        `invisible ${keyword}`
    ];
    
    return getRandomElement(variations);
}

// Function to highlight keywords in the story
function highlightKeyword(story, originalKeyword) {
    if (!originalKeyword || originalKeyword.trim() === '') {
        return story;
    }
    
    const keyword = originalKeyword.trim();
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    return story.replace(regex, `<span class="keyword-highlight">${keyword}</span>`);
}

// Function to generate a complete story
function generateStory() {
    const keywordInput = document.getElementById('keywordInput');
    const userKeyword = keywordInput.value;
    const processedKeyword = processKeyword(userKeyword);
    
    const template = getRandomElement(storyTemplates);
    
    // Replace placeholders with random elements
    let story = template
        .replace(/{character}/g, getRandomElement(characters))
        .replace(/{place}/g, getRandomElement(places))
        .replace(/{object}/g, getRandomElement(objects))
        .replace(/{action}/g, getRandomElement(actions))
        .replace(/{adjective}/g, getRandomElement(adjectives))
        .replace(/{keyword}/g, processedKeyword)
        .replace(/{ending}/g, getRandomElement(endings));
    
    // Highlight the original keyword if it appears in the story
    if (userKeyword && userKeyword.trim() !== '') {
        story = highlightKeyword(story, userKeyword.trim());
    }
    
    // Display the story with a fun animation
    const storyDisplay = document.getElementById('storyDisplay');
    const generateBtn = document.getElementById('generateBtn');
    
    // Add loading effect
    storyDisplay.innerHTML = '<p class="placeholder-text">🎲 Generating your silly story... 🎲</p>';
    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';
    
    // Show story after a brief delay for effect
    setTimeout(() => {
        storyDisplay.innerHTML = `<p>${story}</p>`;
        generateBtn.disabled = false;
        generateBtn.textContent = 'Generate New Story';
        
        // Add a fun visual effect
        storyDisplay.style.transform = 'scale(0.95)';
        setTimeout(() => {
            storyDisplay.style.transform = 'scale(1)';
        }, 100);
    }, 800);
}

// Function to clear the keyword input
function clearKeyword() {
    document.getElementById('keywordInput').value = '';
    document.getElementById('keywordInput').focus();
}

// Add event listeners when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const keywordInput = document.getElementById('keywordInput');
    
    // Allow Enter key to generate story
    keywordInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            generateStory();
        }
    });
    
    // Focus on input when page loads
    keywordInput.focus();
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Press 'S' for new story (only if not typing in input)
    if (event.key.toLowerCase() === 's' && !event.ctrlKey && !event.altKey && event.target !== document.getElementById('keywordInput')) {
        generateStory();
    }
    
    // Press Space for new story (only if not typing in input)
    if (event.code === 'Space' && event.target === document.body) {
        event.preventDefault();
        generateStory();
    }
    
    // Press 'C' to clear and focus on keyword input
    if (event.key.toLowerCase() === 'c' && !event.ctrlKey && !event.altKey && event.target !== document.getElementById('keywordInput')) {
        clearKeyword();
    }
});

// Add fun console messages
console.log('🎭 Welcome to the Silly Story Generator! 🎭');
console.log('💡 Pro tips:');
console.log('   - Enter a keyword to make the story more personal!');
console.log('   - Press Enter in the keyword box to generate a story');
console.log('   - Press "S" or Space to generate a new story');
console.log('   - Press "C" to clear the keyword input');
console.log('🎨 Made with lots of coffee and giggles!');

// Easter egg - Konami code for extra silliness
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A

document.addEventListener('keydown', function(event) {
    konamiCode.push(event.keyCode);
    if (konamiCode.length > konami.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konami.join(',')) {
        // Easter egg activated!
        document.body.style.background = 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)';
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'rainbow 2s ease infinite';
        
        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(style);
        
        alert('🌈 RAINBOW MODE ACTIVATED! 🌈\nYou found the secret! Everything is extra silly now!');
        konamiCode = []; // Reset
        
        // Set a fun keyword as easter egg
        document.getElementById('keywordInput').value = 'rainbow unicorn';
    }
});
