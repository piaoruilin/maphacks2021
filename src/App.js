import "./App.css";
import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { randomColor } from "randomcolor";
import Map from "./components/Map";
import Modal from "react-modal";
import Form from "./components/Form";
import { ReactComponent as Header } from "./components/images/CHROMA LD.svg";
import { ToastContainer, toast } from 'react-toastify';

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
        const foundCountryIndex = countriesData.findIndex(
            (obj) => obj.rsmKey === newCountry.rsmKey
        );
        if (foundCountryIndex !== -1) {
            // Update Country
            countriesData[foundCountryIndex] = newCountry;
            setCountriesData(countriesData);
        } else {
            // Add new country
            newCountry.colour = randomColor({ luminosity: "light" });
            setCountriesData([...countriesData, newCountry]);
        }
        resetCurrentCountry();
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

    /* --------------------------------- TOASTS --------------------------------- */
    const showErrorToast = () => {
        toast.error("None of the fields are filled!", {
            position: toast.POSITION.TOP_CENTER,
        });
    };

    const showSuccessToast = () => {
        toast(`Successfully saved!`, {
            position: toast.POSITION.TOP_CENTER,
        });
    }

    return (
        <div className="App">
            <ToastContainer autoClose={2500} />
            <Header height="100%" width="100%">
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
                <button
                    onClick={() => {
                        setModalIsOpen(false);
                        resetCurrentCountry();
                    }}
                >
                    x
                </button>
                <Form
                    currentCountry={currentCountry}
                    countriesData={countriesData}
                    setCurrentCountry={setCurrentCountry}
                    addCountry={addCountry}
                    closePopup={() => setModalIsOpen(false)}
                    resetCurrentCountry={resetCurrentCountry}
                    showErrorToast={showErrorToast}
                    showSuccessToast={showSuccessToast}
                />
            </Modal>
        </div>
    );
}

export default App;
