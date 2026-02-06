import GigCard from "./GigCardFolder/GigCard"


const Favorites = (props)=>{
    
    return(
        <>
                {props.favorites?.map((gig)=> <GigCard
                    key={gig.id}
                    id={gig.id}
                    title= {gig.title}
                    seller={gig.seller}
                    price={gig.price}
                    image={gig.image}
                    isFavorite = {props.favorites?.includes(gig)}
                    onToggleFavorite={props.onToggleFavorite}
                />
                )}
                </>
    )
}
        
    

export default Favorites;