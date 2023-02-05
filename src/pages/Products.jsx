import styled from "styled-components";
import { useEffect, useState } from "react";
import { getProducts } from "../services/menuApi";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import CardProduct from "../components/CardProduct";
import HorizontalBar from "../components/HorizontalBar";

export default function Products() {
  const location = useLocation();
  const navigate = useNavigate();

  const categoryId = location.state.categoryId;
  const [products, setProducts] = useState([]);
  const [lstProducts, setLstProducts] = useState([]);
  console.log(lstProducts)
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getProducts(categoryId)
      .then((response) => {
        setProducts(response);
      })
      .catch((error) => {
        console.log(error);
        alert("malformed request");
      });
  }, [categoryId]);

  return (
    <>
      
      <Main>
        {products?.map(({ categoriesId, name, description, imageUrl, price }) => { 
          return (
            <>
              <CardProduct
                name={name}
                description={description}
                imageUrl={imageUrl}
                price={price}
                lstProducts={lstProducts}
                setLstProducts={setLstProducts}
                products={products}
                categoriesId={categoriesId}
                categoryId={categoryId}
                setRefresh={setRefresh}
                refresh={refresh}

              />
            </>
          );
        })}
      </Main>
      <NavBar />
      <HorizontalBar>
        {lstProducts.length > 0? <Button onClick={()=>{navigate("/confirmation",{
          state: {
            productsSelects: lstProducts
          }
        })}}>
         Confirmar Pedido
        </Button> : ''}
      </HorizontalBar>
    </>
  );
}
export const Button = styled.div`
  font-family: "Merriweather", serif;
display: flex;
justify-content: center;
align-items: center;
text-align: center;
position: fixed;
bottom: 5px;
left: 50%;
min-width: 113px;
width: 40vw;
height: 40px;
color:white;
border-radius: 5px;
border: 1px white solid;
cursor: pointer;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 12px;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 130px;
  word-wrap: break-word;
  background-color: white;
`;
