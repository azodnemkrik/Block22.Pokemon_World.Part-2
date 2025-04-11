const allPokeDiv = document.querySelector("#allPoke")
const singlePokeDiv = document.querySelector("#singlePoke")

let pokemons = []

window.addEventListener("hashchange", () => {
    // console.log("hash change!")
    render()
})

const render = async () => {
    // Go through STATE Array and render links – Add # here!
    const pokeList = pokemons.map((poke) => {
        return `
            <a href=#${poke.name}>${poke.name}</div>
        `
    })
    // allPokeDiv.innerHTML = pokeList.join("")

    // Get CURRENT #URL from browser location. Remove "#" by .slice(1) so it's just the name. 
    // THIS IS THE CRITERIA.
    const name = window.location.hash.slice(1)
    console.log(name)

    // See if CURRENT data exists using "array.find" - if there is a MATCH to Criteria
    // 1 of 2 results - 1) Found Data, 2) "Undefined"
    const singlePoke = pokemons.find((poke) => {
        return poke.name === name
    })
    console.log(singlePoke)

    // Now, it's time to SELECT what to RENDER.
    // If I found a single pokemon, empty the allPokeDiv.
    // Else, show me the list of pokemon

    allPokeDiv.innerHTML = singlePoke ? "" : pokeList.join("")
    
    if(singlePoke) {
        try {
            const pokeData = await fetch(singlePoke.url)
            const singlePokeData = await pokeData.json()
            console.log(singlePokeData)

            const abilities = singlePokeData.abilities.map((ability) => {
                console.log(ability.ability.name)
                return `<p>${ability.ability.name}</p>` 
            })


            singlePokeDiv.innerHTML = `
                <h2>Selected Pokemon</h2>
                <h2>${singlePokeData.name}</h2>
                <img src=${singlePokeData.sprites.front_default} />
                <h2>Abilities</h2>
            ` + abilities.join("") +`
                <a href=#>Back to all Pokemon</a>
            `
        } catch (error) {
            console.error(error)
        }
    } else {
        singlePokeDiv.innerHTML = ""
    }
}

const fetchAllPokemons = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
    const data = await response.json()
    pokemons = data.results
    console.log(pokemons)
    render()
}

fetchAllPokemons()