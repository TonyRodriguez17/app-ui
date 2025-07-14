export interface Publication {
    id: number;
    title: string;
    slug: string;
    address: string;
    typeOfLocal: string;
    numberOfRooms: number;
    typeOfOperation: string;
    numberOfBathrooms: number;
    numberOfHalfBathrooms?: number;
    size: number;
    price: number;
    description: string;
    buildSize: number;
    views: number;
}