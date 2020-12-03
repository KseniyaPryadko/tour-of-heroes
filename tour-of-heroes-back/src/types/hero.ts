import { Document } from 'mongoose';

export interface Hero {
    name: string;
}

export interface HeroDocument extends Document, Hero {}
