import React from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "./HomePage.module.css";
import girlWithLaptop from "../assets/images/girl-with-laptop.png"; 

const HomePage = () => {
  const navigate = useNavigate(); 

  const handleGetStartedClick = () => {
    navigate("/todos"); 
  };

  return (
    <div className={styles.container}>
      <img src={girlWithLaptop} alt="Girl with laptop" className={styles.image} />
      <h1 className={styles.title}>
        Organizing your day activity <br /> with Todo Daily
      </h1>
      <button className={styles.button} onClick={handleGetStartedClick}>
        Get started
      </button>
    </div>
  );
};

export default HomePage;
