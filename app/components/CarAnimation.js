const CarAnimation = () => {
    return (
      <div className="h-32 w-full overflow-hidden bg-gradient-to-r from-black to-red-950 absolute ">
        <div className="absolute top-10 left-0 w-full animate-move flex items-center justify-around">
          <img
             src="https://www.iconpacks.net/icons/5/free-red-micro-car-icon-16688-thumb.png" // Add your car image in the public folder
            alt="Car"
            className="h-16 w-auto"
          />
          <img
             src="https://www.iconpacks.net/icons/5/free-red-micro-car-icon-16688-thumb.png" // Add your car image in the public folder
            alt="Car"
            className="h-16 w-auto"
          />
          <img
             src="https://www.iconpacks.net/icons/5/free-red-micro-car-icon-16688-thumb.png" // Add your car image in the public folder
            alt="Car"
            className="h-16 w-auto"
          />
          {/* <div className="w-screen h-2 bg-gray-700 rounded-full ml-2"></div> */}
        </div>
      </div>
    );
  };
  
  export default CarAnimation;
  