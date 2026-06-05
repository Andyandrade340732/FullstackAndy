import { useSelector } from "react-redux";

const InformeUso = () => {
  const usuario = useSelector((state) => state.authSlice.usuario);
  const juegos = useSelector((state) => state.juegosSlice);

  if (!usuario) return null;

  const esPlus = usuario.plan === "plus";
  const limite = 4;
  const cantidad = juegos.length;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Informe de uso</h5>
        {esPlus ? (
          <>
            <p>{cantidad} de {limite} juegos</p>
            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: `${Math.min((cantidad / limite) * 100, 100)}%` }}
              >
                {Math.min(Math.round((cantidad / limite) * 100), 100)}%
              </div>
            </div>
          </>
        ) : (
          <p>Tenés <strong>{cantidad}</strong> juegos (premium - ilimitado)</p>
        )}
      </div>
    </div>
  );
};

export default InformeUso;