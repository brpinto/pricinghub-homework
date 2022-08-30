import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import DatePicker, { registerLocale } from "react-datepicker";
import { useForm } from "react-hook-form";
import axios from 'axios';
import moment from "moment";
import { createDataSet, flattenObject } from "../../helpers/utils";

import fr from "date-fns/locale/fr";

import "react-datepicker/dist/react-datepicker.css";
import "./index.scss";

import { ReactComponent as ToggleDownArrow } from "../../assets/svg/arrow-down.svg";
import { updateChartData, updateChartVisibility, updateFormVisibility } from "../../redux/chartReducer";
import { RootState } from "@src/redux/store";

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

const GraphForm = () => {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [competitorsCount, setCompetitorsCount] = useState<number>(0);
    const [showCompetitorsList, setShowCompetitorsList] = useState<boolean>(false);
    const {formVisible} = useSelector((state: RootState) => state.chart);

    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    
    const competitorsArray = [
        "1001pneus.fr",
        "auto.leclerc",
        "avatacar.com",
        "bonspneus.fr",
        "centralepneus.fr",
        "coteroute.fr",
        "discount-pneus.com",
        "euromaster.fr",
        "feuvert.fr",
        "firststop.fr",
        "mister-auto.com",
        "monauto.carrefour.fr",
        "norauto.fr",
        "pneus-online.fr",
        "profilplus.fr",
        "tirendo.fr",
        "toopneus.com",
        "vulco.com",
        "123pneus.fr",
        "cdiscount.com",
        "1001neumaticos.es",
        "bandenleader.nl",
        "centralepneus.be",
        "neumaticoslider.es",
        "oponeo.nl",
        "MY_DEAR_CUSTOMER.co"
    ]
    
    const today = new Date();

    registerLocale("fr-FR", fr);

    const updateChart = (data: any) => {
        dispatch(updateChartData(data));
    }

    const setChartVisibility = (data: boolean) => {
        dispatch(updateChartVisibility(data));
    }

    const setFormVisibility = (data: boolean) => {
        dispatch(updateFormVisibility(data));
    }

    const handleCompetitorsNumber = ():string => {
        return competitorsCount > 1 ? 
            competitorsCount + " concurrents choisis"
            : competitorsCount + " concurrent choisi";
    }

    const handleListShow = () => {
        setChartVisibility(false);
        setShowCompetitorsList(!showCompetitorsList);
    }

    useEffect(() => {
        
    }, [formVisible])

    const onSubmit = (data: any) => {
        const flattened = flattenObject(data);
        const formatedStartDate = moment(startDate).format('YYYY-M-D');
        const formatedEndDate = moment(endDate).format('YYYY-M-D');

        let formData: any = {};
        (Object.entries(flattened)).map((val:any, key: number) => {
            if (val[1])
                formData[val[0]] = val[1];
        });

        axios.post('/chart', {
            competitors: formData,
            date: [formatedStartDate, formatedEndDate]
        })
            .then((res) => {
                updateChart(res.data);
            })
            .catch(error => {
                console.log(error);
            })
        setFormVisibility(false);
        setShowCompetitorsList(false);
        setChartVisibility(true);
    }

    return (
        <FormContainer style={{ display: formVisible ? "flex" : "none"}}>
            <FormContent>
            <DatePickerContainer>
                <DatePickerInput>
                    <Label>Début</Label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date: Date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        showPopperArrow={false}
                        maxDate={endDate}
                        dateFormat='dd/MM/yyyy'
                        locale='fr-FR'
                        className="custom-date-input"
                        calendarClassName="custom-calendar"
                    />
                </DatePickerInput>
                <DatePickerInput>
                    <Label>Fin</Label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date: Date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        maxDate={today}
                        dateFormat='dd/MM/yyyy'
                        locale='fr-FR'
                        showPopperArrow={false}
                        className="custom-date-input"
                        calendarClassName="custom-calendar"
                    />
                </DatePickerInput>
            </DatePickerContainer>
            <CompetitorListContainer>
                <CompetitorListHeader>
                    <CompetitorDetails>
                        <Label style={{ marginBottom: "10px" }}>Concurrents</Label>
                        {handleCompetitorsNumber()}
                    </CompetitorDetails>
                    <ToggleButton>
                        <ToggleDownArrow id="arrow-down-button" onClick={handleListShow}/>
                    </ToggleButton>
                </CompetitorListHeader>
                <CompetitorsChoiceList className={showCompetitorsList ? "list-visible" : "list-hidden"}>
                    <form id='competitors-form' onSubmit={handleSubmit(onSubmit)}>
                        {competitorsArray.map((competitor: string, id: number) => {
                                return (
                                    <label key={id}>
                                        <input
                                            {...register(competitor)}
                                            name={competitor}
                                            type="checkbox"
                                            // value={competitorName}
                                            onChange={(e) => {
                                                if (e.target.checked)
                                                    setCompetitorsCount(competitorsCount + 1);
                                                else
                                                    setCompetitorsCount(competitorsCount - 1);
                                            }} />
                                        {competitor}
                                    </label>
                                )
                            })
                        }
                        <button id="hidden-submit-button"style={{visibility: "hidden"}} type="submit">submit</button>
                    </form>
                </CompetitorsChoiceList>
            </CompetitorListContainer>
            </FormContent>
            <FakeSubmit onClick={() => {
                const buttonToTrigger = document.getElementById("hidden-submit-button");
                buttonToTrigger?.click();
            }}>Valider</FakeSubmit>
        </FormContainer>
    )
}

const FormContainer = styled.section`
    flex-direction: column;
    align-items: center;
    height: auto;
    width: 600px;
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0 0 25px 4px rgba(0, 0, 0, 0.1);
    position: relative;
`;

const FormContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const DatePickerContainer = styled.section`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
    border-bottom: 1px solid #606060;
`;

const DatePickerInput = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    height: calc(100% - 20px);
    padding: 10px 0 10px 20px;

    &:nth-child(2) {
        border-left: 1px solid #606060;
    }
`;

const CompetitorListContainer = styled.section`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 10px 0 15px 20px;
`;

const CompetitorListHeader = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
`;

const CompetitorDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    height: 100%;
`;

const ToggleButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    flex: 1;
    padding-right: 8%;
`;

const CompetitorsChoiceList = styled.div`
    overflow-y: scroll;
    scrollbar-color: #757575 transparent;
    transition: height 0.5s;
    width: 100%;
    background-color: transparent;

    margin-top: 2%;
    position: relative;
    left: -4px;
`;

const FakeSubmit = styled.button`
    position: absolute;
    top: 110%;
    width: 100%;
    border: none;
    background-color: #f675a8;
    color: #ffffff;
    font-weight: 700;
    font-family: 'Roboto', 'Segoe UI', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    font-size: 1.2em;
    padding: 10px 0;
    border-radius: 10px;

    &:hover {
        cursor: pointer;
    }
`;

const Label = styled.p`
    margin: 0;
    font-weight: 500;
    font-size: 1.1em;
`;

export default GraphForm