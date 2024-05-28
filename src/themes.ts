import { extendTheme } from '@chakra-ui/react';
import '@fontsource/patrick-hand-sc'; // Import the font

const theme = extendTheme({
  fonts: {
    heading: '"Patrick Hand SC", sans-serif',
    body: '"Patrick Hand SC", sans-serif',
  },
});

export default theme;
