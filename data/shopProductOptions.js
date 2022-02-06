export default [
    {
        id: 1,
        name: 'Cep Telefonu',
        parentId: null,
        downPaymentRatio: 0.01,
        extraLines: [
            {
                type: 'shipping',
                title: 'Kargo',
                value: 12, // %3
            },
        ],
        properties: [
            {
                id: 1,
                name: 'HAFIZA',
                type: 'radio',
                values: [
                    {
                        id: 1,
                        name: '64 GB',
                    },
                    {
                        id: 2,
                        name: '128 GB',
                        percentage: '10',

                    },
                    {
                        id: 3,
                        name: '256 GB',
                        percentage: '15',

                    },

                ],
            },
            {
                id: 2,
                name: 'RENK',
                type: 'radio',
                values:
                    [
                        {
                            id: 1,
                            name: 'Beyaz',
                            colorStyle: '#fff',
                        },
                        {
                            id: 2,
                            name: 'Siyah',
                            colorStyle: 'black',
                        },
                        {
                            id: 3,
                            name: 'Gri',
                            colorStyle: 'grey',

                        },
                        {
                            id: 4,
                            name: 'Kırmızı',
                            colorStyle: 'red',

                        },

                    ],
            },
        ],

    },
    {
        id: 13,
        name: 'Otomobil',
        parentId: 7,
        downPaymentRatio: 0.05,
        extraLines: [],
        properties: [
            {
                id: 1,
                name: 'VİTES',
                type: 'radio',
                values:
                    [
                        {
                            id: 1,
                            name: 'Manuel',
                        },
                        {
                            id: 2,
                            name: 'Otomatik',
                            percentage: '3',
                        },
                        {
                            id: 3,
                            name: 'Yarı Otomatik',
                            percentage: '2.0',
                        },

                    ],
            },
            {
                id: 2,
                name: 'YAKIT',
                type: 'radio',
                values:
                    [
                        {
                            id: 1,
                            name: 'Benzin',
                        },
                        {
                            id: 2,
                            name: 'Dizel',
                            percentage: '2.3',
                        },

                    ],
            },
            {
                id: 3,
                name: 'RENK',
                type: 'radio',
                values:
                    [
                        {
                            id: 1,
                            name: 'Beyaz',
                            colorStyle: '#fff',
                        },
                        {
                            id: 2,
                            name: 'Siyah',
                            colorStyle: 'black',
                        },
                        {
                            id: 3,
                            name: 'Gri',
                            colorStyle: 'grey',

                        },
                        {
                            id: 4,
                            name: 'Mavi',
                            colorStyle: 'blue',

                        },

                    ],
            },
            {
                id: 4,
                name: 'SUNROOF',
                type: 'checkbox',
                values:
                    [
                        {
                            id: 1,
                            name: 'SUNROOF',
                            percentage: '1.0',

                        },
                        // {
                        //     id: 2,
                        //      name: 'Hayır',
                        // },
                    ],
            },

        ],

    },
];
