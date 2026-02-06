import {createRoot} from "react-dom/client"
import App from "./App"

const root = createRoot(document.getElementById("root"));
 
// console.log(<h1>Hello world!</h1>)

// root.render(
    
//         <ReactExample/>
// );
//  function ReactExample(){
//     return (
//     <div>
//        <Header/>
//         <NavBar/>
//        <Body/>
//        <Footer/>
        
//     </div>
//     )


//     function Header(){
//         return (
//              <header className = "header">
//             <img src="/src/assets/react.svg"/>
//         </header>
//         )
//     }

//     function Body(){
//         return (
//             <>
//             <h1>Reason i'm exited to learn react</h1>
//         <ul>
//             <li> i'm trying to learn react and i love it so much</li>
//             <li>i want to be able to create E-commerce apps especially for my sister</li>
//             <li>i want to be able to create an app for my dream</li>    
//         </ul>
//         </>
//         )
//     }

//     function NavBar(){
//         return (
//         <>
//             <nav>
//                 <ul>
//                     <li className="nav-list-items">Pricing</li>
//                     <li className="nav-list-items">About</li>
//                     <li className="nav-list-items">Contact</li>
//                 </ul>
//             </nav>
//         </>
//         )
//     }

//     function Footer(){
//         return (
//         <>
//             <footer>
//                 <small>@ 2024 Samuel development. All rights reserved.</small>
//             </footer>
//         </>
//         )
//     }

//  }


root.render(
    <>
        <App/>
    </>
)




