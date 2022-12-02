export interface User {
    firstName       : string;
    lastName        : string;
    displayName     : string;
    email           : string;
    location        : Location;
    role?           : string;
    profilePicture? : string;
}

export interface Location {
    country     : string;
    state       : string;
    city        : string;
    district    : string;
}