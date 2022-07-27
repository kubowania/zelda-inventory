const ItemDescriptionPopUp = ({ viewedItem }) => {

    console.log('viewedItem', viewedItem)
    return (
        <>
            {viewedItem &&
            <div className="item-description-container">
                <h2>{viewedItem.name}</h2>
                <p>{viewedItem.description}</p>
                <p>
                    You can buy this individual item for {viewedItem.value_in_rupees}
                </p>
                <p>
                    Items individual weight is {viewedItem.weight} kg.
                </p>
            </div>
            }
        </>
    )
}

export default ItemDescriptionPopUp