import * as React from "react";
import { Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { excelSliceAction, IRowsType } from "../../redux/slices/excelSlice";

interface ICellProps {
  cell: IRowsType;
}

const Cell: React.FunctionComponent<ICellProps> = ({ cell }) => {
  const dispatch = useAppDispatch();

  // console.log("cell:", cell)

  return (
    <>
      <tr>
        <td>{1}</td>
        <td>
          <Form.Control
            value={cell.title}
            as="textarea"
            className="input__cell_light-gray overflow-auto"
            onChange={(e) => {
              dispatch(
                excelSliceAction.setCellTitle({
                  title: e.target.value,
                  id: cell.id,
                })
              );
            }}
          />
        </td>
      </tr>
    </>
  );
};

export default Cell;
