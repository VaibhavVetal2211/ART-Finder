import './App.css'
import { Box, Container, Typography, Grid, Card, CardContent, IconButton, Button } from '@mui/material'
import { Computer, SportsEsports, AttachMoney, Movie, Newspaper, SmartToy, Search, Analytics, Dashboard } from '@mui/icons-material'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import ChatPage from './pages/ChatPage'
import FeaturesPage from './pages/FeaturesPage'
import AboutPage from './pages/AboutPage'

// Add these imports at the top
import TechnologyPage from './pages/categories/TechnologyPage'
import GamingPage from './pages/categories/GamingPage'
import FinancePage from './pages/categories/FinancePage'
import EntertainmentPage from './pages/categories/EntertainmentPage'
import NewsPage from './pages/categories/NewsPage'

function HomePage() {
  const navigate = useNavigate()
  const categoriesRef = useRef(null)

  const handleScrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const categories = [
    { name: 'Technology', icon: <Computer />, emoji: '💻', path: '/category/technology' },
    { name: 'Gaming', icon: <SportsEsports />, emoji: '🎮', path: '/category/gaming' },
    { name: 'Finance', icon: <AttachMoney />, emoji: '💰', path: '/category/finance' },
    { name: 'Entertainment', icon: <Movie />, emoji: '🎬', path: '/category/entertainment' },
    { name: 'News', icon: <Newspaper />, emoji: '📰', path: '/category/news' },
  ]

  return (
    <Box sx={{ 
      bgcolor: '#ffffff', 
      minHeight: '100vh',
      background: 'linear-gradient(145deg, #f6f8ff 0%, #f0f3ff 100%)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar />
      
      {/* Hero Section */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: { xs: 4, md: 0 } }}>
                <Typography variant="h1" sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  mb: 2,
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  ART Finder
                </Typography>
                <Typography variant="h4" sx={{ 
                  mb: 3,
                  color: '#4a4a4a',
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 500
                }}>
                  Automated Research & Trigger Finder
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 4,
                  color: '#666',
                  fontSize: '1.1rem',
                  maxWidth: '500px'
                }}>
                  Streamline your ad research with AI-powered insights and data-driven recommendations
                </Typography>
                <Button 
                  variant="contained" 
                  size="large" 
                  onClick={handleScrollToCategories}
                  sx={{ 
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5457ea 0%, #7d4ef5 100%)',
                    }
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                p: 4, 
                bgcolor: 'white',
                borderRadius: 4,
                boxShadow: '0 10px 40px rgba(0,0,0,0.04)'
              }}>
                <Grid container spacing={4}>
                  {[
                    { icon: <Search />, title: 'Smart Research', desc: 'Automated multi-source data gathering' },
                    { icon: <Analytics />, title: 'AI Insights', desc: 'Data-driven recommendations' },
                    { icon: <Dashboard />, title: 'Visual Analytics', desc: 'Comprehensive dashboard view' }
                  ].map((feature, index) => (
                    <Grid item xs={12} key={index}>
                      <Box display="flex" gap={3} alignItems="center">
                        <IconButton sx={{ 
                          bgcolor: '#f0f3ff',
                          color: '#6366f1',
                          '&:hover': { bgcolor: '#e8ebff' }
                        }}>
                          {feature.icon}
                        </IconButton>
                        <Box>
                          <Typography variant="h6" sx={{ 
                            fontWeight: 600,
                            color: '#1a1a1a',
                            mb: 0.5
                          }}>
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#666' }}>
                            {feature.desc}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Categories Section */}
      <Container ref={categoriesRef} maxWidth="lg" sx={{ 
        py: 12,
        mb: 8,
        px: { xs: 2, md: 3 }  // Adjusted container padding
      }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" sx={{ 
            fontWeight: 700, 
            color: '#1a1a1a',
            mb: 2
          }}>
            Explore Categories
          </Typography>
          <Typography variant="h6" sx={{ 
            color: '#666',
            fontWeight: 400,
            maxWidth: '600px',
            mx: 'auto'
          }}>
            Discover insights across different domains with our AI-powered research tools
          </Typography>
        </Box>
        
        <Grid container spacing={6}>
          {/* AI Chat Card - Full width row */}
          <Grid item xs={12} sx={{ width: '100%' }}>
            <Card sx={{ 
              cursor: 'pointer',
              border: 'none',
              borderRadius: 4,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              boxShadow: '0 10px 40px rgba(99, 102, 241, 0.2)',
              transition: 'all 0.3s ease',
              overflow: 'hidden',
              mb: 4,
              display: 'block',  // Added display block
              '&:hover': { 
                transform: 'translateY(-4px)',
                boxShadow: '0 20px 60px rgba(99, 102, 241, 0.3)'
              }
            }}>
              <CardContent sx={{ 
                p: 4,
                display: 'block',  // Added display block
                width: 'auto'  // Changed from 100% to auto
              }}>
                <Box display="flex" alignItems="center" justifyContent="space-between" gap={3}>
                  <Box display="flex" alignItems="center" gap={3} flex={1}>
                    <IconButton 
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.2)',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                        color: 'white'
                      }}
                    >
                      <SmartToy sx={{ fontSize: 30 }} />
                    </IconButton>
                    <Box flex={1}>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: 'white', mb: 1 }}>
                        Chat with AI 🤖
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                        Get instant research assistance with our AI chat
                      </Typography>
                    </Box>
                  </Box>
                  <Button 
                    variant="contained" 
                    onClick={() => navigate('/chat')}
                    sx={{ 
                      bgcolor: 'white',
                      color: '#6366f1',
                      px: 4,
                      py: 1.5,
                      minWidth: '140px',
                      fontWeight: 600,
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                    }}
                  >
                    Start Chat
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Container for categories in single row */}
          <Grid item xs={12}>
            <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {categories.map((category) => (
                <Grid item xs={12} sm={6} md={2.4} key={category.name} sx={{ flex: '1 1 0px', maxWidth: '20%' }}>
                  <Card 
                    onClick={() => navigate(category.path)}
                    sx={{ 
                      cursor: 'pointer',
                      border: 'none',
                      borderRadius: 4,
                      height: '100%',
                      bgcolor: 'white',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
                      transition: 'all 0.3s ease',
                      overflow: 'hidden',
                      '&:hover': { 
                        transform: 'translateY(-4px)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.06)'
                      }
                    }}>
                    <CardContent sx={{ 
                      p: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 2
                    }}>
                      <IconButton sx={{ 
                        bgcolor: '#f0f3ff',
                        color: '#6366f1',
                        p: 2,
                        '&:hover': { bgcolor: '#e8ebff' }
                      }}>
                        {category.icon}
                      </IconButton>
                      <Box textAlign="center">
                        <Typography variant="h6" sx={{ 
                          fontWeight: 600,
                          color: '#1a1a1a',
                          mb: 1,
                          fontSize: '1rem'
                        }}>
                          {category.name}
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          color: '#666',
                          fontSize: '0.875rem'
                        }}>
                          Explore {category.name.toLowerCase()} insights
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/category/technology" element={<TechnologyPage />} />
        <Route path="/category/gaming" element={<GamingPage />} />
        <Route path="/category/finance" element={<FinancePage />} />
        <Route path="/category/entertainment" element={<EntertainmentPage />} />
        <Route path="/category/news" element={<NewsPage />} />
      </Routes>
    </Router>
  )
}

export default App
