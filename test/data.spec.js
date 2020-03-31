import {ordenar, filtroData, estadistica} from '../src/data.js';
describe('ordenar', () => {
  it('is a function', () => {
    expect(typeof ordenar).toBe('function');
  });
  it('returns `ordenar`', () => {
    expect(ordenar([
      {
        'name': 'Paola',
      },
      {
        'name': 'Ana',
      },
      {
        'name': 'Ana',
      },
      {
        'name': 'Nataliya',
      }], 'A-Z')).toStrictEqual([
      {
        'name': 'Ana',
      },
      {
        'name': 'Ana',
      },
      {
        'name': 'Nataliya',
      },
      {
        'name': 'Paola',
      }]);
  });
  it('returns `ordenar`', () => {
    expect(ordenar([
      {
        'name': 'Paola',
      },
      {
        'name': 'Ana',
      },
      {
        'name': 'Ana',
      },
      {
        'name': 'Nataliya',
      }], 'Z-A')).toStrictEqual([
      {
        'name': 'Paola',
      },
      {
        'name': 'Nataliya',
      },
      {
        'name': 'Ana',
      },
      {
        'name': 'Ana',
      }]);
  });
});
describe('filtroData', () => {
  it('is a function', () => {
    expect(typeof filtroData).toBe('function');
  });
  it('returns `filtroData`', () => {
    expect(filtroData([
      {
        'name': 'Paola',
        'disciplinas': [
          {'medalla': 'Gold'}],
      },
      {
        'name': 'Nataliya',
        'disciplinas': [
          {'medalla': 'Silver'}],
      },
      {
        'name': 'Ana',
        'disciplinas': [
          {'medalla': 'Gold'}],
      },
      {
        'name': 'Ana',
        'disciplinas': [
          {'medalla': 'Bronze'}],
      }], 'medalla', 'Gold')).toStrictEqual([
      {
        'name': 'Paola',
        'disciplinas': [
          {'medalla': 'Gold'}],
      },
      {
        'name': 'Ana',
        'disciplinas': [
          {'medalla': 'Gold'}],
      }]);
  });
  it('returns `filtroData`', () => {
    expect(filtroData([
      {
        'name': 'Paola',
        'disciplinas': [
          {'disciplina': 'voley'}],
      },
      {
        'name': 'Nataliya',
        'disciplinas': [
          {'disciplina': 'futbol'}],
      },
      {
        'name': 'Ana',
        'disciplinas': [
          {'disciplina': 'voley'}],
      },
      {
        'name': 'Ana',
        'disciplinas': [
          {'disciplina': 'Golf'}],
      }], 'disciplinas', 'futbol')).toStrictEqual([
      {
        'name': 'Nataliya',
        'disciplinas': [
          {'disciplina': 'futbol'}],
      }]);
  });
  it('returns `filterData`', () => {
    expect(filtroData([
      {
        'name': 'Paola',
        'team': 'Colombia',
      },
      {
        'name': 'Nataliya',
        'team': 'Peru',
      },
      {
        'name': 'Ana',
        'team': 'Colombia',
      },
      {
        'name': 'Ana',
        'team': 'Brazil',
      }], 'team', 'Brazil')).toStrictEqual([
      {
        'name': 'Ana',
        'team': 'Brazil',
      }]);
  });
});
describe('estadistica', () => {
  it('is a function', () => {
    expect(typeof estadistica).toBe('function');
  });
  it('returns `estadistica`', () => {
    expect(estadistica([
      {
        'name': 'Paola',
        'team': 'Brazil',
        'disciplinas': [
          {'medalla': 'Gold'}],
      },
      {
        'name': 'Ana',
        'team': 'Brazil',
        'disciplinas': [
          {'medalla': 'Silver'},
          {'medalla': 'Gold'}],
      },
      {
        'name': 'Ana',
        'team': 'Chile',
        'disciplinas': [
          {'medalla': 'Silver'}],
      },
    ], 'Gold', ['Chile', 'Brazil'])).toStrictEqual([['Brazil'], [100]]);
  });
});
