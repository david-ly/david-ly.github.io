import React, { useState } from "react";

type Game = {
  name: string;
  manufacturer: string;
  quantity?: number;
  notes?: string;
  category?: string;
};

type ArcadeGamesProps = {
  games: Game[];
};

const ArcadeGames: React.FC<ArcadeGamesProps> = ({ games }) => {
  const [search, setSearch] = useState("");

  const filteredGames = games.filter(
    (game) =>
      game.name.toLowerCase().includes(search.toLowerCase()) ||
      game.manufacturer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or manufacturer..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredGames.map((game, idx) => (
              <tr key={idx}>
                <td>{game.name}</td>
                <td>{game.manufacturer}</td>
                <td>{game.quantity || "-"}</td>
                <td>{game.category || "-"}</td>
                <td>{game.notes || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArcadeGames; 