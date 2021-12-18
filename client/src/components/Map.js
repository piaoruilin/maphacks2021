import React, { memo } from "react";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography,
} from "react-simple-maps";

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

function Map ({ setTooltipContent, countriesData, openPopup }) {
    return (
        <>
            <ComposableMap data-tip="" projectionConfig={{ scale: 100 }}>
                <ZoomableGroup>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
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
                                        let colour = #F2F2F2;
                                        openPopup();
                                        const { NAME } = geo.properties;
                                        console.log(`you clicked on ${NAME} ~ ${geo.rsmKey}`);
                                    }}
                                    style={{
                                        default: {
                                            fill: colour,
                                            outline: "none",
                                            stroke: "black"
                                        },
                                        hover: {
                                            fill: "#a8a8a8",
                                            outline: "none",
                                            stroke: "black",
                                            cursor: "pointer",
                                        },
                                        active: {
                                            fill: "#BCF4DE",
                                            outline: "none",
                                        },
                                    }}
                                />
                            ))
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </>
    );
};

export default memo(Map);
