import TabImage from './TabImage'
import InventoryImage from './InventoryImage'
import zeldaSword from '../images/zelda-sword.png'
import zeldaBow from '../images/zelda-bow-and-arrow.png'
import zeldaShield from '../images/zelda-shield.png'
import zeldaShirt from '../images/zelda-shirt.png'
import zeldaApple from '../images/zelda-apple.png'
import zeldaPot from '../images/zelda-cooking-pot.png'
import zeldaStar from '../images/zelda-star.png'
import {useEffect, useState} from "react"

const InventoryContainer = ({ setViewedItem, characterCurrentWeapon, fetchCharacter}) => {
    const [clickedCategory, setClickedCategory] = useState('sword')
    const [ inventory, setInventory] = useState(null)

    const fetchInventory = async () => {
        const response = await fetch('/.netlify/functions/getInventory')
        const responseBody = await response.json()
        setInventory(responseBody.data.inventory.values)
    }

    useEffect(() => {
        fetchInventory()
    }, [])

    console.log(inventory)

    const tabItems = [
        {
            category: 'sword',
            image: zeldaSword
        },
        {
            category: 'bow',
            image: zeldaBow
        },
        {
            category: 'shield',
            image: zeldaShield
        },
        {
            category: 'shirt',
            image: zeldaShirt
        },
        {
            category: 'apple',
            image: zeldaApple
        },
        {
            category: 'pot',
            image: zeldaPot
        },
        {
            category: 'star',
            image: zeldaStar
        }
    ]

    const filteredInventory = inventory?.filter(inventoryItem =>
        inventoryItem.object_category.toLowerCase() == clickedCategory.toLowerCase())

    console.log('filteredInventory', filteredInventory)

    const filteredInventorySquares = filteredInventory ? filteredInventory.length : 0

    const emptyInventorySquares = Array(20 - filteredInventorySquares).fill(null)

    const currentInventory = filteredInventory?.concat(emptyInventorySquares)

    console.log('currentInventory', currentInventory)



    return (
        <div className="inventory-container">
            <div className="tab-images-container">
                {tabItems.map((tabItem, _index) => (
                    <TabImage
                        key={_index}
                        tabItem={tabItem}
                        setClickedCategory={setClickedCategory}
                        clickedCategory={clickedCategory}
                    />
                ))}
            </div>

            <div className="inventory-item-container">
                {currentInventory?.map((currentInventoryItem, _index) => (
                    <InventoryImage
                    key={_index}
                    inventoryItem={currentInventoryItem}
                    setViewedItem={setViewedItem}
                    characterCurrentWeapon={characterCurrentWeapon}
                    fetchCharacter={fetchCharacter}
                    />
                    ))}
            </div>


        </div>
    )
}

export default InventoryContainer