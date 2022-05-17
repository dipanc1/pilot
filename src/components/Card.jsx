import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import React, { useEffect } from 'react'
import axios from 'axios';
import { ArrowDownwardOutlined, ArrowUpwardOutlined, WbSunnyOutlined, WbSunnyTwoTone } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    backgroundImage: `url(${"https://wallpapercave.com/wp/wp4080958.jpg"})`,
    backgroundSize: 'cover',
    ...theme.typography.body2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
    height: '100vh',
}));

const Card = () => {
    const [data, setData] = React.useState([]);
    const [fullScreen, setFullScreen] = React.useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/cities')
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                {data.map(item => (
                    <Grid item xs={6} key={item.id}>
                        <Item>
                            {fullScreen ?
                                <Box
                                    bgcolor="#eceff1"
                                    width={0.7}
                                    height={0.9}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-evenly"
                                    onClick={() => setFullScreen(false)}
                                    borderRadius={10}
                                >
                                    <Box
                                        bgcolor="#cfd8dc"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-evenly"
                                        flexDirection="column"
                                        height={0.8}
                                        width={0.4}
                                        borderRadius={10}
                                    >
                                        <Typography variant='h6'>
                                            Feels Like: {Math.floor((item.main.feels_like) - 273)}°C</Typography>
                                        <Typography variant='h6'>Wind: {item.wind.speed} km/h</Typography>
                                        <Typography variant='h6'>
                                            Humidity: {item.main.humidity} %</Typography>
                                        <Typography variant="h6" component="h2">
                                            {
                                                new Date(item.sys.sunset * 1000).toLocaleString().split(', ')[1].split(':').join(':')
                                            }
                                            <WbSunnyOutlined />
                                        </Typography>
                                        <Typography variant="h6" component="h2">
                                            {
                                                new Date(item.sys.sunrise * 1000).toLocaleString().split(', ')[1].split(':').join(':')
                                            }
                                            <WbSunnyTwoTone />
                                        </Typography>
                                        <Typography variant='h6'>
                                            {Math.floor((item.main.temp_max) - 273)}°C <ArrowUpwardOutlined />
                                            {' '}
                                            {Math.floor((item.main.temp_min) - 273)}°C
                                            <ArrowDownwardOutlined />
                                        </Typography>
                                        <img src={`http://openweathermap.org/img/wn/${item.weather.map(item => item.icon)}@2x.png`} alt="" />
                                        <Typography variant="subtitle2" component="h2">
                                            {item.weather.map(item => item.description)}
                                        </Typography>
                                        <Typography variant='h3'>
                                            {item.weather.map(item => item.main)}
                                        </Typography>
                                    </Box>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-evenly"
                                        flexDirection="column"
                                    >
                                        <Typography variant='h2'>{Math.floor((item.main.temp) - 273)}°C</Typography>

                                        <Typography variant='h3'>{item.name},{item.sys.country}</Typography>
                                    </Box>
                                </Box>
                                :
                                <Box
                                    bgcolor="#455a64"
                                    width={0.7}
                                    height={0.4}
                                    display="flex"
                                    alignItems="center"
                                    onClick={() => setFullScreen(true)}
                                    justifyContent="space-evenly"
                                    borderRadius={10}
                                >
                                    <Box
                                        color="white"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-evenly"
                                        flexDirection="column"
                                        height={1}
                                        width={0.4}
                                    >
                                        <Typography variant="h3" component="h2">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="h6" component="h2">
                                            {
                                                new Date(item.dt * 1000).toLocaleString().split(', ')[1].split(':').join(':')
                                            }
                                        </Typography>
                                        <Typography variant="h1" component="h2">
                                            {Math.floor((item.main.temp) - 273)}°C
                                        </Typography>
                                    </Box>
                                    <img src={`http://openweathermap.org/img/wn/${item.weather.map(item => item.icon)}@2x.png`} alt="" />
                                </Box>
                            }
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
export default Card