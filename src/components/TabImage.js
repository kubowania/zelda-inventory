const TabImage = ({ tabItem, setClickedCategory, clickedCategory }) => {

    return (
        <button
            className="tab-button"
            disabled={tabItem.category !== clickedCategory}
        >
            <img
                className="tab-image"
                src={tabItem.image}
                alt={`icon of ${tabItem.category}`}
                onClick={() => setClickedCategory(tabItem.category)}
            />
        </button>
    )
}

export default TabImage