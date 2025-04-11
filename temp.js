const allPokeDiv = document.querySelector("#allPoke")

let pokemons = []


const render = () => {
    const html = pokemons.map((poke)=>{
        console.log(poke.name, poke.url)
        return `<a href=#${poke.name}>${poke.name}</a>`
    })
    allPokeDiv.innerHTML = html.join("")
}

const fetchAllPokemons = async () => {
    try {
        const response = await fetch ("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
        const data = await response.json()
        pokemons = data.results
        console.log(pokemons)
        render()
    } catch (error) {
        
    }
}

fetchAllPokemons()