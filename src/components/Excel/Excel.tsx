import "./Excel.scss";
import Row from "./Row";
import Col from "./Col";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import { useAppSelector } from "../../hooks";
import "bootstrap-icons/font/bootstrap-icons.css";

interface IExelProps {}

const Excel: React.FunctionComponent<IExelProps> = (props) => {
  const colArray = useAppSelector((state) => state.exelSlice.cols);
  const rowsArray = useAppSelector((state) => state.exelSlice.rows);

  return (
    <Container className="p-0 pt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            {colArray.map((col) => (
              <Col key={col.id} col={col} />
            ))}
          </tr>
        </thead>
        <tbody>
          {rowsArray.map((row, index) => (
            <Row key={index} row={row} index={index} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export { Excel };
