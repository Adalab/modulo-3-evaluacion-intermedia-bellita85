// Fichero src/components/App.js
import '../styles/App.scss';
// import api from '../data/api.json'
import { useEffect,useState } from 'react';
import getAdalabers from '../../src/services/apiadalabers'

function App() {
const [data , setData] = useState([]);

useEffect (() => {
  getAdalabers().then (data => {
    setData(data.results);
  });
}, []);


const [newAda, setNewAda] = useState({
  "name": "",
"counselor": "",
"speciality":"",
"id": "",
"social_networks":[],

});
const [search, setSearchs] = useState('Todos');
const [searchInput, setSearchsInput] = useState('');


const handleNew = (ev) => {
  setNewAda({ ...newAda, [ev.target.id]: ev.target.value });
};
const handleClick = (ev) => {
  ev.preventDefault();
  data.push(newAda);
  setData([...data]);
  setNewAda({
    "name": "",
    "counselor": "",
    "speciality":"",
    "id" : crypto.randomUUID(),
    "social_networks":[],

  });
};
const handleOnsubmit = (ev) => {
  ev.preventDefault();
}
const handleSearch = (ev) => {
  setSearchs(ev.target.value)
};
const handleSearchInput = (ev) => {
 
  setSearchsInput(ev.target.value)
};

// const htmlData = data
// .includes((ada) => 
// ada.name === searchInput || searchInput === "");


// htmlData.map((ada) => {
//   return (
// <tr key={ada.id}> 
//       <td>{ada.name}</td> 
//       <td>{ada.counselor}</td> 
//       <td>{ada.speciality}</td> 
//       <td>{ada.social_networks.map((ada, index)=> {
//     return (
//       <span key={index}className="social"> - <a href={ada.url}>{ada.name}</a> - </span>
//     )}
//       )}</td>
      
//        </tr>
//   );
// });
// HAZME IN FILTRADO Y EL QUE INCLUYA...
const htmlData2 = data
.filter((ada) => 
ada.counselor === search || search === "Todos")
.filter((ada) => 
ada.name.toLowerCase().includes(searchInput.toLowerCase()))
.map((ada) => {
  return (
<tr key={ada.id}> 
      <td>{ada.name}</td> 
      <td>{ada.counselor}</td> 
      <td>{ada.speciality}</td> 
      <td>{ada.social_networks.map((ada, index)=> {
    return (
      <span key={index}className="social"> - <a href={ada.url}>{ada.name}</a> - </span>
    )}
      )}</td>
      
       </tr>
  );
});

  return (
   <div> 
        <header className="header">
        <h1 className="header__title">Adalabers</h1>
        <form onSubmit={handleOnsubmit}>
          <input
            className="header__search"
            autoComplete="off"
            type="text"
            name="name"
            placeholder="Ej. MariCarmen"
            onChange={handleSearchInput}
            value={searchInput}
          />
          
         <select className='select'
          onChange={handleSearch}
          >
          <option value="Todos">Todos</option>
          <option value="Yanelis">Yanelis</option>
          <option value="Dayana">Dayana</option>
          <option value="Iván">Iván</option>
         </select>
      
        </form>
        </header>
     <table  className="table" border="1" bordercolor="#00CC66">
  <thead><tr> 
    <th>Nombre</th> 
    <th>Tutora</th> 
    <th>Especialidad</th> 
    <th>Redes</th> 
  </tr></thead> 
 

  <tbody>
      {htmlData2}
    </tbody>


</table>
<form className="new-contact__form">
          <h2 className="new-contact__title">Añadir una Adalabers </h2>
          
          <input
            className="new-contact__input"
            type="text"
            name="name"
            id="name"
            placeholder="Nombre"
            onInput={handleNew}
            value={newAda.name}
          />
          <input
            className="new-contact__input"
            type="text"
            name="counselor"
            id="counselor"
            placeholder="Tutora"
            onInput={handleNew}
            value={newAda.counselor}
          />
          <input
            className="new-contact__input"
            type="text"
            name="speciality"
            id="speciality"
            placeholder="Especialidad"
            onInput={handleNew}
            value={newAda.speciality}
            // exactamente no entiendo el value
          />
          <input
            className="new-contact__btn"
            type="submit"
            value="Añadir una nueva Adalabers"
            onClick={handleClick}
          />
          </form>

    </div>
     );
}

export default App;
