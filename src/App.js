// import logo from "./logo.svg";

import "./App.css";
import React from "react";
import { PokemonRow } from "./PokemonRow";
import { PokemonInfo } from "./PokemonInfo";
import styled from "@emotion/styled";
import { Button } from "@material-ui/core";

export function getEachKey(key, base) {
  return (
    <tr key={key}>
      <td>{key}</td>
      <td>{base[key]}</td>
    </tr>
  );
}

function App() {
  const [filter, filterSet] = React.useState("");
  const [selectedItem, selectedItemSet] = React.useState(null);
  const [pokemon, pokemonSet] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3000/starting-react/pokemon.json")
      .then((resp) => resp.json())
      .then((data) => pokemonSet(data));
  }, []);

  function pokemonChanged(evt) {
    //console.log(evt.target.value);
    filterSet(evt.target.value);
  }
  function focusLost(evt) {
    console.log(evt);
  }

  const Title = styled.h1`
    text-aligned: center;
    color: blue;
  `;
  const TwoColumnLayout = styled.div`
    display: grid;
    grid-template-columns: 70% 30%;
    grid-column-gap: 1rem;
  `;

  const Container = styled.div`
    margin: auto;
    width: 800px;
    paddingtop: 1rem;
  `;

  const Input = styled.input`
    width: 80%;
    font-size: x-large;
    padding: 0.2rem;
    background-color: gray;
  `;

  return (
    <Container>
      <Title>Pokemon search</Title>
      <TwoColumnLayout>
        <div>
          <Input
            type="text"
            value={filter}
            onChange={(evt) => filterSet(evt.target.value)}
          />
          <table width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {pokemon
                .filter((pokemon) =>
                  pokemon.name.english
                    .toLowerCase()
                    .includes(filter.toLowerCase())
                )
                .slice(0, 20)
                .map((pokemon) => (
                  <PokemonRow
                    pokemon={pokemon}
                    key={pokemon.id}
                    onSelect={(pokemon) => selectedItemSet(pokemon)}
                  />
                ))}
            </tbody>
          </table>
        </div>
        {selectedItem && <PokemonInfo {...selectedItem} />}
      </TwoColumnLayout>
    </Container>
  );
}

export default App;
