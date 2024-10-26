import React from "react";
import "./Icon.style.css"; // CSS 파일을 통해 hover 시 색상 변경

export const HomeIcon = ({ isHovered, isClicked }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      className={`icon homepage-icon ${
        isHovered || isClicked ? "hovered" : ""
      }`}
    >
      <path d="M22.849,7.68l-.869-.68h.021V2h-2v3.451L13.849,.637c-1.088-.852-2.609-.852-3.697,0L1.151,7.68c-.731,.572-1.151,1.434-1.151,2.363v13.957H9V15c0-.551,.448-1,1-1h4c.552,0,1,.449,1,1v9h9V10.043c0-.929-.42-1.791-1.151-2.363Zm-.849,14.32h-5v-7c0-1.654-1.346-3-3-3h-4c-1.654,0-3,1.346-3,3v7H2V10.043c0-.31,.14-.597,.384-.788L11.384,2.212c.363-.284,.869-.284,1.232,0l9,7.043c.244,.191,.384,.478,.384,.788v11.957Z" />
    </svg>
  );
};
export const RecipeIcon = ({ isHovered, isClicked }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      className={`icon recipe-icon ${isHovered || isClicked ? "hovered" : ""}`}
    >
      <path d="m19.5,13h-11c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h11c.276,0,.5.224.5.5s-.224.5-.5.5Zm-7-4h7c.276,0,.5-.224.5-.5s-.224-.5-.5-.5h-7c-.276,0-.5.224-.5.5s.224.5.5.5Zm-4,7c-.276,0-.5.224-.5.5s.224.5.5.5h4c.276,0,.5-.224.5-.5s-.224-.5-.5-.5h-4Zm-4-6c-1.378,0-2.5-1.121-2.5-2.5v-2.55c-1.14-.232-2-1.243-2-2.45C0,1.121,1.122,0,2.5,0c.618,0,1.21.232,1.664.639,1.048-.82,2.624-.82,3.672,0,.454-.406,1.046-.639,1.664-.639,1.378,0,2.5,1.121,2.5,2.5,0,1.207-.86,2.218-2,2.45v2.55c0,1.379-1.122,2.5-2.5,2.5h-3Zm0-1h3c.827,0,1.5-.673,1.5-1.5v-3c0-.276.224-.5.5-.5.827,0,1.5-.673,1.5-1.5s-.673-1.5-1.5-1.5c-.485,0-.943.239-1.225.64-.088.125-.229.203-.381.211-.157.016-.301-.054-.402-.168-.778-.881-2.205-.881-2.983,0-.101.115-.245.189-.402.168-.153-.008-.293-.086-.381-.211-.282-.4-.74-.64-1.225-.64-.827,0-1.5.673-1.5,1.5s.673,1.5,1.5,1.5c.276,0,.5.224.5.5v3c0,.827.673,1.5,1.5,1.5Zm19.5-4.5v9.515c0,1.736-.677,3.369-1.904,4.597l-3.484,3.484c-1.228,1.228-2.86,1.904-4.597,1.904h-5.515c-2.481,0-4.5-2.019-4.5-4.5v-7c0-.276.224-.5.5-.5s.5.224.5.5v7c0,1.93,1.57,3.5,3.5,3.5h5.515c.335,0,.663-.038.985-.096v-5.404c0-1.379,1.121-2.5,2.5-2.5h5.404c.058-.323.096-.651.096-.985V4.5c0-1.93-1.57-3.5-3.5-3.5h-5c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h5c2.481,0,4.5,2.019,4.5,4.5Zm-1.38,11.5h-5.12c-.827,0-1.5.673-1.5,1.5v5.121c.704-.273,1.354-.682,1.904-1.232l3.484-3.484c.55-.55.959-1.2,1.232-1.904Z" />
    </svg>
  );
};

