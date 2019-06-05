import { ReverseCharactersPipe } from './reverse-characters.pipe';

describe('ReverseCharactersPipe', () => {
  it('create an instance', () => {
    const pipe = new ReverseCharactersPipe();
    expect(pipe).toBeTruthy();
  });
});
