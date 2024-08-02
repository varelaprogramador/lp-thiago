import Image from "next/image";
import bannerMain from "./assets/banner-part-1-yt.png"
import bannerMain2 from "./assets/banner-part-2.png"
import fotoThiago from "./assets/img-thiago.png" 
import carousel from "./assets/carousel-aulas.png" 
import logoyt from "./assets/logo-yt.png"
import fundoCelular from './assets/fundo-celular.png'
import celular from'./assets/CELULAR.png'
import Link from "next/link";
import { Imprima, Sora } from "next/font/google";
const sora = Sora({
  subsets: ['latin'],
  weight: '400', // Especifica o peso da fonte
});

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center bg-white justify-between ${sora.className}`}>
      <section className="w-full h-[500px] flex bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerMain.src})` }}>
          <div className=" w-[50%] flex flex-col gap-4 justify-center pl-40">
          <Image src={logoyt}
         alt="logo"
         className="w-[160px] h-[110px]"
          ></Image>
          <h1 className=" text-[30px]">
            Vale a pena <span className="text-cyan-400">larga seu emprego para </span><span className="bg-red-600 text-white font-bold p-1">SER YOUTUBER?</span>
          </h1>
          <p className=" text-sm">
            Um curso completo para você começar do zero e se 
            tornar um Youtuber de sucesso!
          </p>
          <Link href={"#"}>
          <button className="bg-cyan-400 rounded-md p-1">
            Quero aprender
          </button>
          </Link>
          
          </div>
          <div className=" w-[50%]">
            <Image
            src={fotoThiago}
            alt="foto do thiago"
            ></Image>

          </div>
      </section>
      <section className="w-full min-h-[500px] flex bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerMain2.src})` }}>
          <div className=" w-full flex flex-col gap-4 items-center ">
          
          <h2 className=" text-[30px] text-center pt-16">
            Um curso para <br /> <span className=" font-bold">você aprender do zero! </span>
          </h2>
       
          <Link href={"#"}>
          <button className="bg-cyan-400 rounded-md p-1">
            entrar no grupo 
          </button>
          </Link>
          
          </div>
          
      </section>
      <section className="w-full min-h-[500px] flex bg-black"
        >
          <div className=" w-full flex flex-col gap-8 items-center ">
          
          <h2 className=" text-[30px] text-center pt-16">
            O que você <br /> <span className=" font-bold">vai aprender? </span>
          </h2>

          <Image
          src={carousel}
          className="w-full bg-cover"
          alt="carrousel-aulas"
          ></Image>
       
          <Link href={"#"}>
          <button className="bg-cyan-400 rounded-md p-1">
            entrar no grupo 
          </button>
          </Link>
          
          </div>
          
      </section>
      <section className="w-full min-h-[500px] flex bg-black">
          <div className=" w-[50%] flex flex-col gap-4 justify-center pl-40">
          <Image src={logoyt}
         alt="logo"
         className="w-[160px] h-[110px]"
          ></Image>
          <h2 className=" text-[30px]">
           <span className="text-cyan-400">Ficou Interessado? <br /></span>Entre no <span className=" text-white font-bold p-1">grupo VIP</span> para garantir sua vaga em primeira mão
          </h2>
          
          <Link href={"#"}>
          <button className="bg-cyan-400 rounded-md p-1">
            Quero aprender
          </button>
          </Link>
          
          </div>
          <div className="  flex justify-end bg-cover bg-right"
          
          style={{ backgroundImage: `url(${fundoCelular.src})` }}>
            <Image
            src={celular}
            className="w-[350px] "
            alt="celular"
            ></Image>

          </div>
      </section>
      <section className="w-full min-h-[500px] flex  bg-cyan-400 p-24 text-black">
        <div className="flex w-full border border-black rounded-md p-10">
          <div className="w-[50%] flex justify-center items-center p-1">
            <h2 className=" text-[40px]">
              Faltam poucos dias para <span className="bg-red-600  font-bold p-1">abrirem as vagas</span>
            </h2>

          </div>
          <div className="w-[50%] flex justify-center items-center p-1">
            <div className="bg-white flex items-center justify-center w-[30%] h-[80%] rounded-md">
              <h2 className="text-[80px] font-extrabold">10</h2>
            </div>
            <h2 className="text-[80px] font-extrabold p-6">
              :
            </h2>
            <div className="bg-white w-[30%] flex items-center justify-center  h-[80%] rounded-md">
            <h2 className="text-[80px] font-extrabold">D</h2>
            </div>

          </div>
          
        </div>
          
      </section>
      
      

    </main>
  );
}
