import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import styled from 'styled-components';
import { RootState } from "@src/redux/store";
import { useSelector } from 'react-redux';

import { createDataSet } from '../../helpers/utils';

import './index.scss';

const ChartComponent = (props: any) => {
    const {chartData, chartVisible} = useSelector((state: RootState) => state.chart);
    const [newChartData, setNewChartData] = useState<any>({});
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        setNewChartData(createDataSet(chartData));
    }, [chartData, chartVisible])

    const canvasCallback = (canvas: HTMLCanvasElement | null) => {
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            if (chartRef.current)
                chartRef.current.destroy();
            chartRef.current = new Chart(ctx, {
                type: "line",
                data: newChartData,
                options: { responsive: true }
            })
        }
      };

    return (
        <ChartContainer style={{ visibility: chartVisible ? "visible" : "hidden" }}>
            <canvas id="priceChart" ref={canvasCallback}></canvas>
        </ChartContainer>        
    )
}

const ChartContainer = styled.div`
    // margin-top: 15%;
    width: 100%;
    height: 500px;
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0 0 25px 4px rgba(0, 0, 0, 0.1);
`;
 
export default ChartComponent