import { Mafs, Coordinates, Plot } from "mafs"
import { math } from "../../../helpers/math";
import "mafs/core.css";
import "mafs/font.css";

const Graphs = ({func}) => {
  
    return (
    <Mafs>
      <Coordinates.Cartesian subdivisions={4} />
      <Plot.OfX y={(x) => func.evaluate({x:x})} />
    </Mafs>
  )
}

export default Graphs;