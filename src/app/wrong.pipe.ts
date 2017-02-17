import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'wrong'})
export class WrongPipe implements PipeTransform {
    transform(random: number): string {
        let emoji = ['flushed', 'sob', 'worried', 'frowning', 'anguished',
                     'open-mouth', 'grimacing', 'confused', 'hushed', 'sweat',
                     'weary', 'pensive', 'disappointed'];
        let random_emoji = emoji[Math.floor(random * emoji.length)];
        return '<span class="wrong fruit twa twa-' + random_emoji + '"></span>';
    }
}
