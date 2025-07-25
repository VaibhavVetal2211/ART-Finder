import { Box, Container, Grid, Typography, Button, IconButton } from '@mui/material'
import { GitHub, LinkedIn, Twitter } from '@mui/icons-material'

function Footer() {
  return (
    <Box sx={{ 
      borderTop: '1px solid rgba(0,0,0,0.06)',
      py: 8,
      bgcolor: 'white',
      mt: 'auto'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ pr: { md: 6 } }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 700, 
                mb: 2,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                ART Finder
              </Typography>
              <Typography variant="body2" sx={{ 
                color: '#666', 
                mb: 3,
                lineHeight: 1.6
              }}>
                Empowering research with AI-driven insights and analytics
              </Typography>
              <Box display="flex" gap={2}>
                <IconButton sx={{ 
                  color: '#666',
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    color: '#6366f1',
                    transform: 'translateY(-2px)'
                  }
                }}>
                  <GitHub />
                </IconButton>
                <IconButton sx={{ 
                  color: '#666',
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    color: '#6366f1',
                    transform: 'translateY(-2px)'
                  }
                }}>
                  <LinkedIn />
                </IconButton>
                <IconButton sx={{ 
                  color: '#666',
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    color: '#6366f1',
                    transform: 'translateY(-2px)'
                  }
                }}>
                  <Twitter />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* Links Section */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              {['Product', 'Company', 'Support'].map((section, index) => (
                <Grid item xs={6} md={4} key={section}>
                  <Typography variant="subtitle1" sx={{ 
                    fontWeight: 600, 
                    mb: 3,
                    color: '#1a1a1a'
                  }}>
                    {section}
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={2}>
                    {[
                      index === 0 ? ['Features', 'Pricing', 'Documentation'] :
                      index === 1 ? ['About', 'Blog', 'Careers'] :
                      ['Help Center', 'Contact', 'Privacy']
                    ].map((link) => (
                      <Button 
                        key={link}
                        sx={{ 
                          color: '#666',
                          justifyContent: 'flex-start',
                          textTransform: 'none',
                          p: 0,
                          minWidth: 'auto',
                          fontWeight: 500,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            color: '#6366f1',
                            transform: 'translateX(4px)',
                            background: 'none'
                          }
                        }}
                      >
                        {link}
                      </Button>
                    ))}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Copyright Section */}
          <Grid item xs={12}>
            <Box sx={{ 
              borderTop: '1px solid rgba(0,0,0,0.06)',
              pt: 4,
              mt: 4,
              textAlign: 'center'
            }}>
              <Typography variant="body2" sx={{ color: '#666' }}>
                © {new Date().getFullYear()} ART Finder. All rights reserved.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Footer