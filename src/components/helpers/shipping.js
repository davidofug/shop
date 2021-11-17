export const Zones = {
    'Zone A': {
        'transport_mode': ['air', 'sea'],
        'shipping_methods': {
            'air': {
                'category':'International',
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
                        'price':'$20'
                    },
                    {
                        'name': 'Posta Uganda',
                        'price':'$25'
                    },
                    {
                        'name': 'EMS',
                        'price':'$32'
                    }
                ]
            }
        }
    },
    'Zone B': {
        'transport_mode': ['air', 'road'],

    },
}

export const  regions = [
    {
        'region': 'asia',
        'zone': 'Zone A',
        countries: ['china', 'japan', 'singapore'],
    },
    {
        'region':'europe',
        'zone': 'Zone A',
        countries: ['uk', 'france', 'spain'],
    },
    {
        'region':'north_america',
        'zone': 'Zone A',
        countries: ['canada','usa'],
    },
    {
        'region':'africa',
        'zone': 'Zone B',
        countries: ['uganda', 'south_sudan','rwanda'],
    },
    {
        'region':'middle_east',
        'zone': 'Zone B',
        countries: ['united_arab_emirates']
    }
]

export const shipping_methods = {
    'International': {},
    'Local': {},
    'Pick up': {},
    'Free': {}
}

//let country = 'uganda'
// let countries = regions.filter(region => region.countries.includes(country)).map(region => region.zone)
/* let regions_which_contain_country = regions.filter(region => region.countries.includes(country))
let zones_of_the_regions = regions_which_contain_country.map(region_which_contain_country => region_which_contain_country.zone)
console.log(zones_of_the_regions) */

//Get zone of the country
/* let [region_which_contain_country] = regions.filter(region => region.countries.includes(country))
let { zone } = region_which_contain_country
console.log(Zones[zone]) */