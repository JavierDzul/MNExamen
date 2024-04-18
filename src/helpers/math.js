import { create, all } from 'mathjs';
export const math = create(all)
math.import({ln: math.log, csc: math.csc, sen:Math.sin, cos: math.cos})


export const metodos = [
  {
    name: 'Método de Bisección',
    params: [
      'f',
      'ai',
      'bi',
      'e',
    ],
    columns: [
      'i',
      'ai',
      'bi',
      'xi',
      'fxi',
      'e'
    ],
    func: ({ f, ai, bi, ai1, bi1 }) => {
      let first = false
      if(!ai1) {
        ai1 = ai
        bi1 = bi
        first = true
      }
      const xi1 = (ai1+bi1)/2
      const fxi = math.evaluate(f, {x:xi1})
      if(fxi === 0) return { ai, bi, xi: xi1, fxi, e: 0, result: xi1 }
      const fai = math.evaluate(f, {x:ai1})
      const fbi = math.evaluate(f, {x:bi1})
      const e = (bi1-ai1)/2 * 100
      const ai0 = ai1
      const bi0 = bi1

      if(fxi > 0) {
        if(fai > 0) ai1 = xi1
        else if(fbi > 0) bi1 = xi1
      }
      else if(fxi < 0) {
        if(fai < 0) ai1 = xi1
        else if(fbi < 0) bi1 = xi1
      }

      if(first) {
        return {ai, bi, ai1, bi1, xi: xi1, fxi, e, result: xi1}
      }
      return {ai: ai0, bi: bi0, ai1, bi1, xi: xi1, fxi, e, result: xi1}
    }
  },
  {
    name: 'Método de la regla falsa mejorada',
    params: [
      'f',
      'ai',
      'bi',
      'e',
    ],
    columns: [
      'i',
      'ai',
      'bi',
      'F',
      'G',
      'xi',
      'fxi1',
      'e'
    ],
    func: ({ f, ai, bi, xi, F0, G0, F1, G1, bi1, ai1 }) => {
      if(!xi) xi = ai
      ai = ai1 ? ai1 : ai
      bi = bi1 ? bi1 : bi
      let F = F1 ? F1 : math.evaluate(f, {x:ai})
      let G = G1 ? G1 : math.evaluate(f, {x:bi})

      const fxi = math.evaluate(f, { x: xi })

      const xi1 = (ai*G-bi*F)/(G-F)
      const fxi1 = math.evaluate(f, {x:xi1})

      if(fxi1 === 0) return { ai, bi, xi: xi1, fxi, e: 0, result: xi1 }

      const e = ((xi1-xi)/(xi+1)) * 100

      //if(!xi) return {ai, bi, xi: xi1, fxi, e, result: xi1}
      F0 = F
      G0 = G
      if(F*fxi1 < 0) {
        bi1 = xi1
        G = fxi1

        if(fxi * fxi1 > 0) {
          F = F/2
        }
      }
      else if(F*fxi1 > 0) {
        ai1 = xi1
        F = fxi1
        if(fxi * fxi1 > 0) {
          G = G/2
        }
      }

      return {ai, bi, ai1, bi1, xi: xi1, fxi1, e, G: G0, F: F0, G1: G, F1: F, result: xi1}
    }
  },
  {
    name: 'Método de Newton Rapson',
    params: [
      'f',
      'xi',
      'e',
    ],
    columns: [
      'i',
      'xi',
      'fxi',
      "dfxi",
      'xi1',
      'e'
    ],
    func: ({ f, df, xi, xi0, xi1 }) => {
      if(!xi1) xi1 = xi
      if(!df) df = math.derivative(f, 'x')
      const fxi = math.evaluate(f, {x: xi1})
      const dfxi = df.evaluate({x: xi1})

      xi0 = xi1

      xi1 = xi1 - (fxi/dfxi)

      const e = (xi1 - xi0)/(xi1)*100

      return { df, dfxi, xi: xi0, fxi, xi1, e, result: xi1 }
    }
  },
  {
    name: 'Método de la Secante',
    params: [
      'f',
      'x0',
      'x1',
      'e'
    ],
    columns: [
      'i',
      'xi0',
      'xi',
      "fxi0",
      'fxi',
      'xi1',
      'e'
    ],
    func: ({ f, x0, x1 }) => {
      const fx0 = math.evaluate(f, { x: x0 })
      const fxi = math.evaluate(f, { x: x1 })
      const xi1 = x1 - ((fxi)*(x0-x1))/(fx0-(fxi))
      const e = (xi1-x1)/xi1*100

      return { f, xi0: x0, xi: x1, fxi0: fx0, fxi, xi1, x0:x1, x1: xi1, e }
      //return { df, dfxi, xi: xi0, fxi, xi1, e, result: xi1 }
    }
  },
  {
    name: 'Método de Gauss-Seidel',
    params: [
      'e',
    ],
    matrixLength: 3,
    columns: [
      'i',
      'x10',
      'x20',
      'x30',
      'ex1',
      'ex2',
      'ex3'
    ],
    func: ({ x1, x2, x3, x10, x20, x30 }) => {
      let cx10 = x10 ?? 0
      let cx20 = x20 ?? 0
      let cx30 = x30 ?? 0

      const nx10 = math.evaluate(x1, { x2: cx20, x3: cx30 })
      const nx20 = math.evaluate(x2, { x1: nx10, x3: cx30 })
      const nx30 = math.evaluate(x3, { x1: nx10, x2: nx20 })

      const ex1 = (nx10 - cx10)/nx10 * 100
      const ex2 = (nx20 - cx20)/nx20 * 100
      const ex3 = (nx30 - cx30)/nx30 * 100

      return { ex1, ex2, ex3, x1, x2, x3, x10: nx10, x20: nx20, x30: nx30 }
    }
  },
  {
    name: 'Método de Jacobi',
    params: [
      'e',
      'x1',
      'x2',
      'x3',
    ],
    matrixLength: 3,
    columns: [
      'i',
      'x10',
      'x20',
      'x30',
      'ex1',
      'ex2',
      'ex3'
    ],
    func: ({ x1, x2, x3, x10, x20, x30 }) => {
      let cx10 = x10 ?? 0
      let cx20 = x20 ?? 0
      let cx30 = x30 ?? 0

      const nx10 = math.evaluate(x1, { x2: cx20, x3: cx30 })
      const nx20 = math.evaluate(x2, { x1: cx10, x3: cx30 })
      const nx30 = math.evaluate(x3, { x1: cx10, x2: cx20 })

      const ex1 = (nx10 - cx10)/nx10 * 100
      const ex2 = (nx20 - cx20)/nx20 * 100
      const ex3 = (nx30 - cx30)/nx30 * 100

      return { ex1, ex2, ex3, x1, x2, x3, x10: nx10, x20: nx20, x30: nx30 }
    }
  },
  {
    name: 'Método de Newton Rapson',
    params: [
      'x0',
      'y0',
      'e'
    ],
    columns: [
      'i',
      'xi',
      'yi',
      'ex',
      'ey',
    ],
  },
]


export function fromLatex(latex) {
  let text = latex
  text = text.replace(/\\sqrt\[([^\[\]]+)\]{([^{}]+)}/g, '(($2)^(1/$1))');
  text = text.replace(/\\sqrt{([^{}]+)}/g, 'sqrt($1)');
  text = text.replace(/([0-9]+)\^\{([^{}]+)\}/g, '($1^($2))');
  text = text.replace(/\\frac{([^{}]+)}{([^{}]+)}/g, '(($1)/($2))');
  text = text.replace(/\\cdot/g, '*');
  text = text.replaceAll('\\left(', '(')
  text = text.replaceAll('\\right)', ')')
  .replaceAll('\\pi', 'pi')
  .replaceAll('\\cos', 'cos')
  .replaceAll('\\ln', 'ln')
  .replace(/([a-z])([a-z0-9])/gi, '$1*$2');

  text = text.replace(/{([^{}]+)}/g, '($1)');
  text = text.replaceAll('\\', '');

  return text
}

export const calculateFromText = (text, x = 0) => {
  console.log(text)
  const result = math.evaluate(text, { x })
  return result
}


