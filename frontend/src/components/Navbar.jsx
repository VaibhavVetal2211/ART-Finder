import { AppBar, Toolbar, Typography, Box, Button, IconButton } from '@mui/material'
import { Search, AutoAwesome } from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'About', path: '/about' }
  ]

  return (
    <AppBar position="sticky" elevation={0} sx={{ 
      bgcolor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid rgba(0,0,0,0.06)'
    }}>
      <Toolbar sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        py: 1.5,
        px: { xs: 2, md: 4 }
      }}>
        <Box 
          display="flex" 
          alignItems="center" 
          gap={1} 
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <IconButton sx={{ 
            bgcolor: '#f0f3ff',
            color: '#6366f1',
            '&:hover': { bgcolor: '#e8ebff' }
          }}>
            <AutoAwesome />
          </IconButton>
          <Typography variant="h5" sx={{ 
            fontWeight: 700,
            letterSpacing: '-0.5px',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            ART Finder
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <IconButton sx={{ 
            color: '#666',
            '&:hover': { color: '#6366f1' }
          }}>
            <Search />
          </IconButton>
          <Box display="flex" gap={1}>
            {navItems.map((item) => (
              <Button 
                key={item.name}
                onClick={() => navigate(item.path)}
                sx={{ 
                  color: location.pathname === item.path ? '#6366f1' : '#666',
                  px: 2,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 500,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 8,
                    left: 8,
                    right: 8,
                    height: 2,
                    bgcolor: '#6366f1',
                    borderRadius: 1,
                    opacity: location.pathname === item.path ? 1 : 0,
                    transition: 'opacity 0.2s ease'
                  },
                  '&:hover': {
                    color: '#6366f1',
                    background: 'rgba(99, 102, 241, 0.04)'
                  }
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar