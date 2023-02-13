import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import type { ImageItem } from './ImageTile';
import useWindowDimensions from '../utils/useWindowDimensions';
import useDetect from '../utils/useDetect';
import Stack from '@mui/material/Stack';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '82%',
  bgcolor: '#27272a',
  border: '1px solid #323234',
  borderRadius: '4px',
  boxShadow: 24,
  p: 4,
  flexGrow: 1
};

const Item = styled('div')(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  boxShadow: 'none',
}));

export default function ImagePanel({ item }: { item: ImageItem }) {
  const { width, height } = useWindowDimensions();
  const { isMobile } = useDetect();

  const theme: any = useTheme();

  const imageHeight = Math.min(width * 0.7 * item.ratio, height * 0.8);
  const imageWidth = Math.min(width * 0.7, imageHeight * (1 / item.ratio))
  return <Box sx={{ ...style, overflowY: "scroll", outline: 'none', '& .MuiGrid-root': { maxWidth: 'none' } }}>
    <Stack direction={ isMobile ? "column-reverse" : "row" }>
      <Grid sx={{ minWidth: { lg: '400px' } }}>
        <Item>
          <Paper sx={{ bgcolor: '#323234', padding: theme.spacing(2), boxShadow: 'none', borderRadius: '12px' }}>
            <Typography variant="caption" id="keep-mounted-modal-description" sx={{ color: grey[500] }}  >
              Prompt
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              {item.prompt}
            </Typography>
          </Paper>
        </Item>
        <Item>
          <Button color='secondary' variant="contained" startIcon={<SearchIcon />}>Find similar</Button>
        </Item>
        <Item>
          <Typography variant="caption" id="keep-mounted-modal-description" sx={{ color: grey[600] }}  >
            Dimensions
          </Typography>
          <Typography id="keep-mounted-modal-description">
            {item.width}x{item.height}
          </Typography>
        </Item>
      </Grid>
      <Grid sx={{ maxWidth: 'none' }}>
        <Item sx={{ maxWidth: '100%', width: '100%', }}>
          <Box sx={{ maxWidth: '100%', width: '100%', height: '100%', position: 'relative' }}>
            <img
              src={`${item.img}`}
              srcSet={`${item.img}`}
              alt={item.prompt}
              loading="lazy"
              style={{
                maxWidth: 'none',
                position: 'relative',
                width: imageWidth,
                height: imageHeight,
                display: 'block',
              }}
            />
          </Box>
        </Item>
      </Grid>
    </Stack>
  </Box>

}