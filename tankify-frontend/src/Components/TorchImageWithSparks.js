import React, { useRef, useEffect } from 'react';

function TorchImageWithSparks({ src }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Interval to spawn sparks periodically
    const interval = setInterval(() => {
      createSpark();
    }, 100); // spawn a spark ~ every 300ms (adjust as needed)

    return () => clearInterval(interval);
  }, []);

  const createSpark = () => {
    if (!containerRef.current) return;


    const spark = document.createElement('div');
    spark.className = 'spark';


    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;


    const randomX = Math.random() * containerWidth;
    const randomY = Math.random() * containerHeight;

    spark.style.left = `${randomX}px`;
    spark.style.top = `${randomY}px`;


    containerRef.current.appendChild(spark);

    setTimeout(() => {
      if (spark.parentNode) {
        spark.parentNode.removeChild(spark);
      }
    }, 500);
  };

  return (
    <>
      <style>{`
        /* Glowing border container */
        .torch-border {
          position: relative;
          display: inline-block;
          border: 3px solid #ab003c;
          border-radius: 8px;
          box-shadow: 0 0 8px #ab003c;
          
          /* Flickering border animation */
          animation: torchFlicker 3s infinite alternate;
        }

        @keyframes torchFlicker {
          0% {
            box-shadow: 0 0 8px #ab003c;
          }
          50% {
            box-shadow: 0 0 16px #ab003c;
          }
          100% {
            box-shadow: 0 0 8px #ab003c;
          }
        }

        /* The image itself */
        .torch-image {
          display: block;
          width: 60rem;
          height: 32rem;
          border-radius: 4px;
        }

        /* Spark styles */
        .spark {
          position: absolute;
          width: 4px;
          height: 4px;
          background-color: #ffca28; /* bright yellow for spark */
          border-radius: 50%;
          pointer-events: none; /* so sparks don’t block mouse interactions */
          animation: sparkLife 500ms ease-out forwards;
        }

        @keyframes sparkLife {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          50% {
            opacity: 0.8;
            transform: translate(-10px, -30px) scale(1.5);
          }
          100% {
            opacity: 0;
            transform: translate(-20px, -60px) scale(0);
          }
        }
      `}</style>
      
      <div 
        ref={containerRef} 
        style={{ position: 'relative', display: 'inline-block' }}
      >
        <div className="torch-border">
          <img src={src} alt="Torch" className="torch-image" />
        </div>
      </div>
    </>
  );
}

export default TorchImageWithSparks;

