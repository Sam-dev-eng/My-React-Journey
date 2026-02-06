import CategoryList from "../../components/categoryListFolder/CategoryList";
import GigCard from "../../components/GigCardFolder/GigCard";
import NavBar from "../../components/navBarfolder/NavBar";
import Searchbar from "../../components/searchBarFolder/Searchbar";
import "./Home.css"
import React from "react";
import api from "../../api/axios"
import { viewAllGigs } from "../../api/Gigs";

function Home(props) {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [gigs, setGigs] = React.useState([]);
    const [query, setQuery] = React.useState("");
    const [page, setPage] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    

    const fetchGigs = async () => {
        setLoading(true);
        try {
            const res = await api.get(
                `/gigs/search`,
                {
                    params: {
                        query,
                        page,
                        size: 10
                    }
                }
            )
            //console.log(res.data.data.content);
            setGigs(res.data.data.content);
            setTotalPages(res.data);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }
    
    const fetchAllGigs = async () => {
        try {
            const response = await viewAllGigs();
            console.log(response);
            setGigs(response.data.data.allGigs)
        } catch (err) {
            console.error(err);
        }
        
    }
    React.useEffect(() => {
        fetchAllGigs();
    },[])
    
    React.useEffect(() => {
        if (query.trim() != "") {
            fetchGigs();
        } else {
            fetchAllGigs();
        }
    }, [query, page]);

    const userNameSignup = sessionStorage.getItem("userNameSignUp");
    const userNameLogin = sessionStorage.getItem("userName");


    const [favorites,setFavorites] = React.useState(() => {
    const saved = sessionStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
    });

    React.useEffect(() => {
    sessionStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);


    const toggleFavorite = (gigId)=>{
        setFavorites((prev)=>{
            const isFavorite = prev.includes(gigId);
            if(isFavorite)return prev.filter((id) => id !== gigId);
            else return [...prev,gigId];
            }   
        )
    }
    
    

    const handleCategoryClick = (category) => {
    setSelectedCategory((prev) =>
    prev === category ? null : category
  );
};


    return (
      <>
        <NavBar isAuthenticated={props.isAuthenticated} role={props.role} />
        <h4>
                {userNameSignup != null ?`WELCOME ${userNameSignup}` : `WELCOME BACK ${userNameLogin || ""}`}
        </h4>
        <Searchbar value={query} onChange={setQuery} />
        <CategoryList
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryClick}
        />

        <div className="gig-grid">
          {gigs?.map((gig) => (
            <GigCard
              key={gig.id}
              id={gig.id}
              title={gig.gigTitle}
              seller={gig.seller}
              price={gig.price}
              image={gig.image}
              isFavorite={favorites.includes(gig.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </>
    );
}

export default Home; 