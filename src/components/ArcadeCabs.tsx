import React, {useMemo, useState} from 'react'

type Game = {
  description?: string;
  name: string;
  manufacturer: string;
  primary: string;
  secondary: string;
}
type SortKey = 'name' | 'manufacturer' | 'primary' | 'secondary'
type SortOrder = 'asc' | 'desc'

const SORT_COLS: {key: SortKey, label: string}[] = [
  {key: 'name', label: 'Name'}
, {key: 'manufacturer', label: 'Manufacturer'}
, {key: 'primary', label: 'Category (Main)'}
, {key: 'secondary', label: 'Category (Sub)'}
]
const SORT_TOGGLE: Record<SortOrder, SortOrder> = {asc: 'desc', desc: 'asc'}

type ArcadeCabsProps = {
  games: Game[];
}
const ArcadeCabs: React.FC<ArcadeCabsProps> = ({games}) => {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortKey>('name')
  const [order, setOrder] = useState<SortOrder>('asc')

  const rendered = useMemo(() => {
    const filtered = games.filter((game) => filterSearchTerm(game, search))
    filtered.sort((a, b) => {
      const initial = a[sort].localeCompare(b[sort])
      // break any "ties" via name (ascending order) by default
      if (initial === 0) return a.name.localeCompare(b.name)

      return order === 'asc' ? initial : -initial
    })
    return filtered
  }, [games, search, sort, order])

  const sortByTerm = (term: SortKey) => {
    if (sort === term) { // subsequent/repetitive click(s)
      setOrder(SORT_TOGGLE[order])
    } else { // first/initial click
      setSort(term)
      setOrder('asc')
    }
  }
  const btnHeadingAttrs = (key: SortKey) => ({
    className: 'btn p-2 m-0'
  , onClick: () => sortByTerm(key)
  })

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by category, name, or manufacturer..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              {SORT_COLS.map((col) => (<th key={col.key}>
                <button {...btnHeadingAttrs(col.key)}>{col.label}</button>
              </th>))}
            </tr>
          </thead>
          <tbody>
            {rendered.map((game) => (<tr key={game.name}>
              {SORT_COLS.map(col => <td key={`${game.name}-${col.key}`}>
                {game[col.key]}
              </td>)}
            </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function filterSearchTerm(game: Game, search: string) {
  for (const key of Object.keys(game)) {
    if (key === 'description') continue

    const [term, val] = [search.toLowerCase(), game[key].toLowerCase()]
    if (val.includes(term)) return true
  }
}

export default ArcadeCabs
