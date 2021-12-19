import React, { memo } from "react";

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
    setCurrentCountry,
    addCountry
}) {

    return (
        <>
            <ComposableMap data-tip="" projectionConfig={{ scale: 150 }}>
                <ZoomableGroup>
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
                                            const { NAME } = geo.properties;
                                            setCurrentCountry(`${NAME}`);
                                            if (!foundCountry) {
                                                addCountry({rsmKey: geo.rsmKey})
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
        </>
    );
}

export default memo(Map);
