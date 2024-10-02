import { Select, MenuItem, InputLabel, FormControl, Checkbox, ListItemText } from '@mui/material';
import React, { useState } from 'react';

function MultipleDropdown() {
    const [selectedValues, setSelectedValues] = useState([]);

    const myData = [
        { text: 'Books', value: 1 },
        { text: 'Movies, Music & Games', value: 2 },
        { text: 'Electronics & Computers', value: 3 },
        { text: 'Home, Garden & Tools', value: 4 },
        { text: 'Health & Beauty', value: 5 },
        { text: 'Toys, Kids & Baby', value: 6 },
        { text: 'Clothing & Jewelry', value: 7 },
        { text: 'Sports & Outdoors', value: 8 },
        { text: 'Automotive & Industrial', value: 9 }
    ];

    const handleChange = (event) => {
        setSelectedValues(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="multiple-select-label">Categories</InputLabel>
            <Select
                labelId="multiple-select-label"
                multiple
                value={selectedValues}
                onChange={handleChange}
                renderValue={(selected) => selected.map(value => myData.find(item => item.value === value)?.text).join(', ')}
            >
                {myData.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                        <Checkbox checked={selectedValues.indexOf(item.value) > -1} />
                        <ListItemText primary={item.text} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default MultipleDropdown;
