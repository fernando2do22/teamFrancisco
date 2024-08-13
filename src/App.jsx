import { ConfigProvider } from 'antd';
import './App.css';
import AppRoutes from "./routes/Index.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { HelmetProvider } from 'react-helmet-async';

function App() {
    return (
        <AuthProvider>
            <HelmetProvider>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#004AAD',
                            fontFamily: 'League Spartan, sans-serif',
                        }
                    }}
                >
                    <div className="league-spartan">
                        <BrowserRouter>
                            <AppRoutes />
                        </BrowserRouter>
                    </div>
                </ConfigProvider>
            </HelmetProvider>
        </AuthProvider>
    );
}

export default App;
