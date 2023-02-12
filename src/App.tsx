import React, { useEffect, useState } from 'react';
import './App.css';
import ImageMasonry from './components/ImageMasonry';
import SearchInput from './components/SearchInput';
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const IMAGE_COUNT_INTERVAL=20
const INIT_IMAGE_COUNT=40

function App() {
  const [data, setData] = useState<any>([])
  const [query, setQuery] = useState("galaxy")
  const [range, setRange] = useState(INIT_IMAGE_COUNT);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const res = await axios.get(process.env.REACT_APP_API_SERVER_URL!, { params: { tags: query } });
      setLoading(false);
      setRange(INIT_IMAGE_COUNT);
      setData(res.data);
    }
    fetchImages();
  }, [query])

  return (
    <div className="App">
      <AppBar sx={{ bgcolor: 'rgba(1, 1, 1, 0.6)', backdropFilter: 'blur(8px)' }}>
        <Toolbar>
          <Typography sx={{ opacity: 'none' }} variant="h6" component="div">
            Diffusion Gallery
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} sx={{ pt: 12 }}>
        <Container>
          <Toolbar sx={{ width: "100%" }}>
            <SearchInput query={query} onEnter={(value) => {setQuery(value); setData([])}} />
          </Toolbar>
        </Container>
        <Stack alignItems="center">
          {loading && <CircularProgress/>}
        </Stack>
        <ImageMasonry onScroll={() => {
          setRange((r) => Math.min(data.length, r + IMAGE_COUNT_INTERVAL))
        }} data={data.slice(0, range)} />
      </Container>
    </div>
  );
}

export default App;
