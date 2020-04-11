const cartaHTML = (arr) => {
  let article = '';
  arr.forEach((element) => {
    const infokeys = Object.keys(element);
    const vistaPrevia = `
    <div id="vistaPrevia">
      <p>${element.name}</p>
      <p>${element.disciplinas[0].disciplina}</p>
    </div>`;
    let info = '';
    let img = '';
    if (element.gender === 'F') {
      img += '<img src="imagenes/mujer.png" alt="foto" class="imgmujer">';
    } else {
      img += '<img src="imagenes/hombre.png" alt="foto">';
    };
    for (let i = 0; i < infokeys.length; i++) {
      const infoValues = element[infokeys[i]];
      if (Array.isArray(infoValues)) {
        infoValues.forEach((element) => {
          const elementKeys = Object.keys(element);
          for (let i = 0; i < elementKeys.length; i++) {
            switch (elementKeys[i]) {
              case 'medalla':
                info += `<p>
                <i class="fas fa-medal"></i> ${element[elementKeys[i]]} 
                </p>`;
                break;
              case 'temporada':
                info += `<p>
                <i class="fas fa-cloud-sun"></i> 
                ${element[elementKeys[i]]} 
                </p>`;
                break;
              default:
                info += `<p>
                <span>${elementKeys[i]}:</span>
                 ${element[elementKeys[i]]} 
                 </p>`;
            }
          }
        });
      } else {
        switch (infokeys[i]) {
          case 'gender':
            if (element[infokeys[i]] === 'F') {
              info += `<p>${infokeys[i]}: <i class="fas fa-venus"></i> </p>`;
            } else {
              info += `<p>${infokeys[i]} <i class="fas fa-mars"></i> </p>`;
            }
            break;
          case 'height':
            info += `<p>
            <i class="fas fa-ruler-vertical"></i> 
            ${infoValues} 
            </p>`;
            break;
          case 'weight':
            info += `<p><i class="fas fa-weight"></i> ${infoValues} </p>`;
            break;
          default:
            info += `<p><span>${infokeys[i]}:</span> ${infoValues} </p>`;
        };
      };
    };
    article +=`<article class="flip-card" id=${element.id}>
    <div class="flip-card-inner">
    <div class="flip-card-front">
       ${img}
       ${vistaPrevia}
    </div>
    <div class="flip-card-back">
       ${info}
    </div>
    </article>`;
  },
  );
  return article;
};
const ordenar = (data, orden) => {
  const resultado = data.sort((previo, siguiente) => {
    if (previo.name > siguiente.name) {
      return 1;
    } else if (previo.name < siguiente.name) {
      return -1;
    } else {
      return 0;
    }
  });
  if (orden === 'A-Z') {
    return resultado;
  } else if (orden === 'Z-A') {
    return resultado.reverse();
  };
};
const filtroData = (data, filtro, value) => {
  if (filtro === 'disciplinas') {
    const resultado = data.filter((atleta) =>
      (atleta[filtro].some((objeto) =>
        (objeto.disciplina === value))));
    return resultado;
  } else if (filtro === 'team') {
    const resultado = data.filter((atleta) =>
      (atleta[filtro] === value));
    return resultado;
  } else if (filtro === 'medalla') {
    const result = data.filter((atleta) =>
      (atleta.disciplinas.some((disciplina) =>
        (disciplina[filtro] === value))));
    return result;
  };
};
const estadistica = (data, medal, paisesTotal) => {
  const grupoAtletas = filtroData(data, 'medalla', medal);
  const result= [];
  const arr = [];
  let totalSum = 0;
  paisesTotal.forEach((pais) => {
    let counter = 0;
    grupoAtletas.forEach((atleta) => {
      if (atleta.team == pais) {
        atleta.disciplinas.forEach((disciplina) => {
          if (disciplina.medalla === medal) {
            counter++;
            totalSum++;
          }
        });
      }
    });
    arr.push([pais, counter]);
  });
  const atletas = arr.filter((pais) => (pais[1] > 0));
  atletas.sort((a, b) => b[1] - a[1]);
  const top5 = atletas.splice(0, 5);
  const porcentajes = top5.map((dato) => dato[1]/totalSum*100);
  const paises = top5.map((dato) => dato[0]);
  result.push(paises);
  result.push(porcentajes);
  return result;
};

export {cartaHTML, ordenar, filtroData, estadistica};
