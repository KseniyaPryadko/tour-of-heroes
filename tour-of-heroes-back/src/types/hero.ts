import { Document } from 'mongoose';

export interface Hero {
    name: string;
    age: number;
    class: string;
}

export interface HeroDocument extends Document, Hero {}
