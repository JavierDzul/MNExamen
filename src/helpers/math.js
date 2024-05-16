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
  {
    name: 'Método del Trapecio de Aplicación Múltiple',
    params: [
      'f',
      'n',
      'x0',
      'xn',
    ],
    func:({f, n , x0, xn}) =>{

      console.log("antes de parse")
      const functionGiven = math.parse(f); //gives me a expression tree, information wise it's useful
      console.log("despues de parse")
      console.log("Expression given as an expresion tree: ")
      console.log(functionGiven);
      console.log(functionGiven.toString())

      const functionCompiled = functionGiven.compile(); //makes it a expression ready to evaluate
      console.log("Expressión compiled as js code: ")
      console.log(functionCompiled);

      const scopeH = {xn: +xn, x0:+x0, n:+n};
      console.log("Scope used for calculating h: ");
      console.log(scopeH);


      const h = math.evaluate('( xn - x0 ) / n', scopeH);
      console.log("h value: ");
      console.log(h);

      let points = []
      points[0] = +x0 + +h
      console.log("Points list whit first point")
      console.log(points);

      const evaluatedPoints = [];
      evaluatedPoints[0] = functionCompiled.evaluate({x:points[0]})

      const sum = (functionCompiled, n, h, points, evaluatedPoints) => {
          let aux = {x: 0}
          for(let i = 1; i < (n-1); i++){
            points[i] = points[i-1] + h;
            aux = {x: points[i]}
            
            evaluatedPoints[i] = functionCompiled.evaluate(aux)
          }
          console.log("Points list: ");
          console.log(points);

          console.log("Evaluated points list: ");
          console.log(evaluatedPoints);

          return math.sum(evaluatedPoints);
      }

      const sumatory = sum(functionCompiled, n, h, points, evaluatedPoints);

      const simpson = math.parse(' ( h / 2 ) * ( fx0 + ( 2 * sum ) + fxn )')
      console.log("parsed simpson: ")
      console.log(simpson);
      console.log(simpson.toString())

      const compiledSimpson = simpson.compile();
      console.log("compiled simpson: ")
      console.log(compiledSimpson);

      const fx0 = functionCompiled.evaluate({x: x0});
      console.log("evaluated fx0: ")
      console.log(fx0);
      
      const fxn = functionCompiled.evaluate({x: xn});
      console.log("evaluated fxn: ")
      console.log(fxn);

      const simpsonScope = {h:h, fx0:fx0, sum: sumatory, fxn: fxn }
      
      

      const finalResult = compiledSimpson.evaluate(simpsonScope);

      return finalResult; 

    }
  },
  {
    name: 'Método de Simpson 1/3 de Aplicación Múltiple',
    params: [
      'f',
      'n',
      'x0',
      'xn',
    ],
    func:({f, n , x0, xn}) =>{

      console.log("antes de parse")
      const functionGiven = math.parse(f); //gives me a expression tree, information wise it's useful
      console.log("despues de parse")
      console.log("Expression given as an expresion tree: ")
      console.log(functionGiven);
      console.log(functionGiven.toString())

      const functionCompiled = functionGiven.compile(); //makes it a expression ready to evaluate
      console.log("Expressión compiled as js code: ")
      console.log(functionCompiled);

      const scopeH = {xn: +xn, x0:+x0, n:+n};
      console.log("Scope used for calculating h: ");
      console.log(scopeH);


      const h = math.evaluate('( xn - x0 ) / n', scopeH);
      console.log("h value: ");
      console.log(h);

      let oddPoints = []
      let evenPoints = []
      oddPoints[0] = +x0 + +h
      console.log("ODD Points list whit first point")
      console.log(oddPoints);

      evenPoints[0] = oddPoints[0] + +h;
      console.log("EVEN Points list with first point")
      console.log(evenPoints);

      const evaluatedOddPoints = [];
      const evaluatedEvenPoints = [];
      evaluatedOddPoints[0] = functionCompiled.evaluate({x:oddPoints[0]})
      evaluatedEvenPoints[0] = functionCompiled.evaluate({x:evenPoints[0]})
      
      const oddSum = (functionCompiled, n, h, oddPoints, evaluatedOddPoints) => {
          let aux = {x: 0}
          for(let i = 1; i < (n-1); i++){
            if(i % 2 == 0){
              oddPoints[i] = oddPoints[i-2] + (2*h);
              aux = {x: oddPoints[i]}

              evaluatedOddPoints[i] = functionCompiled.evaluate(aux)
            }
            else{
              evaluatedOddPoints[i] = 0;
            }
          }
          console.log("oddPoints list: ");
          console.log(oddPoints);

          console.log("Evaluated oddPoints list: ");
          console.log(evaluatedOddPoints);

          return math.sum(evaluatedOddPoints);
      }

      const evenSum = (functionCompiled, n, h, evenPoints, evaluatedEvenPoints) => {
        let aux = {x: 0}
        for(let i = 1; i < (n-2); i++){
          if(i%2===0){
            evenPoints[i] = evenPoints[i-2] + (2*h);
            aux = {x: evenPoints[i]}
            
            evaluatedEvenPoints[i] = functionCompiled.evaluate(aux)
          }
          else{
            evaluatedEvenPoints[i] = 0;
          }
        }
        console.log("EvenPoints list: ");
        console.log(evenPoints);

        console.log("Evaluated evenPoints list: ");
        console.log(evaluatedEvenPoints);

        return math.sum(evaluatedEvenPoints);
    }


      const oddSumatory = oddSum(functionCompiled, n, h, oddPoints, evaluatedOddPoints);
      const evenSumatory = evenSum(functionCompiled, n, h, evenPoints, evaluatedEvenPoints);

      const simpson = math.parse(' ( xn - x0 ) * (( fx0 + ( 4 * odd ) + ( 2 * even ) + fxn ) / (3 * n))')
      console.log("parsed simpson: ")
      console.log(simpson);
      console.log(simpson.toString())

      const compiledSimpson = simpson.compile();
      console.log("compiled simpson: ")
      console.log(compiledSimpson);

      const fx0 = functionCompiled.evaluate({x: x0});
      console.log("evaluated fx0: ")
      console.log(fx0);
      
      const fxn = functionCompiled.evaluate({x: xn});
      console.log("evaluated fxn: ")
      console.log(fxn);

      const simpsonScope = {xn: xn, x0: x0, n:n, fx0:fx0, odd: oddSumatory, even: evenSumatory, fxn: fxn }
      
      

      const finalResult = compiledSimpson.evaluate(simpsonScope);

      return finalResult; 

    }
  },
  {
    name: 'Método de Simpson 3/8',//9
    params: [
      'f',
      'x0',
      'xn',
    ],
    func:({f, x0, xn}) =>{

      console.log("antes de parse")
      const functionGiven = math.parse(f); //gives me a expression tree, information wise it's useful
      console.log("despues de parse")
      console.log("Expression given as an expresion tree: ")
      console.log(functionGiven);
      console.log(functionGiven.toString())

      const functionCompiled = functionGiven.compile(); //makes it a expression ready to evaluate
      console.log("Expressión compiled as js code: ")
      console.log(functionCompiled);

      const scopeH = {xn: +xn, x0:+x0, n:3};
      console.log("Scope used for calculating h: ");
      console.log(scopeH);


      const h = math.evaluate('( xn - x0 ) / n', scopeH);
      console.log("h value: ");
      console.log(h);

      let points = []
      points[0] = +x0 + +h
      points[1] = points[0] + +h
      console.log("points list 3/8")
      console.log(points);

      const evaluatedPoints = [];
      evaluatedPoints[0] = functionCompiled.evaluate({x:points[0]})
      evaluatedPoints[1] = functionCompiled.evaluate({x:points[1]})

      const fx1 = evaluatedPoints[0];
      const fx2 = evaluatedPoints[1];

      console.log("evaluated points")
      console.log(evaluatedPoints);

      const simpson = math.parse(' ( xn - x0 ) * (( fx0 + ( 3 * fx1 ) + ( 3 * fx2 ) + fxn ) / 8 )')
      console.log("parsed simpson: ")
      console.log(simpson);
      console.log(simpson.toString())

      const compiledSimpson = simpson.compile();
      console.log("compiled simpson: ")
      console.log(compiledSimpson);

      const fx0 = functionCompiled.evaluate({x: x0});
      console.log("evaluated 3/8 fx0: ")
      console.log(fx0);
      
      const fxn = functionCompiled.evaluate({x: xn});
      console.log("evaluated 3/8 fxn: ")
      console.log(fxn);

      const simpsonScope = {xn:xn, x0: x0, fx0:fx0, fx1: fx1, fx2: fx2, fxn: fxn }
      
      

      const finalResult = compiledSimpson.evaluate(simpsonScope);

      return finalResult; 

    }
  },
  {
    name: 'Regla de Boole',
    params: [
      'f',
      'n',
      'x0',
      'xn',
    ],
    func:({f, x0, xn,n}) =>{

      console.log("antes de parse")
      const functionGiven = math.parse(f); //gives me a expression tree, information wise it's useful
      console.log("despues de parse")
      console.log("Expression given as an expresion tree: ")
      console.log(functionGiven);
      console.log(functionGiven.toString())

      const functionCompiled = functionGiven.compile(); //makes it a expression ready to evaluate
      console.log("Expressión compiled as js code: ")
      console.log(functionCompiled);

      const scopeH = {xn: +xn, x0:+x0, n:n};
      console.log("Scope used for calculating h: ");
      console.log(scopeH);


      const h = math.evaluate('( xn - x0 ) / n', scopeH);
      console.log("h value: ");
      console.log(h);

      let points = []
      points[0] = +x0 + +h
      points[1] = points[0] + +h
      points[2] = points[1] + +h
      console.log("points list")
      console.log(points);

      const evaluatedPoints = [];
      evaluatedPoints[0] = functionCompiled.evaluate({x:points[0]})
      evaluatedPoints[1] = functionCompiled.evaluate({x:points[1]})
      evaluatedPoints[2] = functionCompiled.evaluate({x:points[2]})

      const fx1 = evaluatedPoints[0];
      const fx2 = evaluatedPoints[1];
      const fx3 = evaluatedPoints[2];

      console.log("evaluated points")
      console.log(evaluatedPoints);

      const simpson = math.parse(' ( xn - x0 ) * (( ( 7 * fx0 ) + ( 32 * fx1 ) + ( 12 * fx2 ) + ( 32 * fx3 ) + ( 7 * fxn ) ) / 90 )')
      console.log("parsed simpson: ")
      console.log(simpson);
      console.log(simpson.toString())

      const compiledSimpson = simpson.compile();
      console.log("compiled simpson: ")
      console.log(compiledSimpson);

      const fx0 = functionCompiled.evaluate({x: x0});
      console.log("evaluated fx0: ")
      console.log(fx0);
      
      const fxn = functionCompiled.evaluate({x: xn});
      console.log("evaluated fxn: ")
      console.log(fxn);

      const simpsonScope = {xn:xn, x0: x0, fx0:fx0, fx1: fx1, fx2: fx2, fx3: fx3, fxn: fxn }
      
      

      const finalResult = compiledSimpson.evaluate(simpsonScope);

      return finalResult; 

    }
  },
  {
    name: 'Método de Simpson 1/3', //11
    params: [
      'f',
      'x0',
      'xn',
    ],
    func:({f, x0, xn}) =>{

      console.log("antes de parse")
      const functionGiven = math.parse(f); //gives me a expression tree, information wise it's useful
      console.log("despues de parse")
      console.log("Expression given as an expresion tree: ")
      console.log(functionGiven);
      console.log(functionGiven.toString())

      const functionCompiled = functionGiven.compile(); //makes it a expression ready to evaluate
      console.log("Expressión compiled as js code: ")
      console.log(functionCompiled);

      const scopeH = {xn: +xn, x0:+x0, n:2};
      console.log("Scope used for calculating h: ");
      console.log(scopeH);


      const h = math.evaluate('( xn - x0 ) / n', scopeH);
      console.log("h value: ");
      console.log(h);

      let points = []
      points[0] = +x0 + +h
      console.log("points list")
      console.log(points);

      const evaluatedPoints = [];
      evaluatedPoints[0] = functionCompiled.evaluate({x:points[0]})

      const fx1 = evaluatedPoints[0];

      console.log("evaluated points")
      console.log(evaluatedPoints);

      const simpson = math.parse(' ( h / 3 ) * ( fx0 + ( 4 * fx1 ) + fxn ) ')
      console.log("parsed simpson: ")
      console.log(simpson);
      console.log(simpson.toString())

      const compiledSimpson = simpson.compile();
      console.log("compiled simpson: ")
      console.log(compiledSimpson);

      const fx0 = functionCompiled.evaluate({x: x0});
      console.log("evaluated fx0: ")
      console.log(fx0);
      
      const fxn = functionCompiled.evaluate({x: xn});
      console.log("evaluated fxn: ")
      console.log(fxn);

      const simpsonScope = {h:h, fx0:fx0, fx1: fx1, fxn: fxn }
      
      

      const finalResult = compiledSimpson.evaluate(simpsonScope);

      return finalResult; 

    }
  },
  {
    name: 'Segmentos Impares',
    params: [
      'f',
      'x0',
      'xn',
    ],
    func:({f, x0, xn}) =>{

      console.log("antes de parse")
      const functionGiven = math.parse(f); //gives me a expression tree, information wise it's useful
      console.log("despues de parse")
      console.log("Expression given as an expresion tree: ")
      console.log(functionGiven);
      console.log(functionGiven.toString())

      const functionCompiled = functionGiven.compile(); //makes it a expression ready to evaluate
      console.log("Expressión compiled as js code: ")
      console.log(functionCompiled);

      const scopeH = {xn: +xn, x0:+x0, n:5};
      console.log("Scope used for calculating h: ");
      console.log(scopeH);


      const h = math.evaluate('( xn - x0 ) / n', scopeH);
      console.log("h value: ");
      console.log(h);

      let points = []
      points[0] = +x0 + +h
      points[1] = points[0] + +h
      points[2] = points[1] + +h
      points[3] = points[2] + +h
      console.log("points list")
      console.log(points);

      
      const simpson1_3 = metodos[11].func({f:f, x0: x0, xn: points[1]})

      const simpson3_8 = metodos[9].func({f: f, x0:points[1], xn: xn })

      
      console.log("simpson 1/3")
      console.log(simpson1_3);
      console.log("simpson 3/8")
      console.log(simpson3_8);

      const simpson = math.parse(' l1 + l2 ')
      console.log("parsed simpson: ")
      console.log(simpson);
      console.log(simpson.toString())

      const compiledSimpson = simpson.compile();
      console.log("compiled simpson: ")
      console.log(compiledSimpson);

      const simpsonScope = {l1: simpson1_3, l2:simpson3_8 }
      
      

      const finalResult = compiledSimpson.evaluate(simpsonScope);

      return finalResult; 

    }
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


