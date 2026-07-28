import './CitySelector.css';

const CitySelector = ({ cities, value, onChange }) => {
    return (
        <select
            className="city-select"
            value={value}
            onChange={(event) => onChange(event.target.value)}
        >
            {cities.map((city) => (
                <option key={city.coordinates} value={city.coordinates}>
                    {city.name}
                </option>
            ))}
        </select>
    );
};

export default CitySelector;
