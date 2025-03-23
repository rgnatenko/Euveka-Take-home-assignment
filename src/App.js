import { useState } from "react";
import { inputs } from "./mock/inputs";
import { toast, ToastContainer } from "react-toastify";
import classNames from "classnames";

export default function DeviceControl() {
  const [params, setParams] = useState({
    red: 0,
    green: 0,
    blue: 0,
    shape: 0,
  });
  const [savedConfigs, setSavedConfigs] = useState(
    JSON.parse(localStorage.getItem("configs")) || {}
  );
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let numValue = Number(value);

    if (name === "red" || name === "green" || name === "blue") {
      numValue = Math.max(0, Math.min(255, numValue));
    }

    if (name === "shape") {
      numValue = Math.max(0, Math.min(2, numValue));
    }

    setParams({ ...params, [name]: numValue });
  };

  const saveConfig = () => {
    const name = prompt("Enter a name for this configuration:");
    if (name) {
      const updatedConfigs = { ...savedConfigs, [name]: params };
      setSavedConfigs(updatedConfigs);
      localStorage.setItem("configs", JSON.stringify(updatedConfigs));
    }
  };

  const loadConfig = (name) => {
    setParams(savedConfigs[name]);
    setSelectedConfig(name);
  };

  const sendToDevice = () => {
    setLoading(true);

    const success = Math.random() > 0.2;

    setTimeout(() => {
      success
        ? toast.success("Parameters sent successfully!")
        : toast.error("Failed to send parameters.");
      setLoading(false);
    }, 2000);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <>
      <div className="p-6 text-center">
        <h1 className="text-5xl font-bold mb-4 text-blue-500">
          Device Control
        </h1>
        <div class="grid lg:grid-cols-2 sm:px-12 md:px-24 lg:px-0 max-w-[1000px] mx-auto mt-16 gap-12">
          <div className="flex flex-col gap-6 mb-4">
            {inputs.map((input) => (
              <div
                key={input.name}
                className={`text-left flex flex-col text-${input.name}-500`}
              >
                <p className={input.labelClassName}>{input.label}:</p>
                <input
                  type={input.type}
                  name={input.name}
                  min={input.min}
                  max={input.max}
                  step={input?.step}
                  value={params[input.name]}
                  onChange={handleChange}
                  className={input.className}
                />
                {input.subText && (
                  <p className="text-gray-400 text-[12px] mt-1">
                    ({input.subText})
                  </p>
                )}
              </div>
            ))}

            <div class="flex gap-2 w-full mt-4 justify-center lg:justify-start">
              <button
                onClick={saveConfig}
                className={classNames(
                  "bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600",
                  {
                    "cursor-none hover:bg-blue-500": loading,
                  }
                )}
              >
                Save
              </button>
              <button
                onClick={sendToDevice}
                className={classNames(
                  "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600",
                  {
                    "cursor-none, bg-green-300 hover:bg-green-300": loading,
                  }
                )}
              >
                {loading && (
                  <svg
                    aria-hidden="true"
                    role="status"
                    class="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                Send to Device
              </button>
            </div>
          </div>

          <div class="flex flex-col">
            <div className="w-full flex justify-center">
              <div
                style={{
                  backgroundColor: `rgb(${params.red}, ${params.green}, ${params.blue})`,
                  clipPath:
                    params.shape >= 1 && params.shape < 1.7
                      ? "polygon(50% 0%, 100% 100%, 0% 100%)"
                      : params.shape > 1.7
                      ? "circle(50%)"
                      : "none",
                }}
                className={classNames(
                  "w-full h-[calc(1000px/2-3rem)] transition-all duration-500 ease-in-out",
                  {
                    "w-[calc(1000px/2-3rem)]": params.shape > 1.7,
                  }
                )}
              ></div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 items-center">
              <h2 className="text-lg text-left">Saved Configurations:</h2>
              <div class="flex gap-1 flex-wrap">
                {Object.keys(savedConfigs).map((name) => (
                  <button
                    key={name}
                    onClick={() => loadConfig(name)}
                    className={classNames(
                      "px-4 py-0.5 border border-blue-500 hover:bg-blue-50 text-blue-500 rounded-full",
                      {
                        "bg-blue-100": selectedConfig === name,
                      }
                    )}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {message && (
              <p className="mt-4 font-semibold text-red-500">{message}</p>
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}
