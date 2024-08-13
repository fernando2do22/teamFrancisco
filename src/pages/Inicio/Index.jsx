import React, { useState, useEffect } from 'react';
import { useAuth } from "../../hooks/useAuth.js";
import Nav from "../../components/Nav/Index.jsx";
import Footer from "../../components/Footer/index.jsx";
import './Inicio.css';
import { Layout, Card, Typography, Carousel, Divider } from 'antd';
import getDivisions from "../../services/divisions.js";

const { Content } = Layout;
const { Title, Text } = Typography;

const Inicio = () => {
    const { user } = useAuth();
    const [divisiones, setDivisiones] = useState([]);

    useEffect(() => {
        const fetchDivisions = async () => {
            try {
                const divisionsData = await getDivisions();
                // Transform the data to match the expected format
                const transformedDivisions = divisionsData.map(division => ({
                    nombre: division.name,
                    ofertas: division.carreers.map(career => career.name)
                }));
                setDivisiones(transformedDivisions);
            } catch (e) {
                console.log('Error al obtener las divisiones: ', e);
            }
        };

        fetchDivisions();
    }, []);

    const sliderImages = [
        'https://www.uteq.edu.mx/Images/main-carousel/Banner_NvoIng_UTEQ___veda.png',
        'https://www.uteq.edu.mx/Images/main-carousel/Banner_NvoIng_COLON___veda.png',
    ];

    return (
        <Layout className="layout">
            <Nav />
            <Content className="home-content">
                <div className="carousel-container">
                    <Carousel autoplay>
                        {sliderImages.map((imageUrl, index) => (
                            <div key={index}>
                                <img src={imageUrl} alt={`Slide ${index}`} className="slider-image" />
                            </div>
                        ))}
                    </Carousel>
                </div>
                <section className="description-section">
                    <div className="description-content">
                        <Title>Bienvenido a Nuestra Aplicación</Title>
                        <Text>
                            Descubre las mejores ofertas educativas y características que nuestra aplicación tiene para ofrecerte. Explora una amplia variedad de cursos y programas diseñados para satisfacer tus necesidades académicas y profesionales. Aprovecha nuestras herramientas avanzadas y recursos personalizados para maximizar tu aprendizaje y alcanzar tus metas. Ya seas un estudiante en busca de formación especializada o un profesional deseoso de actualizar tus conocimientos, encontrarás en nuestra plataforma todo lo que necesitas para triunfar. Únete a nuestra comunidad y experimenta una educación de calidad, adaptada a los desafíos del mundo moderno.
                        </Text>
                    </div>
                </section>
                <div className="divisions-container">
                    <Title level={2}>Divisiones y Ofertas Educativas</Title>
                    {divisiones.map((division, index) => (
                        <Card key={index} className="division-card" hoverable>
                            <Title level={3}>{division.nombre}</Title>
                            <Divider />
                            <ul>
                                {division.ofertas.map((oferta, index) => (
                                    <li key={index} className="oferta-item">{oferta}</li>
                                ))}
                            </ul>
                        </Card>
                    ))}
                </div>
            </Content>
            <Footer />
        </Layout>
    );
}

export default Inicio;
