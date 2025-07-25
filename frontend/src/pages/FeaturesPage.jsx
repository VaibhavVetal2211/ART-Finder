import { Box, Container, Grid, Typography, Card, CardContent, IconButton, Fade } from '@mui/material'
import { YouTube, Reddit, Search, Analytics, AutoGraph, Dashboard } from '@mui/icons-material'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function FeaturesPage() {
  const features = [
    {
      icon: <Search />,
      title: 'Comprehensive Research Automation',
      description: 'Automatically gather data from multiple sources including Google, YouTube, Reddit, Quora, and app reviews to identify user pain points and triggers.'
    },
    {
      icon: <Analytics />,
      title: 'Actionable Insights Generation',
      description: 'Generate data-driven insights and suggestions to help marketers craft effective, user-centric ads based on analyzed data.'
    },
    {
      icon: <Dashboard />,
      title: 'Reference Dashboard',
      description: 'Access direct links to analyzed content and visualize insights through intuitive graphs, word clouds, and sentiment analysis.'
    },
    {
      icon: <YouTube />,
      title: 'Video Content Analysis',
      description: 'Analyze YouTube videos and competitor ads to identify trends, effective hooks, and content strategies.'
    },
    {
      icon: <Reddit />,
      title: 'Social Listening',
      description: 'Monitor and analyze discussions across social platforms to understand user sentiments and pain points.'
    },
    {
      icon: <AutoGraph />,
      title: 'Performance Tracking',
      description: 'Track and analyze the performance of different content strategies and ad variations over time.'
    }
  ]

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: '#ffffff',
      background: 'linear-gradient(145deg, #f6f8ff 0%, #f0f3ff 100%)'
    }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ 
        py: { xs: 8, md: 12 }, 
        flex: 1,
        position: 'relative'
      }}>
        {/* Decorative background elements */}
        <Box sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.05) 100%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          zIndex: 0
        }} />

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box textAlign="center" mb={12}>
            {/* <Typography 
              component="span" 
              sx={{ 
                color: '#6366f1',
                fontWeight: 600,
                fontSize: '1.1rem',
                mb: 2,
                display: 'block'
              }}
            >
              Our Features
            </Typography> */}
            <Typography variant="h2" sx={{ 
              fontWeight: 800,
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em'
            }}>
              Everything you need
            </Typography>
            <Typography variant="h5" sx={{ 
              color: '#666', 
              maxWidth: '800px', 
              mx: 'auto',
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              lineHeight: 1.6
            }}>
              Discover how ART Finder revolutionizes your ad research process with powerful features
            </Typography>
          </Box>

          <Grid container spacing={4} sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)'
            },
            gap: 4
          }}>
            {features.map((feature, index) => (
              <Fade in={true} timeout={500} style={{ transitionDelay: `${index * 100}ms` }} key={index}>
                <Grid item sx={{ width: '100%' }}>
                  <Card sx={{ 
                    height: '100%',
                    bgcolor: 'white',
                    border: 'none',
                    borderRadius: 4,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
                    '&:hover': { 
                      transform: 'translateY(-4px)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
                      '& .feature-icon': {
                        transform: 'scale(1.1)',
                        bgcolor: '#6366f1',
                        color: 'white'
                      }
                    },
                    transition: 'all 0.3s ease'
                  }}>
                    <CardContent sx={{ 
                      p: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      minHeight: '280px'  // Added fixed minimum height
                    }}>
                      <IconButton 
                        className="feature-icon"
                        sx={{ 
                          bgcolor: '#f0f3ff',
                          color: '#6366f1',
                          mb: 3,
                          p: 2,
                          alignSelf: 'flex-start',
                          transition: 'all 0.3s ease',
                          '&:hover': { bgcolor: '#6366f1', color: 'white' }
                        }}
                      >
                        {feature.icon}
                      </IconButton>
                      <Typography variant="h6" sx={{ 
                        mb: 2, 
                        fontWeight: 600, 
                        color: '#1a1a1a',
                        fontSize: '1.25rem'
                      }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        color: '#666', 
                        lineHeight: 1.7,
                        flex: 1
                      }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Fade>
            ))}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </Box>
  )
}

export default FeaturesPage