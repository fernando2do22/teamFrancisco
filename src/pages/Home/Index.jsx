import React, { useEffect } from 'react';
import { useAuth } from "../../hooks/useAuth.js";
import Nav from "../../components/Nav/Index.jsx";
import Footer from "../../components/Footer/index.jsx";
import './Home.css';
import { Layout, Card, Typography, Carousel,Row, Col, Divider} from 'antd';
import Header from '../../components/Header/index.jsx';






const { Content } = Layout;
const { Title, Text } = Typography;
const Home = () => {
    const { user } = useAuth();

    


  // Datos para el slider de imágenes
  const sliderImages = [
        
    'https://www.uteq.edu.mx/Images/main-carousel/Banner_NvoIng_UTEQ___veda.png',

   'https://www.uteq.edu.mx/Images/main-carousel/Banner_NvoIng_COLON___veda.png', 
];


return (
    <div>
            <Header title="Principal - UTEQ" description="Página principal UTEQ" />
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
            <div className="card-container">
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Card className="welcome-card" hoverable>
                            <Title className="titulo-card">Noticias</Title>
                            <Text className='contenido-card'>
                            Prepárate para nuestro evento de bienvenida a los nuevos estudiantes este 1ro de Agosto a las 17:00 hrs.
                            </Text>
                            <Divider></Divider>
                           
                            <Text className='contenido-card'>
                            Ecosistema de Innovación IQ 4.0 "Proyecto realizado con financiamiento de la Secretaría de Educación Pública-Subsecretaría de Educación Superior-Dirección General de Educación Superior Universitaria"
                            </Text>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card className="info-card" hoverable>
                            <Title className="titulo-card">Avisos</Title>
                            <Text className='contenido-card'>
                                Recuerda revisar el horario de inscripciones para el próximo semestre. Consulta los plazos y procedimientos.
                            </Text>
                            <Divider></Divider>
                            <tr></tr>
                            <Text className='contenido-card'>
                            Ecosistema de Innovación IQ 4.0 "Proyecto realizado con financiamiento de la Secretaría de Educación Pública-Subsecretaría de Educación Superior-Dirección General de Educación Superior Universitaria"
                            </Text>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Content>
        <Footer/>
    </Layout>
    </div>
);
}

export default Home;
