import { MdWbSunny } from "react-icons/md";
import { IoMoon } from "react-icons/io5";

const iconSun = <MdWbSunny />;
const iconMoon = <IoMoon />;
const PompHeader = ({ title, darkMode, setDarkMode }) => {
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`shadow header items-center pt-4 pb-4 pl-6 pr-6 md:pl-10 md:pr-10 flex w-full h-auto justify-between ${darkMode ? "bg-[hsl(209,23%,22%)]" : "bg-[hsl(0,0%,99%)]"}`}
    >
      <h1
        className={` font-bold text-sm md:text-lg
          ${darkMode ? "text-[hsl(0,100%,100%)]" : "text-[hsl(200,15%,8)]"}
        `}
      >
        {title}
      </h1>

      <button
        onClick={toggleDarkMode}
        className={`flex items-center ${darkMode ? "text-[hsl(0,100%,100%)]" : "text-[hsl(200,15%,8)]"} flex items-center gap-2`}
      >
        {darkMode ? iconSun : iconMoon}
        <span className="text-sm md:text-lg">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </span>
      </button>
    </div>
  );
};
export default PompHeader;
