import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import moment from 'moment';
import displayINRCurrency from '../helper/displayCurrency';

const AllOrder = () => {
    const [orderListData, SetorderListData] = useState([]);

    const FetchOrderList = async () => {
      const responceOrder = await fetch(SummaryApi.AllOrder.url, {
        method: SummaryApi.AllOrder.method,
        credentials: "include",
      });
      const responceData = await responceOrder.json();
      SetorderListData(responceData?.data);
    };
    useEffect(() => {
      FetchOrderList();
    }, []);
    console.log(orderListData, "orderListData");
    return (
      <div className='h-[calc(100vh-190px)] overflow-y-scroll'>
        {orderListData.length === 0 && <p>No Order are Avilable</p>}
        <div className="p-4 w-full">
          {orderListData.map((item, index) => {
            return (
              <div key={item.userId + index}>
                <p className="font-medium text-lg">
                  {moment(item.createdAt).format("LL")}
                </p>
                <div className="border rounded">
                  <div className="flex flex-col lg:flex-row justify-between">
                    <div className="grid gap-1">
                      {item?.productDetails?.map((product, idx) => {
                        return (
                          <div
                            className="flex gap-3 bg-slate-100"
                            key={product.productId + idx}
                          >
                            <img
                              className="w-40 h-40 bg-slate-200 object-scale-down p-2"
                              src={product.image[0]}
                              alt=""
                            />
                            <div>
                              <div className="font-medium text-lg text-ellipsis line-clamp-1">
                                {product.name}
                              </div>
                              <div className="flex items-center gap-5 mt-1">
                                <div className="text-lg text-red-500">
                                  {displayINRCurrency(product.price)}
                                </div>
                                <p>Quantity: {product.quantity}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
  
                    <div className="flex flex-col gap-4 p-2 min-w-[300px]">
                      <div>
                        <div className="font-medium text-lg">
                          Payment Details :{" "}
                        </div>
                        <p className="nt-medium ml-1">
                          Payment Method:
                          {item?.PaymentDetails?.payment_method_type[0]}
                        </p>
                        <p className=" ml-1">
                          {" "}
                          Payment Status:{item?.PaymentDetails?.payment_status}
                        </p>
                      </div>
  
                      <div>
                        <div className="font-medium text-lg">
                          Shipping Details :{" "}
                        </div>
                        {item?.shipping_options?.map((shipping, idx) => {
                          return (
                            <div
                              className=" ml-1"
                              key={shipping?.shipping_rate}
                            >
                              Shipping_amount:{shipping?.shipping_amount}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className=" font-semibold ml-auto w-fit lg:text-lg">
                    Total Amount : {item?.totalAmount}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default AllOrder
