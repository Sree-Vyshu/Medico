import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Table,
  Badge,
  Button,
  Offcanvas,
  ListGroup,
  Alert,
  Form,
  InputGroup,
  FormControl,
  Dropdown,
  OverlayTrigger,
  Tooltip,
  Card,
  Collapse,
} from 'react-bootstrap';
import { Search, Eye, Plus, Phone, Mail, AlertCircle } from 'lucide-react';
import Layout from '../../components/Common/Layout';
import '../../styles/AdminPatients.css';

// Patient Data
const patientsData = [
  {
    id: 1,
    name: 'Aakhyan Jeyush',
    patientId: 'MED-2024-001',
    age: 45,
    gender: 'Male',
    bloodGroup: 'O+',
    phone: '+91 98765 43210',
    email: 'aakhyan.jeyush@email.com',
    allergies: ['Penicillin', 'Shellfish'],
    medicalHistory: [
      {
        date: '2026-03-15',
        doctor: 'Dr. DeepaVignesh',
        diagnosis: 'Hypertension',
        reason: 'Regular checkup and blood pressure monitoring',
      },
      {
        date: '2026-02-10',
        doctor: 'Dr. Ritvik Reddy',
        diagnosis: 'Common Cold',
        reason: 'Respiratory symptoms and fever',
      },
      {
        date: '2025-12-20',
        doctor: 'Dr. Harish Kumar',
        diagnosis: 'Migraine',
        reason: 'Severe headache and neurological symptoms',
      },
    ],
    automatedReminders: true,
    avatar: 'AJ',
  },
  {
    id: 2,
    name: 'Bhavesh Patil',
    patientId: 'MED-2024-002',
    age: 32,
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '+91 98765 43211',
    email: 'bhavesh.patil@email.com',
    allergies: ['Aspirin'],
    medicalHistory: [
      {
        date: '2026-03-10',
        doctor: 'Dr. Nifal Sheikh',
        diagnosis: 'Knee Pain',
        reason: 'Orthopedic consultation for left knee pain',
      },
      {
        date: '2026-01-15',
        doctor: 'Dr. DeepaVignesh',
        diagnosis: 'Diabetes Type 2',
        reason: 'Routine glucose level check',
      },
    ],
    automatedReminders: false,
    avatar: 'BP',
  },
  {
    id: 3,
    name: 'DSP',
    patientId: 'MED-2024-003',
    age: 28,
    gender: 'Female',
    bloodGroup: 'AB-',
    phone: '+91 98765 43212',
    email: 'dsp.patient@email.com',
    allergies: ['Latex', 'Iodine'],
    medicalHistory: [
      {
        date: '2026-03-05',
        doctor: 'Dr. Durga Bhavani',
        diagnosis: 'Dermatitis',
        reason: 'Skin allergic reaction treatment',
      },
    ],
    automatedReminders: true,
    avatar: 'DS',
  },
  {
    id: 4,
    name: 'Uday Gandhi',
    patientId: 'MED-2024-004',
    age: 55,
    gender: 'Male',
    bloodGroup: 'A-',
    phone: '+91 98765 43213',
    email: 'uday.gandhi@email.com',
    allergies: [],
    medicalHistory: [
      {
        date: '2026-02-28',
        doctor: 'Dr. Harish Kumar',
        diagnosis: 'High Cholesterol',
        reason: 'Lipid profile check and cardiac assessment',
      },
      {
        date: '2025-11-10',
        doctor: 'Dr. DeepaVignesh',
        diagnosis: 'Blood Pressure Check',
        reason: 'Annual health checkup',
      },
    ],
    automatedReminders: true,
    avatar: 'UG',
  },
  {
    id: 5,
    name: 'Sushant Ambekar',
    patientId: 'MED-2024-005',
    age: 38,
    gender: 'Male',
    bloodGroup: 'O-',
    phone: '+91 98765 43214',
    email: 'sushant.ambekar@email.com',
    allergies: ['Sulfa', 'Codeine'],
    medicalHistory: [
      {
        date: '2026-03-08',
        doctor: 'Dr. Ritvik Reddy',
        diagnosis: 'Asthma Management',
        reason: 'Respiratory assessment and inhaler review',
      },
    ],
    automatedReminders: false,
    avatar: 'SA',
  },
];

