import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCategories } from "../services/menuApi";

export default function NavBar (){

    const navigate = useNavigate();
    const location = useLocation();
  const categoryId = location.state.categoryId;

  const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories(categoryId)
          .then((response) => {
            setCategories(response);
          })
          .catch((error) => {
            console.log(error);
            alert("malformed request");
          });
      }, [categoryId]);
    return (
        <Navbar>
      {categories?.map(({imageUrl, id}) => {
        return(
        <ImgFood src={imageUrl} onClick={() => {navigate("/products", {
          state: {
            categoryId: id
          }
        })}}/> 
        )
         
      })}
         
    </Navbar>
    )
} 

const Navbar = styled.div`
display: flex;
width: 100vw;
height: 60px;
overflow-y: scroll;
`;

const ImgFood = styled.img`
width: 28vw;
border-radius: 10px;
background-color: white;
object-fit: cover;
margin: 9px 5px;
box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.60);
`;