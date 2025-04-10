import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import Items from "../../Components/Items/Items";
const Kids =()=>{
  const { all_product } = useContext(ShopContext);

  if (!all_product) {
    return <p>Loading...</p>;
}

    return (
        <div className="items-con">
        {all_product.filter((item) => item.category === "Kids").map((item, i) => (
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
    );
}
export default Kids;