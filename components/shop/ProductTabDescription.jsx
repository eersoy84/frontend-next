// react
import React from 'react';
import Currency from '../shared/Currency';


function ProductTabDescription({ product }) {
    const { } = product;
    let instantPrice;
    let instantProfit;
    if (product.instantPrice) {
        instantPrice = `${(product.instantPrice).toLocaleString(undefined,
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}${' '}₺`;

        instantProfit = `${((product.productPrice - product.instantPrice)).toLocaleString(undefined,
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}${' '}₺`;
    }
    return (
        <div className="typography">
            <div className="d-flex align-items-center">
                <ol className="siteInfo" style={{ fontSize: "14px" }}>
                    <li>
                        Bizleal&apos;da herhangi bir ürün satın alınırken ilk olarak kartınızdan satış fiyatı tahsil edilir.&nbsp;
                            <p className="text-success d-inline"><Currency value={product.productPrice} /></p>
                    </li>
                    <li>
                        Satınalma adedi arttıkça ürün fiyatı düşer.&nbsp;
                    {product.instantPrice < product.productPrice &&
                            <p className="text-success d-inline">({instantPrice})</p>
                        }
                    </li>
                    <li>
                        Toplam satın alma adedi, hedeflenen sayıya ulaşırsa ürün maksimum indirime girer.
                    <p className="text-success d-inline">
                            (<Currency value={product.targetPrice} />)
                        </p>
                    </li>

                    <li>
                        İlan süresi bitiminde, kartınızdan çekilen ilk tutardan, düşen fiyat farkı hesabınıza iade edilir.&nbsp;
                    {product.instantPrice < product.productPrice && <p className="text-success d-inline">({instantProfit})</p>}

                    </li>
                </ol>
            </div>

        </div>
    );
}

export default ProductTabDescription;
