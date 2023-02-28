import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { all, takeLatest, put, select } from 'redux-saga/effects';
import { SET_COL, SET_ROW, SET_CELL, SET_COL_NAME, SET_CELL_NAME } from '../constant'
import Cell from '../../components/Excel/Cell';

export type IColsType = {
  id: number,
  title: string,
}

export type IRowsType = {
  id: number,
  title: string,
  cells: Array<{
    id: number,
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
      id: 1,
      title: 'Name',
    },
  ],
  rows: [
    {
      id: 1,
      title: 'first row',
      cells: [
        {
          id: 1,
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
      console.log("addColAction:", action)
      // Array.from(Array(action.payload).keys()).forEach(() => {})
      state.rows.forEach((item) => {
        console.log("forEach:", current(item))
        return item.cells.push({
          id: action.payload.id,
          title: ''
        })
      })
      state.cols.push({
        id: action.payload.id,
        title: ''
      })
      return state
    },
    addRow(state = initialState, action) {
      console.log("addRowAction:", action)
      const cellsForNewRow: { id: any; title: string; }[] = []
      Array.from(Array(action.payload.cols).keys()).forEach(() => {
        return cellsForNewRow.push({
          id: action.payload.cols++ + 1,
          title: 'Stanislav',
        })
      })

      console.log("cellsToRow:", cellsForNewRow)
      state.rows.push({
        id: action.payload.id,
        title: '',
        cells: cellsForNewRow
      })
      return state
    },
    addCell(state = initialState, action) {
      // state.cells.push({
      //   id: Date.now(),
      //   title: ''
      // })
      // return state
    },
    setColTitle(state = initialState, action: PayloadAction<IColsType>) {
      console.log("setColTitleAction:", action)
      const item = state.cols.find(item => item.id === action.payload.id)
      if (item) {
        item.title = action.payload.title
      }
      return state
    },
    setCellTitle(state = initialState, action: PayloadAction<IColsType>) {
      // const item = state.cells.find(item => item.id === action.payload.id)
      state.rows.forEach((item) => {
        // console.log("forEach:", current(item))
        const cell = item.cells.find(item => item.id === action.payload.id)
        if (cell) {
          cell.title = action.payload.title
        }
        return state
        // console.log(current(state));
      })
      // if (item) {
      //   item.title = action.payload.title
      // }
      // return state
    }
  }
})

export const excelSliceAction = {
  addCol: (payload: { id: number }): { type: typeof SET_COL, payload: { id: number } } => {
    return {
      type: SET_COL,
      payload
    }
  },
  addRow: (payload: { id: number }): { type: typeof SET_COL, payload: { id: number } } => {
    return {
      type: SET_ROW,
      payload
    }
  },
  addCell: (): { type: typeof SET_CELL } => {
    return {
      type: SET_CELL,
    }
  },
  setColTitle: (payload: { title: string, id: number }): { type: typeof SET_COL_NAME, payload: { title: string, id: number } } => {
    return {
      type: SET_COL_NAME,
      payload
    }
  },
  setCellTitle: (payload: { title: string, id: number }): { type: typeof SET_CELL_NAME, payload: { title: string, id: number } } => {
    return {
      type: SET_CELL_NAME,
      payload
    }
  }
}

export function* exelSaga() {
  yield all([
    takeLatest(SET_COL, setCol),
    takeLatest(SET_ROW, setRow),
    takeLatest(SET_CELL, setCell),
    takeLatest(SET_COL_NAME, setColTitle),
    takeLatest(SET_CELL_NAME, setCellTitle)
  ])
}

export function* setCol(action: { type: string, payload: { id: number } }) {
  const rows: number = yield select((state) => state.exelSlice.rows.length)
  // console.log("cols:", cols)
  yield put(excelSlice.actions.addCol({ ...action.payload, rows }))
}
export function* setRow(action: { type: string, payload: { id: number } }) {
  const cols: number = yield select((state) => state.exelSlice.cols.length)
  yield put(excelSlice.actions.addRow({ ...action.payload, cols }))
  // console.log("rows:", rows)
  // yield put(excelSlice.actions.addRow(action))
  // yield put(excelSlice.actions.addCell(action))
}
export function* setCell(action: { type: string }) {
  // yield put(excelSlice.actions.addCell(action))
}
export function* setColTitle(action: { type: string, payload: { title: string, id: number } }) {
  yield put(excelSlice.actions.setColTitle({ title: action.payload.title, id: action.payload.id }))
}

export function* setCellTitle(action: { type: string, payload: { title: string, id: number } }) {
  yield put(excelSlice.actions.setCellTitle({ title: action.payload.title, id: action.payload.id }))
}

export default excelSlice