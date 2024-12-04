import React from "react";
import ConfettiExplosion from "react-confetti-explosion";

const ConfettiComponent = ({ isExploding }) => {
  return (
    <>
      {isExploding && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000, // Ensure confetti is on top
          }}
        >
          <ConfettiExplosion
            particleCount={200}
            duration={3000}
            colors={[
              "rgb(223, 232, 233)",
              "rgb(73, 241, 238)",
              "rgb(75, 226, 249)",
              "rgba(94, 94, 244, 0.73)",
              "#ff0",
            ]}
          />
        </div>
      )}
    </>
  );
};

export default ConfettiComponent;
