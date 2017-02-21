import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'fruit'})
export class FruitPipe implements PipeTransform {
    transform(letter: string): string {
        let fruit = '';
        console.log(letter);
        switch (letter) {
            case 'A':
                fruit = '<span class="a fruit twa twa-melon"></span>';
                break;
            case 'B':
                fruit = '<span class="b fruit twa twa-pineapple"></span>';
                break;
            case 'C':
                fruit = '<span class="c fruit twa twa-apple"></span>';
                break;
            case 'D':
                fruit = '<span class="d fruit twa twa-tangerine"></span>';
                break;
            case 'E':
                fruit = '<span class="e fruit twa twa-pear"></span>';
                break;
            case 'F':
                fruit = '<span class="f fruit twa twa-banana"></span>';
            break;
            case 'G':
                fruit = '<span class="g fruit twa twa-green-apple"></span>';
                break;
            case 'BACK':
                fruit = '<span class="g fruit twa twa-lemon"></span>';
                break;
        }
        return fruit;
    }
}
