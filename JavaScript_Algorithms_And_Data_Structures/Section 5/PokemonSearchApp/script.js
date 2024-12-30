const nameSearch = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonImgAndFood = document.getElementById("img-div");
const pokemonType = document.getElementById("types");
const pokemonHp = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpAttack = document.getElementById("special-attack");
const pokemonSpDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");

let cachePokemonList = null;
const pokemonDetailsCache = {};

const allValidPokemonUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const fetchData1 = async () => {
    if(cachePokemonList) return cachePokemonList;
    try {
        const response = await fetch(allValidPokemonUrl);
        const data = await response.json();
        cachePokemonList = data.results;
        return cachePokemonList; // Contains basic Pokémon list with name and URL
    } catch (err) {
        console.error(err);
        return [];
    }
};


const fetchData2 = async (url) => {
    if(pokemonDetailsCache[url])
    {
        return pokemonDetailsCache[url];
    }
    try {
        const response = await fetch(url);
        const data = await response.json();
        pokemonDetailsCache[url] = data;
        return data; // Returns detailed Pokémon data
    } catch (err) {
        console.error(err);
        return null;
    }
};

const getRestInformation = async (pokemonUrl) => {
    const pokemonRest = await fetchData2(pokemonUrl);
    if (!pokemonRest) 
    {
        alert("Failed to retrieve detailed Pokémon data.");
        return;
    }

    const { id,name,height, weight, sprites, stats, types } = pokemonRest;
    const { front_default } = sprites;
    const [
        { base_stat: stat_hp } = {},
        { base_stat: stat_attack } = {},
        { base_stat: stat_defense } = {},
        { base_stat: stat_special_attack } = {},
        { base_stat: stat_special_defense } = {},
        { base_stat: stat_speed } = {},
    ] = stats || [];
    
    pokemonName.textContent = name.toUpperCase();
    pokemonId.textContent = `#${id}`;
    pokemonHeight.textContent = `Height: ${height}`;
    pokemonWeight.textContent = `Weight: ${weight}`;
    pokemonHp.textContent = stat_hp;
    pokemonAttack.textContent = stat_attack;
    pokemonDefense.textContent = stat_defense;
    pokemonSpAttack.textContent = stat_special_attack;
    pokemonSpDefense.textContent = stat_special_defense;
    pokemonSpeed.textContent = stat_speed;
    pokemonImgAndFood.innerHTML = `<img id="sprite" src="${front_default}" alt="Pokemon Sprite" />`;
    pokemonType.innerHTML = ``;
    pokemonType.innerHTML =types.map(el=>`<p class="pokemon-type">${el["type"].name}</p>`).join('') ;    
    pokemonType.style.display = "block";
    
    
};
fetchData1();

const toggleLoading = (isLoading) => {
    const loader = document.getElementById("loader");
    loader.style.display = isLoading ? "block" : "none";
};
const clearContent = ()=>{
    pokemonName.textContent = "";    
    pokemonId.textContent = "";
    pokemonHeight.textContent = "";
    pokemonWeight.textContent = "";
    pokemonImgAndFood.innerHTML = "";
    pokemonType.innerHTML = "";
}
const displayPokemonDetails = async () => 
{
    clearContent();
    toggleLoading(true);
    try{
        const query = nameSearch.value.trim();
        if (!query) {
            alert("Please tap a Pokémon name or ID");
            return;
        }
    
        if (!isNaN(query) && Number(query) < 1) {
            alert("Invalid Pokémon ID");
            return;
        }

        const allValidPokemon = await fetchData1();
        const pokemonDetail = allValidPokemon.find(
            ({ id,name }) => name.toLowerCase() === nameSearch.value.toLowerCase() || id === Number(nameSearch.value)
        );
    
        if (pokemonDetail) {        
            await getRestInformation(pokemonDetail.url); // Fetch and display detailed info
        } else {
            alert("Pokémon not found");
        }
    }catch(err)
    {
        console.log(err);
    }finally{
        toggleLoading(false);
    } 
};

searchBtn.addEventListener("click", displayPokemonDetails);
nameSearch.addEventListener("keydown", (e)=>{
    if(e.key ==='Enter')
        displayPokemonDetails();
});
