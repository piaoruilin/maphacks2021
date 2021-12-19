import "./App.css";
import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { randomColor } from "randomcolor";
import Map from "./components/Map";
import Modal from "react-modal";
import Form from "./components/Form";
import { ReactComponent as Header } from './components/images/header-2.svg';

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

    /* ------------------------------- ADD COUNTRY ------------------------------ */
    function addCountry(newCountry) {
        newCountry.colour = randomColor({ luminosity: "light" });
        console.log(countriesData)
        setCountriesData([...countriesData, newCountry]);
        console.log('after: ' + countriesData)
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
        });
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
            <div>
                <Header />
            </div>
            <Map
                setTooltipContent={setTooltipContent}
                countriesData={countriesData}
                setCountriesData={setCountriesData}
                openPopup={() => setModalIsOpen(true)}
                currentCountry={currentCountry}
                setCurrentCountry={setCurrentCountry}
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
