import { useState, useEffect } from 'react';
import { Package, MapPin, AlertCircle, Package2, Loader2 } from 'lucide-react';

export default function ExitRegistrationForm({ formData, setFormData, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productos, setProductos] = useState([]);
  const [puntosVenta, setPuntosVenta] = useState([]);
  const [stockDisponible, setStockDisponible] = useState(0);
  const [error, setError] = useState('');

  // 1. Cargar productos y puntos de venta al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError('');
        // Cargar productos
        const resProductos = await fetch('http://localhost:8081/api/productos/Listar');
        if (resProductos.ok) {
          const dataProd = await resProductos.json();
          setProductos(Array.isArray(dataProd) ? dataProd : []);
        } else {
          console.error('Error en respuesta de productos');
        }

        // Cargar puntos de venta
        const resPuntos = await fetch('http://localhost:8081/api/geolocalizacion/puntos');
        if (resPuntos.ok) {
          const dataPuntos = await resPuntos.json();
          setPuntosVenta(Array.isArray(dataPuntos) ? dataPuntos : []);
        } else {
          console.error('Error en respuesta de puntos de venta');
        }
      } catch (err) {
        console.error('Error cargando datos:', err);
        setError('No se pudo conectar con el backend. Asegúrate de que Spring Boot esté corriendo.');
      }
    };
    fetchData();
  }, []);
useEffect(() => {
    if (formData.idProducto) {
      // 💡 Cambiamos a == para que compare "1" con 1 correctamente
      const producto = productos.find(p => p.idproducto == formData.idProducto);
      
      if (producto) {
        console.log("📦 Producto encontrado con éxito:", producto);
        // Captura el stock real mapeado directamente desde tu entidad de Java
        setStockDisponible(producto.stock ?? 0);
      } else {
        setStockDisponible(0);
      }
    } else {
      setStockDisponible(0);
    }
  }, [formData.idProducto, productos]);
  // 3. Manejador de cambios en los inputs (¡Restaurado!)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(''); // Limpia mensajes previos al escribir
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 4. Validaciones de negocio antes de disparar el POST
  const validateForm = () => {
    if (!formData.idProducto) {
      setError('Debe seleccionar un producto de los almacenes');
      return false;
    }
    if (!formData.idPuntoVenta) {
      setError('Debe seleccionar un punto de venta destino');
      return false;
    }
    if (!formData.cantidad || parseInt(formData.cantidad) <= 0) {
      setError('La cantidad a retirar debe ser mayor a 0');
      return false;
    }
    if (parseInt(formData.cantidad) > stockDisponible) {
      setError(`Stock insuficiente en inventario. Máximo disponible: ${stockDisponible} unidades`);
      return false;
    }
    if (!formData.motivo) {
      setError('Debe seleccionar un motivo válido para la salida');
      return false;
    }
    return true;
  };

  // 5. Envío de la transacción al backend
  const handleSave = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8081/api/salidas/guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idProducto: parseInt(formData.idProducto),
          idPuntoVenta: parseInt(formData.idPuntoVenta),
          cantidad: parseInt(formData.cantidad),
          motivo: formData.motivo
        }),
      });

      if (response.ok) {
        setError('');
        if (onSuccess) onSuccess();
      } else {
        const errorText = await response.text();
        setError(errorText || 'Error en las reglas de negocio del servidor');
      }
    } catch (error) {
      setError('Error en la red. No se pudo procesar la transacción.');
      console.error("Error enviado:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-white/20">
      <div className="bg-[#1a4d3a] p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
            <Package className="w-8 h-8 text-[#499D81]" />
          </div>
          <h3 className="text-3xl font-black tracking-tight">Registrar Salida</h3>
          <p className="text-white/60 text-sm font-medium mt-2">Complete los detalles de la salida de productos</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="p-10 space-y-8">
        {/* Mensaje de Alerta */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-[20px] p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-bold text-red-700">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Selector de Productos */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Producto</label>
            <div className="relative">
              <Package className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <select
  name="idProducto"
  required
  disabled={isSubmitting || productos.length === 0}
  className="w-full bg-slate-50 border border-slate-100 rounded-[24px] pl-14 pr-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#499D81]/10 focus:border-[#499D81] transition-all disabled:opacity-50"
  value={formData.idProducto || ''}
  onChange={handleChange}
>
  <option value="">-- Seleccionar producto --</option>
  {productos.map(p => (
    <option key={`prod-${p.idproducto}`} value={p.idproducto}>
      {p.nombre} 
     </option>
        ))}
            </select>
            </div>
          </div>

          {/* Selector de Puntos de Venta */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Punto de Venta Destino</label>
            <div className="relative">
              <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <select
                name="idPuntoVenta"
                required
                disabled={isSubmitting || puntosVenta.length === 0}
                className="w-full bg-slate-50 border border-slate-100 rounded-[24px] pl-14 pr-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#499D81]/10 focus:border-[#499D81] transition-all disabled:opacity-50"
                value={formData.idPuntoVenta || ''}
                onChange={handleChange}
              >
                <option value="">-- Seleccionar destino --</option>
                {puntosVenta.map((p, index) => {
                  const idPunto = p.id || p.idPuntoVenta || index;
                  return (
                    <option key={`pnto-${idPunto}`} value={idPunto}>
                      {p.Lugar || p.nombre}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Input de Cantidad */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Cantidad</label>
              {stockDisponible > 0 && (
                <span className="text-xs font-bold text-[#499D81] bg-green-50 px-3 py-1 rounded-full">Disponible: {stockDisponible}</span>
              )}
            </div>
            <div className="relative">
              <Package2 className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="number"
                name="cantidad"
                required
                disabled={isSubmitting || !formData.idProducto}
                min="1"
                max={stockDisponible > 0 ? stockDisponible : 9999}
                className="w-full bg-slate-50 border border-slate-100 rounded-[24px] pl-14 pr-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#499D81]/10 focus:border-[#499D81] transition-all disabled:opacity-50"
                placeholder={stockDisponible > 0 ? `Máx. ${stockDisponible}` : "Ej: 50"}
                value={formData.cantidad || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Selector de Motivos */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Motivo de Salida</label>
            <div className="relative">
              <select
                name="motivo"
                required
                disabled={isSubmitting}
                className="w-full bg-slate-50 border border-slate-100 rounded-[24px] pl-6 pr-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#499D81]/10 focus:border-[#499D81] transition-all disabled:opacity-50"
                value={formData.motivo || ''}
                onChange={handleChange}
              >
                <option value="">-- Seleccionar motivo --</option>
                <option value="VENTA">VENTA</option>
                <option value="TRANSFERENCIA">TRANSFERENCIA</option>
                <option value="DESCARTE">DESCARTE</option>
                <option value="AJUSTE">AJUSTE</option>
                <option value="DEVOLUCION">DEVOLUCIÓN</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-4 flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting || productos.length === 0 || puntosVenta.length === 0}
            className="flex-1 bg-[#1a4d3a] hover:bg-[#143c2d] text-white px-10 py-5 rounded-[24px] text-sm font-black shadow-xl shadow-green-900/20 active:scale-95 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                REGISTRANDO...
              </>
            ) : (
              'REGISTRAR SALIDA'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}