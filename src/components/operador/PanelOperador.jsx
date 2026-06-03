import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DevolucionManagement from '../devoluciones/DevolucionManagement';
import PanelOperadorMovimientos from '../movimientos/PanelOperadorMovimientos';
import PanelOperadorAlmacenes from '../almacen/PanelOperadorAlmacenes';
import PanelOperadorReportes from './PanelOperadorReportes';

const PanelOperador = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('Movimientos');

  const handleNavigation = (viewId, path) => {
    if (path) {
      navigate(path);
    } else {
      setActiveView(viewId);
    }
  };

  const renderView = () => {
    switch (activeView) {
      case 'Devoluciones':
        return <DevolucionManagement />;
      default:
        return <DevolucionManagement />;
    }
  };

  return renderView();
};

export default PanelOperador;
