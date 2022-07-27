import RupeeContainer from './components/RupeeContainer'
import HeartsContainer from "./components/HeartsContainer"
import InventoryContainer from "./components/InventoryContainer"
import CharacterContainer from "./components/CharacterContainer"
import ItemDescriptionPopUp from "./components/ItemDescriptionPopUp"
import { useEffect, useState} from "react"

const App = () => {
    const [ character, setCharacter] = useState(null)
    const [ viewedItem, setViewedItem ] = useState(null)

    const fetchCharacter = async () => {
        const response = await fetch('/.netlify/functions/getCharacter')
        const responseBody = await response.json()
        setCharacter(responseBody.data.characters.values[0])
    }

    useEffect(() => {
        fetchCharacter()
    }, [])



  return (
      <>
      {character &&
      <div className="app-container">
          <header className="header-container">
              <HeartsContainer heartSlots={character.max_health} fullHearts={character.current_health} />
              <h1>Inventory</h1>
              <RupeeContainer/>
          </header>

          <div className="body-container">
              <InventoryContainer setViewedItem={setViewedItem} characterCurrentWeapon={character.weapon_slot} fetchCharacter={fetchCharacter}/>
              <CharacterContainer character={character}/>
              <ItemDescriptionPopUp viewedItem={viewedItem}/>
          </div>

          <footer className="footer-container">
              <p>Welcome back {character.name}</p>
          </footer>
      </div>}
      </>
  )
}

export default App
