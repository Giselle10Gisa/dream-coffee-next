import RatingStatic from "../rating";

export default function OwnerStatus() {

  
  const date = new Date();
  const hours = date.getHours();

  const expedienteTeste = hours >=10 && hours <= 19;

  const morning = hours >= 6 && hours <= 12;
  const afternoon = hours >= 13 && hours <= 18;

  const ratings = [1, 2, 3.5, 4, 5]

  const avarage = (arr: number[]) => {
    return arr.reduce((a, b) => a+b, 0) / arr.length
  };

  return (
    <div className="flex items-center justify-center mt-11">
      <div className="flex flex-col gap-3">
        <p className="text-[#355C7D] font-jua text-2xl">{`${morning ? "Bom Dia!" : afternoon ? "Boa Tarde!" : "Boa Noite!"}`}</p>
        <img src="/images/assets/cafeterias/cafe-1.jpg" alt="Coffee Shop Open" className="lg:h-[250px] h-[250px] object-cover object-center lg:w-[900px] w-[350px]"/>
        <p className="text-black font-jua">{`Total de pedidos no dia: ` + 10}</p>
        <span className="text-black flex flex-row gap-1 font-jua">
          <p>Expediente:</p>
          {expedienteTeste ? (
            <p className="text-green-500">Em andamento</p>
          ) : (
            <p className="text-red-500">Fechado</p>
          )}
        </span>
        <span className="flex flex-row gap-2">
          <p className="text-black font-jua">Avaliação atual:</p>
          <RatingStatic rating={avarage(ratings)} color={"blue"}/>
        </span>
      </div>
    </div>
  )
}