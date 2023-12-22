// CarouselComponent.js
import React from 'react';



const CarouselComponent = () => {
  return (

    <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">

      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1702292558/Croma%20Assets/CMS/LP%20Page%20Banners/2023/HP%20Top%20Rotating%20Deals/December/12-12-2023/HP_Laptop_12Dec2023_vdegfn.jpg?tr=w-2048" className="d-block w-100" alt="First slide" />
        </div>
        <div className="carousel-item">
          <img src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1702292558/Croma%20Assets/CMS/LP%20Page%20Banners/2023/HP%20Top%20Rotating%20Deals/December/12-12-2023/HP_Oneplus_12Dec2023_hwjeue.jpg?tr=w-2048" className="d-block w-100" alt="Second slide" />
        </div>
        <div className="carousel-item">
          <img src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1702292558/Croma%20Assets/CMS/LP%20Page%20Banners/2023/HP%20Top%20Rotating%20Deals/December/12-12-2023/HP_Laptop_12Dec2023_vdegfn.jpg?tr=w-2048" className="d-block w-100" alt="Third slide" />
        </div>
      </div>
    </div>
  );
};

export default CarouselComponent;
