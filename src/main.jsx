import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App.jsx'
import { RootLayout } from './components/layouts'
import { NotFound } from './pages'
import { ThemeProvider } from './store/themeStore.jsx'
import VendorsPage from './pages/VendorsPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import ShipmentsPage from './pages/ShipmentsPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<App />} />
            <Route path="vendors" element={<VendorsPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="shipments" element={<ShipmentsPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
