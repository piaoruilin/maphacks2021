import "./App.css";
import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { randomColor } from "randomcolor";
import Map from "./components/Map";
import Modal from "react-modal";
import Form from "./components/Form";
import { ReactComponent as Header } from './components/images/CHROMA LD.svg';

function App() {
    /* ---------------------------- LOCAL STORAGE --------------------------- */
    // only stores visited countries' data
    const [countriesData, setCountriesData] = useState([]);

    // saving country data to local storage
    useEffect(() => {
        const json = JSON.stringify(countriesData);
        localStorage.setItem("countriesData", json);
    }, [countriesData]);

    // loading country data from local storage
    useEffect(() => {
        const json = localStorage.getItem("countriesData");
        const saved = JSON.parse(json);
        if (saved) {
            setCountriesData(saved);
        }
    }, []);

    // add a country to local storage
    function addCountry(newCountry) {
        // find for country in user's local storage
        const foundCountry = countriesData.filter(
            (x) => x.rsmKey === newCountry.rsmKey
        )[0];
        if (foundCountry) {
            // Update Country
            
        } else {
            // Add new country
            newCountry.colour = randomColor({ luminosity: "light" });
            setCountriesData([...countriesData, newCountry]);
            resetCurrentCountry();
        }
    }

    // update a country that already exists in loacl storage
    function updateCountry() {

    }

    function resetCurrentCountry() {
        setCurrentCountry({
            rsmKey: "",
            name: "",
            colour: "",
            startDate: null,
            endDate: null,
            photoUrl: "",
            memory: [],
            food: [],
            souvenir: [],
        })
    }

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tooltipContent, setTooltipContent] = useState("");
    const [currentCountry, setCurrentCountry] = useState({
        rsmKey: "",
        name: "",
        colour: "",
        startDate: null,
        endDate: null,
        photoUrl: "",
        memory: [],
        food: [],
        souvenir: [],
    });

    return (
        <div className="App">
            <Header viewbox="0 0 100 100" height="100%" width="100%">
                <rect x="0" y="0" width="100%" height="100%" />
                </Header>
            <Map
                setTooltipContent={setTooltipContent}
                countriesData={countriesData}
                setCountriesData={setCountriesData}
                openPopup={() => setModalIsOpen(true)}
                currentCountry={currentCountry}
                setCurrentCountry={setCurrentCountry}
                resetCurrentCountry={resetCurrentCountry}
            />
            <ReactTooltip>{tooltipContent}</ReactTooltip>

            <Modal
                isOpen={modalIsOpen}
                ariaHideApp={false}
                style={{
                    overlay: {},
                    content: {
                        width: "60vw",
                        height: "60vh",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    },
                }}
            >
                <button onClick={() => setModalIsOpen(false)}>x</button>
                <Form
                    currentCountry={currentCountry}
                    countriesData={countriesData}
                    setCurrentCountry={setCurrentCountry}
                    addCountry={addCountry}
                    closePopup={() => setModalIsOpen(false)}
                />
            </Modal>
        </div>
    );
}

export default App;