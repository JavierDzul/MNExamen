

const Result = ({input}) => {
    let result = '';

    console.log(input)

    try{
        console.log("previo result ",input)
        result = math.format(input.compile().evaluate())
        console.log("despues result",input)
    }
    catch(err){
        console.log("texto de error",input)
        result = <span className=" alert " > {err.toString()} </span>
    }
    console.log("FIn de la operación")
    return (
        <div>
            {result}
        </div>
  )
}

export default Result