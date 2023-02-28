import "./Excel.scss";
import Row from "./Row";
import Col from "./Col";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { excelSliceAction } from "../../redux/slices/excelSlice";

interface IExelProps {}

const Excel: React.FunctionComponent<IExelProps> = (props) => {
  // const dispatch = useAppDispatch();
  const colArray = useAppSelector((state) => state.exelSlice.cols);
  const rowsArray = useAppSelector((state) => state.exelSlice.rows);
  // const cellsArray = useAppSelector((state) => state.exelSlice.cells);

  // console.log("colArray:", colArray);
  // console.log("rowsArray:", rowsArray);
  // console.log("cellsArray:", cellsArray);

  return (
    <Container className="p-0 pt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            {colArray.map((col, index) => (
              <Col key={index} col={col} index={index} />
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

  // return (
  //   <Container className="p-0 pt-5">
  //     <Table striped bordered hover>
  //       <thead>
  //         <tr>
  //           <th>#</th>
  //           {colArray.map((col, index) => (
  //             <Col key={index} col={col} />
  //           ))}
  //         </tr>
  //       </thead>
  //       <tbody>
  // {rowsArray.map((row, index) => (
  //   <Row key={index} row={row} index={index} />
  // ))}
  //         {cellsArray.map((cell, index) => (
  //         <Cell key={index} cell={cell} />
  //       ))}
  //       </tbody>
  //     </Table>
  //   </Container>
  // );
};

export { Excel };
