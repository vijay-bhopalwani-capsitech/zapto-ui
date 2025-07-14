import { IAddressTypeZod } from 'api-definitions';

export interface IGooglePlace {
    address_components: GoogleAddressComponent[];
    formatted_address: string;
    geometry: GoogleGeometry;
    place_id: string;
    vicinity: string;
    html_attributions: any[];
}

export interface GoogleAddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}

export interface GoogleGeometry {
    location: GoogleLocation;
    viewport: GoogleViewport;
}

export interface GoogleLocation {
    lat: () => number;
    lng: () => number;
}

export interface GoogleViewport {
    south: number;
    west: number;
    north: number;
    east: number;
}

export const addressModalToString = ({ address }: { address: IAddressTypeZod }) => {
    if (!address) {
        return '';
    }
    const { building, street, city, county, country, postCode } = address;
    return [building, street, city, county, country, postCode].filter(Boolean).join(', ');
};

export const convertGooglePlaceToAddress = ({ place }: { place: IGooglePlace }) => {
    const address: IAddressTypeZod = {
        building: place?.address_components?.find((component) => component.types && component.types.includes('street_number'))?.long_name ?? '',
        street:
            place?.address_components?.find((component) => component.types && component.types.includes('route'))?.long_name ??
            place?.address_components?.find((component) => component.types && component.types.includes('locality'))?.long_name ??
            '',
        city:
            place?.address_components?.find((component) => component.types && component.types.includes('postal_town'))?.long_name ??
            place?.address_components?.find((component) => component.types && component.types.includes('locality'))?.long_name ??
            '',
        county: place?.address_components?.find((component) => component.types && component.types.includes('administrative_area_level_2'))?.long_name ?? '',
        country: place?.address_components?.find((component) => component.types && component.types.includes('country'))?.long_name ?? '',
        postCode: place?.address_components?.find((component) => component.types && (component.types.includes('postal_code') || component.types.includes('postal_code_prefix')))?.long_name ?? '',
        exactLocation: {
            type: 'Point',
            coordinates: [place?.geometry?.location?.lng(), place?.geometry?.location?.lat()],
        },
    };
    return address;
};
