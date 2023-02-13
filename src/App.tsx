import { useEffect, useRef, useState } from 'react';
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
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const IMAGE_COUNT_INTERVAL = 20
const INIT_IMAGE_COUNT = 40

function App() {
  const [data, setData] = useState<any>([]);
  const [query, setQuery] = useState("galaxy");
  const [range, setRange] = useState(INIT_IMAGE_COUNT);
  const [loading, setLoading] = useState(false);
  const ref = useRef<any>();

  useEffect(() => {
    const scrollListener = () => {
      if (ref.current === null) return;
      const scrollingElement = ref.current.getScrollElement();
      if (
        scrollingElement &&
        scrollingElement.scrollTop + scrollingElement.clientHeight >=
        scrollingElement.scrollHeight
      ) {
        setRange((r) => Math.min(data.length, r + IMAGE_COUNT_INTERVAL))
      }
    }
    if (ref.current !== null) {
      const element = ref.current;
      element.getScrollElement().addEventListener("scroll", scrollListener);
      return () => element.getScrollElement().removeEventListener("scroll", scrollListener);
    }
  }, [data]);

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
    <SimpleBar ref={ref} style={{ position: 'absolute', height: '100%', width: '100%' }}>
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
            <Toolbar>
              <SearchInput query={query} onEnter={(value) => { setQuery(value); setData([]) }} />
            </Toolbar>
          </Container>
          <Stack alignItems="center">
            {loading && <CircularProgress />}
          </Stack>
          <ImageMasonry data={data.slice(0, range)} />
        </Container>
      </div>
    </SimpleBar>
  );
}

export default App;
