import "./App.css";
import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import Map from "./components/Map";
// import Popup from "./components/Popup";
import Modal from 'react-modal';
import Text from './components/Text';

function App() {
    /* ---------------------------- LOCAL STORAGE --------------------------- */
    const [countriesData, setCountriesData] = useState([]);
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
    const [content, setContent] = useState("");

    return (
        <div className="App">
            <Map
                setTooltipContent={setContent}
                countriesData={countriesData}
                openPopup={() => setModalIsOpen(true)}
            />
            <ReactTooltip>{content}</ReactTooltip>
            
            <Modal isOpen={modalIsOpen}>
                <button onClick={() => setModalIsOpen(false)}>x</button>
                <Text/>
            </Modal>
        </div>
    );
}

export default App