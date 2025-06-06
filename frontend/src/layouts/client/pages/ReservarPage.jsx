import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import "../../../styles/Reservar.css";
import {
  getAllTables,
  getRestaurantHours,
  createReservation,
} from "../../../api/reservationApi";
import toast from "react-hot-toast";

export function ReservarPage() {
  const token = useSelector((state) => state.auth.token);
  const customerId = useSelector((state) => state.auth.customer?.id);
  const [mesas, setMesas] = useState([]);
  const [selectedMesaId, setSelectedMesaId] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState("");
  const [horarios, setHorarios] = useState({ open: "", close: "" });

  useEffect(() => {
    getAllTables().then((res) => setMesas(res.data || res));
    getRestaurantHours().then((res) =>
      setHorarios({
        open: res.data?.open_time || res.open_time,
        close: res.data?.close_time || res.close_time,
      })
    );
  }, []);

  if (!token) return <Navigate to="/login" />;

  // 🔽 CAMBIO COMIENZA AQUÍ: handleReserva corregido
  const handleReserva = async () => {
    if (!selectedMesaId || !date || !time || !people) {
      toast.error("Completa todos los campos");
      return;
    }

    const reservation_date = `${date}T${time}:00`;

    try {
      console.log("Customer ID usado en reserva:", customerId);

      await createReservation({
        customer: customerId, // UUID del modelo Customer
        table: selectedMesaId,
        reservation_date,
        duration: 60, // minutos
        group_size: parseInt(people),
        special_requests: "",
        status: "33c7bd16-ff5b-467b-a548-bdd0397b1caa", // 👈 DEBES REEMPLAZAR CON EL UUID REAL
      });

      toast.success("Mesa reservada exitosamente");
      setMesas((prev) =>
        prev.map((mesa) =>
          mesa.id === selectedMesaId ? { ...mesa, is_reserved: true } : mesa
        )
      );
      setSelectedMesaId(null);
    } catch (error) {
      console.error("Error al reservar:", {
        data: error.response?.data,
        status: error.response?.status,
        request: error.request,
        message: error.message,
      });
      toast.error("Error al reservar mesa");
    }
  };
  // 🔼 CAMBIO TERMINA AQUÍ

  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Selecciona tu mesa</h2>
        <div className="mesas-container">
          {mesas.map((mesa) => {
            const isSelected = mesa.id === selectedMesaId;
            return (
              <div
                key={mesa.id}
                className={`mesa-cuadro ${
                  mesa.is_reserved || isSelected
                    ? "mesa-reservada"
                    : "mesa-libre"
                }`}
                onClick={() =>
                  !mesa.is_reserved ? setSelectedMesaId(mesa.id) : null
                }
              >
                Mesa {mesa.number}
              </div>
            );
          })}
        </div>

        <div className="mt-5">
          <h4 className="text-center mb-3">Detalles de la reserva</h4>
          <div className="row justify-content-center">
            <div className="col-md-3 mb-3">
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="col-md-3 mb-3">
              <input
                type="time"
                className="form-control"
                min={horarios.open}
                max={horarios.close}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="col-md-3 mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Número de personas"
                min="1"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
              />
            </div>
            <div className="col-md-3 mb-3">
              <button className="btn btn-success w-100" onClick={handleReserva}>
                Reservar Mesa
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
