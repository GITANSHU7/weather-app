import DeleteIcon from "@mui/icons-material/Delete";
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useWeatherContext } from "./WeatherContext";

interface WeatherData {
  tempCelsius: number;
  tempFahrenheit: number;
  condition: string;
  icon: string;
  region: string;
  country: string;
  humidity?: number;
  wind_kph?: number;
  localtime?: string;
  heatindex_f?: number;
  heatindex_c?: number;
}

interface WeatherWidgetProps {
  location: string;
  onRemove: () => void;
  onToggleUnit: () => void;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  location,
  onRemove,
  onToggleUnit,
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const { unit, toggleUnit } = useWeatherContext();

  useEffect(() => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=43582ffeef4f4f51bca145413242809&q=${location}`
      )
      .then((response) => {
        const data = response.data;
        setWeather({
          tempCelsius: data.current.temp_c, 
          tempFahrenheit: data.current.temp_f, 
          condition: data.current.condition.text,
          icon: data.current.condition.icon,
          region: data.location.region,
          country: data.location.country,
          humidity: data.current.humidity,
          wind_kph: data.current.wind_kph,
          localtime: data.location.localtime,
          heatindex_f: data.current.heatindex_f,
          heatindex_c: data.current.heatindex_c,
        });
      });
  }, [location]);

  if (!weather) return <Typography> <ThunderstormIcon /> </Typography>;

  const temperature =
    unit === "Celsius"
      ? `${weather.tempCelsius} °C`
      : `${weather.tempFahrenheit} °F`;

      const heatIndex =
      unit === "Celsius"
        ? `${weather.heatindex_c} °C`
        : `${weather.heatindex_f} °F`;

  console.log(temperature);
  console.log(unit, "unit");
  return (
    <Card
      sx={{
        width: "22rem",
        minWidth: "22rem",
        height: "30rem",
        backgroundColor: "#eedfbf",
        backdropFilter: "blur(10px)",
        borderRadius: "16px",
      }}
    >
      <CardContent>
        
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            marginTop: "48px",
            marginBottom: "16px",
          }}
        >
          <img src={weather.icon} alt="weather_icon" />
          <Typography variant="h3" fontWeight="bold">
            {temperature}
          </Typography>
        </Box>

        <Typography variant="h5" fontWeight="bold" textAlign="center">
          {location}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          <Box
            sx={{
              flex: 1,
              textAlign: "center",
              padding: "8px",
              backgroundColor: "#2196f3",
              borderRadius: "8px",
              boxShadow: 3,
            }}
          >
            <Typography fontWeight="bold">Wind Speed</Typography>
            <Typography>{weather.wind_kph} km/h</Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              textAlign: "center",
              padding: "8px",
              backgroundColor: "#4caf50",
              borderRadius: "8px",
            }}
          >
            <Typography fontWeight="bold">Humidity</Typography>
            <Typography>{weather.humidity} gm/m&#179;</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "16px",
          }}
        >
          <Typography fontWeight="bold" variant="h6">
            Heat Index
          </Typography>
          <Typography>{heatIndex}</Typography>
        </Box>

        <Divider sx={{ backgroundColor: "#37474f", marginY: "16px" }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            {weather.condition}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          <Box
            sx={{
              flex: 1,
              textAlign: "center",
              padding: "8px",
              backgroundColor: "red",
              cursor: "pointer",
              borderRadius: "8px",
              boxShadow: 3,
            }}
          >
            <Typography fontWeight="bold" onClick={onRemove} className="text-white">Delete  <DeleteIcon /></Typography>
            
          </Box>
          <Box
            sx={{
              flex: 1,
              textAlign: "center",
              padding: "8px",
              backgroundColor: "white",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            <Typography fontWeight="bold" onClick={toggleUnit}>Switch <FlipCameraAndroidIcon /></Typography>
            
          </Box>
        </Box>

      </CardContent>
    </Card>
  );
};

export default WeatherWidget;