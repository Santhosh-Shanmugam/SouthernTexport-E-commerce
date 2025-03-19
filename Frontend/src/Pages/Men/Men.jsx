import React from "react";
import './Men.css'
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import Items from "../../Components/Items/Items";
const { Data } = useContext(ShopContext)
const Men = () => {
    return (
        <div className="items-con">
            <div className="product-display">
                {
                    Data.map((item, i) => {
                        if (props.category === 'men') {
                            return <Items key={i}
                                id={Items.id}
                                image1={Items.image1}
                                image2={Items.image2}
                                image3={Items.image3}
                                name={Items.name}
                                old_Price={Items.old_Price}
                                new_Price={Items.new_Price}
                                offer={Items.offer}
                                size_options={Items.size_options}
                                quantity={Items.quantity}
                            >

                            </Items>
                        }
                        else{
                            return null;
                        }
                    })
                }
            </div>
        </div>
    )

}
export default Men;