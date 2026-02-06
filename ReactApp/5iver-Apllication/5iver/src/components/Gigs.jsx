import profile from "../assets/profile.png";
import avatar from "../assets/Avatar.png"

 function Gigs(){

return ([
  {
  id: 1,
  title: "Build a website",
  seller: "samuel Ejiofor",
  category: "Web Development",
  price: 100,
  description: "Professional service...",
  image: profile,
  user: {
    id: 10,
    name: "samuel Ejiofor",
    avatar: avatar,
    role: "seller",
    bio: "Full stack developer",
    level:4,
    rating: 5
  },
  feedbacks: [
    {
         user:{
        id: 111,
        name: "samuel Ejiofor",
        avatar: avatar,
        role: "seller",
        bio: "Full stack developer",
        level:4,
        rating: 5,
  },
        feedback: "He is a very nice person i like him" 
    }
]
}
,
  {
    id: 2,
    title: "Design a Website UI",
    seller: "Jane Smith",
    price: 30,
    image: profile,
    category: "Web Development",
    description: "i want to build a website",
    user: {
    id: 11,
    name: "Jane Smith",
    avatar: avatar,
    bio: "Full stack developer",
    role: "seller",
    level:4,
    rating: 5
  },
  feedbacks: [
    {
    user:{
        id: 1011,
        name: "samuel Ejiofor",
        avatar: avatar,
        role: "seller",
        bio: "Full stack developer",
        level:4,
        rating: 5
  },
  feedback: "He is a very nice person i like him" 

}
]

    
  },
  {
    id: 3,
    title: "Fix React Bugs",
    seller: "Alex Dev",
    price: 20,
    image: profile,
    category: "Design",
    description: "i want to build a website",
    user: {
    id: 12,
    name: "Alex Dev",
    avatar: avatar,
    role: "seller",
    bio: "Full stack developer",
    level:4,
    rating: 5
  },
  feedbacks: [
    {
    user:{
       
        id: 10111,
        name: "samuel Ejiofor",
        avatar: avatar,
        role: "seller",
        bio: "Full stack developer",
        level:4,
        rating: 5
  },
    feedback: "He is a very nice person i like him" 

}
]
  },
  
])

}

export default Gigs
