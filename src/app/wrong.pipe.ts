import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'wrong'})
export class WrongPipe implements PipeTransform {
    transform(random: number): string {
        let emoji = ['flushed', 'worried', 'frowning', 'anguished',
                     'open-mouth', 'grimacing', 'confused', 'hushed', 'sweat',
                     'weary', 'pensive', 'disappointed', 'confounded',
                     'persevere', 'cry', 'sob', 'tired-face', 'dizzy-face'];
        let random_emoji = emoji[Math.floor(random * emoji.length)];
        return '<span class="wrong fruit twa twa-' + random_emoji + '"></span>';
    }
}
