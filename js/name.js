const NAME_LETTERS = {
    'T': ['t', 'τ', '✝︎', '+', '†'],
    'o': ['Ø', 'Ω', '∅', '⊕', '∘', 'O', '⊙'],
    'b': ['β', 'ß'],
    'i': ['!', '|', 'ℹ', '↥'],
    'a': ['@', '₳', '∆'],
    's': ['$', '§', '∫'],
    'W': [ '₩', '⋈'],
    'h': ['#', '⊞'],
    'y': ['¥', '♈︎', 'γ'],
    'u': ['µ', '⋁', '⋃'],
    'd': ['∂', '⊃'],
    ' ': [' '],
}

const name = document.getElementById('myname');

const NAME_STRING = 'Tobias Wahyudi';

const updateName = () => {
    name.innerHTML = NAME_STRING.split('').map(letter => {
        if(Math.random() < 0.06) {
            return NAME_LETTERS[letter][Math.floor(Math.random() * NAME_LETTERS[letter].length)];
        }
        return letter;
    }).join('');
}

setInterval(updateName, 600);