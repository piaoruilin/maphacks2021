import React, { memo } from "react";
import "../App.css";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography,
} from "react-simple-maps";

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

function Map({
    setTooltipContent,
    countriesData,
    openPopup,
    currentCountry,
    setCurrentCountry,
    resetCurrentCountry
}) {
    return (
        <div>
            <ComposableMap
                data-tip=""
                projectionConfig={{ scale: 200 }}
                className="map"
            >
                <ZoomableGroup
                    translateExtent={[
                        [-250, -100],
                        [1000, 750],
                    ]}
                    zoom={1}
                >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                let colour = "#F2F2F2";

                                // find for country in user's local storage
                                const foundCountry = countriesData.filter(
                                    (x) => x.rsmKey === geo.rsmKey
                                )[0];
                                
                                if (foundCountry) {
                                    colour = foundCountry.colour;
                                }

                                return (
                                    <Geography
                                        className="geography"
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onMouseEnter={() => {
                                            const { NAME } = geo.properties;
                                            setTooltipContent(`${NAME}`);
                                        }}
                                        onMouseLeave={() => {
                                            setTooltipContent("");
                                        }}
                                        onClick={() => {
                                            openPopup();
                                            // find for country in user's local storage
                                            const foundCountry = countriesData.filter(
                                                (x) => x.rsmKey === geo.rsmKey
                                            )[0];
                                            if (foundCountry) {
                                                resetCurrentCountry();
                                                currentCountry = foundCountry
                                                setCurrentCountry(currentCountry);
                                            } else {
                                                const { NAME } = geo.properties;
                                                resetCurrentCountry();
                                                currentCountry.name = NAME;
                                                currentCountry.rsmKey = geo.rsmKey;
                                                setCurrentCountry(currentCountry);
                                            }
                                        }}
                                        style={{
                                            default: {
                                                fill: colour,
                                                outline: "none",
                                                stroke: "black",
                                            },
                                            hover: {
                                                fill: colour,
                                                outline: "none",
                                                stroke: "black",
                                                cursor: "pointer",
                                                filter: "brightness(.8)",
                                            },
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
}

export default memo(Map);
