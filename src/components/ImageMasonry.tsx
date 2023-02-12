import { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Masonry from 'react-masonry-component';
import ImageTile, { ImageItem } from './ImageTile';
import ImagePanel from './ImagePanel';
import useWindowDimensions from '../utils/useWindowDimensions';

export default function ImageMasonry({ data, onScroll }: { onScroll: () => void, data: any[] }) {
  const { width } = useWindowDimensions();
  const columnWidth = Math.floor(width / (8 * 5)) * 5 - 10

  const masonryRef = useRef<HTMLDivElement | null>(null);
  // const masonry = useRef<any | null>(null)

  const [open, setOpen] = useState(false);
  const handleOpen = (item: ImageItem) => {
    setOpen(true);
    setSelectedItem(item)
  };

  const handleClose = () => setOpen(false);
  const [selectedItem, setSelectedItem] = useState<ImageItem>({ ratio: 1, img: "", prompt: "", width: 512, height: 512 });

  const imageItems: ImageItem[] = data.map((p) => ({
    width: p.width,
    height: p.height,
    prompt: p.prompt,
    ratio: p.height / p.width,
    img: `${process.env.REACT_APP_IMAGE_SERVER_URL!}${p.image_path}`
  }));

  const scrollListener = () => {
    if (
      document.scrollingElement &&
      document.scrollingElement.scrollTop + document.scrollingElement.clientHeight >=
      document.scrollingElement.scrollHeight
    ) {
      onScroll();
    }
  }

  useEffect(() => {
    if (masonryRef.current) {
      window.addEventListener("scroll", scrollListener);
    }
    return () => window.removeEventListener("scroll", scrollListener)
  }, [onScroll]);

  return (
    <Box ref={masonryRef} sx={{ width: '100%', position: 'relative', minHeight: 829, }}>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box>
          <ImagePanel item={selectedItem} />
        </Box>
      </Modal>
      <Masonry
        // ref={masonry} 
        options={{ itemSelector: '.grid-item', gutter: 4, transitionDuration: 0 }}
        enableResizableChildren={true}
      >
        {imageItems.map((item, index) => (
          <ImageTile key={index} item={item} columnWidth={columnWidth} onClick={() => handleOpen(item)} />
        ))}
      </Masonry>
    </Box>
  );
}
