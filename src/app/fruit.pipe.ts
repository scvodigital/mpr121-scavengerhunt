import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'fruit'})
export class FruitPipe implements PipeTransform {
    transform(letter: string): string {
        let fruit = '';
        switch (letter) {
            case 'A':
                fruit = '<span class="a fruit wee-orange">🍊</span>'; // Wee orange
                break;
            case 'B':
                fruit = '<span class="b fruit red-apple">🍎</span>'; // Red Apple
                break;
            case 'C':
                fruit = '<span class="c fruit lemon">🍋</span>'; // Lemon
                break;
            case 'D':
                fruit = '<span class="d fruit pear">🍐</span>'; // Pear
                break;
            case 'E':
                fruit = '<span class="e fruit peach">🍑</span>'; // Peach
                break;
            case 'F':
                fruit = '<span class="f fruit pineapple">🍍</span>'; // Pineapple
                break;
            case 'G':
                fruit = '<span class="g fruit banana">🍌</span>'; // Banana
                break;
        }
        return fruit;
    }
}
