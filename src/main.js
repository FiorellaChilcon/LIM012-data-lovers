import {cartaHTML, ordenar, filtroData, estadistica} from './data.js';
// import data from './data/atletas/atletas.js';
(async () => {
  const response = await fetch('./data/atletas/atletas.json');
  const data = await response.json();
  console.log(data);
  // Filtrar por disciplinas
  const arrDataAtletas = data.atletas;
  const arrDisciplinas = arrDataAtletas.filter((atleta) =>
    (atleta.hasOwnProperty('disciplinas')));
  const atletas2016 = arrDisciplinas.filter((listaAtletas) =>
    (listaAtletas.disciplinas[0].año === 2016));
  const topAtletas = (() => {
    const topA = [];
    atletas2016.forEach((perfil, index) => {
      let gold = 0;
      perfil.disciplinas.forEach((disciplina) => {
        if (disciplina.medalla === 'Gold') {
          gold++;
        }
      });
      if (gold === 2) {
        topA.push(index);
      }
    });
    return topA;
  })();
  const usuarios = topAtletas.map((indice) => atletas2016[indice]);
  const main = document.getElementsByTagName('main')[0];
  main.appendChild(cartaHTML(usuarios));
  // obtener id de los elementos mostrados
  const usuariosMostrados = (() => {
    const elementosId = [];
    const resultado = [];
    const articles = document.getElementsByTagName('article');
    Array.from(articles).forEach((element) => {
      elementosId.push(element.getAttribute('id'));
    });
    elementosId.forEach((numero) => {
      atletas2016.forEach((atleta) => {
        if (atleta.id === parseInt(numero)) {
          resultado.push(atleta);
        }
      });
    });
    return resultado;
  })();
  // funcionalidad boton ordenar
  const selector = document.querySelector('#ordenador');
  selector.addEventListener('change', (event) => {
    main.innerHTML = '';
    ordenar(usuariosMostrados, event.target.value);
    main.appendChild(cartaHTML(usuariosMostrados));
  });
  // Lista de países en select
  const listaPaisesRepetidos = atletas2016.map((paises) => paises.team);
  const listaPaises = listaPaisesRepetidos.filter((elemento, indice, array) =>
    array.indexOf(elemento) === indice);
  const selectPais = document.querySelector('#paises');
  (() => {
    const paisesOrdenados = listaPaises.sort();
    paisesOrdenados.forEach((pais) => {
      const opcion = document.createElement('option');
      opcion.textContent = pais;
      opcion.setAttribute('value', pais);
      selectPais.appendChild(opcion);
    });
  })();
  // funcionalidad select pais
  selectPais.addEventListener('change', (event) => {
    const resultado = filtroData(atletas2016, 'team', event.target.value);
    main.innerHTML = '';
    main.appendChild(cartaHTML(resultado));
  });
  // Lista de diciplinas en select
  const listaDisciplinasArr = atletas2016.map((atleta) =>
    (atleta.disciplinas));
  const listaDisciplinasFuncion = () => {
    const result = [];
    listaDisciplinasArr.forEach((arr) => {
      arr.forEach((obj) => {
        result.push(obj.disciplina);
      });
    });
    return result;
  };
  const listaDisciplinasRepetidas = listaDisciplinasFuncion();
  const listaDisciplinas = listaDisciplinasRepetidas.filter(
      (elemento, indice, array) =>
        (array.indexOf(elemento) === indice));
  // funcionalidad select disciplinas
  const selectDisciplina = document.querySelector('#disciplinas');
  (() => {
    const disciplinasOrdenadas = listaDisciplinas.sort();
    disciplinasOrdenadas.forEach((disciplina) => {
      const opcion = document.createElement('option');
      opcion.textContent = disciplina;
      opcion.setAttribute('value', disciplina);
      selectDisciplina.appendChild(opcion);
    });
  })();
  selectDisciplina.addEventListener('change', (event) => {
    // eslint-disable-next-line max-len
    const resultado = filtroData(atletas2016, 'disciplinas', event.target.value);
    main.innerHTML = '';
    main.appendChild(cartaHTML(resultado));
  });
  //  funcionalidad botones medallas
  const botonesMedalla = document.getElementsByName('medallas');
  botonesMedalla.forEach((boton) => {
    boton.addEventListener('click', () => {
      const resultado = filtroData(atletas2016, 'medalla', boton.value);
      main.innerHTML = '';
      main.appendChild(cartaHTML(resultado));
    });
  });
  const nombreAtletas = atletas2016.map((atleta) => (atleta.name));
  const inputBuscar = document.getElementById('search');
  const buscador = document.getElementById('searcher');
  buscador.addEventListener('click', () => {
    const resultado = atletas2016.filter((atleta) =>
      (atleta.name.toLowerCase() == inputBuscar.value.toLowerCase()));
    main.innerHTML = '';
    main.appendChild(cartaHTML(resultado));
  });
  const divCoincidencias = document.getElementById('coincidencias');
  inputBuscar.addEventListener('keyup', (event) => {
    const regex = new RegExp(`^${inputBuscar.value}`, 'gi');
    let matches = nombreAtletas.filter((nombre) => {
      divCoincidencias.innerHTML = '';
      return nombre.match(regex);
    });
    if (inputBuscar.value.length === 0 || nombreAtletas.some(
        (nombre) => nombre == inputBuscar.value)) {
      matches = [];
      divCoincidencias.classList.add('ocultar');
    } else {
      divCoincidencias.classList.remove('ocultar');
      matches.forEach((match) => {
        const opcion = document.createElement('p');
        const textoOpcion = document.createTextNode(match);
        opcion.appendChild(textoOpcion);
        divCoincidencias.appendChild(opcion);
        opcion.addEventListener('click', () => {
          divCoincidencias.classList.add('ocultar');
          inputBuscar.value = match;
        });
      });
    };
    if (event.keyCode === 13) {
      const resultado = atletas2016.filter((atleta) =>
        (atleta.name.toLowerCase() == inputBuscar.value.toLowerCase()));
      main.innerHTML = '';
      main.appendChild(cartaHTML(resultado));
    };
  });
  // grafico de barras
  const estadisticas = estadistica(atletas2016, 'Gold', listaPaises);
  const ctx = document.getElementById('myChart').getContext('2d');
  // eslint-disable-next-line no-unused-vars
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: estadisticas[0],
      datasets: [{
        label: '% of Gold medals',
        data: estadisticas[1],
        backgroundColor: [
          'red',
          'rgb(85, 85, 226)',
          'rgb(36, 228, 78)',
          'rgb(63, 63, 63)',
          'rgb(250, 233, 0)',
        ],
        borderColor: [
          'red',
          'rgb(85, 85, 226)',
          'rgb(36, 228, 78)',
          'rgb(63, 63, 63)',
          'rgb(250, 233, 0)',
        ],
        borderWidth: 1,
      }],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
    },
  });
})();
const botongrafico = document.getElementById('botongrafico');
const contenedorGrafico = document.getElementById('contenedorgrafico');
botongrafico.addEventListener('click', () => {
  contenedorGrafico.classList.remove('graficoclass');
  contenedorGrafico.classList.add('graficostyle');
});
const cerrargrafico = document.getElementById('cerrargrafico');
cerrargrafico.addEventListener('click', () => {
  contenedorGrafico.classList.add('graficoclass');
});
const contenidoMenu = document.getElementById('contenidoMenu');
const botonMenu = document.getElementById('botonMenu');
botonMenu.addEventListener('click', () => {
  contenidoMenu.classList.toggle('ocultarMenu');
});
const cerrarMenu = document.getElementById('cerrarMenu');
cerrarMenu.addEventListener('click', () => {
  contenidoMenu.classList.add('ocultarMenu');
});
const contenido = document.getElementById('contenido');
contenido.addEventListener('click', () => {
  contenidoMenu.classList.add('ocultarMenu');
});
const divCoincidencias = document.getElementById('coincidencias');
contenidoMenu.addEventListener('click', () => {
  divCoincidencias.classList.add('ocultar');
});
