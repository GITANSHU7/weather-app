import SearchIcon from '@mui/icons-material/Search';
import { Box, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useWeatherContext, WeatherProvider } from "./WeatherContext";
import WeatherWidget from "./WeatherWidget";

interface WidgetState {
  id: string;
  location: string;
}

const Dashboard: React.FC = () => {
  const [widgets, setWidgets] = useState<WidgetState[]>([]);
  const [searchLocation, setSearchLocation] = useState<string>("");
  const { toggleUnit, unit } = useWeatherContext();
  

useEffect(() => {
    const savedWidgets = localStorage.getItem("widgets");

    if (savedWidgets) {
      setWidgets(JSON.parse(savedWidgets));
    } else {
    
      setWidgets([{ id: Date.now().toString(), location: "New York" }]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("widgets", JSON.stringify(widgets));
  }, [widgets]);

  
  const addWidget = () => {
    if (searchLocation.trim() !== "") {
      setWidgets([
        ...widgets,
        { id: Date.now().toString(), location: searchLocation },
      ]);
      setSearchLocation(""); 
    } else {
      alert("Please enter a location.");
    }
  };

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter((widget) => widget.id !== id));
  };

  console.log(unit);

  return (
    <WeatherProvider>
        <Box sx={{ display: 'flex', paddingTop : 2, 
            justifyContent: "center",
            alignItems: "center",}}>
        <TextField
          label="Enter Your location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          InputProps={{
            endAdornment: (
                <SearchIcon onClick={addWidget} className="cursor-pointer hover:text-emerald-700"/>
        
            ),
          }}
          sx={{ width: 300 }}
        />
        </Box>
      <Box>


        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {widgets.map((widget) => (
            <Grid item key={widget.id}>
              <WeatherWidget

            onToggleUnit={toggleUnit}
                location={widget.location}
                
                onRemove={() => removeWidget(widget.id)}
              />
            </Grid>
          ))}

        </Grid>
      </Box>
    </WeatherProvider>
  );
};

export default Dashboard;
