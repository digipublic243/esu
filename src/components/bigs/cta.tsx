import React from "react";

function Cta() {
  return (
    <div className="bg-[#f8f8f9] py-[10px] px-[10%] flex">
      <div>
        <div>
          <span className="text-green-500 text-[6rem] ">+</span>
          <p className="text-[2rem] font-semibold text-[#404148] ">
            Information complémentaire
          </p>
          <button className="p-[15px] rounded-full font-bold text-[1.1rem] text-white bg-green-500">
            Demande d'information
          </button>
        </div>
        <div>
          <div>Lorem</div>
          <div>Les centres de ressources multiservices</div>
        </div>
      </div>

      <div>
        <p></p>
        <button></button>
      </div>
    </div>
  );
}

export default Cta;
