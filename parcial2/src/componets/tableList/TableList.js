import React, { useEffect, useState, useContext } from "react";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import { Table } from "react-bootstrap";
import Graph from "../graph/Graph"
export default function TableList() {
  const [data, setData] = useState([]);
  let url =
    "https://gist.githubusercontent.com/jhonatan89/e379fadf8ed0f5381a2d8f8f3dea90c3/raw/e2bc20df02828d297f99558551e37959ac97a6f8/pokemon-es.json";

  if (navigator.language.startsWith("en")) {
    url =
      "https://gist.githubusercontent.com/jhonatan89/2089276d3ce0faceff8e55fc3459b818/raw/30ee1a77b3e328108faaaa9aaac6f2ddaa3d3711/pokemons-en.json";
  }
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        // Obtenemos los datos
        setData(response.data);
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  }, [url]);

  return (
    <main className="p-5">
      <h1><FormattedMessage id = "TableTitle"/></h1>
      <Table responsive>
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">
              <FormattedMessage id="Image" />
            </th>
            <th scope="col">
              <FormattedMessage id="Name" />
            </th>
            <th scope="col">
              <FormattedMessage id="Description" />
            </th>
            <th scope="col">
              <FormattedMessage id="Height" />
            </th>
            <th scope="col">
              <FormattedMessage id="Weight" />
            </th>
            <th scope="col">
              <FormattedMessage id="Type" />
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => (
            <tr>
              <th>{e.id}</th>
              <td>
                <img
                  src={e.ThumbnailImage}
                  alt="imagenPokemon"
                  width="100px"
                ></img>
              </td>
              <td>{e.name}</td>
              <td>{e.description}</td>
              <td>{e.height}</td>
              <td>{e.weight}</td>
              <td>
                {e.type.map((d) => (
                  <span class="badge badge-secondary">{d}</span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Graph data={data}/>
    </main>
  );
}
