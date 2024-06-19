import "normalize.css";
import { useEffect, useState } from "react";

const installationQuality = [
  {
    title: "Отличное (почти без отходов)",
    errorRate: 5,
  },
  {
    title: "Обычное (стандартное количество отходов)",
    errorRate: 15,
  },
  {
    title: "Плохое (много отходов)",
    errorRate: 25,
  },
];

const sizeThreadedStud = [
  {
    studDiameter: 6,
    drillDiameter: 8,
  },
  {
    studDiameter: 8,
    drillDiameter: 10,
  },
  {
    studDiameter: 10,
    drillDiameter: 12,
  },
  {
    studDiameter: 12,
    drillDiameter: 14,
  },
  {
    studDiameter: 14,
    drillDiameter: 16,
  },
  {
    studDiameter: 16,
    drillDiameter: 18,
  },
  {
    studDiameter: 20,
    drillDiameter: 24,
  },
  {
    studDiameter: 24,
    drillDiameter: 28,
  },
  {
    studDiameter: 27,
    drillDiameter: 32,
  },
  {
    studDiameter: 30,
    drillDiameter: 35,
  },
  {
    studDiameter: 36,
    drillDiameter: 40,
  },
  {
    studDiameter: 38,
    drillDiameter: 42,
  },
  {
    studDiameter: 40,
    drillDiameter: 44,
  },
  {
    studDiameter: 42,
    drillDiameter: 46,
  },
  {
    studDiameter: 46,
    drillDiameter: 50,
  },
  {
    studDiameter: 48,
    drillDiameter: 52,
  },
  {
    studDiameter: 50,
    drillDiameter: 54,
  },
  {
    studDiameter: 52,
    drillDiameter: 56,
  },
  {
    studDiameter: 60,
    drillDiameter: 64,
  },
  {
    studDiameter: 62,
    drillDiameter: 66,
  },
];

const Cartridge = [
  {
    volume: 300,
  },
  {
    volume: 385,
  },
  {
    volume: 410,
  },
  {
    volume: 585,
  },
  {
    volume: 600,
  },
];

