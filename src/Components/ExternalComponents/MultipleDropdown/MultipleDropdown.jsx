import { Select, MenuItem, InputLabel, FormControl, Checkbox, ListItemText } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { errorToast } from '../toast/toast';

function MultipleDropdown() {
    const [selectedValues, setSelectedValues] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetchTags();
      }, []);
    
      const fetchTags = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/tags", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          });
          setTags(response.data.Tag);
        } catch (error) {
          errorToast(error.message);
        }
      };


    const handleChange = (event) => {
        setSelectedValues(event.target.value);
    };

    return (
        <FormControl className='w-[200px]'>
            <InputLabel id="multiple-select-label">Tags</InputLabel>
            <Select
                labelId="multiple-select-label"
                multiple
                className='h-10'
                value={selectedValues}
                onChange={handleChange}
                renderValue={(selected) => selected.map(name => tags.find(item => item.name === name)?.name).join(', ')}
            >
                {tags.map((item) => (
                    <MenuItem key={item.value} value={item.name}>
                        <Checkbox checked={selectedValues.indexOf(item.name) > -1} />
                        <ListItemText primary={item.name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default MultipleDropdown;
