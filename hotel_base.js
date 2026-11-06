// ===== Hotel Salto del Laja · base común (se carga después de mejoras_comunes.js y antes de las charlas) =====
// 1) Una sola empresa: window.SI_EMP = 'hotel' (el motor del portal es el mismo de los otros clientes).
// 2) Vestimenta de los dibujos según el ÁREA del hotel (W): nadie usa casco salvo que el dibujo lo pida.
//    Daniel (05-11-2026): en el hotel no hay uniforme definido, salvo mantención. Se dibuja lo que se usa de verdad:
//    cocina = pechera y cofia · camareras = delantal (y guantes de goma al limpiar baños) · desayuno = delantal
//    mantención = ropa de trabajo y el EPP que exige cada tarea (motosierra, orilladora, altura, cloro) · resto = ropa de trabajo sencilla.
//    Uso en los dibujos: W(x, y, { area: 'cocina', ... })  o  HT_AREA('cocina') antes de dibujar una escena completa.
// 3) Textos: [[...]] no se usa (una sola empresa). siTxt deja el texto igual.
(function () {
  if (window.__htBase) return; window.__htBase = true;
  window.SI_EMP = 'hotel';
  const VEST = {
    general:      { helmet: false, shirt: '#1F4E79', pants: '#37474F' },
    recepcion:    { helmet: false, shirt: '#ECEFF1', pants: '#263238', vestColor: '#0E3962' },
    cocina:       { helmet: false, cofia: true, shirt: '#FFFFFF', pants: '#37474F', apron: '#E0E0E0' },
    comedor:      { helmet: false, shirt: '#FFFFFF', pants: '#263238', apron: '#0E3962' },
    habitaciones: { helmet: false, shirt: '#7E57C2', pants: '#37474F', apron: '#B3E5FC' },
    lavanderia:   { helmet: false, shirt: '#26A69A', pants: '#37474F' },
    mantencion:   { helmet: false, shirt: '#2E5E8C', pants: '#263238' },
    bodega:       { helmet: false, shirt: '#5D4037', pants: '#37474F' }
  };
  window.HT_VEST = VEST;
  let AREA = 'general';
  window.HT_AREA = a => { AREA = VEST[a] ? a : 'general'; return ''; };
  if (typeof W === 'function' && !W.__ht) {
    const W0 = W;
    W = function (x, y, o) {
      o = Object.assign({}, o || {});
      const a = VEST[o.area] ? o.area : AREA, v = VEST[a] || VEST.general;
      Object.keys(v).forEach(k => { if (k !== 'vestColor' && o[k] === undefined) o[k] = v[k]; });
      if (o.helmet === true) o.helmet = '#FFC20E';
      if (o.cofia && o.helmet) o.cofia = false;
      delete o.area;
      let g = W0(x, y, Object.assign({}, o, { anim: undefined }));
      return o.anim ? `<g class="${o.anim}">${g}</g>` : g;
    };
    W.__ht = true;
  }
  // una sola empresa: el texto queda igual
  window.siTxt = function (s) { return s; };
})();
