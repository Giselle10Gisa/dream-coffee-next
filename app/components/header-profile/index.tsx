import useChangeImage from "@/app/hooks/useChangeImage";

export default function HeaderProfile () {
    return (
        <div>
            <div className={`w-full h-52 bg-[url(https://img.freepik.com/fotos-gratis/uma-pintura-de-um-lago-de-montanha-com-uma-montanha-ao-fundo_188544-9126.jpg)] bg-no-repeat bg-center bg-cover opacity-80`}>a</div>
            <div className="w-full bg-gradient-to-b from-transparent to-blue-300 h-32 top-20 absolute"></div>  
            <img className="absolute z-10 top-28 lg:left-20 bg-blue-500 w-48 h-48 rounded-full" src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"/>
            <button className="w-16 h-16 rounded-full bg-white text-black absolute top-44 left-96 z-10">a</button>
        </div>
    )
}