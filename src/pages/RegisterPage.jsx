import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../atoms/Input.jsx';
import Select from '../atoms/Select.jsx';
import Button from '../atoms/Button.jsx';
import Card from '../atoms/Card.jsx';
import { getRegions, register } from '../services/authService.js';

// Dominios permitidos para el correo
const ALLOWED_DOMAINS = ['duoc.cl', 'admin.cl'];

export default function RegisterPage() {
  const navigate = useNavigate();

  const [run, setRun] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [direccion, setDireccion] = useState('');
  const [regiones, setRegiones] = useState([]);
  const [regionId, setRegionId] = useState('');
  const [comuna, setComuna] = useState('');

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const data = await getRegions();
        setRegiones(data);
        if (data.length > 0) {
          setRegionId(data[0].id || '');
          setComuna(data[0].comunas?.[0] || '');
        }
      } catch (err) {
        alert('No se pudieron cargar las regiones.');
      }
    };

    fetchRegions();
  }, []);

  const selectedRegion = regiones.find((r) => r.id === regionId);

  // Verifica dominio del correo
  const emailDomainValid = (email) => {
    const match = email.toLowerCase().match(/@([^@]+)$/);
    return match ? ALLOWED_DOMAINS.includes(match[1]) : false;
  };

  // Cambio de región → actualiza comunas
  const handleRegionChange = (e) => {
    const nuevaRegionId = e.target.value;
    setRegionId(nuevaRegionId);
    const regionObj = regiones.find((r) => r.id === nuevaRegionId);
    setComuna(regionObj?.comunas?.[0] || '');
  };

  // Registro
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailDomainValid(correo)) {
      alert(`El correo debe pertenecer a: ${ALLOWED_DOMAINS.join(', ')}`);
      return;
    }
    if (!password || password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (!selectedRegion) {
      alert('Selecciona una región válida.');
      return;
    }

    try {
      const payload = {
        nombre: nombres,
        apellido: apellidos,
        rut: run,
        direccion,
        region: selectedRegion,
        comuna,
        email: correo,
        password,
      };

      await register(payload);
      alert('Registro exitoso. Inicia sesión para continuar.');
      navigate('/login');

      setRun('');
      setNombres('');
      setApellidos('');
      setCorreo('');
      setPassword('');
      setDireccion('');
      setRegionId(regiones[0]?.id || '');
      setComuna(regiones[0]?.comunas?.[0] || '');
    } catch (err) {
      const status = err?.response?.status;
      let message = 'No se pudo registrar.';
      if (status === 409) message = 'El correo ya está registrado.';
      else if (status === 400) message = 'Datos inválidos. Revisa los campos ingresados.';
      else if (status === 404) message = 'Región o comuna inválida.';
      alert(message);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <Card style={{ maxWidth: '500px' }}>
        <form onSubmit={handleSubmit}>
          <Input label="RUN (sin puntos ni guion)" type="text" value={run} onChange={(e) => setRun(e.target.value)} required />
          <Input label="Nombres" type="text" value={nombres} onChange={(e) => setNombres(e.target.value)} required />
          <Input label="Apellidos" type="text" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
          <Input label="Correo (solo @duoc.cl o @admin.cl)" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="usuario@duoc.cl" required />
          <Input label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" required />
          <Input label="Dirección" type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />

          <Select
            label="Región"
            options={regiones.map((r) => ({ value: r.id, label: r.nombre }))}
            value={regionId}
            onChange={handleRegionChange}
          />

          <Select
            label="Comuna"
            options={(selectedRegion?.comunas || []).map((c) => ({ value: c, label: c }))}
            value={comuna}
            onChange={(e) => setComuna(e.target.value)}
          />

          <Button type="submit" style={{ width: '100%' }}>
            Registrarme
          </Button>
        </form>
      </Card>
    </div>
  );
}