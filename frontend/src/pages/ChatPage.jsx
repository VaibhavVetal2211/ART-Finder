import { Box, Container, TextField, IconButton, Typography, Paper, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material'
import { Send, AutoAwesome } from '@mui/icons-material'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you with your research today?' }
  ])
  const [input, setInput] = useState('')
  const [category, setCategory] = useState('news')
  const [loading, setLoading] = useState(false)

  const categories = [
    { value: 'technology', label: 'Technology' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'finance', label: 'Finance' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'news', label: 'News' }
  ]

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { role: 'user', content: input }
      setMessages(prev => [...prev, userMessage])
      setInput('')
      setLoading(true)

      try {
        const response = await axios.post('https://llm-query.onrender.com/api/chat/chat', {
          message: input,
          category: category
        })

        if (response.data.success) {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: response.data.data.response
          }])
        }
      } catch (error) {
        console.error('Chat error:', error)
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Sorry, there was an error processing your request.'
        }])
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: '#f8faff',
      background: 'linear-gradient(145deg, #f6f8ff 0%, #f0f3ff 100%)',
      position: 'relative'
    }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ 
        flex: 1, 
        py: 4, 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        pb: '120px', // Add padding to prevent content from being hidden behind input
      }}>
        <Typography variant="h4" sx={{ 
          mb: 4, 
          fontWeight: 700,
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          AI Research Assistant
        </Typography>

        <Box sx={{ 
          flex: 1, 
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          overflowY: 'auto',
          px: 2,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#c5c7f7',
            borderRadius: '10px',
            '&:hover': {
              background: '#6366f1',
            },
          },
        }}>
          {messages.map((message, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 3,
                maxWidth: '70%',
                alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                bgcolor: message.role === 'user' ? '#6366f1' : 'white',
                color: message.role === 'user' ? 'white' : 'inherit',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                position: 'relative',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(0,0,0,0.08)',
                }
              }}
            >
              {message.role === 'assistant' && (
                <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                  <AutoAwesome sx={{ color: '#6366f1' }} />
                  <Typography variant="subtitle2" sx={{ color: '#6366f1', fontWeight: 600 }}>
                    ART Assistant
                  </Typography>
                </Box>
              )}
              {message.role === 'user' ? (
                <Typography sx={{ lineHeight: 1.6 }}>{message.content}</Typography>
              ) : (
                <Box sx={{ 
                  '& > *': { color: 'inherit' },
                  '& h2': { fontSize: '1.3rem', fontWeight: 700, mt: 2.5, mb: 1.5 },
                  '& h3': { fontSize: '1.1rem', fontWeight: 600, mt: 2, mb: 1 },
                  '& p': { mb: 1.5, lineHeight: 1.7 },
                  '& ul, & ol': { pl: 2, mb: 1.5 },
                  '& li': { mb: 0.5 },
                  '& blockquote': { 
                    borderLeft: '4px solid #6366f1',
                    pl: 2,
                    py: 0.5,
                    my: 2,
                    bgcolor: 'rgba(99, 102, 241, 0.05)',
                    borderRadius: '0 8px 8px 0',
                    color: 'text.secondary'
                  }
                }}>
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </Box>
              )}
            </Paper>
          ))}
          {loading && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              p: 3,
              maxWidth: '70%',
              bgcolor: 'white',
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            }}>
              <CircularProgress size={20} sx={{ color: '#6366f1' }} />
              <Typography color="text.secondary">Generating response...</Typography>
            </Box>
          )}
        </Box>

        <Paper 
          elevation={0} 
          sx={{ 
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid rgba(99, 102, 241, 0.1)',
            zIndex: 1000,
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ 
              display: 'flex', 
              gap: 2,
              alignItems: 'center'
            }}>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(99, 102, 241, 0.2)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(99, 102, 241, 0.4)',
                    },
                  }}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={loading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(99, 102, 241, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(99, 102, 241, 0.4)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#6366f1',
                    },
                  },
                }}
              />
              <IconButton 
                onClick={handleSend}
                disabled={loading}
                sx={{ 
                  bgcolor: loading ? 'rgba(99, 102, 241, 0.2)' : '#6366f1',
                  color: 'white',
                  '&:hover': { 
                    bgcolor: loading ? 'rgba(99, 102, 241, 0.2)' : '#5457ea',
                  },
                  height: 56,
                  width: 56,
                  transition: 'all 0.3s ease',
                }}
              >
                <Send />
              </IconButton>
            </Box>
          </Container>
        </Paper>
      </Container>
    </Box>
  )
}

export default ChatPage