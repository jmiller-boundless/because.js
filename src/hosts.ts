import { URL } from "./http";
import { Host } from "./host";


// Shortcut
export {
    Host,
};


export const urls: {[env: string]: URL} = {
    "dev": "https://saasy.boundlessgeo.io",
    "test": "http://saasy.boundlessgeo.io",
    "prod": "https://saasy.boundlessgeo.io",
    "local": "http://localhost:8000",
};


export const hosts: {[env: string]: Host} = {
    "dev": new Host(urls.dev),
    "test": new Host(urls.test),
    "prod": new Host(urls.prod),
    "local": new Host(urls.local),
};
