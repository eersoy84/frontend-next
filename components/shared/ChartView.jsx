// react
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts'

export default function ChartView({ product }) {
    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState({});
    let orderCount = product && product.numOrders;
    const calculateOffset = (instantPrice, targetPrice, productPrice) => {
        let middlePrice = (targetPrice + productPrice) / 2
        if (instantPrice > middlePrice) {
            return 25;
        }
        return -7
    }
    const setCurrency = (val) => {
        return `${(val)?.toLocaleString(undefined,
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}${' '}₺`;
    }
    
    const setText = (instantPrice, targetPrice, productPrice) => {
        if (instantPrice == targetPrice || instantPrice == productPrice) {
            return '';
        }
        return 'Anlık: ' + setCurrency(instantPrice);
    }

    useEffect(() => {
        let newData = [];
        if (orderCount < product.minParticipants) {
            newData = [[0, product.productPrice], [orderCount, product.instantPrice], [product.minParticipants, product.productPrice], [product.maxParticipants, product.targetPrice]]
        }
        else if (orderCount >= product.minParticipants && orderCount < product.maxParticipants) {
            newData = [[0, product.productPrice], [product.minParticipants, product.productPrice], [orderCount, product.instantPrice], [product.maxParticipants, product.targetPrice]]
        }
        else if (orderCount >= product.maxParticipants) {
            newData = [[0, product.productPrice], [product.minParticipants, product.productPrice], [product.maxParticipants, product.targetPrice], [orderCount, product.instantPrice]]
        }
        setSeries(
            [
                {
                    name: "Fiyat",
                    data: [...newData]
                }
            ]
        )
    }, [orderCount]);



    useEffect(() => {
        setOptions({
            chart: {
                width: '100%',
                zoom: {
                    enabled: false
                },
                type: 'line',
                toolbar: {
                    show: false
                },
            },
            markers: {
                size: 4
            },
            stroke: {
                width: 3,
                curve: 'straight',
            },
            annotations: {
                xaxis: [{
                    x: product.numOrders,
                    strokeDashArray: 3,
                    borderColor: '#c2c2c2',
                    fillColor: '#c2c2c2',
                    opacity: 0.3,
                    label: {
                        borderColor: '#c2c2c2',
                        borderWidth: 1,
                        borderRadius: 5,
                        textAnchor: 'middle',
                        position: 'bottom',
                        orientation: 'horizontal',
                        offsetX: 0,
                        offsetY: 22,
                        style: {
                            background: '#f1861d',
                            color: 'white',
                            fontSize: '11px',
                            fontWeight: 400,
                            fontFamily: undefined,
                            cssClass: 'apexcharts-xaxis-annotation-label',
                        },
                        text: `${product.numOrders} adet`
                    },
                }],
                yaxis: [{
                    y: product.instantPrice,
                    strokeDashArray: 3,
                    opacity: 0.3,
                    offsetX: 0,
                    offsetY: 0,
                    label: {
                        borderRadius: 5,
                        textAnchor: 'middle',
                        position: 'left',
                        orientation: 'horizontal',
                        offsetX: 10,
                        offsetY: calculateOffset(product.instantPrice, product.targetPrice, product.productPrice),
                        style: {
                            background: '#F1861d',
                            color: 'white',
                            fontSize: '11px',
                            fontWeight: 400,
                            fontFamily: undefined,
                            cssClass: 'apexcharts-xaxis-annotation-label',
                        },
                        text: setText(product.instantPrice, product.targetPrice, product.productPrice)
                    },
                }],
                // points: [
                //     {
                //         x: product.numOrders,
                //         y: product.instantPrice,
                //         marker: {
                //             size: 6,
                //             fillColor: '#fff',
                //             strokeColor: '#FF4560',
                //             radius: 2,
                //         },
                //         label:
                //         {
                //             position: 'top',
                //             borderRadius: 5,
                //             style: {
                //                 color: 'white',
                //                 background: '#F1861d',
                //             },
                //             text: 'Satılan'
                //         },
                //     },
                // ]
            },
            xaxis: {
                type: 'numeric',
                tooltip: {
                    enabled: false,
                    formatter: function (val) {
                        return `${val} adet`
                    }
                },
                tickPlacement: 'on',
                tickAmount: 1,
                title: {
                    text: 'Toplam Satış'
                },
                labels: {
                    formatter: function (val) {
                        return `${val.toFixed(0)} adet`
                    }
                },
            },
            yaxis: {
                tooltip: {
                    enabled: false,
                },
                type: 'category',
                title: {
                    text: 'Fiyat'
                },
                labels: {
                    formatter: (val) => setCurrency(val)
                },
                tickAmount: 1,
                max: product.productPrice,
                min: product.targetPrice,
            },
            crossHairs: {
                show: false
            },
            axisBorder: {
                show: true,
                color: 'green'
            },
            tooltip: {
                enabled: true,
                x: {
                    show: true,

                    formatter: function (val) {
                        if (val === 0) {
                            return `Başlangıç`
                        }
                        if (val === product.numOrders) {
                            return `Satılan <span style="color: white;font-size:13px; background-color:#f1861d;display:inline-block;padding: 1px 5px; border-radius:5px">${val}</span> adet`
                        }
                        if (val === product.minParticipants) {
                            return `<span style="color: white;font-size:13px; background-color:#f1861d;display:inline-block;padding: 1px 5px; border-radius:5px">${val}</span> satın almadan sonra indirim başlar`
                        }
                        if (val === product.maxParticipants) {
                            return `<span style="color: white;font-size:13px; background-color:#f1861d;display:inline-block;padding: 1px 5px; border-radius:5px">${val}</span> satın almada en düşük fiyat yakalanır`
                        }
                    }
                },
                y: {
                    show: true,
                    formatter: function (val) {
                        let title;
                        if (val === product.productPrice) {
                            title = "Satış fiyatı: "
                            return `${title} <span style=\"color: black;font-size:13px; background-color:#F5F5F5;display:inline-block;padding: 1px 5px; border-radius:5px\">${setCurrency(val)}</span>`
                        }
                        if (val < product.productPrice && val > product.targetPrice) {
                            let refund = product.productPrice - val;
                            title = "İade: "
                            return `${title} <span style=\"color: white;font-size:13px; background-color:#f1861E;display:inline-block;padding: 1px 5px; border-radius:5px\">${setCurrency(refund)}</span>`
                        }
                        if (val === product.targetPrice) {
                            title = "Son fiyat: "
                            return `${title} <span style=\"color: white;font-size:13px; background-color:#5cb85c;display:inline-block;padding: 1px 5px; border-radius:5px\">${setCurrency(val)}</span>`
                        }

                    },
                    title: {
                        formatter: () => null,
                    },
                },
            }
        })
    }, [orderCount]);

    return (
        <div>
            <Chart options={options} series={series} height={200} />
        </div>
    );
}