// Blood Group Color Mapping
const bloodGroupColors = {
  'O+': 'danger',
  'O-': 'dark',
  'A+': 'warning',
  'A-': 'secondary',
  'B+': 'primary',
  'B-': 'info',
  'AB+': 'success',
  'AB-': 'purple-custom',
};

// Search & Filter Bar Component
const SearchFilterBar = ({ searchTerm, setSearchTerm, filterBloodGroup, setFilterBloodGroup, filterGender, setFilterGender }) => {
  const bloodGroups = ['All', 'O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
  const genders = ['All', 'Male', 'Female', 'Other'];

  return (
    <Card className="mb-4 shadow-sm sticky-top" style={{ zIndex: 10, top: '90px' }}>
      <Card.Body>
        <Row className="g-3 align-items-center">
          <Col md={6}>
            <InputGroup>
              <InputGroup.Text className="bg-light border-0">
                <Search size={18} className="text-secondary" />
              </InputGroup.Text>
              <FormControl
                placeholder="Search patient by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-start-0"
              />
            </InputGroup>
          </Col>

          <Col md={3}>
            <Form.Select
              value={filterBloodGroup}
              onChange={(e) => setFilterBloodGroup(e.target.value)}
              className="border-0 shadow-sm"
            >
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>
                  Blood Group: {bg}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={3}>
            <Form.Select
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
              className="border-0 shadow-sm"
            >
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  Gender: {gender}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

// Medical History Offcanvas Component
const MedicalHistoryOffcanvas = ({ show, handleClose, patient, onUpdateReminders }) => {
  if (!patient) return null;

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" className="patient-offcanvas">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="fw-bold">Medical History</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {/* Patient Header */}
        <div className="mb-4">
          <div className="avatar-circle-lg bg-primary text-white mx-auto mb-3">
            {patient.avatar}
          </div>
          <h5 className="fw-bold text-center">{patient.name}</h5>
          <p className="text-muted text-center small">{patient.patientId}</p>
        </div>

        {/* Allergy Alert */}
        {patient.allergies.length > 0 && (
          <Alert variant="warning" className="d-flex align-items-center mb-4">
            <AlertCircle size={20} className="me-2" />
            <div>
              <strong>Allergies:</strong> {patient.allergies.join(', ')}
            </div>
          </Alert>
        )}

        {/* Contact Information */}
        <Card className="mb-4 border-0 bg-light">
          <ListGroup flush>
            <ListGroup.Item className="bg-light">
              <div className="d-flex align-items-center gap-2">
                <Phone size={18} className="text-primary" />
                <span>{patient.phone}</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="bg-light">
              <div className="d-flex align-items-center gap-2">
                <Mail size={18} className="text-primary" />
                <span>{patient.email}</span>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>

        {/* Automated Reminders */}
        <Card className="mb-4 border-0">
          <Card.Body>
            <Form.Group>
              <Form.Check
                type="switch"
                id="reminders-switch"
                label="Automated Reminders (SMS/Email)"
                checked={patient.automatedReminders}
                onChange={(e) => onUpdateReminders(patient.id, e.target.checked)}
              />
            </Form.Group>
          </Card.Body>
        </Card>

        {/* Medical History Timeline */}
        <h6 className="fw-bold mb-3">Past Visits</h6>
        <ListGroup className="mb-4">
          {patient.medicalHistory.map((visit, index) => (
            <ListGroup.Item key={index} className="border-0 ps-0 mb-3">
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className="fw-bold">{visit.diagnosis}</span>
                    <small className="text-muted">{visit.date}</small>
                  </div>
                  <small className="d-block mb-2">
                    <strong>Doctor:</strong> {visit.doctor}
                  </small>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id={`tooltip-${index}`}>{visit.reason}</Tooltip>}
                  >
                    <small className="text-primary cursor-pointer">
                      📋 Quick Note (Hover)
                    </small>
                  </OverlayTrigger>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {/* Vital Stats Summary */}
        <Card className="border-0 bg-light">
          <Card.Body>
            <h6 className="fw-bold mb-3">Patient Info</h6>
            <Row>
              <Col xs={6} className="mb-2">
                <small className="text-muted">Age</small>
                <div className="fw-bold">{patient.age} years</div>
              </Col>
              <Col xs={6} className="mb-2">
                <small className="text-muted">Gender</small>
                <div className="fw-bold">{patient.gender}</div>
              </Col>
              <Col xs={12}>
                <small className="text-muted">Blood Group</small>
                <Badge bg={bloodGroupColors[patient.bloodGroup]} className="d-block mt-1">
                  {patient.bloodGroup}
                </Badge>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

// Main Component
const AdminPatients = () => {
  const [patients, setPatients] = useState(patientsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBloodGroup, setFilterBloodGroup] = useState('All');
  const [filterGender, setFilterGender] = useState('All');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});

  // Filter patients
  let filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBloodGroup = filterBloodGroup === 'All' || patient.bloodGroup === filterBloodGroup;
    const matchesGender = filterGender === 'All' || patient.gender === filterGender;
    return matchesSearch && matchesBloodGroup && matchesGender;
  });

  const handleViewHistory = (patient) => {
    setSelectedPatient(patient);
    setShowOffcanvas(true);
  };

  const toggleRowExpand = (patientId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [patientId]: !prev[patientId],
    }));
  };

  const handleUpdateReminders = (patientId, enabled) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === patientId ? { ...p, automatedReminders: enabled } : p))
    );
  };

  return (
    <Layout>
      <Container fluid className="py-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold mb-1">Patient Management</h2>
            <p className="text-muted">View and manage patient records and medical history</p>
          </Col>
          <Col className="text-end">
            <Button variant="primary" className="gap-2 d-flex align-items-center justify-content-center ms-auto">
              <Plus size={20} />
              Add Patient
            </Button>
          </Col>
        </Row>

        {/* Search & Filter Bar */}
        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterBloodGroup={filterBloodGroup}
          setFilterBloodGroup={setFilterBloodGroup}
          filterGender={filterGender}
          setFilterGender={setFilterGender}
        />

        {/* Patients Table */}
        <Card className="shadow-sm mb-4">
          <div className="table-responsive">
            <Table hover className="mb-0" align="middle">
              <thead className="table-light">
                <tr>
                  <th>Profile</th>
                  <th>Patient ID</th>
                  <th>Age/Gender</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <React.Fragment key={patient.id}>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="avatar-circle-small bg-primary text-white">
                            {patient.avatar}
                          </div>
                          <div>
                            <div className="fw-bold">{patient.name}</div>
                            <small className="text-muted">{patient.gender}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <code className="text-muted">{patient.patientId}</code>
                      </td>
                      <td>
                        <span>{patient.age} yrs / {patient.gender}</span>
                      </td>
                      <td>
                        <Badge bg={bloodGroupColors[patient.bloodGroup]} className="rounded-pill">
                          {patient.bloodGroup}
                        </Badge>
                      </td>
                      <td>
                        <Badge
                          bg={patient.automatedReminders ? 'success' : 'secondary'}
                          className="rounded-pill"
                        >
                          {patient.automatedReminders ? '✓ Reminders On' : '✗ Reminders Off'}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleViewHistory(patient)}
                          className="me-2"
                        >
                          <Eye size={16} className="me-1" />
                          View History
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => toggleRowExpand(patient.id)}
                        >
                          {expandedRows[patient.id] ? '▼' : '▶'}
                        </Button>
                      </td>
                    </tr>
                    {/* Expanded Row - Quick Preview */}
                    <tr>
                      <td colSpan="6" className="p-0">
                        <Collapse in={expandedRows[patient.id]}>
                          <Card className="border-0 bg-light m-2">
                            <Card.Body>
                              <Row>
                                <Col md={6}>
                                  <strong>Contact:</strong>
                                  <div>{patient.phone}</div>
                                  <div>{patient.email}</div>
                                </Col>
                                <Col md={6}>
                                  {patient.allergies.length > 0 && (
                                    <div>
                                      <strong className="text-danger">⚠ Allergies:</strong>
                                      <div>{patient.allergies.join(', ')}</div>
                                    </div>
                                  )}
                                  {patient.allergies.length === 0 && (
                                    <div className="text-muted">No known allergies</div>
                                  )}
                                </Col>
                              </Row>
                            </Card.Body>
                          </Card>
                        </Collapse>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>

        {filteredPatients.length === 0 && (
          <div className="text-center py-5">
            <Search size={48} className="text-muted mb-3" />
            <h5 className="text-muted">No patients found</h5>
            <p className="text-muted small">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Medical History Offcanvas */}
        <MedicalHistoryOffcanvas
          show={showOffcanvas}
          handleClose={() => setShowOffcanvas(false)}
          patient={selectedPatient}
          onUpdateReminders={handleUpdateReminders}
        />
      </Container>
    </Layout>
  );
};

export default AdminPatients;
