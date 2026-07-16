function SearchBar({ search, setSearch, onSubmit, loading }) {
  return (
    <form className="search-card" onSubmit={onSubmit}>
      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search for a city"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Loading…' : 'Search'}
      </button>
    </form>
  )
}

export default SearchBar
