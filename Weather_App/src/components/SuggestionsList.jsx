function SuggestionsList({ suggestions, onSelect }) {
  if (!suggestions.length) {
    return null
  }

  return (
    <div className="suggestions">
      <p className="eyebrow">Other results</p>
      <div className="suggestion-list">
        {suggestions.map((item) => (
          <button
            key={`${item.latitude}-${item.longitude}`}
            type="button"
            onClick={() => onSelect(item.name)}
          >
            {item.name}, {item.country}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SuggestionsList
