import React, { useContext } from "react";
import "./Men.css";
import { ShopContext } from "../../Context/ShopContext";
import Items from "../../Components/Items/Items";
import stpMen from '../assets-page/stpMen.png'


const Men = () => {
    const { Data } = useContext(ShopContext);

    if (!Data) {
        return <p>Loading...</p>; // Handle the case where Data is not yet available
    }

    return (
         <div className="item-banner-con">
        
                <div className="banner">
                    <img src={stpMen}></img>
                </div>
        <div className="items-con">
           
                {Data.filter((item) => item.category === "men").map((item, i) => (
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
        </div>
    );
};

export default Men;
