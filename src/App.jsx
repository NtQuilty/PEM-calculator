import "normalize.css";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (quantityPoints && depth && studDiameter && cartridgeVolume) {
      setValidation(true);
    } else {
      setValidation(false);
      setCalculation(false);
    }
  }, [quantityPoints, depth, studDiameter, cartridgeVolume]);

  const result =
    ((((drillDiameter + 0.4) / 2) ** 2 * Math.PI * depth) / 1000 / 3) *
    2 *
    1.05;
  const result2 = cartridgeVolume / result;
  const result3 = (quantityPoints * result) / cartridgeVolume;

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "") {
      setValidation(false);
      setCalculation(false);
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
        {/* КОЛИЧЕСТВО ТОЧЕК */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2
            style={{ fontWeight: "700", fontSize: "1.5rem", color: "#686868" }}
          >
            Количество точек
          </h2>
          <input
            style={{
              color: "#686868",
              width: "8rem",
              padding: "6px",
              background: "#d9d9d9",
              border: "1px solid rgba(104, 104, 104, 0.5)",
              borderRadius: "5px",
              boxSizing: "border-box",
              outline: "none",
            }}
            onFocus={(e) =>
              (e.target.style.boxShadow =
                "inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6)")
            }
            onBlur={(e) =>
              (e.target.style.boxShadow =
                "inset 0 1px 1px rgba(0, 0, 0, 0.075)")
            }
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
              border: "1px solid rgba(104, 104, 104, 0.5)",
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
            style={{
              color: "#686868",
              width: "8rem",
              padding: "6px",
              background: "#d9d9d9",
              border: "1px solid rgba(104, 104, 104, 0.5)",
              borderRadius: "5px",
              boxSizing: "border-box",
              outline: "none",
            }}
            onFocus={(e) =>
              (e.target.style.boxShadow =
                "inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6)")
            }
            onBlur={(e) =>
              (e.target.style.boxShadow =
                "inset 0 1px 1px rgba(0, 0, 0, 0.075)")
            }
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
              border: "1px solid rgba(104, 104, 104, 0.5)",
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
            onClick={() => (validation ? setCalculation(true) : "")}
          >
            РАССЧИТАТЬ
          </button>
        </div>
        {calculation ? (
          <div>
            <div>
              <h3
                style={{
                  fontWeight: "700",
                  fontSize: "1.5rem",
                  margin: "1.5rem 0",
                }}
              >
                Расчёт расхода химических анкеров для полнотелых материалов
              </h3>
              <p>
                Качество монтажа:
                <b> Отличное (почти без отходов)</b>
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
                Расход на одну точку: <b>{result.toFixed(2)} мл</b>
              </p>
              <p>
                Количество точек на 1 баллон: <b>{result2.toFixed(2)}</b>
              </p>
              <p>
                Количество баллонов: <b>{result3.toFixed(0)}</b>
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "1px solid black",
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
