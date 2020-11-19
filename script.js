function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCharacter() {
    const availableCharacters = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
        "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "y",
        "x", "#", "%", "-", "+", "_", "?", "/", "\\", "<", ">", "="];
    return availableCharacters[getRandomInteger(0, availableCharacters.length - 1)];
}

const wordsToAppend = ["web designer.", "web developer.", "hard-working person.", "problem-solver."];

const baseString = "Oh Hello!\nWelcome to this page.\nMy name is Julia.\nI'm a ";

const targetElement = document.querySelector("[data-target-resolver]");

function addText(element, startingHtml, extraText, randomIterations = 3, iterationDelay = 10, pause = 1000) {
    return new Promise(resolve => {
        let characterIndex = 0;
        let randomIteration = 0;
        const interval = setInterval(() => {
            element.innerHTML = startingHtml;
            element.innerHTML += extraText.substr(0, characterIndex);
            if (randomIteration < randomIterations) {
                element.innerHTML += getRandomCharacter();
                element.innerHTML = element.innerHTML.split('\n').join('<br>');
                randomIteration++;
                return;
            }
            randomIteration = 0;
            element.innerHTML += extraText[characterIndex];
            element.innerHTML = element.innerHTML.split('\n').join('<br>');
            characterIndex++;
            if (characterIndex === extraText.length) {
                clearInterval(interval);
                setTimeout(resolve, pause);
                return;
            }
        }, iterationDelay);
    });
}

function removeText(element, finalHtml, textToRemove, randomIterations = 3, iterationDelay = 10, pause = 1000) {
    return new Promise(resolve => {
        let characterIndex = 0;
        let randomIteration = 0;
        const interval = setInterval(() => {
            element.innerHTML = finalHtml;
            element.innerHTML += textToRemove.substr(0, textToRemove.length - characterIndex - 1);
            if (randomIteration < randomIterations) {
                element.innerHTML += getRandomCharacter();
                element.innerHTML = element.innerHTML.split('\n').join('<br>');
                randomIteration++;
                return;
            }
            randomIteration = 0;
            characterIndex++;
            if (characterIndex === textToRemove.length + 1) {
                clearInterval(interval);
                element.innerHTML = element.innerHTML.split('\n').join('<br>');
                setTimeout(resolve, pause);
                return;
            }
            element.innerHTML += textToRemove[textToRemove.length - characterIndex];
            element.innerHTML = element.innerHTML.split('\n').join('<br>');
        }, iterationDelay);
    });
}

async function addAndRemoveText(element, baseHtml, extraText, randomIterations = 3, iterationDelay = 10, pause = 1000) {
    await addText(element, baseHtml, extraText, randomIterations, iterationDelay, pause);
    return removeText(element, baseHtml, extraText, randomIterations, iterationDelay, pause);
}

addText(targetElement, '', baseString, 0, 100, 0).then(async () => {
    for (let wordIndex = 0; ; wordIndex = (wordIndex + 1) % wordsToAppend.length) {
        await addAndRemoveText(targetElement, baseString, wordsToAppend[wordIndex]);
    }
});
