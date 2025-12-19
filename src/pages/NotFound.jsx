import { Box, useTheme, Typography } from '@mui/material'

const NotFound = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 'bold', mb: 2 }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ fontSize: '1.5rem' }}>
          Page Not Found
        </Typography>
      </Box>
    </Box>
  )
}

export default NotFound