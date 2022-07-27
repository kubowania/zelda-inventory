import { useEffect, useState } from 'react'

const InventoryImage = ({ inventoryItem, setViewedItem, characterCurrentWeapon, fetchCharacter }) => {
    const [ object, setObject ] = useState(null)


    const fetchObject = async () => {
        const response = await fetch('/.netlify/functions/getObject', {
            method: 'POST',
            body: JSON.stringify(inventoryItem.object_id)
        })
        const responseBody = await response.json()
        setObject(responseBody.data.objects.values[0])
    }

    const updateCharacterWeapon = async (object_id) => {
        const response = await fetch('/.netlify/functions/updateCharacterWeapon', {
            method: 'POST',
            body: JSON.stringify(object_id)
        })
        if (response.status === 200) {
            fetchObject()
            fetchCharacter()
        }
    }

    useEffect(() => {
        if (inventoryItem) fetchObject()
    }, [inventoryItem])

    console.log(object)

    const swordCategory = inventoryItem && (inventoryItem.object_category).toLowerCase() == "sword"
    const currentWeapon = inventoryItem && characterCurrentWeapon == inventoryItem.object_id

    return (
        <div
            className={currentWeapon ? "inventory-image-container-chosen" : "inventory-image-container"}
            onClick={() => setViewedItem(object)}>

            {inventoryItem && (
            <>
            <img
                className="inventory-image"
                src={object?.image}
                alt={`icon of ${object?.name}`}
            />
                <p className="inventory-amount">{inventoryItem.qty}</p>
            {!currentWeapon && swordCategory && (
                <button
                className="weapon-update-button"
                onClick={() => updateCharacterWeapon(inventoryItem.object_id)}
                >+</button>
                )}
            </>
           )}
        </div>
    )
}

export default InventoryImage