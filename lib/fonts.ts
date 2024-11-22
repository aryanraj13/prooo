import {Spectral,Instrument_Sans,Gloock,Caveat} from 'next/font/google';
import localfont from "next/font/local";

const spectral_init = Spectral({
    subsets: ['latin'],
    weight: ['500'],
    style: ['italic']
});

const caveat_init = Caveat({
    subsets: ['latin'],
    weight: ['500'],
    style: ['normal']
});

const gloock_init = Gloock({
    style: ['normal'],
    subsets:['latin'],
    weight:['400']
});

const instrument_sans_init = Instrument_Sans({
    subsets: ['latin'],
    weight: ['500'],
    style: ['normal']
});

const nyght_init = localfont({
    src:[{
        path:"../public/NyghtSerif-BoldItalic.ttf"
    }]
});

const gilroy_init = localfont({
    src:[{
        path:"../public/FontsFree-Net-Gilroy-ExtraBold.ttf"
        }]
});

export const spectral = spectral_init.className;
export const nyght = nyght_init.className;
export const instrument_sans = instrument_sans_init.className;
export const gloock = gloock_init.className;
export const caveat = caveat_init.className;
export const gilroy = gilroy_init.className;