import React, { useState, useEffect } from 'react';
import Nav from "../../components/Nav/Index.jsx";
import { Input, message, Table, Col, Row, Card, Button } from 'antd';
import { getAllStudents, getGrade, getSubject } from '../../services/alumnos.js';
import { getSubjects } from '../../services/subjects.js';
import "./Grade.css";
import ButtonPDFGrade from './ButtonPDFGrade';
import { useAuth } from "../../hooks/useAuth.js";
import AddSubjectModal from '../../components/Modals/AddSubject/AddSubjectModal';

const { Search } = Input;

const TableGrade = () => {
    const { user } = useAuth();

    const [grades, setGrades] = useState([]);
    const [alumno, setAlumno] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isAlumno, setIsAlumno] = useState(false);
    const [professorSubjects, setProfessorSubjects] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedSubjectId, setSelectedSubjectId] = useState(null);

    useEffect(() => {
        const fetchGrades = async () => {
            setLoading(true);
            setIsAlumno(true);
            setAlumno(user[0]);
            const id = user[0]._id;
            const gradesResponse = await getGrade(id);
            setGrades(Array.isArray(gradesResponse) ? gradesResponse : []);
            setLoading(false);
        };

        const fetchProfessorSubjects = async () => {
            urlProf();
            setLoading(true);
            try {
                const subjectsResponse = await getSubjects();
                const filteredSubjects = subjectsResponse.filter(subject =>
                    subject.professor.some(prof => prof._id === user[0]._id)
                );
                setProfessorSubjects(filteredSubjects);
            } catch (error) {
                console.error("Error al obtener las materias del profesor:", error);
                message.error("Error al obtener las materias del profesor. Por favor, intenta de nuevo.");
            }
            setLoading(false);
        };

        if (user[0].roles[0].name === "alumno") {
            fetchGrades();
        } else if (user[0].roles[0].name === "profesor") {
            fetchProfessorSubjects();
        }
    }, [user]);

    const urlProf = async () => {
        const response = await getSubject();
        setGrades(response);
    }

    const onSearch = async (value) => {
        setLoading(true);
        try {
            const studentsResponse = await getAllStudents();

            const searchTerm = value.trim().toLowerCase();

            const foundAlumno = studentsResponse.find(student => {
                const studentName = student.name.trim().toLowerCase();
                const studentLastname = student.lastname.trim().toLowerCase();
                const fullName = `${studentName} ${studentLastname}`.toLowerCase();
                const curp = student.CURP.trim().toLowerCase();

                return fullName === searchTerm || curp === searchTerm;
            });

            if (foundAlumno) {
                setAlumno(foundAlumno);
                const gradesResponse = await getGrade(foundAlumno._id);
                setGrades(Array.isArray(gradesResponse) ? gradesResponse : []);

                if (!gradesResponse || gradesResponse.length === 0) {
                    message.info("Este alumno aún no cuenta con calificaciones registradas.");
                }
            } else {
                message.info("No se encontró ningún alumno con ese nombre o CURP. Verifica que los datos estén correctos.");
                setAlumno(null);
                urlProf();
            }
        } catch (error) {
            console.error("Error al buscar alumno:", error);
            message.error("Error al buscar alumno. Por favor, intenta de nuevo.");
            setGrades([]);
        }
        setLoading(false);
    };

    const handleAddClick = (subjectId) => {
        setSelectedSubjectId(subjectId);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        urlProf();
        setIsModalVisible(false);
    };

    // Agrupar materias por nombre
    const materiasAgrupadas = grades.reduce((acc, grade) => {
        const materia = grade.grade[0]?.name;
        if (!acc[materia]) {
            acc[materia] = [];
        }
        acc[materia].push(grade);
        return acc;
    }, {});

    // Ordenar las calificaciones por cuatrimestre (descendente) y parcial (ascendente)
    const sortedGrades = grades.sort((a, b) => {
        // Primero, compara los cuatrimestres (descendente)
        if (b.cuatrimestre !== a.cuatrimestre) {
            return b.cuatrimestre - a.cuatrimestre;
        }
        // Luego, compara los parciales (ascendente)
        return a.parcial - b.parcial;
    });

    const renderStudentTable = () => (
        <>
            <Row justify="space-between" align="middle" style={{ marginBottom: '20px', marginTop: '20px' }}>
                <Col>
                    <h1 style={{ margin: 0, marginLeft: '40px' }}>Calificaciones</h1>
                </Col>
                <Col>
                    {!isAlumno && (
                        <Search
                            placeholder="Buscar alumno por nombre"
                            allowClear
                            enterButton="Buscar"
                            onSearch={onSearch}
                            className="buscador"
                        />
                    )}
                </Col>
            </Row>
            <div className="container-cards">
                {alumno && (
                    <Card
                        title="Información del Alumno"
                        className='card-datos-alumnos'
                        bordered={false}
                        style={{ width: 600 }}
                        extra={<ButtonPDFGrade alumno={alumno} grades={grades} />}
                    >
                        <p>Nombre: {alumno.name} {alumno.lastname}</p>
                        <p>CURP: {alumno.CURP}</p>
                    </Card>
                )}

                {alumno && grades.length > 0 && user[0].roles[0].name === "alumno" && (
                    <Card
                        title="Materias y Exenciones"
                        className='card-datos-alumnos'
                        bordered={false}
                        style={{ width: 600, maxHeight: '300px', overflowY: 'auto' }}
                    >
                        {Object.keys(materiasAgrupadas).map((materia, index) => {
                            const grades = materiasAgrupadas[materia];
                            const calificacionesSegundoParcial = grades
                                .filter(g => g.parcial === 2 && g.finalScore !== undefined)
                                .map(g => g.finalScore);
                            const promedio =
                                calificacionesSegundoParcial.reduce((acc, calificacion) => acc + calificacion, 0) /
                                calificacionesSegundoParcial.length;
                            const exenta = promedio >= 8;

                            return (
                                <div key={index} className="grade-item">
                                    <p><strong>Materia:</strong> {materia}</p>
                                    <p>
                                        <strong>Estado:</strong> {exenta ? "Exenta" : "No Exenta"}
                                    </p>
                                </div>
                            );
                        })}
                    </Card>
                )}
            </div>
            <div className="grades-container">
                {grades.length === 0 && alumno && !loading ? (
                    <p>Este alumno aún no cuenta con calificaciones registradas.</p>
                ) : (
                    <Table
                        columns={[
                            {
                                title: 'Materia',
                                dataIndex: ['grade', 0, 'name'],
                                key: 'name',
                                align: 'center',
                            },
                            {
                                title: 'Parcial',
                                dataIndex: 'parcial',
                                key: 'parcial',
                                align: 'center',
                            },
                            {
                                title: 'Grado',
                                dataIndex: 'grado',
                                key: 'grado',
                                align: 'center',
                            },
                            {
                                title: 'Calificación',
                                dataIndex: 'subject',
                                key: 'subject',
                                align: 'center',
                            },
                        ]}
                        dataSource={sortedGrades}
                        loading={loading}
                        pagination={{ pageSize: 5 }}
                    />
                )}
            </div>
        </>
    );

    const renderProfessorTable = () => (
        <>
            <Row justify="space-between" align="middle" style={{ marginBottom: '20px', marginTop: '20px' }}>
                <Col>
                    <h1 style={{ margin: 0, marginLeft: '40px' }}>Tabla de Calificaciones - Profesor</h1>
                </Col>
            </Row>
            <div className="grades-container">
                <Table
                    columns={[
                        {
                            title: 'Materia',
                            dataIndex: 'name',
                            key: 'name',
                            align: 'center',
                            filters: professorSubjects.map(subject => ({
                                text: subject.name,
                                value: subject.name,
                            })),
                            onFilter: (value, record) => record.name.includes(value),
                        },
                        {
                            title: 'Carrera',
                            dataIndex: ['career', 0, 'name'],
                            key: 'career',
                            align: 'center',
                        },
                        {
                            title: 'Acciones',
                            key: 'acciones',
                            align: 'center',
                            render: (_, record) => (
                                <Button onClick={() => handleAddClick(record._id)}>Agregar Calificación</Button>
                            ),
                        },
                    ]}
                    dataSource={professorSubjects}
                    loading={loading}
                    pagination={{ pageSize: 5 }}
                />
            </div>
        </>
    );

    const renderCalf = () => (
        <>
            <Row justify="space-between" align="middle" style={{ marginBottom: '20px', marginTop: '20px' }}>
                <Col>
                    <h1 style={{ margin: 0, marginLeft: '40px' }}>Calificaciones</h1>
                </Col>
                <Col>
                    {!isAlumno && (
                        <Search
                            placeholder="Buscar alumno por nombre"
                            allowClear
                            enterButton="Buscar"
                            onSearch={onSearch}
                            className="buscador"
                        />
                    )}
                </Col>
            </Row>
            <div className="grades-container">
                <Table
                    columns={[
                        {
                            title: 'Alumno',
                            dataIndex: 'name',
                            key: 'name',
                            align: 'center',
                            render: (text, record) => `${record.student[0].name} ${record.student[0].lastname}`
                        },
                        {
                            title: 'CURP',
                            dataIndex: 'CURP',
                            key: 'CURP',
                            align: 'center',
                            render: (text, record) => `${record.student[0].CURP}`,
                            filters: grades.map(grade => ({
                                text: grade.student[0].CURP,
                                value: grade.student[0].CURP,
                            })),
                            onFilter: (value, record) => record.student[0].CURP.includes(value),
                        },
                        {
                            title: 'Parcial',
                            dataIndex: 'parcial',
                            key: 'parcial',
                            align: 'center',
                        },
                        {
                            title: 'Grado',
                            dataIndex: 'grado',
                            key: 'grado',
                            align: 'center',
                        },
                        {
                            title: 'Calificación',
                            dataIndex: 'subject',
                            key: 'subject',
                            align: 'center',
                        },
                    ]}
                    dataSource={sortedGrades}
                    loading={loading}
                    pagination={{ pageSize: 5 }}
                />
            </div>
        </>
    );

    return (
        <>
            <Nav />
            <div className="main-content">
                {user[0].roles[0].name === "alumno" && renderStudentTable()}
                {user[0].roles[0].name === "profesor" && renderProfessorTable()}
                {renderCalf()}
                <AddSubjectModal
                    isVisible={isModalVisible}
                    onClose={handleModalClose}
                    subjectId={selectedSubjectId}
                />
            </div>
        </>
    );
}

export default TableGrade;
