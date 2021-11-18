export const Zones = {
    'Zone A': [
        {
            company: 'DHL',
            mode: 'Flight',
            classes: [
                {
                    label: 'Expedited Internationl',
                    duration_in_days: 5,
                    currency: 'USD',
                    cost: 120
                },
                {
                    label: 'First class Internationl',
                    duration_in_days: 15,
                    currency: 'USD',
                    cost: 90
                }
            ]
        },
        {
            company: 'EMS',
            mode: 'Water',
            classes: [
                {
                    label: 'Standard International',
                    duration_in_days: 45,
                    currency: 'USD',
                    cost: 40
                }
            ]
        }
    ],
    'Zone B': [
        {
            company: 'Posta Uganda',
            mode: 'Road',
            classes: [
                {
                    label: 'Same day delivery',
                    duration_in_days: 1,
                    currency: 'UGX',
                    cost: 45000
                }
            ]
        }
    ]
}

/* export const Zones = {
    'Zone A': {
        transport_mode: ['air', 'sea'],
        shipping_methods: {
            'air': {
                'category': 'International',
                'delivery_agents': [
                    {
                        'name': 'DHL',
                        'price': '$100',
                    },
                    {
                        'name': 'UPS',
                        'price': '$120',
                    },
                ]
            },
            'sea': {
                'category': 'International',
                'delivery_agents': [
                    {
                        'name': 'DHL',
                        'price': '$20'
                    },
                    {
                        'name': 'Posta Uganda',
                        'price': '$25'
                    },
                    {
                        'name': 'EMS',
                        'price': '$32'
                    }
                ]
            }
        }
    },
    'Zone B': {
        'transport_mode': ['air', 'road'],

    }
}
 */
export const  regions = [
    {
        'region': 'asia',
        'zone': 'Zone A',
        countries: ['China', 'Japan', 'Singapore'],
    },
    {
        'region':'europe',
        'zone': 'Zone A',
        countries: ['United Kingdom', 'France', 'Spain'],
    },
    {
        'region':'north_america',
        'zone': 'Zone A',
        countries: ['Canada','United States'],
    },
    {
        'region':'africa',
        'zone': 'Zone B',
        countries: ['Uganda', 'South Sudan','Rwanda'],
    },
    {
        'region':'middle_east',
        'zone': 'Zone B',
        countries: ['United Arab Emirates']
    }
]

const currencies = [

]

//let country = 'uganda'
// let countries = regions.filter(region => region.countries.includes(country)).map(region => region.zone)
/* let regions_which_contain_country = regions.filter(region => region.countries.includes(country))
let zones_of_the_regions = regions_which_contain_country.map(region_which_contain_country => region_which_contain_country.zone)
console.log(zones_of_the_regions) */

//Get zone of the country
/* let [region_which_contain_country] = regions.filter(region => region.countries.includes(country))
let { zone } = region_which_contain_country
console.log(Zones[zone]) */

// console.log( Zones.getCountryZone('uganda'))

export const getCountryZone = (country) => {
    let [region_which_contain_country] = regions.filter(region => region.countries.includes(country))
    /*         let { zone = null } = region_which_contain_country */
    let zone = region_which_contain_country ? region_which_contain_country.zone : null
    // console.log(zone)
    return Zones[zone]
    // return zone ? Zones[zone] : null
}