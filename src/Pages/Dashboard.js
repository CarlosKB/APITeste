import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import Navbar from "../components/Navbar";
import BottomNavbar from "../components/BottomNavbar";
import axios from 'axios';

function Dashboard() {

  const chartRef = useRef();

  async function seila(){
    var seila = parseInt(localStorage.getItem('contador'))
    if (seila === 0) {
      localStorage.setItem('contador', 1)
      await window.location.reload();
    }
  }
  seila()
  useEffect(() => {
        axios.get('https://api-back4-desk.vercel.app/usersStatus',{
        }).then((response)=>{
            const data = response.data
            console.log(data);
            var dataMandar = {ativo: response.data.ativo, inativo: response.data.inativo}
            localStorage.setItem('usersStatus', JSON.stringify(dataMandar))
        }).then(()=>{
          var statusUserJson = localStorage.getItem('usersStatus')
          var statusUser =  JSON.parse(statusUserJson)
          var inativoUser =  parseInt(statusUser.inativo)
          var ativoUser =parseInt(statusUser.ativo)
          localStorage.setItem('inativoUser', inativoUser)
          localStorage.setItem('ativoUser', ativoUser)
        })
        

    const chart = new Chart(chartRef.current, {
      type: 'pie',
      data: {
        labels: ['Ativos', 'Inativos'],
        datasets: [{
          data: [localStorage.getItem('ativoUser'), localStorage.getItem('inativoUser')],
          backgroundColor: ['#36A2EB', '#FF6384'],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        width: 100,
        height: 100
      }
    });

    return () => chart.destroy();
  }, []);

  return (
    <>
      <Navbar/>
      
        <div className='row text-center mt-3 text-primary'>
          <h3 style={{ color: '#FF6B00'}}>Dashboard</h3>
        </div>   

        <div className='row text-center mt-3'>
          <h6>Gráfico referente ao número de usuários Ativos e Inativos</h6>
        </div>

        <div className='row text-center mt-3' style={{ color: '#FF6B00' }}>
            <canvas ref={chartRef} style={{ width: '30%', margin: '0%' }}></canvas>
        </div>

      
      <BottomNavbar/>
    </>
  );
}

export default Dashboard;
