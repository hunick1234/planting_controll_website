import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./ELF.css";

export const ELF = ({ message, imageSrc }) => {
  const [isDragging, setIsDragging] = useState(false);
  const position = useRef({ x: 10, y: 10 });
  const ref = useRef();

  const startDrag = (e) => {
    e.preventDefault();
    setIsDragging(true);
    // To ensure movement is relative to initial click position
    position.current = {
      offsetX: e.clientX - ref.current.offsetLeft,
      offsetY: e.clientY - ref.current.offsetTop,
    };
  };

  const handleDrag = (e) => {
    if (isDragging) {
      const x = e.clientX - position.current.offsetX;
      const y = e.clientY - position.current.offsetY;
      ref.current.style.left = `${x}px`;
      ref.current.style.top = `${y}px`;
    }
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return isMobile ? (
    <div className="elf">{`mobile not ${message}`}</div>
  ) : (
    <>
      <div
        className="elf"
        ref={ref}
        onMouseDown={startDrag}
        onMouseMove={handleDrag}
        onMouseUp={stopDrag}
      >
        <div className="character">
          {imageSrc && (
            <img
              className="image-responsive"
              src={imageSrc}
              alt="Displayed Animation"
            />
          )}
        </div>
        <div className="dialog-box">{message}</div>
      </div>
    </>
  );
};

export const ELFCanvas = ({ message, imageSrc }) => {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const position = useRef({ x: 10, y: 10 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    draw(context, message, imageSrc);
  }, [message, imageSrc]);

  const draw = (ctx, text, imgSrc) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas
    ctx.font = "16px Arial";
    ctx.fillText(text, 10, 20); // Draw text on canvas

    if (imgSrc) {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imageAspectRatio = img.width / img.height;
        const canvasAspectRatio = canvasWidth / canvasHeight;
        let scaledWidth, scaledHeight;
        if (imageAspectRatio > canvasAspectRatio) {
          scaledWidth = canvasWidth;
          scaledHeight = canvasWidth / imageAspectRatio;
        } else {
          scaledWidth = canvasHeight * imageAspectRatio;
          scaledHeight = canvasHeight;
        }

        const x = (canvasWidth - scaledWidth) / 2;
        const y = (canvasHeight - scaledHeight) / 2;

        ctx.drawImage(img, x, y, scaledWidth, scaledHeight); // Draw scaled image
      };
      img.onload = () => {
        ctx.drawImage(img, 10, 30); // Draw image below the text
      };
      img.src = imgSrc;
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    position.current = {
      offsetX: e.clientX - canvasRef.current.offsetLeft,
      offsetY: e.clientY - canvasRef.current.offsetTop,
    };
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const x = e.clientX - position.current.offsetX;
      const y = e.clientY - position.current.offsetY;
      const canvas = canvasRef.current;
      canvas.style.left = `${x}px`;
      canvas.style.top = `${y}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <canvas
      ref={canvasRef}
      className="elf-canvas"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    ></canvas>
  );
};

export const Agent = () => {
  const random = [
    "hello. i'm your ELF",
    "get Wheather",
    "OH, today is so hot",
    "I'm hungry",
  ];
  const [message, setMessage] = useState("Hello, drag me!");
  const handleValueChange = () => {
    const newValue =
      random[Math.floor(Math.random() * random.length)]
    setMessage(newValue);
  };

  return (
    <div onClick={handleValueChange}>
      <ELF message={message} imageSrc="./assets/elf.png" />
    </div>
  );
};

ELF.propTypes = {
  message: PropTypes.string.isRequired,
  imageSrc: PropTypes.string,
};

ELFCanvas.propTypes = {
  message: PropTypes.string.isRequired,
  imageSrc: PropTypes.string,
};
