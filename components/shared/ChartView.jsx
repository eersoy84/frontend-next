// react
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


export default function ChartView({ ad }) {
    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState({});
    let orderCount = ad?.numOrders;
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
        if (orderCount < ad?.minParticipants) {
            newData = [[0, ad?.productPrice], [orderCount, ad?.instantPrice], [ad?.minParticipants, ad?.productPrice], [ad?.maxParticipants, ad?.targetPrice]]
        }
        else if (orderCount >= ad?.minParticipants && orderCount < ad?.maxParticipants) {
            newData = [[0, ad?.productPrice], [ad?.minParticipants, ad?.productPrice], [orderCount, ad?.instantPrice], [ad?.maxParticipants, ad?.targetPrice]]
        }
        else if (orderCount >= ad?.maxParticipants) {
            newData = [[0, ad?.productPrice], [ad?.minParticipants, ad?.productPrice], [ad?.maxParticipants, ad?.targetPrice], [orderCount, ad?.instantPrice]]
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
                    x: ad?.numOrders,
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
                        text: `${ad?.numOrders} adet`
                    },
                }],
                yaxis: [{
                    y: ad?.instantPrice,
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
                        offsetY: calculateOffset(ad?.instantPrice, ad?.targetPrice, ad?.productPrice),
                        style: {
                            background: '#F1861d',
                            color: 'white',
                            fontSize: '11px',
                            fontWeight: 400,
                            fontFamily: undefined,
                            cssClass: 'apexcharts-xaxis-annotation-label',
                        },
                        text: setText(ad?.instantPrice, ad?.targetPrice, ad?.productPrice)
                    },
                }],
                // points: [
                //     {
                //         x: ad?.numOrders,
                //         y: ad?.instantPrice,
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
                max: ad?.productPrice,
                min: ad?.targetPrice,
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
                        if (val === ad?.numOrders) {
                            return `Satılan <span style="color: white;font-size:13px; background-color:#f1861d;display:inline-block;padding: 1px 5px; border-radius:5px">${val}</span> adet`
                        }
                        if (val === ad?.minParticipants) {
                            return `<span style="color: white;font-size:13px; background-color:#f1861d;display:inline-block;padding: 1px 5px; border-radius:5px">${val}</span> satın almadan sonra indirim başlar`
                        }
                        if (val === ad?.maxParticipants) {
                            return `<span style="color: white;font-size:13px; background-color:#f1861d;display:inline-block;padding: 1px 5px; border-radius:5px">${val}</span> satın almada en düşük fiyat yakalanır`
                        }
                    }
                },
                y: {
                    show: true,
                    formatter: function (val) {
                        let title;
                        if (val === ad?.productPrice) {
                            title = "Satış fiyatı: "
                            return `${title} <span style=\"color: black;font-size:13px; background-color:#F5F5F5;display:inline-block;padding: 1px 5px; border-radius:5px\">${setCurrency(val)}</span>`
                        }
                        if (val < ad?.productPrice && val > ad?.targetPrice) {
                            let refund = ad?.productPrice - val;
                            title = "İade: "
                            return `${title} <span style=\"color: white;font-size:13px; background-color:#f1861E;display:inline-block;padding: 1px 5px; border-radius:5px\">${setCurrency(refund)}</span>`
                        }
                        if (val === ad?.targetPrice) {
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
        <Chart options={options} series={series} height={200} />
    );
}
