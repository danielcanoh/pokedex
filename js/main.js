"use strict";

const pokemonName = document.querySelector(".pokemon-name");
const pokemonInfo = document.querySelector(".character-type");
const pokemonImg = document.querySelector(".pokemon-img");
const btnSearch = document.querySelector(".search-btn");
const searchBar = document.querySelector(".search");
const statsEl = document.querySelector(".statistics");
const statisticsLeft = document.querySelector(".statistics-left");
const statisticsRight = document.querySelector(".statistics-right");
const statsBottomEl = document.querySelector(".stats-bottom-info");
const statsWeightEl = document.querySelector(".stats-weight");
const statsExpEl = document.querySelector(".stats-exp");

const deletePokemonInfo = function () {
  const type = pokemonInfo.querySelectorAll(".type");
  const stats = statsEl.querySelectorAll("p");
  const statsBottom = statsBottomEl.querySelectorAll(".stats-bottom-value");

  if (type) type.forEach(el => el.remove());
  if (stats && statsBottom) {
    stats.forEach((el) => el.remove());
    statsBottom.forEach((el) => el.remove());
  }

  pokemonImg.src = "";
};

const renderPokemonInfo = function (data) {
  let html = "";
  data.types.forEach((el) => {
    html += `
    <p class="type ${el.type.name}">${el.type.name}</p>
  `;
  });

  const statsLeft = `
    <p>hp: <span>${data.stats[0].base_stat}</span></p>
    <p>attack: <span>${data.stats[1].base_stat}</span></p>
    <p>defense: <span>${data.stats[2].base_stat}</span></p>
  `;
  const statsRight = `
    <p>special-attack: <span>${data.stats[3].base_stat}</span></p>
    <p>special-defense: <span>${data.stats[4].base_stat}</span></p>
    <p>speed: <span>${data.stats[5].base_stat}</span></p>
`;
  const statsWeight = `
    <p class="stats-bottom-value">Weight: <span>${data.weight}</span></p>
  `;
  const statsExp = `
    <p class="stats-bottom-value">Exp: <span>${data.base_experience}</span></p>
  `;

  deletePokemonInfo();

  pokemonInfo.insertAdjacentHTML("beforeend", html);
  statisticsLeft.insertAdjacentHTML("beforeend", statsLeft);
  statisticsRight.insertAdjacentHTML("beforeend", statsRight);
  statsWeightEl.insertAdjacentHTML("beforeend", statsWeight);
  statsExpEl.insertAdjacentHTML("beforeend", statsExp);
  pokemonName.textContent = data.name;
  pokemonImg.src = data.sprites.front_default;
};

const getPokemonByName = async function (name) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();

    renderPokemonInfo(data);
  } catch (error) {
    pokemonName.textContent = "not found";
    deletePokemonInfo();
  }
};

const formatName = function (name) {
  return name.toLowerCase().replaceAll(" ", "-");
};

const searchPokemon = function () {
  const charName = formatName(searchBar.value);
  getPokemonByName(charName);
};

btnSearch.addEventListener("click", searchPokemon);
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && searchBar.value) searchPokemon();
});
