import Box from '@mui/material/Box';
import type { MouseEventHandler } from 'react';

export type ImageItem = { width: number, height: number, prompt: string, ratio: number, img: string }
export default function ImageTile({ item, columnWidth, onClick }: { item: ImageItem, columnWidth: number, onClick: MouseEventHandler }) {
  return <Box onClick={onClick} sx={{ paddingBottom: '5px' }} className='grid-item'>
    <img
      src={`${item.img}`}
      srcSet={`${item.img}`}
      alt={''}
      loading="lazy"
      className="bg"
      style={{
        borderRadius: 8,
        display: 'block',
        width: columnWidth,
        height: columnWidth * item.ratio
      }}
    />
  </Box>
}