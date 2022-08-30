import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ChartState {
  chartData: any,
  chartVisible: boolean,
  formVisible: boolean
}

const initialState: ChartState = {
  chartData: null,
  chartVisible: false,
  formVisible: true
}

export const chartSlice = createSlice({
    name: 'chart',
    initialState,
    reducers: {
        updateFormVisibility: (state, action: PayloadAction<any>) => {
          state.formVisible = action.payload
        },
        updateChartVisibility: (state, action: PayloadAction<any>) => {
          state.chartVisible = action.payload
        },
        updateChartData: (state, action: PayloadAction<any>) => {
            state.chartData = action.payload
        }
    },
})

export const { updateFormVisibility, updateChartData, updateChartVisibility } = chartSlice.actions

export default chartSlice.reducer