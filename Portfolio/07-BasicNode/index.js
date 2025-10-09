import { readFileSync } from 'fs';
import { randomSuperhero } from 'superheroes';
import {randomSupervillain} from 'supervillains';
import sw from 'star-wars-quotes';

var superHeroName = randomSuperhero();
var superVillainName = randomSupervillain();
var secret = readFileSync('./data/input.txt', 'utf-8');
console.log('Hello world!! \n');


console.log(`${superHeroName}: you are a bad person!!!>:( ${superVillainName}\n`);
console.log(`${superVillainName}: No... I'm better than you\n`)
console.log(`${superHeroName}: I will defeat you!!!\n`)
console.log(`${superVillainName}: catch me if you can\n`)

console.log(sw())
console.log(`\n"${secret}"`);
