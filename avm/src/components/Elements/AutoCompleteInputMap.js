import React from 'react';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import "../../components/styles/FormStyles.css";

const googleKey = process.env.REACT_APP_GOOGLE_API_KEY_VAL;

export function AutoCompleteInputMap(props) {
    const { setCoordinates, setCommuneSearch, setValues, handleClearError } = props;
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        debounce: 300,
    });
    const ref = useOnclickOutside(() => {
        clearSuggestions();
    });
    const handleInput = (e) => {
        setValue(e.target.value);
    };
    const handleSelect =
         ({ description }) =>
              () => {
                // When the user selects a place, we can replace the keyword without request data from API
                // by setting the second parameter to "false"
                // add cases when address is a null
                setValue(description, false);
                clearSuggestions();
                setValues("addressMap", description);
                const arrayLocation = description.split(',');
                const arrayLocationReverse = arrayLocation.reverse();
                setCommuneSearch(arrayLocationReverse[1]);
                // Get latitude and longitude via utility functions
                getGeocode({ address: description }).then((results) => {
                    const { lat, lng } = getLatLng(results[0]);
                    setValues('latitude', lat);
                    setValues('longitude', lng);
                    setCoordinates({lat, lng});
                });
              };
    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <li
                    key={place_id}
                    onClick={handleSelect(suggestion)}
                >
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                    <hr style={{ margin: '0.5rem 0' }} />
                </li>
            );
        });

    return(
        <div>
            <input
                className="input-form-table"
                value={value}
                onChange={handleInput}
                onClick={() => { handleClearError() }}
                disabled={!ready}
                placeholder="Dirección"
            />
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === "OK" && <ul
                    style={{
                        border: '1px solid ',
                        borderRadius: '16px',
                        backgroundColor: '#ffffff',
                        listStyle: 'none',
                        position: 'absolute',
                        float: 'left',
                        boxSizing: 'content-box',
                        zIndex: '2'
                    }}
                >{renderSuggestions()}</ul>}
        </div>
    )
}