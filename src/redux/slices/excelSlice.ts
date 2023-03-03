import uuid from 'react-uuid';
import { RootState } from './index';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { all, takeLatest, put, select, debounce, throttle } from 'redux-saga/effects';
import {
  SET_COL,
  SET_ROW,
  SET_COL_NAME,
  SET_CELL_NAME,
  SET_CELL_NAME_COMPLETE
} from '../constant'

export type IColsType = {
  id: string,
  title: string,
}

export type IRowsType = {
  id: string,
  title: string,
  cells: Array<{
    id: string,
    title: string,
  }>
}


type IDataState = {
  cols: IColsType[]
  rows: IRowsType[]
}

const initialState: IDataState = {
  cols: [
    {
      id: uuid(),
      title: 'Name',
    },
  ],
  rows: [
    {
      id: uuid(),
      title: 'first row',
      cells: [
        {
          id: uuid(),
          title: 'Stanislav',
        },
      ],
    },
  ],
}

export const excelSlice = createSlice({
  name: "exelSlice",
  initialState,
  reducers: {
    addCol(state = initialState, action) {
      state.rows.map((item) => {
        console.log("state.rows.forEach:", current(item))
        return item.cells.push(
          {
            id: uuid(),
            title: ''
          }
        )
      })
      state.cols.push({
        id: action.payload.id,
        title: ''
      })
      return state
    },
    addRow(state = initialState, action) {
      const cellsForNewRow: { id: string; title: string; }[] = []
      Array.from(Array(action.payload.cols).keys()).forEach(() => {
        return cellsForNewRow.push({
          id: uuid(),
          title: '',
        })
      })

      state.rows.push({
        id: action.payload.id,
        title: '',
        cells: cellsForNewRow
      })
      return state
    },
    setColTitle(state = initialState, action: PayloadAction<IColsType>) {
      const item = state.cols.find(item => item.id === action.payload.id)
      if (item) {
        item.title = action.payload.title
      }
      return state
    },
    setCellTitle(state = initialState, action: PayloadAction<IColsType>) {
      state.rows.forEach((item) => {
        const cell = item.cells.find(item => item.id === action.payload.id)
        if (cell) {
          cell.title = action.payload.title
        }
        return state
      })
    }
  }
})

export const excelSliceAction = {
  addCol: (payload: { id: string }): { type: typeof SET_COL, payload: { id: string } } => {
    return {
      type: SET_COL,
      payload
    }
  },
  addRow: (payload: { id: string }): { type: typeof SET_ROW, payload: { id: string } } => {
    return {
      type: SET_ROW,
      payload
    }
  },
  setColTitle: (payload: { title: string, id: string }): { type: typeof SET_COL_NAME, payload: { title: string, id: string } } => {
    return {
      type: SET_COL_NAME,
      payload
    }
  },
  setCellTitle: (payload: { title: string, id: string }): { type: typeof SET_CELL_NAME, payload: { title: string, id: string } } => {
    return {
      type: SET_CELL_NAME,
      payload
    }
  },
}

export function* exelSaga() {
  yield all([
    takeLatest(SET_COL, setCol),
    takeLatest(SET_ROW, setRow),
    takeLatest(SET_COL_NAME, setColTitle),
    debounce(500, SET_CELL_NAME, setCellTitle),
  ])
}

export function* setCol(action: { type: string, payload: { id: string } }) {
  const rows: number = yield select((state: RootState) => state.exelSlice.rows.length)
  yield put(excelSlice.actions.addCol({ ...action.payload, rows }))
}
export function* setRow(action: { type: string, payload: { id: string } }) {
  const cols: number = yield select((state: RootState) => state.exelSlice.cols.length)
  yield put(excelSlice.actions.addRow({ ...action.payload, cols }))
}
export function* setColTitle(action: { type: string, payload: { title: string, id: string } }) {
  yield put(excelSlice.actions.setColTitle({ title: action.payload.title, id: action.payload.id }))
}

export function* setCellTitle(action: { type: string, payload: { title: string, id: string } }) {
  yield put(excelSlice.actions.setCellTitle({ title: action.payload.title, id: action.payload.id }));
}

export default excelSlice