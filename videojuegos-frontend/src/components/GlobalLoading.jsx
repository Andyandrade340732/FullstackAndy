import { useSelector } from "react-redux";

const GlobalLoading = () => {
  const count = useSelector((state) => state.loadingSlice.count);

  if (count === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 9999,
      }}
    >
      <div>Cargando...</div>
    </div>
  );
};

export default GlobalLoading;