import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import Items from "../../Components/Items/Items";
import './TopSelling.css'
const TopSelling = () => {
const { Data } = useContext(ShopContext);
    
  return (
   <>
   <h1 className="items-head">Top Selling</h1>
        <div className="items-con">


        {Data.filter((item) => item.product_status === "top selling").map((item, i) => (
                   <Items
                   key={i}
                   id={item.id}
                   image1={item.image1}
                   image2={item.image2}
                   image3={item.image3}
                   name={item.name}
                   old_price={item.old_price}
                   new_price={item.new_price}
                   offer={item.offer}
                   size_options={item.size_options}
                   product_count={item. product_count}
                   
                   />
                ))}
                </div>
                </>
  )
}

export default TopSelling