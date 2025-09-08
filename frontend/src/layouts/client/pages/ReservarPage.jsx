import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ReservaModal } from "../components/ReservaModal";
import "../../../styles/Reservar.css";
import {
  getAllTables,
  getRestaurantHours,
  createReservation,
  getStatus,
} from "../../../api/reservationApi";
import toast from "react-hot-toast";
import {
  deleteReservation,
  updateReservation,
} from "../../../api/reservationApi";
import { TableIcon } from "./TableIcon";

export function ReservarPage() {
  const token = useSelector((state) => state.auth.token);
  const customerId = useSelector((state) => state.auth.customer?.id);
  const [tables, setTables] = useState([]);
  const [location, setLocation] = useState("Primer piso");

  const tablesFiltered = tables.filter((table) =>
    location ? table.location === location : true
  );

  const [horarios, setHorarios] = useState({ open: "", close: "" });
  const [defaultStatus, setDefaultStatus] = useState(null);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllTables().then((res) => setTables(res.data || res));
    getRestaurantHours().then((res) =>
      setHorarios({
        open: res.data?.open_time || res.open_time,
        close: res.data?.close_time || res.close_time,
      })
    );
  }, []);

  useEffect(() => {
    getStatus().then((res) => {
      const reserved = res.data.find((s) => s.name === "Reserved");
      setDefaultStatus(reserved?.id);
    });
  }, []);

  if (!token) return <Navigate to="/login" />;

  const handleClick = (table) => {
    if (table.status !== "Reserved") {
      setMesaSeleccionada(table);
      setShowModal(true);
    }
  };

  const realizarReserva = async (peopleCount) => {
    if (!peopleCount || !mesaSeleccionada || !customerId) {
      toast.error("Faltan datos para la reserva");
      return;
    }

    // Validar capacidad máxima
    if (peopleCount > mesaSeleccionada.capacity) {
      toast.error(
        `Esta table solo tiene capacidad para ${mesaSeleccionada.capacity} personas`
      );
      return;
    }

    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const timeStr = now.toTimeString().split(":").slice(0, 2).join(":");
    const reservation_date = `${dateStr}T${timeStr}:00`;

    try {
      // 1. Actualización optimista
      setTables((prev) =>
        prev.map((m) =>
          m.id === mesaSeleccionada.id
            ? {
                ...m,
                is_reserved: true,
                status: "Reserved",
              }
            : m
        )
      );

      // 2. Crear reserva en backend
      const response = await createReservation({
        customer: customerId,
        table: mesaSeleccionada.id,
        reservation_date,
        duration: 60,
        group_size: parseInt(peopleCount),
        special_requests: "",
        status: defaultStatus, // Estado "Reserved"
      });

      toast.success("Mesa reservada exitosamente");
      setShowModal(false);
      setMesaSeleccionada(null);

      // 3. Actualizar solo la table afectada en lugar de todas
      setTables((prev) =>
        prev.map((m) =>
          m.id === mesaSeleccionada.id
            ? {
                ...m,
                is_reserved: true,
                status: "Reserved",
                // Añade cualquier otro campo que devuelva el backend
                ...(response.data?.table || {}),
              }
            : m
        )
      );
    } catch (error) {
      // Revertir en caso de error
      setTables((prev) =>
        prev.map((m) =>
          m.id === mesaSeleccionada.id
            ? {
                ...m,
                is_reserved: false,
                status: "Available",
              }
            : m
        )
      );
      toast.error("Error al reservar table");
      console.error("Error detallado:", {
        message: error.message,
        response: error.response?.data,
        stack: error.stack,
      });
    }
  };

  const cancelReservation = async (reservationId, mesaId) => {
    try {
      await deleteReservation(reservationId);
      toast.success("Reserva cancelada");

      setTables((prev) =>
        prev.map((m) => (m.id === mesaId ? { ...m, is_reserved: false } : m))
      );
    } catch (error) {
      toast.error("Error al cancelar la reserva");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <>
      <div className="container mt-5 bg-light p-4 rounded">
        <h2 className="text-center mb-4">Selecciona tu table</h2>
        <div className="text-center mb-3">
          <label htmlFor="location" className="form-label">
            Ubicacion:
          </label>
          <select
            id="location"
            className="form-select w-auto mx-auto"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Selecciona una ubicacion"
          >
            <option value="">--</option>
            <option value="Primer piso">Primer piso</option>
            <option value="Segundo piso">Segundo piso</option>
            <option value="Terraza">Terraza</option>
          </select>
        </div>
        <div className="d-flex justify-content-center">
          {tablesFiltered.map((table) => (
            <div key={table.id} className="table-wrapper">
              <div
                className={`table-cuadro ${
                  table.status === "Reserved" ? "reserved-table" : "free-table"
                }`}
                onClick={() => handleClick(table)}
              >
                <TableIcon />
              </div>
              <h4 className="table-numero">T-{table.number}</h4>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <ReservaModal
          table={mesaSeleccionada}
          onClose={() => setShowModal(false)}
          onReservar={realizarReserva}
        />
      )}
    </>
  );
}
