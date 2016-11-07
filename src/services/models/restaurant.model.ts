import { Location } from './location.model';

export interface Restaurant {
    id: string,

    name: string,

    townId: string,

    town: Location
}