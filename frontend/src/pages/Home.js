// src/pages/Home.js
import React from 'react';
import Header from '../components/Header';

const Home = () => {
  return (
    <div className="home">
      <Header />
      <main className="home-content">
        <h1>Welcome to ByteBattles</h1>
      </main>
    </div>
  );
};

export default Home;
