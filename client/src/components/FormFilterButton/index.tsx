import React from 'react';
import { RootState } from "@src/redux/store";
import { useSelector, useDispatch } from 'react-redux';

import styled from "styled-components";
import { ReactComponent as Filter } from "../../assets/svg/filter.svg";

import { updateChartData, updateChartVisibility, updateFormVisibility } from "../../redux/chartReducer";

const FormFilterButton = () => {
    const {formVisible, chartVisible} = useSelector((state: RootState) => state.chart);

    const dispatch = useDispatch();

    const setFormVisibility = (data: boolean) => {
        dispatch(updateFormVisibility(data));
    }

    const setChartVisibility = (data: boolean) => {
        dispatch(updateChartVisibility(data));
    }

    const handleVisible = () => {
        setFormVisibility(true);
        setChartVisibility(false);
    }

    return (
        <FormButton onClick={() => handleVisible()}>
            <Filter />
        </FormButton>
    );
}

const FormButton = styled.button`
  border: 1px solid #f675a8;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 0 25px 1px rgba(0, 0, 0, 0.1);

  &:hover {
    cursor: pointer;
  }
`;

export default FormFilterButton;
