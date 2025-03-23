// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Navbar.css';

// export default function Navbar() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
//     }
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <div className="navbar-brand">
//           <Link to="/" className="navbar-logo">
//             <i className="fas fa-film"></i>
//             <span>MovieVault</span>
//           </Link>
//         </div>

//         <div className="navbar-menu">
//           <div className="navbar-item">
//             <Link to="/" className="navbar-link">Home</Link>
//           </div>
//         </div>

//         <div className="navbar-search">
//           <form onSubmit={handleSearch}>
//             <div className="search-container">
//               <input 
//                 type="text" 
//                 className="search-input" 
//                 placeholder="Search movies..." 
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <button type="submit" className="search-button">
//                 <i className="fas fa-search"></i>
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </nav>
//   );
// }
