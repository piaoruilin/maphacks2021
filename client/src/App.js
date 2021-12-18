import "./App.css";
import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import Map from "./components/Map";
import Modal from 'react-modal';
import Form from './components/Form';

function App() {
    /* ---------------------------- LOCAL STORAGE --------------------------- */
    const [countriesData, setCountriesData] = useState([{
        rsmKey: "geo-135",
        colour: "#ff6262",
        startDate: "",
        endDate: "",
        photoUrl: "",
        memory: ["","",""],
        food: [""],
        souvenir: [""]
    }]);

    // saving country data to local storage
    useEffect (() => {
        const json = JSON.stringify(countriesData);
        localStorage.setItem("countriesData", json);
    }, [countriesData])

    // loading country data from local storage
    useEffect(() => {
        const json = localStorage.getItem("countriesData");
        const saved = JSON.parse(json);
        if (saved) {
            setCountriesData(saved);
        }
    }, [])

    const [modalIsOpen,setModalIsOpen] = useState(false);
    const [currentCountry, setCurrentCountry] = useState("");

    return (
        <div className="App">
            <Map
                setTooltipContent={setCurrentCountry}
                countriesData={countriesData}
                openPopup={() => setModalIsOpen(true)}
            />
            <ReactTooltip>{currentCountry}</ReactTooltip>
            
            <Modal isOpen={modalIsOpen}>
                <button onClick={() => setModalIsOpen(false)}>x</button>
                <Form />
            </Modal>
            
        </div>
    );
}

export default App;