function App() {
  const [validation, setValidation] = useState(false);
  const [calculation, setCalculation] = useState(false);
  const [depth, setDepth] = useState();
  const [quantityPoints, setQuantityPoints] = useState();
  const [studDiameter, setStudDiameter] = useState();
  const [drillDiameter, setDrillDiameter] = useState();
  const [cartridgeVolume, setCartridgeVolume] = useState();
  const [quality, setQuality] = useState();
  const [titleQuality, setTitleQuality] = useState();
  const [isMobile, setIsMobile] = useState();
  const [checkFilling, setCheckFilling] = useState(true);

  //Phind. Не смотреть на этот useEffect (дизайн будет изменяться по любому)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (
      titleQuality &&
      quantityPoints &&
      depth &&
      studDiameter &&
      cartridgeVolume
    ) {
      setValidation(true);
    } else {
      setValidation(false);
      setCalculation(false);
    }
  }, [titleQuality, quantityPoints, depth, studDiameter, cartridgeVolume]);

  const expenditure =
    ((((drillDiameter + 0.4) / 2) ** 2 * Math.PI * depth) / 1000 / 3) *
    2 *
    (1 + quality / 100);
  const numberPoints = cartridgeVolume / expenditure;
  const numberCartridges = (quantityPoints * expenditure) / cartridgeVolume;

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "") {
      setStudDiameter("");
    }
    const selectedStud = sizeThreadedStud.find(
      (stud) => stud.studDiameter.toString() === selectedValue
    );

    if (selectedStud) {
      const [foundStudDiameter, foundDrillDiameter] =
        Object.values(selectedStud);
      setStudDiameter(foundStudDiameter);
      setDrillDiameter(foundDrillDiameter);
    }
  };

  const findInstallationQuality = (e) => {
    const selectedErrorRate = e.target.value;
    if (selectedErrorRate === "") {
      // setValidation(false);
      // setCalculation(false);
      setTitleQuality("");
    }
    const selectedQuality = installationQuality.find(
      (quality) => quality.errorRate.toString() === selectedErrorRate
    );

    if (selectedQuality) {
      const [title, errorRate] = Object.values(selectedQuality);
      setTitleQuality(title);
      setQuality(errorRate);
    }
  };

  return (
    <div
      style={{
        maxWidth: "1240px",
        margin: "0 auto",
        fontFamily: "Roboto",
        fontSize: "16px",
      }}
    >
      <div style={{ margin: "1.5rem", marginTop: "0" }}>
        {/* TITLE */}
        <div
          style={{ display: "flex", flexDirection: "column", color: "#002421" }}
        >
          <h1 style={{ fontWeight: "700", fontSize: "2rem" }}>
            Калькулятор расхода химических анкеров
          </h1>
          <p style={{ fontWeight: "400", fontSize: "1rem" }}>
            Расход для полнотелых и пустотелых материалов в зависимости от
            используемой шпильки, качества монтажа и других параметров.
          </p>
        </div>
        {/* КАЧЕСТВО МОНТАЖА */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2
            style={{ fontWeight: "700", fontSize: "1.5rem", color: "#686868" }}
          >
            Качество монтажа
          </h2>
          <select
            name="installationQuality"
            style={{
              maxWidth: "400px",
              height: "30px",
              padding: "4px 6px",
              border:
                checkFilling || quality
                  ? "1px solid rgba(104, 104, 104, 0.5)"
                  : "1px solid red",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
              color: "#686868",
              outline: "none",
            }}
            onChange={findInstallationQuality}
          >
            <option value={""}>Требуемое качество</option>
            {installationQuality.map(({ errorRate, title }, index) => (
              <option key={index} value={errorRate}>
                {title}
              </option>
            ))}
          </select>
        </div>
        {/* КОЛИЧЕСТВО ТОЧЕК */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2
            style={{ fontWeight: "700", fontSize: "1.5rem", color: "#686868" }}
          >
            Количество точек
          </h2>
          <input
            type="number"
            min={0}
            style={{
              color: "#686868",
              width: "8rem",
              padding: "6px",
              background: "#d9d9d9",
              border:
                checkFilling || quantityPoints
                  ? "1px solid rgba(104, 104, 104, 0.5)"
                  : "1px solid red",
              borderRadius: "5px",
              boxSizing: "border-box",
              outline: "none",
            }}
            onChange={(e) => setQuantityPoints(e.target.value)}
          ></input>
        </div>
        {/* РЕЗЬБОВАЯ ШПИЛЬКА */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2
            style={{ fontWeight: "700", fontSize: "1.5rem", color: "#686868" }}
          >
            Резьбовая шпилька
          </h2>
          <select
            name="sizeThreadedStud"
            style={{
              maxWidth: "400px",
              height: "30px",
              padding: "4px 6px",
              border:
                checkFilling || studDiameter
                  ? "1px solid rgba(104, 104, 104, 0.5)"
                  : "1px solid red",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
              color: "#686868",
              outline: "none",
            }}
            onChange={handleChange}
          >
            <option value={""}>Выберите размер</option>
            {sizeThreadedStud.map(({ studDiameter }, index) => (
              <option key={index} value={studDiameter}>
                M {studDiameter}
              </option>
            ))}
          </select>
        </div>
        {/* ГЛУБИНА ОТВЕРСТИЯ */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2
            style={{ fontWeight: "700", fontSize: "1.5rem", color: "#686868" }}
          >
            Глубина отверстия, мм
          </h2>
          <input
            type="number"
            min={0}
            style={{
              color: "#686868",
              width: "8rem",
              padding: "6px",
              background: "#d9d9d9",
              border:
                checkFilling || depth
                  ? "1px solid rgba(104, 104, 104, 0.5)"
                  : "1px solid red",
              borderRadius: "5px",
              boxSizing: "border-box",
              outline: "none",
            }}
            onChange={(e) => setDepth(e.target.value)}
          ></input>
        </div>
        {/* КАРТРИДЖ */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2
            style={{ fontWeight: "700", fontSize: "1.5rem", color: "#686868" }}
          >
            Картридж
          </h2>
          <select
            id="cartridgeVolume"
            style={{
              maxWidth: "400px",
              height: "30px",
              padding: "4px 6px",
              border:
                checkFilling || cartridgeVolume
                  ? "1px solid rgba(104, 104, 104, 0.5)"
                  : "1px solid red",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
              color: "#686868",
              outline: "none",
            }}
            onChange={(e) => {
              setCartridgeVolume(e.target.value);
            }}
          >
            <option value={""}>Выберите объем</option>
            {Cartridge.map(({ volume }, index) => (
              <option key={index} value={volume}>
                {volume} мл
              </option>
            ))}
          </select>
        </div>
        <div style={{ margin: "1.5rem 0" }}>
          <button
            style={{
              fontWeight: "700",
              padding: "0.75rem 1.75rem",
              borderRadius: "2rem",
              border: "2px solid transparent",
              cursor: validation ? "pointer" : "no-drop",
              color: "#ffffff",
              background: "#0057ff",
              opacity: validation ? "1" : "0.5",
            }}
            onClick={() => {
              if (validation) {
                setCalculation(true);
                setCheckFilling(false);
              }
              setCheckFilling(false);
            }}
          >
            РАССЧИТАТЬ
          </button>
        </div>
        {calculation ? (
          <div>
            <h3
              style={{
                fontWeight: "700",
                fontSize: "1.5rem",
                marginBottom: "10px",
              }}
            >
              Расчёт расхода химических анкеров для полнотелых материалов
            </h3>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                <p>
                  Качество монтажа:
                  <b> {titleQuality}</b>
                </p>
                <p>
                  Количество точек: <b>{quantityPoints}</b>
                </p>
                <p>
                  Диаметр шпильки: <b>M{studDiameter}</b>
                </p>
                <p>
                  Глубина отверстия: <b>{depth} мм</b>
                </p>
                <p>
                  Диаметр бура: <b>{drillDiameter} мм</b>
                </p>

                <p>
                  Расход на одну точку: <b>{expenditure.toFixed(2)} мл</b>
                </p>
                <p>
                  Количество точек на 1 картридж:{" "}
                  <b>{numberPoints.toFixed(2)}</b>
                </p>
                <p>
                  Количество картриджей: <b>{Math.ceil(numberCartridges)}</b>
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0 30px 0 auto",
                  position: isMobile ? "absolute" : "inherit",
                  right: "-10px",
                }}
              >
                <a
                  href="https://t.me/nrgmru"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/telegram.png"
                    alt="Помощник с вопросом"
                    style={{ maxWidth: "100px" }}
                  />
                </a>
                {/* <p style={{ margin: "0", color: "#27a7e7" }}>
                  Помогу с выбором
                </p> */}
              </div>
            </div>
            {/* <div
              style={{
                display: isMobile ? "flex" : "flex",
                justifyContent: "center",
                background: "#27a7e7",
                color: "white",
                maxWidth: "200px",
              }}
            >
              <a
                href="https://t.me/nrgmru"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "white" }}
              >
                Помогу с выбором
              </a>
            </div> */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "1px solid black",
                marginTop: "16px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  background: "#0057ff",
                  color: "white",
                  textAlign: "center",
                  lineHeight: "1.5",
                }}
              >
                Схема установки
              </div>
              <div
                style={{
                  padding: "8px",
                  width: "80%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src="/installAnchor.png"
                  alt="Схема установки"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
