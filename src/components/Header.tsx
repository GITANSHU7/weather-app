import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Header() {

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <WbSunnyIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color:"yellow" }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Accu Weather
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
