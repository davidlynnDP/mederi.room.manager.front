import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { AuthProvider, MederiProvider, MederiProviderDry } from './context';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MederiProvider>
          <AppRouter/>
        </MederiProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
