import { Box, Container, Typography, Grid, Paper, IconButton, Fade } from '@mui/material'
import { Rocket, Psychology, Security, Speed, Groups, Lightbulb } from '@mui/icons-material'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function AboutPage() {
  const aboutSections = [
    {
      icon: <Rocket />,
      title: 'Our Mission',
      description: 'ART Finder aims to revolutionize the ad research process by leveraging AI technology to gather, analyze, and generate actionable insights. We believe in empowering marketers with data-driven decisions to create more effective and user-centric advertising campaigns.'
    },
    {
      icon: <Psychology />,
      title: 'Our Approach',
      description: 'By combining advanced AI algorithms with comprehensive data analysis, we provide marketers with deep insights into user behavior, pain points, and effective advertising strategies. Our platform streamlines the research phase, allowing you to focus on creating compelling ad content.'
    },
    {
      icon: <Groups />,
      title: 'Our Team',
      description: 'We are a dedicated team of AI specialists, data scientists, and marketing experts working together to build the future of advertising research. Our diverse backgrounds enable us to tackle complex challenges from multiple perspectives.'
    },
    {
      icon: <Security />,
      title: 'Data Security',
      description: 'We prioritize the security and privacy of your data. Our platform implements industry-leading security measures and follows strict data protection protocols to ensure your research insights remain confidential and secure.'
    },
    {
      icon: <Speed />,
      title: 'Performance',
      description: 'Our advanced infrastructure ensures lightning-fast analysis and real-time insights. We continuously optimize our algorithms to deliver faster, more accurate results while maintaining scalability.'
    },
    {
      icon: <Lightbulb />,
      title: 'Innovation',
      description: 'We stay at the forefront of AI and machine learning developments, constantly incorporating new technologies and methodologies to improve our service and provide cutting-edge solutions.'
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
              About Us
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
              Who We Are
            </Typography>
            <Typography variant="h5" sx={{ 
              color: '#666', 
              maxWidth: '800px', 
              mx: 'auto',
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              lineHeight: 1.6
            }}>
              Empowering marketers with AI-driven research and insights for better decision making
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
            {aboutSections.map((section, index) => (
              <Fade in={true} timeout={500} style={{ transitionDelay: `${index * 100}ms` }} key={index}>
                <Grid item sx={{ width: '100%' }}>
                  <Paper sx={{ 
                    height: '100%',
                    bgcolor: 'white',
                    border: 'none',
                    borderRadius: 4,
                    p: 4,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
                    '&:hover': { 
                      transform: 'translateY(-4px)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
                      '& .about-icon': {
                        transform: 'scale(1.1)',
                        bgcolor: '#6366f1',
                        color: 'white'
                      }
                    },
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '280px'
                  }}>
                    <IconButton 
                      className="about-icon"
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
                      {section.icon}
                    </IconButton>
                    <Typography variant="h6" sx={{ 
                      mb: 2, 
                      fontWeight: 600, 
                      color: '#1a1a1a',
                      fontSize: '1.25rem'
                    }}>
                      {section.title}
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      color: '#666', 
                      lineHeight: 1.7,
                      flex: 1
                    }}>
                      {section.description}
                    </Typography>
                  </Paper>
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

export default AboutPage