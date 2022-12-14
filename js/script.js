const pokemonName = document.querySelector('.pombodex__name');
const pokemonNumber = document.querySelector('.pombodex__number');
const pokemonImage = document.querySelector('.pombodex__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);
    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.style.display = 'block';
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        searchPokemon = data.id;
    } else {
        pokemonNumber.innerHTML = '000';
        pokemonName.innerHTML = 'Not Found!';
        pokemonImage.style.display = 'none';
    }
    input.value = '';
}

buttonNext.addEventListener('click', () => {
    renderPokemon(searchPokemon + 1);
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        renderPokemon(searchPokemon - 1);
    } 
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value);
});

renderPokemon(searchPokemon);
