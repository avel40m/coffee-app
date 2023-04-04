import { useContext, useEffect } from "react";
import { UserPermissions } from "../App";
import CardProduct from "../components/cards/CardProduct/CardProduct";
import CardsIndex from "../components/cards/CardsIndex/CardsIndex";
import { recoverPermission } from "../utils/Data";

const Home = () => {
  const {setUsers} = useContext(UserPermissions);

  useEffect(() => {
    const fetchData = async () =>{
      const result = await recoverPermission();
      setUsers(result);
    }
    fetchData();
  },[])
    return (
      <>
      <CardsIndex />
      <CardProduct />
      </>
    )
  }

  export default Home;