export const StarIcon = ({ isHovered, isClicked }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      className={`icon star-icon ${isHovered || isClicked ? "hovered" : ""}`}
    >
      <path d="M22.814,8.871c-.403-1.088-1.351-1.736-2.475-1.683-1.055,.034-2.11,.062-3.165,.083-.717,.056-1.373-.451-1.592-1.156-.312-1.01-.624-2.019-.942-3.027-.355-1.135-1.392-1.869-2.641-1.869s-2.285,.734-2.641,1.868c-.318,1.008-.63,2.017-.942,3.027-.218,.706-.83,1.208-1.592,1.156-1.055-.021-2.11-.049-3.159-.083-1.121-.049-2.078,.595-2.481,1.684-.375,1.015-.232,2.447,.937,3.362,.85,.654,1.695,1.293,2.538,1.924,.593,.444,.825,1.231,.577,1.959-.353,1.034-.719,2.075-1.103,3.119-.436,1.157-.144,2.309,.762,3.005,.952,.731,2.309,.711,3.38-.053l2.688-1.936c.62-.445,1.453-.446,2.073,0l2.69,1.937c.547,.39,1.169,.586,1.775,.586,.577,0,1.138-.178,1.603-.535,.906-.697,1.198-1.848,.763-3.001-.385-1.048-.751-2.089-1.104-3.123-.248-.728-.017-1.515,.576-1.959,.844-.63,1.688-1.27,2.542-1.927,1.166-.913,1.309-2.345,.934-3.36Zm-1.547,2.57c-.846,.651-1.687,1.288-2.527,1.916-.941,.705-1.312,1.943-.923,3.083,.355,1.041,.724,2.088,1.113,3.148,.279,.74,.116,1.436-.436,1.86-.461,.356-1.313,.552-2.184-.07l-2.689-1.937c-.485-.349-1.053-.523-1.621-.523s-1.136,.174-1.621,.522l-2.687,1.935c-.873,.623-1.723,.428-2.187,.072-.552-.424-.715-1.12-.435-1.864,.388-1.056,.757-2.104,1.112-3.145,.389-1.139,.017-2.378-.924-3.083-.839-.628-1.68-1.264-2.523-1.913-.769-.602-.861-1.551-.612-2.225,.25-.676,.806-1.053,1.505-1.032,1.059,.035,2.118,.062,3.178,.083,1.154,.04,2.215-.724,2.566-1.861,.312-1.009,.623-2.015,.941-3.022,.27-.862,1.077-1.168,1.687-1.168s1.417,.306,1.687,1.168h0c.318,1.007,.629,2.014,.941,3.023,.352,1.136,1.404,1.894,2.566,1.86,1.06-.021,2.119-.049,3.184-.083,.697-.024,1.248,.355,1.499,1.031,.25,.674,.157,1.624-.609,2.223Z" />
    </svg>
  );
};
export const MyIcon = ({ isHovered, isClicked }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      className={`icon my-icon ${isHovered || isClicked ? "hovered" : ""}`}
    >
      <path d="M12.003,11.774c3.5-.021,5.307-1.83,5.372-5.396-.06-3.446-1.967-5.356-5.378-5.378-3.452,.021-5.372,2.066-5.372,5.378,0,3.462,1.921,5.375,5.378,5.396Zm-.006-9.774c2.855,.019,4.328,1.498,4.378,4.378-.055,2.982-1.446,4.379-4.372,4.396-2.93-.017-4.321-1.411-4.378-4.387,.055-2.934,1.487-4.369,4.372-4.387Z" />
      <path d="M11.997,14.294c-5.259,.033-8.089,2.867-8.185,8.197-.005,.276,.215,.504,.491,.509h.009c.272,0,.495-.218,.5-.491,.086-4.825,2.438-7.186,7.184-7.215,4.689,.03,7.109,2.458,7.191,7.215,.005,.276,.255,.505,.509,.491,.276-.005,.496-.232,.491-.509-.091-5.252-2.997-8.164-8.19-8.197Z" />
    </svg>
  );
};
export const BackIcon = () => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 44 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_126_154)">
        <path
          d="M21.395 7.57874L18.15 4.11249L0 23.5L18.15 42.8875L21.395 39.4212L6.49 23.5L21.395 7.57874Z"
          fill="#595858"
        />
      </g>
      <defs>
        <clipPath id="clip0_126_154">
          <rect width="44" height="47" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
