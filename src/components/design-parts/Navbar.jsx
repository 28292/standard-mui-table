import * as React from 'react';
import { Box, IconButton, useTheme, InputBase } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import LightModeSharpIcon from '@mui/icons-material/LightModeSharp';
import NightsStaySharpIcon from '@mui/icons-material/NightsStaySharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Topbar = ({ searchQuery, setSearchQuery }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '5px', alignItems: 'center', ml: '30px' }}>
      {/* Search Box */}
      <Box sx={{ display: 'flex', alignItems: 'center', width: '2fr' }}>
        <Box sx={{ width: '100px', mr: '16px' }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/BSI-logo-charcoal.png" alt="BSI Logo" style={{ width: '100%', marginTop: '10px' }} />
        </Box>
        <Box sx={{ display: 'flex', backgroundColor: colors.primary[400], borderRadius: '10px', width: '480px', height: '45px', ml: '20px' }}>
          <InputBase
            sx={{ flex: 1, backgroundColor: 'rgba(29, 33, 38, 0.4)', p: '5px 10px' }}
            placeholder="Search BSI knowledge"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton sx={{ p: 1, color: 'inherit' }}>
            <SearchSharpIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Icons Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', mr: '45px', width: '1fr' }}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? <NightsStaySharpIcon /> : <LightModeSharpIcon />}
        </IconButton>
        <IconButton>
          <NotificationsActiveIcon />
        </IconButton>
        <IconButton>
          <AccountCircleIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
