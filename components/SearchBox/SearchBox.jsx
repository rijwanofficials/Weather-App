import React, { useState, useEffect } from "react";
import style from "./SearchBox.module.css";

function SearchBox({ onEnter }) {
    const [input, setInput] = useState("");
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=23f0bdbaedcbde03b31f4b51a806065a`)
                        .then((res) => res.json())
                        .then((data) => {
                            if (data[0]?.name) {
                                const city = data[0].name;
                                setInput(city);
                                onEnter(city); // 👈 Automatically call parent handler
                            }
                        })
                        .catch((err) => {
                            console.error("Reverse geocoding error:", err.message);
                        });
                },
                (error) => {
                    console.error("Geolocation error:", error.message);
                }
            );
        }
    }, []); // Empty dependency array = run once on mount
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onEnter(input);
        }
    };
    return (
        <div className={style.SearchBox}>
            <input
                type="text"
                placeholder="Enter City..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}

export default SearchBox;
