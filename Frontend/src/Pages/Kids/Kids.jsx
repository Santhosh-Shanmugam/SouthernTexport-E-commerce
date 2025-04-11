import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import Items from "../../Components/Items/Items";
import stpKids from '../assets-page/stpKids.png'
const Kids = () => {
  const { all_product } = useContext(ShopContext);

  if (!all_product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="item-banner-con">

    <div className="banner">
        <img src={stpKids}></img>
    </div>
    <div className="items-con">
        {all_product.filter((item) => item.category === "Men").map((item, i) => (
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
                product_count={item.product_count}

            />
        ))}
    </div>
</div>
  );
}
export default Kids;