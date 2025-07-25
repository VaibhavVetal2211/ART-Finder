import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Chip, CircularProgress } from '@mui/material'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useState, useEffect } from 'react'
import axios from 'axios'

function FinancePage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFinanceNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/news/search', {
          params: {
            query: 'finance OR business OR market',
            category: 'business',
            lang: 'en',
            country: 'us',
            max: 12
          }
        })
        setArticles(response.data.data.articles)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching finance news:', error)
        setLoading(false)
      }
    }

    fetchFinanceNews()
  }, [])

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: '#ffffff',
      background: 'linear-gradient(145deg, #f6f8ff 0%, #f0f3ff 100%)'
    }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 }, flex: 1 }}>
        <Typography variant="h2" sx={{ 
          fontWeight: 800,
          mb: 3,
          fontSize: { xs: '2.5rem', md: '3.5rem' },
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Finance Research
        </Typography>
        <Typography variant="h5" sx={{ mb: 6, color: '#666' }}>
          Latest financial news and market insights from leading sources
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <CircularProgress sx={{ color: '#6366f1' }} />
          </Box>
        ) : (
          <Grid 
            container 
            spacing={4} 
            sx={{ 
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)'
              },
              gap: 4
            }}
          >
            {articles.map((article, index) => (
              <Grid item key={index} sx={{ width: '100%' }}>
                <Card sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 4,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
                  '&:hover': { 
                    transform: 'translateY(-4px)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.06)'
                  },
                  transition: 'all 0.3s ease'
                }}>
                  {article.urlToImage && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={article.urlToImage}
                      alt={article.title}
                      sx={{ objectFit: 'cover' }}
                    />
                  )}
                  <CardContent sx={{ p: 3, flex: 1 }}>
                    <Chip 
                      label={new URL(article.url).hostname.replace('www.', '')}
                      size="small"
                      sx={{ 
                        mb: 2,
                        bgcolor: '#f0f3ff',
                        color: '#6366f1',
                        fontWeight: 500
                      }}
                    />
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600,
                      mb: 2,
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {article.title}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: '#666',
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {article.description}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#999' }}>
                      {new Date(article.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <Footer />
    </Box>
  )
}

export default FinancePage