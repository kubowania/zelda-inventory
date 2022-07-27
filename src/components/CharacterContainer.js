import linkCharacter from '../images/link.png'

const CharacterContainer = ({ character }) => {
    return (
        <div className="character-container">
            <div className="character-info">
                <h3>{character.name} stats:</h3>
                <p>Speed: { character.speed}</p>
                <p>Stamina: { character.stamina}</p>
            </div>
            <img src={linkCharacter} alt="link the character"/>
        </div>
    )
}

export default CharacterContainer