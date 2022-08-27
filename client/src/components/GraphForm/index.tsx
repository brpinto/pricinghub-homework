import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DatePicker, { registerLocale } from "react-datepicker";
import { useForm } from "react-hook-form";

import fr from "date-fns/locale/fr";

import "react-datepicker/dist/react-datepicker.css";
import "./index.scss";

import { ReactComponent as ToggleDownArrow } from "../../assets/svg/arrow-down.svg";

const GraphForm = () => {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [competitorsCount, setCompetitorsCount] = useState<number>(0);
    const [showCompetitorsList, setShowCompetitorsList] = useState<boolean>(false);
    const { register, handleSubmit } = useForm();
    const competitorsArray: string[] = [
        '1001pneus.fr',
        'auto.leclerc',
        'avatacar.com',
        'bonspneus.fr',
        'centralepneus.fr',
        'coteroute.fr',
        'discount-pneus.com',
        'euromaster.fr',
        'feuvert.fr',
        'firststop.fr',
        'mister-auto.com',
        'monauto.carrefour.fr',
        'norauto.fr',
        'pneus-online.fr',
        'profilplus.fr',
        'tirendo.fr',
        'toopneus.com',
        'vulco.com',
        '123pneus.fr',
        'cdiscount.com',
        '1001neumaticos.es',
        'bandenleader.nl',
        'centralepneus.be',
        'neumaticoslider.es',
        'oponeo.nl',
        'MY_DEAR_CUSTOMER.com'
    ]
    
    const today = new Date();

    registerLocale("fr-FR", fr);

    const handleCompetitorsNumber = ():string => {
        return competitorsCount > 1 ? 
            competitorsCount + " concurrents choisis"
            : competitorsCount + " concurrent choisi";
    }

    const handleListShow = () => {
        setShowCompetitorsList(!showCompetitorsList);
    }

    const onSubmit = (data: any) => {
        console.log(JSON.stringify(data));
    };

    return (
        <FormContainer>
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
                    {competitorsArray.map((value: string, id: number) => {
                            return (
                                <label key={id}>
                                    <input
                                        {...register(value)}
                                        name={value}
                                        type="checkbox"
                                        value={value}
                                        onChange={(e) => {
                                            if (e.target.checked)
                                                setCompetitorsCount(competitorsCount + 1);
                                            else
                                                setCompetitorsCount(competitorsCount - 1);
                                        }} />{' '}
                                    {value}
                                </label>
                            )
                        })
                    }
                </CompetitorsChoiceList>
            </CompetitorListContainer>
        </FormContainer>
    )
}

const FormContainer = styled.section`
    display: flex;
    flex-direction: column;
    height: auto;
    width: 600px;
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0 0 25px 4px rgba(0, 0, 0, 0.1);
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

const CompetitorListContainer = styled.form`
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
    overflow: hidden;
    transition: height 0.5s;
    width: 100%;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    margin-top: 2%;
    position: relative;
    left: -4px;
`;

const Label = styled.p`
    margin: 0;
    font-weight: 500;
    font-size: 1.1em;
`;

export default GraphForm