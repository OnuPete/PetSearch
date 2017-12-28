import filterBreed from '../../resources/assets/js/util/filter';

describe('filterBreed', () => {
  it('should work for 0 or 1 element', () => {
    expect(filterBreed([], 'aire')).toEqual([]);
    expect(filterBreed([{breed: 'Airedale'}], 'aired')).toEqual([{breed: 'Airedale'}]);
  })

  it('should work for many elements', () => {
      expect(filterBreed([{ breed: 'Airedale' }, { breed: 'Long Haired Chihuahua' }, { breed: 'Long Haired Dachshund'}], 'aireda')).toEqual([{breed: 'Airedale'}]);
  })
})
